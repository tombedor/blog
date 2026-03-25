# Elroy: Source Notes

**Repo:** https://github.com/elroy-bot/elroy
**License:** Apache 2.0
**Description:** A scriptable, memory-augmented AI personal assistant accessible from the command line.

Notes drawn from reading the actual source code, not just docs.

---

## What it is

Elroy is a CLI assistant with long-term memory and reminders. Unlike library-style systems (Mem0, Zep), it's a full application — not something you drop into an existing agent stack. Compared to Letta, it's lighter: no server component, no REST API, runs as a process.

It supports multiple model providers (OpenAI, Anthropic, Google Gemini) and exposes both a Python SDK and shell interface.

---

## Memory Data Model

Three distinct entity types, all embedded and searchable via the same vector pipeline:

**Memory** (`db_models.py`): general knowledge and facts. File-backed — content stored in a markdown file; database stores metadata (`name`, `file_path`, `source_metadata`, `is_active`). `source_metadata` is a JSON array tracking which documents or reminders contributed to the memory. `is_active=False` when consolidated or superseded.

**Reminder** (`db_models.py`): action items with a status lifecycle (`created` → `completed`/`deleted`). Triggered by time (`trigger_datetime`) or context (`reminder_context`). Stores content directly in the database (no file). Has a `closing_comment` field for why it was completed or deleted.

**AgendaItem** (`db_models.py`): time-scoped tasks stored as markdown files, supporting checklists and timestamped updates within the file content. Simpler than Memory — no `source_metadata` tracking.

**Goals are not a separate model.** No `Goal` class exists. Goal-related information is stored as `Memory` rows. This was previously enforced by naming conventions in the consolidation prompt; goals have since been removed as a distinct concept.

---

## What Triggers Consolidation

Consolidation is **creation-triggered**, not time-based or retrieval-triggered.

A `MemoryOperationTracker` table stores a counter per user:

```python
class MemoryOperationTracker(SQLModel, table=True):
    memories_since_consolidation: int  # increments on each memory creation
    messages_since_memory: int         # separate counter, not related to consolidation
```

Every time a memory is created (`do_create_op_tracked_memory`):

```python
tracker.memories_since_consolidation += 1

if tracker.memories_since_consolidation >= ctx.memories_between_consolidation:
    schedule_task(consolidate_memories, ctx)   # runs in background thread
    tracker.memories_since_consolidation = 0
```

Default threshold: **5 memories**. Configurable via `memories_between_consolidation`.

---

## Consolidation Algorithm

When triggered, consolidation runs as a background task:

### Step 1: Cluster active memories

Loads all active memory embeddings (known N+1 query issue in current code), then applies scikit-learn DBSCAN with cosine metric:

```python
clustering = DBSCAN(
    eps=ctx.memory_cluster_similarity_threshold,  # default: 0.85
    metric="cosine",
    min_samples=ctx.min_memory_cluster_size,      # default: 2
).fit(embeddings_array)
```

Noise points (label == -1) are excluded. Large clusters are reduced to their densest N members by computing mean pairwise cosine distance and keeping the closest members.

Clusters are sorted by priority: larger clusters first, then tighter clusters (lower mean distance). Only the top **3 clusters** per consolidation run are processed (`cluster_limit` default).

### Step 2: LLM synthesis

For each cluster, Elroy calls the LLM (`fast_llm`) with a structured output format:

```python
class ConsolidationResponse(BaseModel):
    reasoning: Optional[str]
    memories: list[MemoryResponse]   # LLM can return multiple new memories per cluster
```

The LLM is prompted to synthesize the cluster into one or more new memories, resolving redundancy and contradiction. A single cluster can produce multiple new synthesized memories if the LLM determines the content covers distinct topics.

### Step 3: Persist results

For each new memory in the response:
- A new `Memory` row is created with the synthesized name and content
- All source memories in the cluster are marked `is_active = False` (not deleted)
- Source relationships are recorded

This is **non-destructive**: original memories are archived, not removed.

---

## Recall / Retrieval Pipeline

Three stages:

**Stage 1 — Fast heuristics (optional, on by default):**
Skips retrieval for obvious non-content messages (single-word greetings, short acknowledgments like "ok", "thanks"). Returns immediately without any LLM call or vector search. Configurable via `memory_recall_classifier_enabled`.

