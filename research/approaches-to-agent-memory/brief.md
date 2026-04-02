# Research Brief: Approaches to Agent Memory

**Post:** `blog/approaches-to-agent-memory.md`
**Last updated:** 2026-03-30 (added in-weights memory section; updated benchmark controversy with Zep response, Hindsight, LifeBench)

---

## Summary

This brief covers prior art and key libraries for agent memory management. The main systems researched are Mem0, Letta (formerly MemGPT), Zep, and Elroy, along with approaches from OpenAI and Anthropic/Claude.

---

## Why People Want AI Memory (Commonly Discussed Motivations)

Collated from papers, blog posts, practitioner discussions, and product marketing in the space.

**1. Avoiding repetitive re-explanation ("don't make me repeat myself")**
The most frequently cited frustration: users must re-establish context every session. "Here's who I am, here's what I'm working on, here's my preferences" — at scale this is genuinely expensive and friction-inducing. Memory converts this per-session cost into a one-time cost.

**2. Personalization**
Agents that remember preferences (communication style, tools used, project conventions) feel qualitatively different from generic assistants. The appeal is partly functional (fewer mismatches) and partly social — a sense of being known. Consumer products (ChatGPT memory) lean heavily on this in marketing.

**3. Long-horizon task completion**
Many meaningful tasks span days or weeks: a software project, a research effort, a hiring process. Without memory, each session requires re-reading prior work. With memory, an agent can pick up where it left off and maintain a coherent picture of where the task stands.

**4. Learning from past interactions**
Beyond factual recall, the aspiration is that agents improve through experience — learning that a user prefers certain approaches, that a particular customer is sensitive on pricing, or that a codebase has idiosyncratic conventions. This is more ambitious than most current systems deliver.

**5. Maintaining relational context in multi-turn work**
Complex tasks generate entities that matter later: decisions made, people mentioned, constraints established. Without memory, agents lose track of these relationships as conversation history scrolls out of context. Memory preserves the relational web, not just individual facts.

**6. Enabling agents to operate autonomously over time**
The strongest argument for memory is architectural: agents that run unattended (overnight, over weeks) cannot rely on a human to reconstruct context at the start of each session. Memory is the infrastructure that makes truly autonomous agents possible, not just a UX nicety.

**7. Trust and consistency**
An agent that remembers past commitments, promises, and decisions behaves consistently. One that forgets them can contradict itself, re-open settled questions, or fail to honor stated preferences. Memory is load-bearing for trust in long-term relationships.

**8. Reducing cognitive load on users**
Related to (1) but distinct: the user shouldn't have to track what the agent knows and doesn't. Memory externalizes that bookkeeping from the user's head to the system.

**Skeptical pushback worth noting:**
- Many stated use cases are actually short-session and don't need memory
- Personalization value is often overstated; users frequently want to start fresh
- The "learns from experience" framing typically oversells current capabilities — most systems do retrieval, not learning
- Context window sizes have expanded dramatically (1M+ tokens), reducing the urgency of the problem for many use cases
- Simple approaches (flat file storage) are competitive with sophisticated memory systems on benchmarks

**Why large context windows don't actually solve the problem:**

The "just use a bigger context window" counter-argument has strong empirical pushback.

- **"Lost in the Middle" (Liu et al., Stanford/TACL 2024):** LLMs attend strongly to the beginning and end of context and poorly to the middle. In multi-document QA with 20 documents, accuracy dropped >30% when the relevant document was in positions 5–15 vs. position 1 or 20. The performance curve is U-shaped across input position.

- **Context Rot (Chroma Research, July 2025):** Tested 18 frontier models (GPT-4.1, Claude Opus 4, Gemini 2.5). Every single one shows measurable output quality degradation as context length increases — even before approaching the advertised limit. A model with a 200K token window can show significant degradation at 50K tokens. The decline is continuous, not a cliff.

- **NoLiMa benchmark (Adobe Research, Feb 2025):** 11 of 12 models dropped below 50% of baseline performance at just 32K tokens when questions and answers lacked lexical overlap (realistic conditions). GPT-4o dropped from 99.3% to 69.7%.

- **"Context Length Alone Hurts Performance Despite Perfect Retrieval" (arXiv, Oct 2025):** Even with 100% perfect retrieval of relevant information pre-selected, performance degraded 13.9%–85% as input length increased. Degradation persisted even when irrelevant tokens were replaced with whitespace. Sheer context length imposes a cognitive tax independent of content quality.

- **Practical limits vs. advertised limits:** Research suggests ~30–35% degradation from the theoretical maximum is common. Approximate reliable limits: Claude 200K → ~130K, Gemini 1M → ~650K, GPT-4 128K → ~83K.

- **Root cause is architectural:** Transformer attention is quadratic — 100K tokens = 10 billion pairwise relationships. Softmax normalization means each token's attention weight shrinks as context grows. The signal doesn't get louder; the noise floor rises. This is an architectural property of transformer attention, not a capability gap training can simply close.