**Stage 2 — Vector similarity search:**
Searches active memories, reminders, and agenda items in parallel (top 2 of each type via `juxt(get_most_relevant_memories, get_most_relevant_reminders, get_most_relevant_agenda_items)`). Results are concatenated and deduplicated.

**Stage 3 — LLM relevance filtering:**
The candidate items are passed to the `fast_llm` with the query, and it returns a binary relevance decision per item (`RelevanceResponse`). Only items marked relevant are injected into context.

Relevant items are injected as tool call results (synthetic "fast recall" tool calls), not prepended as system prompt text.

---

## Key Configuration Parameters

| Parameter | Default | Effect |
|---|---|---|
| `memories_between_consolidation` | 5 | Consolidation trigger threshold |
| `memory_cluster_similarity_threshold` | 0.85 | DBSCAN eps (cosine distance) |
| `min_memory_cluster_size` | 2 | DBSCAN min_samples |
| `max_memory_cluster_size` | 10 | Max densest members kept per cluster |
| `l2_memory_relevance_distance_threshold` | 1.4 | Vector search cutoff |
| `memory_recall_classifier_enabled` | True | Enable heuristic stage |
| `memory_recall_classifier_window` | 3 | Conversation window for LLM recall decision |

---

## Updating Outdated Memories

Two mechanisms for handling stale facts:

**Agent-initiated updates (`update_outdated_or_incorrect_memory`):** A tool decorated with `@tool` (available to the LLM). Takes `memory_name` and `update_text`. Marks the original memory `is_active=False`, removes its embedding, and creates a new Memory with content: `{original_content}\n\nUpdate (YYYY-MM-DD HH:MM:SS):\n{update_text}`. The timestamp is embedded in the new memory's text content, making it visible to the LLM during future retrieval and consolidation.

**Consolidation:** Database-level `created_at`/`updated_at` are NOT passed to the LLM during consolidation. The consolidation prompt includes the current date/time but not individual memory timestamps. However, if a memory was created or updated via `update_outdated_or_incorrect_memory`, the update timestamp is embedded in the content text itself and IS visible to the consolidation LLM.

---

## How Elroy Differs from Mem0, Zep, and Letta

**vs. Mem0:**
- Mem0 consolidates on write: every new memory is immediately checked against existing ones via LLM (update/merge/delete decision). Elroy batches consolidation after N creations, then clusters before synthesizing — deferring the cross-memory comparison to a separate background pass.
- Mem0's consolidation output is 1-to-1 (a candidate fact either survives or doesn't). Elroy's can be 1-to-many (a cluster can produce multiple synthesized memories).
- Mem0 is a drop-in library. Elroy is a standalone application.

**vs. Zep:**
- Zep's temporal knowledge graph tracks fact validity windows (`valid_from`/`valid_to`); old facts are invalidated, not archived. Elroy archives old memories (marks them inactive) but has no validity window — no point-in-time querying.
- Zep's retrieval combines semantic + full-text + BFS graph traversal. Elroy's is vector + LLM filter only.

**vs. Letta:**
- Both use agent-controlled memory in the sense that the LLM decides what to create. But Letta agents actively edit their own `core_memory` in the context window during inference; Elroy's consolidation happens in the background after the conversation turn.
- Letta is a full server runtime with REST API. Elroy is a CLI process.
- Letta has explicit memory tiers (Core / Recall / Archival). Elroy has one memory type, with reminders as a second distinct entity.

**The distinct design choice: synthesis over deduplication.**
Most memory systems handle redundancy by deduplication — remove the duplicate, keep one version. Elroy's LLM synthesis step is designed to generate a genuinely new representation from the cluster — potentially capturing relationships or generalizations that neither source memory expressed. Whether this reliably happens in practice vs. just producing a summary is an empirical question not answered by the docs.

---

## Known Limitations (from code comments)

- **N+1 query on embedding load**: When clustering, embeddings are loaded one at a time in a loop rather than in a single batch query. Noted as a TODO with explanation that pgvector deserialization issues prevented batching in some configurations.
- **No temporal model**: No validity windows on memories. Superseded facts must be manually updated or will be archived only when consolidation clusters them with contradicting facts.
- **3-cluster-per-run cap**: Each consolidation pass processes at most 3 clusters. High-volume memory creation may leave many clusters unprocessed until subsequent consolidation runs.