- **Cost and latency compound the problem for agents:** Token cost scales linearly with context size. Latency scales even faster (quadratic attention). A typical multi-turn agent task runs dozens of tool calls; each adds to accumulated context. Memory layers cut token costs ~90% and latency ~91% vs. full-context approaches (Mem0's reported figures). The break-even point depends on how often a user re-engages with the same context.

The upshot: "just expand the context window" is not a memory strategy — it's a deferred memory problem that gets more expensive and less accurate over time.

Sources: [Context Rot — Chroma Research](https://research.trychroma.com/context-rot) · [Context Length Alone Hurts Performance — arXiv:2510.05381](https://arxiv.org/html/2510.05381v1) · [Context Rot — understandingai.org](https://www.understandingai.org/p/context-rot-the-emerging-challenge) · [Cost-Performance Analysis of Fact-Based Memory vs. Long-Context LLMs — arXiv:2603.04814](https://arxiv.org/html/2603.04814)

---

## Key Claims to Fact-Check / Explore

- Agent memory is the primary unsolved problem for production AI agents
- Vector-only memory is insufficient for complex relational reasoning
- Graph memory adds accuracy at meaningful token cost
- Mem0 claims 26% accuracy improvement over OpenAI Memory and 91% latency reduction vs. full-context approaches (LOCOMO benchmark)

---

## Sources

- [mem0.md](./mem0.md) — Deep research on Mem0: architecture, integration, limitations, version history
- [zep.md](./zep.md) — Deep research on Zep: temporal knowledge graph architecture, benchmarks, integration, limitations
- [elroy.md](./elroy.md) — Source-code-level notes on Elroy: consolidation algorithm, memory data model, recall pipeline, comparison with other systems
- [evaluation-techniques.md](./evaluation-techniques.md) — Benchmarks and metrics for evaluating agent memory (LoCoMo, LongMemEval, MemBench, AMA-Bench, LifeBench, MemoryCD; LLM-as-judge vs. lexical; benchmark controversy and saturation)

### Platform Documentation

- [Anthropic Memory Tool Docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)
- [Anthropic Agent SDK Overview](https://platform.claude.com/docs/en/agent-sdk/overview)
- [Anthropic Release Notes](https://platform.claude.com/docs/en/release-notes/overview)
- [OpenAI Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)
- [OpenAI ChatGPT Release Notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [OpenAI Agents SDK Sessions](https://openai.github.io/openai-agents-python/sessions/)
- [OpenAI: Migrate to the Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses)

### Anthropic Engineering Posts

- [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) (Nov 26, 2025)
- [VentureBeat: Anthropic Solves Long-Running Agent Problem](https://venturebeat.com/ai/anthropic-says-it-solved-the-long-running-ai-agent-problem-with-a-new-multi)
- [VentureBeat: Anthropic Agent Skills](https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard)
- [Leonie Monigatti: Exploring Anthropic's Memory Tool](https://www.leoniemonigatti.com/blog/claude-memory-tool.html)

### OpenAI Documentation and Cookbook

- [OpenAI Cookbook: Context Engineering for Personalization](https://cookbook.openai.com/examples/agents_sdk/context_personalization)
- [OpenAI Cookbook: Short-Term Memory Management with Sessions](https://cookbook.openai.com/examples/agents_sdk/session_memory)
- [OpenAI for Developers 2025](https://developers.openai.com/blog/openai-for-developers-2025/)
- [eesel.ai: OpenAI Assistants API Deprecation Guide](https://www.eesel.ai/blog/openai-assistants-api)
- [Microsoft Q&A: Assistants API and Azure OpenAI](https://learn.microsoft.com/en-us/answers/questions/5571874/openai-assistants-api-will-be-deprecated-in-august)

### Letta

- [Letta Blog: Benchmarking AI Agent Memory (Is a Filesystem All You Need?)](https://www.letta.com/blog/benchmarking-ai-agent-memory)
- [Letta Blog: MemGPT and Letta](https://www.letta.com/blog/memgpt-and-letta)
- [Letta Blog: Rearchitecting Letta's Agent Loop](https://www.letta.com/blog/letta-v1-agent)
- [Letta Blog: Letta Code](https://www.letta.com/blog/letta-code)
- [Letta GitHub](https://github.com/letta-ai/letta)
- [Letta Docs: Intro / MemGPT Concepts](https://docs.letta.com/concepts/memgpt/)

### mem0

- [mem0: Graph Memory for AI Agents](https://mem0.ai/blog/graph-memory-solutions-ai-agents) (Jan 2026)
- [mem0: OpenAI Agents SDK Review](https://mem0.ai/blog/openai-agents-sdk-review)

### Comparisons and Overviews

- [Vectorize: Mem0 vs Letta](https://vectorize.io/articles/mem0-vs-letta)
- [Vectorize: Best AI Agent Memory Systems 2026](https://vectorize.io/articles/best-ai-agent-memory-systems)
- [DEV Community: 5 AI Agent Memory Systems Compared 2026](https://dev.to/varun_pratapbhardwaj_b13/5-ai-agent-memory-systems-compared-mem0-zep-letta-supermemory-superlocalmemory-2026-benchmark-59p3)
- [MachineLearningMastery: 6 Best AI Agent Memory Frameworks 2026](https://machinelearningmastery.com/the-6-best-ai-agent-memory-frameworks-you-should-try-in-2026/)

---

## Systems Researched

### Zep

See [zep.md](./zep.md) for full notes.

**Memory creation:** Passive and automatic. After each conversation turn, the developer calls `memory.add(session_id, messages)` and Zep processes the exchange in the background. An LLM extracts entities and facts, which are written into the Graphiti graph asynchronously. The developer does not write individual memory facts — ingestion is at the conversation level, and the system handles extraction.

**Memory architecture:** Temporal knowledge graph (Graphiti) with three subgraphs, each corresponding to a different granularity of representation:
- *Episode subgraph* (episodic memory): raw conversation events and messages stored verbatim, never modified. This is the ground-truth record.
- *Semantic entity subgraph* (semantic memory): entities and facts extracted from episodes via LLM. Stored as graph nodes with relationships as edges, each carrying temporal metadata.
- *Community subgraph* (abstract knowledge): clusters of strongly connected entities with summarized context, updated via dynamic label propagation. Sits above the entity layer and supports higher-level retrieval.

Key innovation: bitemporal data model. Every node and edge carries two timestamps — when the fact occurred (Event Time) and when it was ingested (Ingestion Time). This is distinct from most systems, which only record when a memory was created.

**Storage:** Graph database (Neo4j or compatible). Zep Cloud manages this; self-hosters use the open-source Graphiti library directly. Community Edition was deprecated April 2025.

**Recall and injection:** System-controlled and automatic. Before generating a response, the developer calls `memory.get_context(session_id)`, which runs three retrieval strategies in parallel: semantic vector search (1024D embeddings), full-text search (BM25), and breadth-first graph traversal from matched entities. Results are reranked and returned as a single pre-formatted context string, ready to inject into the system prompt. P95 latency < 200ms. The developer is responsible for including this string in the prompt — Zep does not inject it automatically.

**Handling outdated memories:** Fact invalidation, not deletion. When a new fact supersedes an old one, the old edge is marked with an `invalid_at` timestamp and a new valid fact is written. Both facts remain queryable. This supports "what was true at time X" queries — a capability no other mainstream system provides natively.

---

### Elroy

See [elroy.md](./elroy.md) for full notes.

**Memory creation:** Agent-initiated. The LLM creates memories via tool calls during conversation. A `MemoryOperationTracker` counter increments on each creation; when it reaches the threshold (default: 5), a background consolidation pass is triggered and the counter resets.

**Memory architecture:** Three distinct entity types, each with a different purpose:
- *Memory*: general knowledge and facts about the user or context. File-backed (markdown on disk).
- *Reminder*: action items triggered by time (`trigger_datetime`) or by conversational context (`reminder_context`). Has a status lifecycle (created → completed/deleted).
- *Agenda item*: time-scoped tasks stored as markdown files, supporting checklists and timestamped updates within the file.

All three types are embedded and searched via the same vector retrieval pipeline. No predefined taxonomy for memory content categories.

**Storage:** SQLite for metadata, vector database for embeddings. Memories and agenda items are file-backed; reminders store content directly in the database.

**Recall and injection:** Automatic, three-stage pipeline that runs on every conversation turn:
1. Fast heuristics: skips retrieval entirely for obvious non-content messages — no LLM call, no vector search.
2. Vector similarity search: searches active memories, reminders, and agenda items in parallel (top 2 of each type), then combines and deduplicates results.
3. LLM relevance filter: candidates are passed to a small/fast LLM, which returns a binary relevance decision per item. Only relevant items proceed.

Relevant items are injected as synthetic tool call results in the conversation — not as prepended system prompt text.

**Handling outdated memories:** Two mechanisms:
- *Agent-initiated updates*: the LLM can call `update_outdated_or_incorrect_memory(memory_name, update_text)`, which marks the original memory inactive and creates a new one with the update appended, including an explicit timestamp (`Update (YYYY-MM-DD HH:MM:SS): {update_text}`). This timestamp is visible in the content during future consolidation, so the LLM can reason about recency.
- *Consolidation-based archival*: periodically, DBSCAN clustering groups semantically similar memories. An LLM synthesizes each cluster into new memories; source memories are archived (`is_active=False`). There are no validity windows — if contradicting facts never cluster together, both remain active.

---

### Mem0

See [mem0.md](./mem0.md) for full notes.

**Memory creation:** Developer-triggered via `m.add(messages, user_id)`. Two-phase pipeline:
1. Extraction: an LLM processes the conversation and extracts candidate memory facts. A rolling summary is refreshed asynchronously in the background (non-blocking).
2. Consolidation: each candidate fact is compared against the top-N similar existing memories. An LLM decides, per existing memory: keep, update, merge, or delete. This keeps the store non-redundant and coherent.

Timing: in the open-source library, both phases are synchronous by default (the call blocks until completion). In the hosted platform API, async mode is the default since v1.0.0 — the entire pipeline is queued as a background job and the `add()` call returns immediately with a `PENDING` status. The caller can check completion via webhooks or polling.

**Memory architecture:** Vector embeddings (base Mem0). Facts are extracted as text, embedded, and stored. Optional graph variant (Mem0g) additionally builds entity-relation triplets stored in a knowledge graph, enabling multi-hop relational queries — at roughly 2x token cost and ~2% accuracy improvement.

Three memory scopes, which can be combined:
- *User memory*: persists across all sessions for a specific person. Available in every future conversation with that user.
- *Session memory*: scoped to a single conversation (short-term).
- *Agent memory*: scoped to a specific agent instance. Multiple agents can share or silo what they know about a user.

**Storage:** Vector database (24+ backends supported: Qdrant, Pinecone, pgvector, MongoDB, etc.). Graph memory uses Neo4j, Memgraph, Kuzu, or Neptune. Embedding dimension is locked at setup — switching embedders requires a full re-index.

**Recall and injection:** Developer-controlled. The developer explicitly calls `m.search(query, user_id)` to retrieve relevant memories before generating a response, then manually incorporates results into the prompt. Mem0 does not auto-inject context — the developer owns the retrieval and injection step. This provides observability but means developers must wire the retrieval logic into their agent loop.

**Handling outdated memories:** The consolidation phase during `m.add()` handles contradictions: the LLM can issue an update or delete operation on an existing memory when a superseding fact arrives. Memories have creation timestamps but no validity windows — there is no way to query what was true at a prior point in time.

---

### Letta (formerly MemGPT)

Origins: research project from UC Berkeley. MemGPT paper introduced self-editing memory for LLMs. Rebranded to Letta, raised $10M. ~21K GitHub stars, Apache 2.0.

**Memory creation:** Agent-controlled. The LLM decides what to remember and calls memory tools during its own reasoning loop:
- `core_memory_append(section, content)` — adds to in-context working memory
- `core_memory_replace(section, old, new)` — edits in-context working memory in place
- `archival_memory_insert(content)` — writes to long-term cold storage

Recall memory (conversation history) is populated automatically from the message stream — the agent does not insert into it directly.

**Memory architecture:** OS-inspired three-tier hierarchy. The key distinction from other approaches is that the agent actively routes information across tiers based on its own judgment:

- *Core Memory* (in-context, like RAM): small, always-present text blocks in the system prompt that the agent can read and edit directly. Unique to Letta: this is writable by the agent in real time. No other mainstream system makes in-context state explicitly editable by the model.
- *Recall Memory* (outside context, like disk cache): the full conversation history, stored outside the context window but searchable. The agent queries it; matching turns are injected on demand.
- *Archival Memory* (cold storage, like disk): arbitrary long-term facts. Agent inserts and queries explicitly.

This differs from flat systems (Mem0, Zep) which treat all memory as a single pool retrieved by similarity. And it differs from file-based systems (Anthropic) where the model reads files but doesn't have a persistent editable slot in its own context. Letta's agent has a slice of its own context window it owns and rewrites over time.

**Storage:** Letta manages its own backend — SQLite or Postgres for metadata and conversation history, vector store (pgvector on self-hosted, TurboPuffer on managed) for embeddings. `text-embedding-3-small` for archival memory.

**Recall and injection:**
- Core memory: always in context. No retrieval step — the agent reads it by virtue of it being in the system prompt.
- Recall memory: agent calls `conversation_search(query)`, which does hybrid search (keyword + semantic, ranked via Reciprocal Rank Fusion). Matching turns are returned to the agent.
- Archival memory: agent calls `archival_memory_search(query)`, which does semantic vector search. Results returned as tool output.

Nothing is automatically injected based on query relevance — the agent explicitly pulls what it wants.

**Handling outdated memories:** Agent-controlled. The LLM calls `core_memory_replace(section, old_content, new_content)` to update working memory. Archival entries persist until explicitly deleted. There is no automated consolidation or fact invalidation — correctness of the memory state depends entirely on the agent's judgment.

**Benchmarks:** 74.0% on LoCoMo with GPT-4o mini using flat-file storage. Published a benchmark post arguing a filesystem approach is competitive ("Is a Filesystem All You Need?"). The mem0 vs. Letta benchmark comparison is disputed — Letta could not reproduce mem0's LoCoMo results; mem0 did not respond to requests for methodology clarification. Context: Hindsight later hit 89.61% on LoCoMo (2025), which the Hindsight authors say effectively saturates the benchmark. Letta's flat-file result at 74% — beating Mem0's specialized system — remains the clearest argument that LoCoMo is measuring something simpler than "memory."

---

### OpenAI

Two distinct tracks: consumer product (ChatGPT) and developer API. ChatGPT's memory — which references all past conversations and supports saved and implicit memory modes — is **not exposed to developers via the API**.

On the developer side, the Assistants API is deprecated (shutdown August 26, 2026). The recommended path is the Responses API + Agents SDK.

**Memory creation:** No automatic extraction. Developers manage what goes into memory explicitly. The `RunContextWrapper` holds structured state objects (notes, preferences) that persist across runs. For semantic/vector memory — extracting and storing facts from conversations — OpenAI explicitly outsources to third-party libraries (mem0, Zep, Pinecone). The platform provides no built-in fact extraction.

**Memory architecture:** Conversation history (session state), not extracted facts. The Responses API chains responses via `store: true` + `previous_response_id`. The Agents SDK adds a `Session` object (SQLite or Redis backed) that replays prior conversation turns. There is no built-in concept of a "memory" distinct from conversation history.

**Storage:** SQLite or Redis for session state (developer-chosen). Semantic memory requires external vector databases — no built-in vector store for conversational memory (File Search in the Responses API is for document retrieval, not conversation memory).

**Recall and injection:** Three strategies for managing what conversation history enters context:
- *Context trimming (last-N)*: deterministic, keeps only the most recent N turns. Zero latency, high fidelity for recent turns.
- *Context summarization*: compresses prior messages into a structured summary injected into history. Loses detail, preserves gist.
- *Context compaction* (`OpenAIResponsesCompactionSession`): auto-compacts using the model itself.

Semantic memory recall is a third-party concern — developers integrate mem0, Zep, or similar, call them before generation, and inject results manually.

**Handling outdated memories:** Not handled at the platform level. Session history is a linear replay of past turns — there is no invalidation, consolidation, or contradiction detection. Managing stale information in semantic memory is delegated to whatever third-party library the developer uses.

---

### Anthropic / Claude

Launched a memory tool in September 2025 (beta). Prior to that, no native persistent memory product existed.

**Memory creation:** Agent-initiated file I/O. Claude calls file tools (`write_file`, `update_file`, `delete_file`) to create and maintain memory files in a `/memories` directory. The application executes these operations locally — the files live in developer-controlled storage. Claude decides what to write and when; there is no background extraction process.

A companion feature, context editing, works alongside: as conversation history grows, old tool results are automatically cleared. Claude is warned before clearing and can proactively write important information to memory files to preserve it. This enables unbounded-length agentic sessions.

**Memory architecture:** File system — structured text files on disk. No semantic indexing, no graph, no embeddings. Claude writes prose or structured text and reads it back literally. Files can be organized however the developer wants (the `/memories` convention is a default). No predefined taxonomy.

**Storage:** Developer-controlled. The files can go anywhere — local disk, database, encrypted storage, cloud object store. Eligible for Zero Data Retention. Developer is responsible for path validation (directory traversal risk).

**Recall and injection:** Agent-initiated file reads. Claude calls `read_file` on specific known files, or lists the directory to discover what exists. There is no semantic search — Claude cannot retrieve memories by meaning, only by reading files it knows about. If a relevant memory exists in a file Claude doesn't read, it stays unread. The developer controls which files (if any) Claude has access to at session start.

**Handling outdated memories:** Agent-controlled updates. Claude calls `update_file` or `delete_file` on existing memory files. There is no automated invalidation or consolidation. Correctness depends on Claude's judgment about when to overwrite old information.

The Claude Agent SDK (evolved from Claude Code's internal harness) addresses multi-session memory architecturally with two patterns: an initializer agent that sets up context at session start, and a coding agent that leaves structured artifacts for the next session. Built-in context compaction and prompt caching.

---

## In-Weights / Parametric Memory

All the systems covered above (Mem0, Zep, Letta, Elroy, Anthropic, OpenAI) are *retrieval* systems — they store memories externally and inject them into context at inference time. A distinct approach is encoding memory directly into model weights, so the knowledge is available through the forward pass without any retrieval step. This is worth understanding as a contrast case and potential future direction.

### The taxonomy

A useful four-part taxonomy of LLM memory (from ["Memory in Large Language Models: Mechanisms, Evaluation and Evolution," arXiv:2509.18868, Sep 2025](https://arxiv.org/abs/2509.18868)):

- **Parametric memory**: facts encoded in weights during pre-training or fine-tuning. Accessed purely via the forward pass; no retrieval step.
- **Contextual memory**: what's currently in the context window.
- **External memory**: retrieval systems (vector DBs, files, graphs). What all the systems above implement.
- **Procedural/episodic memory**: cross-session behavioral consistency; the agent remembers *how* to do something or *what happened*, not just facts.

The paper notes that conflation of these types is endemic in the research literature — the same system is often described inconsistently across papers, making results non-comparable.

### How in-weights encoding works (and why it's hard)

**Fine-tuning / PEFT**: The classic approach to encoding user-specific knowledge in weights. LoRA (Low-Rank Adaptation) is the current standard — it trains small adapter matrices (~few MB) while keeping base model weights frozen, making per-user adapters theoretically tractable.

**Model editing (ROME, MEMIT)**: A more surgical alternative — targeted edits to specific fact associations in mid-layer FFN weights without retraining. ROME does rank-one weight edits; MEMIT extends to batched updates across multiple layers.

### Viability for personalization

**RAG vs. PEFT head-to-head**: The most directly relevant study is ["Comparing Retrieval-Augmentation and Parameter-Efficient Fine-Tuning for Privacy-Preserving Personalization" (Salemi & Zamani, UMass Amherst; arXiv:2409.09510)](https://arxiv.org/abs/2409.09510), using the LaMP benchmark across 7 personalized tasks:

- RAG: +14.92% over non-personalized baseline
- PEFT alone: +1.07% — substantially weaker
- RAG + PEFT combined: +15.98% — best overall, but marginal gain over RAG alone

Key finding: PEFT effectiveness correlates with user data volume. For cold-start users (limited history), RAG dominates. PEFT becomes more competitive with large per-user profiles. The practical implication: fine-tuning is hard to justify for personalization when user data is sparse, which is the common case.

**Catastrophic forgetting is a real barrier**: Even LoRA shows significant forgetting when trained sequentially on multiple tasks. Despite keeping base weights frozen, LoRA adapter weights can interfere with each other — researchers describe a drop in performance on earlier tasks as "quite alarming" given the assumption that frozen base weights would prevent it. Production deployments that need to continually update user-specific adapters have no clean solution; mixing 20–30% general data helps but doesn't eliminate the problem.

**Model editing limitations ("The Mirage of Model Editing")**: A 2025 ACL paper ([arXiv:2502.11177](https://arxiv.org/abs/2502.11177)) argues that evaluation of ROME/MEMIT-style editing is far more optimistic than real-world performance. Specific findings:
- Sequential edits induce gradual "knowledge attenuation" — earlier edits degrade as new ones accumulate
- Edited models show *significantly degraded* performance on reasoning benchmarks, even when the targeted fact is correctly updated
- Knowledge in LLMs is highly *entangled* — editing one fact in isolation doesn't respect its connections to related facts
- Generalization (applying an edit correctly to semantically related queries) and portability (using the edited fact in multi-hop reasoning) are both weak across all methods

In short, ROME/MEMIT can patch a specific fact but the patch doesn't propagate correctly through the model's knowledge graph. This is a fundamental limitation, not an implementation detail.

**Reasoning degradation**: This is the sharpest practical concern. A 2025 paper specifically on knowledge editing in the "reasoning era" found that parametric edits harm reasoning-heavy tasks even when factual accuracy is maintained. For a personalization use case — where the goal is often to help a user with complex reasoning — this is a serious trade-off.

### Where in-weights approaches might still make sense

- **Stable domain adaptation**: If a user or organization has a large, relatively stable corpus of private knowledge (a company's internal procedures, a specialist domain), fine-tuning can outperform retrieval. LoRA makes this tractable.
- **Style and preference encoding**: Communication style, verbosity preferences, tone — these may be better encoded in weights than retrieved from a database of explicit facts.
- **Latency-critical inference**: No retrieval step means lower p50 latency. For some product contexts, this matters.

### The hybrid outlook

The research consensus (2025–2026) is converging toward hybrid architectures: parametric weights for stable domain knowledge + retrieval for dynamic, user-specific, and time-sensitive facts. Neither alone is sufficient. But for the current agent memory problem (multi-session context, preference recall, relational facts across conversations), retrieval-based systems are clearly ahead on both cost and accuracy.

**"Memento: Fine-tuning LLM Agents without Fine-tuning LLMs" ([arXiv:2508.16153](https://arxiv.org/abs/2508.16153))**: The title captures the emerging direction — achieving the *effect* of personalized fine-tuning through context/retrieval mechanisms, without the compute and catastrophic forgetting costs of actual weight updates. Worth reading for anyone exploring this boundary.

### Sources

- [Memory in Large Language Models: Mechanisms, Evaluation and Evolution (arXiv:2509.18868)](https://arxiv.org/abs/2509.18868) — Sept 2025 survey; four-part taxonomy
- [Comparing RAG and PEFT for Personalization (arXiv:2409.09510)](https://arxiv.org/abs/2409.09510) — Salemi & Zamani, UMass; RAG +14.92%, PEFT +1.07%, combined +15.98%
- [The Mirage of Model Editing (arXiv:2502.11177)](https://arxiv.org/abs/2502.11177) — ACL 2025; ROME/MEMIT evaluation is overly optimistic
- [Can We Continually Edit Language Models? (ACL 2024 Findings)](https://aclanthology.org/2024.findings-acl.323.pdf) — key limits of sequential editing
- [Memento: Fine-tuning LLM Agents without Fine-tuning LLMs (arXiv:2508.16153)](https://arxiv.org/abs/2508.16153) — hybrid direction
- [On the Way to LLM Personalization (ACL 2025 L2M2)](https://aclanthology.org/2025.l2m2-1.5.pdf) — personalization approaches survey

---

## Platform vs. Third-Party Comparison

| Dimension | Anthropic (Claude) | OpenAI | mem0 | Letta | Elroy |
|---|---|---|---|---|---|
| Memory type | File system (key-value files) | Session state + stateful chaining | Semantic/vector + optional graph | Core/Recall/Archival hierarchy | Vector + markdown files on disk |
| Agent control over memory | High (Claude writes files explicitly) | Medium (SDK manages sessions) | Low (passive extraction) | High (agent self-edits) | Medium (agent creates; background synthesizes) |
| Framework lock-in | Moderate (Claude API) | Moderate (OpenAI API + Agents SDK) | None (framework-agnostic) | High (full runtime) | High (standalone app) |
| Long-term persistence | Developer-managed files | Developer-managed + SQLite/Redis | Managed by mem0 | Managed by Letta runtime | Managed by Elroy (SQLite + files) |
| Semantic retrieval | No (file I/O only) | No (trimming/summarization) | Yes | Yes (archival memory) | Yes (vector + LLM filter) |
| Consolidation approach | None | Summarization | Per-write LLM update/merge/delete | Agent-controlled via core_memory_replace | Batched DBSCAN clustering + LLM synthesis |
| Open source | No | Partial (Agents SDK is open) | Partial | Yes (Apache 2.0) | Yes (Apache 2.0) |
| Production maturity | Beta (memory tool) | GA | GA | GA | Active development |
| Python SDK | Yes | Yes | Yes | Yes | Yes |
| TypeScript SDK | Yes | Yes | Yes | No | No |

---

## What All Implementations Have in Common

Despite the architectural diversity, every major approach converges on the same basic pipeline and the same set of unsolved tensions.

**The write-retrieve-inject loop is universal.** Every system, regardless of storage backend, does some version of: observe something worth remembering → store it → on a future query, retrieve relevant pieces → inject them into context. The differences are entirely in how each step is implemented, not whether it exists.

**All systems treat the context window as the bottleneck.** The whole problem is that models can only attend to what's in context right now. Every approach is a strategy for managing what occupies that finite space. This is true whether you're doing vector retrieval, file I/O, or graph traversal — the endpoint is always "get the right tokens into context."

**All use LLMs for memory operations.** Extraction (what's worth storing), consolidation (how does this new fact relate to existing ones), and retrieval scoring all involve LLM calls. Memory quality is upstream of retrieval — garbage in, garbage out. This creates a dependency on model quality for the memory layer itself, not just the final response.

**All struggle with the same hard problems:**
- *What's worth remembering?* No system has cleanly solved selective retention. Too strict → important context is lost. Too liberal → retrieval quality degrades from noise.
- *Knowledge update and contradiction.* When new information supersedes old, how do you handle it? Every system has a mechanism (Mem0's update/delete, Zep's invalidation, Letta's core_memory_replace) but none handles arbitrary contradictions reliably.
- *Evaluation is broken.* No benchmark is trusted across vendors. Every company cherry-picks the benchmark where they look best. Independent evaluation consistently produces different numbers than vendor-reported ones.

**All require developers to make explicit design choices.** Even the most automatic systems (Mem0, Zep) require decisions about: what to include in the memory context, user/session/agent scoping, what model to use for extraction, and when to retrieve. There's no zero-configuration memory system that just works for any use case.

**All are fundamentally retrieval systems, not learning systems.** Despite marketing language about agents that "learn" and "improve," every current implementation does retrieval-augmented generation, not weight updates. The agent doesn't become smarter — it gets more relevant context. This distinction matters for the post's framing.

---

## Key Axes of Differentiation

The major implementations (Mem0, Zep, Letta, Anthropic memory tool, OpenAI Agents SDK) depart from each other on five main dimensions. Most interesting design choices involve a tradeoff on at least two of them simultaneously.

---

### 1. Who decides what to remember?

The deepest architectural choice: is memory management the agent's responsibility or the infrastructure's?

- **Agent-controlled (Letta):** The LLM itself calls memory tools (`core_memory_append`, `archival_memory_insert`) during its reasoning loop. Memory is a first-class cognitive act. Upside: adaptive, context-aware decisions. Downside: costs inference tokens, and if the model doesn't judge something worth saving, it's gone.
- **System-controlled (Mem0, Zep):** The infrastructure observes conversations and extracts facts automatically, without the agent "deciding." The agent gets relevant context injected on retrieval. Upside: efficient, transparent to the agent. Downside: extraction quality depends on pipeline tuning, and the agent has no awareness of what it "knows."
- **Developer-controlled (Anthropic memory tool):** The developer writes application logic that calls read/write operations; Claude executes file I/O. The agent participates but the developer defines when and what. Upside: maximum observability and control. Downside: more integration code.
- **Agent-creates, system-synthesizes (Elroy):** The agent (LLM) decides what to create and names the memory; a separate background process periodically clusters and synthesizes existing memories. Creation and consolidation are decoupled. Upside: consolidation doesn't block the conversation; synthesis can generate representations that transcend any individual memory. Downside: consolidation is deferred and may lag high-volume creation; synthesis quality depends on LLM judgment in batch context rather than in-conversation context.

---

### 2. What is the knowledge representation?

How memory is stored determines what kinds of queries it can answer well.

- **Vector embeddings (Mem0 base):** Facts extracted as text, embedded, retrieved by semantic similarity. Good for "what does this user prefer?" Bad for "what was true before the update?" or multi-hop relational queries.
- **Entity-relation graph (Mem0g, Zep/Graphiti):** Knowledge stored as nodes and edges. Enables traversal: "all decisions related to the API since the security review." Costs more tokens and compute, but unlocks relational reasoning.
- **Temporal knowledge graph (Zep):** Like graph memory, but every edge carries `valid_from`/`valid_to` metadata. Facts aren't overwritten — they're invalidated. Enables point-in-time queries. The most expressive representation, and the most expensive.
- **Hierarchical in-context tiers (Letta):** Core memory (in context window, directly editable), recall memory (conversation transcript, searchable), archival memory (vector store, agent inserts explicitly). The tiers mirror OS memory hierarchy; the agent manages what lives where.
- **File system (Anthropic):** Structured text files on disk. No semantic retrieval — Claude reads the file back literally. Simple, auditable, and often sufficient.

---

### 3. Temporal awareness

A surprisingly large differentiator, especially for enterprise use cases.

- **Bitemporal (Zep):** Tracks both when something occurred and when it was ingested. Old facts are invalidated, not deleted. Can answer "what was the account status before the change?" No other mainstream system does this natively.
- **Creation-timestamped (Mem0):** Memories have timestamps, but there's no validity window. If a preference changes, the old entry must be deleted/updated manually; there's no concept of supersession.
- **No temporal model (Letta archival, Anthropic files, Elroy):** Retrieval is purely semantic or literal. Time must be encoded in the content itself if it matters. Elroy archives superseded memories (marks them inactive) but has no validity windows — no point-in-time querying.

Most use cases don't need temporal reasoning — but for enterprise workflows (customer history, auditable decisions, long-running projects), the absence of it is a real gap.

---

### 4. Integration model (library vs. runtime)

How much of the existing stack the memory system displaces.

- **Drop-in library (Mem0, Zep):** Import an SDK, add `m.add()` / `m.search()` calls around existing agent code. Works with any framework (LangGraph, CrewAI, AutoGen, raw API calls). Low lock-in.
- **Full runtime (Letta):** Not a library — a server you deploy. Your application connects to Letta via REST. Agents live in the Letta runtime. LangGraph and CrewAI don't integrate; Letta replaces them. High lock-in, but enables features (shared memory blocks, sleep-time agents) that a library can't provide.
- **Platform primitive (Anthropic memory tool, OpenAI Responses API):** Memory capabilities built into the model/API layer. Zero added infrastructure, but you're within the platform's constraints. The Anthropic memory tool is still beta; OpenAI's Responses API handles session state but outsources semantic memory.

---

### 5. Retrieval strategy

How context gets from memory back into the model.

- **Semantic similarity only:** Vector search over extracted facts. Fast, good for preference lookups, poor for relational or temporal queries.
- **Hybrid (Zep Context Block):** Combines semantic search + full-text (BM25) + breadth-first graph traversal, then reranks. More accurate but more compute. Pre-formatted as a single context string (P95 < 200ms).
- **Full-context injection:** The entire conversation history is stuffed into the prompt. Not memory per se — this is what memory systems are designed to replace. Still competitive on benchmarks (Letta's "Is a Filesystem All You Need?" finding), especially as context windows approach 1M tokens.
- **Agent-driven search (Letta archival):** The agent issues explicit search queries to archival memory, decides what to retrieve, and pulls it into context. The most flexible but also the most expensive — retrieval is an inference step.
- **Heuristic + vector + LLM filter (Elroy):** Three-stage pipeline: fast heuristics skip retrieval for obvious non-content messages (greetings, acknowledgments) without any LLM call; vector similarity search over all active memories and reminders; LLM relevance filter over candidates before injection. The heuristic stage is a meaningful optimization — it avoids retrieval overhead on a large fraction of conversation turns.

---

### The underlying tension

Most of these axes trade off against each other in the same direction: **richer representation and more autonomous management → higher token cost, more infrastructure, and more lock-in.** Flat-file storage is cheap, transparent, and portable. A temporal knowledge graph with agent-controlled retrieval is expressive and adaptive but expensive and complex.

The benchmark evidence (Letta's flat-file baseline; full-context beating Mem0 on LOCOMO) suggests the fancier end of this spectrum may not be necessary for most current use cases. The interesting question for the post is: under what conditions does the complexity actually pay off?

---

## Key Themes and Tensions (Updated)

**The multi-session problem is the central challenge.** Every major player is grappling with the same core: context windows are finite, tasks span sessions, naive approaches mean starting fresh each time. Solutions: file-writing (Anthropic), stateful chaining (OpenAI), passive extraction (mem0), LLM-driven self-editing (Letta).

**"Context engineering" as the new framing.** Both Anthropic (September 2025 blog) and OpenAI (Cookbook) now use this term — it's not about prompt wording, it's about curating what enters the model's attention at each step.

**Semantic memory is still a third-party concern.** Neither Anthropic nor OpenAI provides semantic/vector memory out of the box in their developer APIs. Both explicitly point developers toward external solutions.

**The Letta vs. mem0 debate and benchmark controversy.** Reflects a deeper question: should LLMs actively manage their own memory (Letta), or should memory be managed externally and passively extracted (mem0)? Benchmark comparisons are contested. Letta claims 74.0% vs. mem0's claimed 68.5% on LoCoMo, methodology dispute unresolved. Zep (Dec 2025) published a detailed rebuttal showing their corrected LoCoMo score is 75.14% — 10% better than Mem0 Graph — after fixing Mem0's incorrect role-assignment setup. Hindsight hit 91.4% on LongMemEval and 89.61% on LoCoMo in late 2025, effectively saturating both benchmarks. LoCoMo and LongMemEval are no longer considered adequate differentiation tools; LifeBench (March 2026) is the new challenge frontier. Mem0 has not publicly responded to the methodology criticisms as of March 2026.

**Consumer memory vs. developer memory.** OpenAI has the most sophisticated consumer memory product. It is not exposed to developers. The developer API is stateless-by-default with opt-in statefulness.

**File system as a strong baseline.** Letta's own benchmark post ("Is a Filesystem All You Need?") argues a simple filesystem approach is competitive with more sophisticated architectures — which is relevant to Anthropic's design choice.

**Agent-managed vs. system-managed memory.** The philosophical split between Letta (agent manages its own memory) and everything else (system manages memory on behalf of the agent) has implications for auditability, control, and failure modes.

---

## Counterarguments / Tensions

- **Vector vs. graph:** Graph memory adds relational reasoning but at 2x token cost with mixed returns. Most production use cases may not need graph complexity.
- **Explicit vs. automatic memory management:** Mem0's explicit API approach gives observability but creates developer burden. More automatic systems (MemGPT/Letta) may be more ergonomic for agent-native workflows.
- **RAG vs. memory:** Mem0 positions itself as superior to chunk-based RAG for conversational memory. The distinction matters: RAG is document retrieval; memory is fact/preference extraction from dialogue. They serve different purposes and may be complementary.
- **Evaluation benchmark concerns:** LOCOMO is Mem0's chosen benchmark. LLM-as-a-judge metrics and prior lexical metrics (F1, BLEU) both have known weaknesses for factual accuracy evaluation.

---

## Elroy vs. Claude Code: A Concrete Implementation Comparison

*Added 2026-04-01. Both systems were reviewed from source code and the claude-code memory-brief.md.*

These are two systems the author has direct access to — a useful grounding exercise for the post's framework.

### Store

Both use flat markdown files (validating the post's preferred approach), but they diverge in what sits alongside the files:

- **Elroy:** Files + PostgreSQL + ChromaDB (vector embeddings via `text-embedding-3-small`). Each memory is embedded and stored in a per-user ChromaDB collection. Memories are organized by user ID, not by project.
- **Claude Code:** Pure markdown files only — no vector store, no database. Memories live in `~/.claude/projects/<sanitized-git-root>/memory/`, with worktrees sharing memory via canonical git root resolution.

The Claude Code design is notable: it achieves semantic retrieval without embeddings by using an LLM to read human-readable description fields and rank relevance. This trades infrastructure complexity for an additional LLM call per turn.

Both have a structural index:
- Elroy: no explicit index; all memories discovered at search time via vector query
- Claude Code: `MEMORY.md` — an always-loaded pointer index, truncated at 200 lines. This is a two-level design: the index is always in context; the full files are fetched on demand.

### Retrieve

| | Elroy | Claude Code |
|---|---|---|
| Trigger | Two-stage classifier: heuristics first (skip greetings, short messages) → LLM decision | Always — async prefetch per turn |
| Algorithm | L2 vector distance (ChromaDB, threshold 1.4) | Sonnet reads 30-line frontmatter of all files; returns up to 5 relevant paths |
| Post-retrieval | Optional "reflective recall": LLM generates first-person introspection, filters irrelevant | Deduplication across session |
| N results | Top 2 per type (Memory, AgendaItem, DueItem) | Up to 5 files; 4KB/file, 60KB session cap |
| Staleness | `trigger_datetime` on agenda items | Mtime-based: memories >1 day old get a staleness caveat |

**The two retrieval paradigms:**
- Elroy uses **semantic vector search** — meaning is encoded numerically; retrieval finds nearby concept space.
- Claude Code uses **LLM description-based ranking** — the agent reads human-readable descriptions and reasons about contextual fit.

Both have real tradeoffs. Vector search is fast and doesn't need an extra LLM call; it can miss intent-level relevance and requires embedding infrastructure. LLM ranking is slower (adds a Sonnet call per turn) but works without embeddings and can reason flexibly.

**Latency management strategies diverge:**
- Elroy's classifier skips recall for trivial inputs (greetings, short messages < 10 chars) — reducing load on the retrieval pipeline entirely.
- Claude Code always prefetches, but does it asynchronously, hiding the latency from the user.

**Elroy's "reflective recall"** is a distinctive feature not discussed in the post: a secondary LLM call transforms raw memories into a first-person internal thought ("I remember that Tom mentioned..."). This is more immersive but adds latency. The model determines relevance during this step; memories it deems not relevant are filtered out.

### Inject

Both avoid updating the system message (which would break prompt caching), and both avoid the user/assistant alternation problem:

- **Elroy:** Synthetic tool call (TOOL role message) — the memory appears as though the agent called `get_fast_recall` or `get_reflective_recall`. The agent didn't actually make the call.
- **Claude Code:** `<system-reminder>` attachment messages — presented as system context, not as a tool result.

Elroy's approach aligns with the post's "where I land" position (synthetic tool calls). Claude Code's `<system-reminder>` method is a fourth injection variant not currently discussed in the post.

Elroy also surfaces recalled memories in a dismissable UI panel — user-visible transparency that Claude Code lacks for this purpose.

#### How `<system-reminder>` injection actually works (Claude Code deep dive)

This is worth understanding in detail because it's a genuinely distinct approach.

**It's a user-role message, not a system message.** The `<system-reminder>` tag is XML wrapped around content that gets sent as a standard `role: 'user'` message — not in the system prompt. Each recalled memory file becomes a separate user message with `isMeta: true`. The tag is explicitly explained in the system prompt:

> "Tool results and user messages may include `<system-reminder>` tags. They are automatically added by the system, and bear no direct relation to the specific tool results or user messages in which they appear."

That last phrase — "bear no direct relation" — is the key instruction: the model should apply the memory contextually, not treat it as tied to whatever user message it's co-located with.

**Injection timing: post-tool-execution bubbling.** Attachment messages are collected after each tool loop iteration, then "bubble up" by reordering toward the nearest user/tool boundary before the next API call. The memories land in the context between tool activity and the next assistant turn.

**Why this preserves prompt cache.** The system prompt is cached as a stable prefix. If memories were injected into the system prompt, any change would bust that cache. By injecting into user-role messages instead, the system prompt prefix stays byte-for-byte identical. An additional trick: memory headers are pre-computed at attachment-creation time (not at render time), so the timestamp shown in the header doesn't change between turns, preventing stale-age recomputation from busting anything downstream.

**Budget controls.** There's an explicit per-turn byte budget: up to 5 files × 4KB = 20KB per turn, with a 60KB cap across the session (reset on compact). Memories already surfaced in the current session are deduplicated.

**Comparison to the post's 3 options:**

| Method | Role | Cache impact | Model perception |
|--------|------|-------------|-----------------|
| Update system message | system | Busts on every change | Authoritative background |
| Tool call (real) | tool | No bust | Agent-initiated retrieval |
| User/assistant message | user or assistant | Depends on position | Can confuse role attribution |
| `<system-reminder>` (Claude Code) | user (isMeta) | No bust; header frozen | "System info, not tied to this message" |

The tradeoff relative to Elroy's synthetic tool call: `<system-reminder>` doesn't require maintaining the fiction that an agent-initiated tool call happened. The model is explicitly told this is system-injected context. Synthetic tool calls preserve the tool-use idiom, which may help with models that reason more naturally in tool-call frames. The `<system-reminder>` approach is arguably more honest about what's happening.

### Emit (Save)

| | Elroy | Claude Code |
|---|---|---|
| Trigger | Automatic: every 10 user+assistant messages | Explicit ("remember X") OR turn-end extraction subagent |
| Mechanism | LLM summarizes recent context → file + DB + embeddings | Forked subagent with restricted permissions (write-only to memory dir) |
| Concurrency | Background task scheduler | Mutual exclusion: if main agent saved this turn, extraction is skipped |
| Post-emit | DBSCAN clustering → LLM consolidates similar memory clusters | None |

**Elroy's consolidation** is a concrete implementation of what the post mentions abstractly: after every 5 new memories, DBSCAN clusters memories by cosine similarity (threshold 0.85), and an LLM rewrites clusters into a single synthesized memory. Originals are archived. The goal is a dispersed, non-redundant memory collection.

**Claude Code's extraction isolation** is a novel safety mechanism not mentioned in the post: the extraction subagent runs forked with denied `rm` and writes restricted to the memory directory. The mutual-exclusion rule prevents the main agent and extractor from both writing in the same turn.

### Implications for the Post

1. **Embeddings are optional.** Claude Code shows LLM-as-ranker is a viable alternative to vector search. Worth a mention in the Retrieve section — it reframes the design choice as "infrastructure vs. LLM call cost."

2. **"Always prefetch vs. classify first" is an explicit latency tradeoff** the post identifies but doesn't name. Elroy's classifier and Claude Code's async prefetch are the two concrete strategies.

3. **`<system-reminder>` as inject variant.** The post lists 3 injection methods; Claude Code's attachment method is a fourth.

4. **Consolidation.** The post mentions async consolidation in the Store section. Elroy's DBSCAN implementation is the concrete example of this working in production.

5. **Extraction subagent isolation.** Claude Code's forked subagent model is a novel emit approach — not quite tool call, not quite summarization — worth acknowledging if the post expands the Emit section.
