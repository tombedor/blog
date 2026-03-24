# Research Brief: Approaches to Agent Memory

**Post:** `blog/approaches-to-agent-memory.md`
**Last updated:** 2026-03-22 (added Elroy)

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
- [evaluation-techniques.md](./evaluation-techniques.md) — Benchmarks and metrics for evaluating agent memory (LoCoMo, LongMemEval, MemBench, AMA-Bench; LLM-as-judge vs. lexical; benchmark controversy)

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

<!-- the goal of my post is not to help people choose which option is best for their use case, it's more to highlight the different ways in which one can build memory for ai -->

<!-- would like more detail on how injection works for the different systems: does recall happen when the agent decides there is something worth scanning memory for? or automatically? -->

<!-- organize sections with subheadings:
- how memories are created (passively in background, or via tool calls)
- how memories are recalled (via tool calls, or via matching)
    - what kind of recall post processing happens before injection?
- memory architecture: does it create memories against a predefined taxonomy? does it leverage a graph?
- how are memories stored? is a graph db used, or is it just a filesystem?
- how are old / outdated memories updated?
-->


<!-- remove: SDK's, best for sections, limitations -->
### Zep (researched)

See [zep.md](./zep.md) for full notes. Key points:
- Core architecture: Graphiti, a temporal knowledge graph with three subgraphs (episode, semantic entity, community) <!-- define what these are -->
- Key innovation: bitemporal data model — tracks both when facts occurred (Event Time) and when they were ingested (Ingestion Time). Enables querying historical state.
- Fact invalidation: old facts marked invalid (not deleted) when superseded — supports "what was true at time X" queries
- Retrieval: combines semantic search + full-text search + BFS graph traversal, pre-formatted as a context block (P95 < 200ms)
- Benchmarks: 94.8% on DMR (vs. MemGPT 93.4%); 71.2% on LongMemEval; involved in LoCoMo benchmark dispute with Mem0
- Community Edition deprecated April 2025; now cloud-first (Zep Cloud) + Graphiti open source
- SDKs: Python, TypeScript, Go. Integrations: LangGraph, Autogen, Chainlit, MCP
- Best for: temporal reasoning, multi-hop queries, enterprise use cases with complex entity relationships
- Limitations: high memory footprint, delayed availability (background graph build), operational complexity for self-hosting

### Elroy (researched)

See [elroy.md](./elroy.md) for full notes. Key points:

- **What it is:** A CLI-based, memory-augmented AI assistant. Not a library — a standalone application. Supports OpenAI, Anthropic, and Google Gemini models.
- **Memory model:** Memory content stored in markdown files on disk; database stores metadata (`name`, `file_path`, `is_active`, `source_metadata`). Embeddings stored separately in a vector DB. No separate Goal model — goals are memories with goal-oriented names.
- **Consolidation trigger:** Creation-based. A `MemoryOperationTracker` counter increments on each memory creation; when it reaches `memories_between_consolidation` (default: 5), consolidation runs in a background thread and the counter resets.
- **Consolidation algorithm:** DBSCAN clustering (cosine metric, eps=0.85, min_samples=2) on all active memory embeddings → reduce large clusters to densest members → LLM synthesis call per cluster. The LLM generates one or more new synthesized `Memory` objects; source memories are marked `is_active=False` (not deleted). Up to 3 clusters processed per consolidation run.
- **LLM synthesis vs. deduplication:** The key claim is that consolidation produces genuinely new synthesized representations, not just merged summaries. Whether this consistently holds in practice is empirically unclear.
- **Recall pipeline:** Three stages: (1) fast heuristics skip retrieval for obvious non-content messages; (2) vector similarity search over active memories + reminders; (3) LLM relevance filter over candidates. Relevant items injected as synthetic tool call results.
- **Non-destructive:** Consolidated source memories archived, not deleted; source relationships recorded.
- **Known code issues:** N+1 query on embedding load during clustering (noted TODO). 3-cluster-per-run cap may leave high-volume memory creation under-consolidated.
- **Integration model:** Standalone CLI / Python SDK. Not a drop-in library; not a server runtime. Somewhere between Mem0 (library) and Letta (server).

---

### Mem0 (researched)

See [mem0.md](./mem0.md) for full notes. Key points:
- Memory layer that extracts facts from conversations, stores them as vectors (and optionally as a knowledge graph), and retrieves relevant context on future queries
- Three scopes: user memory, session memory, agent memory <!-- define what these are -->
- Two-phase pipeline: extraction (LLM extracts candidate facts) then consolidation (LLM decides keep/update/merge/delete against existing memories) <!-- does this happen within response loop, or async? -->
- Graph variant (Mem0g) adds ~2% accuracy, doubles token cost, underperforms on simple single-hop queries
- Strong ecosystem integrations: LangGraph, CrewAI, AutoGen, Azure AI, AWS Agent SDK
- v1.0.0 released Oct 2025; currently at v1.0.6 (Mar 2026)
- Main limitations: developer must manage memory lifecycle explicitly, embedding dimension lock-in, graph overhead rarely justified

### Letta (formerly MemGPT)

Origins: research project from UC Berkeley; MemGPT paper introduced self-editing memory for LLMs. Rebranded to Letta, raised $10M to commercialize. ~21K GitHub stars, Apache 2.0.

**Architecture: OS-inspired memory hierarchy**
<!-- how does these 3 differ from other styles -->
- **Core Memory** (in-context, like RAM): agent reads and writes directly within context window.
- **Recall Memory** (searchable conversation history outside context, like disk cache).
- **Archival Memory** (long-term cold storage, agent queries via tool calls).

**Key design decision: agent self-editing memory.** The LLM itself decides what is worth remembering by calling memory functions during its reasoning loop. This is the opposite of Mem0's passive extraction — the model is an active participant in managing its own state.

**Letta V1 architecture (October 2025):** Rearchitected agent loop to align with modern agentic patterns (convergence toward "in-distribution" behavior for heavily post-trained models). Deprecated the old heartbeat/`send_message` pattern. Better support for GPT-5 and Claude 4.5 Sonnet.

**Recent milestones:**
- Letta Code (December 2025): #1 model-agnostic open-source agent on Terminal-Bench coding benchmark. Supports skills and subagents with built-in memory.
- Conversations API (January 2026): agents can maintain shared memory across parallel user experiences.
- Programmatic Tool Calling (December 2025): agents can generate their own workflows.
- Agent File Format (.af): open format for serializing stateful agents with persistent memory.
- Letta Evals (October 2025): open-source evaluation framework for stateful agents.

**Benchmarks:** 74.0% on LoCoMo with GPT-4o mini. Published benchmark post arguing a filesystem approach is competitive ("Is a Filesystem All You Need?"). The mem0 vs. Letta benchmark comparison is disputed — Letta's team could not reproduce mem0's LoCoMo results and mem0 did not respond to requests for methodology clarification.

**Limitations:**
- Python-only SDK (no TypeScript or Go).
- Adopting Letta means adopting the full Letta agent runtime — not a drop-in layer.
- Higher complexity; overkill if you just need basic memory augmentation.

**Best for:** Teams starting fresh who want a full-stack, stateful agent runtime with memory as a first-class concern.

---

### OpenAI Memory

**Two distinct tracks: consumer product vs. developer API.**

#### ChatGPT (Consumer)

Major updates in 2025:
- **April 10, 2025:** Memory expanded to reference all past conversations, not just explicit saved memories.
- **June 3, 2025:** Memory rolled out to free users (lightweight version; Plus/Pro get longer-term understanding).
- Two modes: **saved memories** (explicit, user-managed) and **chat history reference** (implicit, ChatGPT-driven).
- Automatic memory management for Plus/Pro: prioritizes relevant details by recency and frequency.
- **Project-only memory:** memory can be scoped to a project, not leaking outside.
- User controls: delete individual memories, clear all, disable entirely.
- ChatGPT trained not to proactively remember sensitive health info.

This is consumer-facing and is **not exposed to developers via API**.

#### Assistants API (Deprecated)

Officially deprecated, shutdown date **August 26, 2026**. Had provided stateful thread management, file handling, and built-in tools. Azure OpenAI is not impacted (runs its own endpoints).

#### Responses API (Launched 2025)

Replaces Chat Completions as the recommended API for new projects:
- Stateful chaining via `store: true` + `previous_response_id`.
- Agentic by default: model can call multiple tools in a single request.
- Built-in tools: Web Search, File Search (vector over internal docs), Computer Use, Image Generation.
- 40–80% better cache utilization vs. Chat Completions.
- State still largely developer-managed: collect outputs and resubmit, or chain via `previous_response_id`.

#### OpenAI Agents SDK (Launched March 2025)

Production-ready successor to experimental Swarm. Four-primitive minimalist design.

Memory capabilities:
- **Session** object (e.g., `SQLiteSession("user_123")`): automatic recall of past conversation turns.
- **Redis** session backing for production.
- **`RunContextWrapper`**: structured state objects persisting across runs — enables memory, preferences, notes to evolve.
- **Context compaction** via `OpenAIResponsesCompactionSession`: auto-compacts conversation history.
- **Context trimming (last-N):** deterministic, zero latency, high fidelity for recent turns.
- **Context summarization:** prior messages compressed into structured summaries injected into history.

For durable semantic/vector memory, the SDK **explicitly outsources to third-party libraries** (mem0, Zep, Pinecone). OpenAI's Cookbook documents the integration patterns.

**OpenAI Cookbook patterns documented:**
1. State Management with Long-Term Memory Notes (`RunContextWrapper` + hooks).
2. Short-Term Memory Management with Sessions (trimming, compaction, summarization).

**Key characterization:** OpenAI's approach is explicit state management with platform primitives. More powerful than the Assistants API, but more developer-responsibility-heavy. Semantic memory remains a third-party concern.

---

### Anthropic / Claude

**Note:** The prior claim "No native persistent memory product as of early 2026" is incorrect as of the research update. Anthropic launched a memory tool in September 2025.

#### Memory Tool (Launched September 29, 2025, Beta)

Beta header: `context-management-2025-06-27`.

- Claude makes tool calls to create, read, update, and delete files in a `/memories` directory; the application executes them locally (client-side).
- Developers control storage backend (files, database, encrypted storage, cloud).
- SDK helpers: `BetaAbstractMemoryTool` (Python), `betaMemoryTool` (TypeScript).
- Eligible for Zero Data Retention (ZDR).
- Security: developers must validate paths to prevent directory traversal.

**Key design:** This is **file-system-as-memory**. Not semantic/vector retrieval — Claude writes structured text files and reads them back. Simple, transparent, developer-controlled.

#### Context Editing (Companion Feature)

Automatically clears old tool results as conversation grows. Claude receives a warning before clearing and can proactively write important information to memory files. Enables unbounded-length agentic sessions.

Combined with the memory tool, this is Anthropic's answer to the context overflow problem in long-running agents.

#### Claude Agent SDK

Evolved from Claude Code's internal harness, opened to developers.

Addresses multi-session memory architecturally with two patterns:
- **Initializer agent:** sets up environment, logs what has been done, which files exist.
- **Coding agent:** makes incremental progress each session and leaves structured artifacts for the next.

Built-in context compaction. Automatic prompt caching and session management.

#### Anthropic Engineering Blog Posts

- **"Effective Harnesses for Long-Running Agents"** (November 26, 2025): Engineering post on multi-session agents, the initializer/coding agent pattern, and context window bridging. https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- **"Context Engineering"** (September 29, 2025): Framing shift — the goal is curating "the smallest set of high-signal tokens that maximize the likelihood of your desired outcome."
- **"Advanced Tool Use"**: Covers the memory tool, tool search tool, programmatic tool calling, and tool use examples.

#### Agent Skills (December 2025, now an open standard)

Not memory per se, but relevant to context budget management. Skills are folders of instructions/scripts loaded dynamically; each takes ~few dozen tokens summarized in context, full details load on demand. Reduces context overhead. Partner skills from Atlassian, Figma, Canva, Stripe, Notion, Zapier.

**Key characterization:** Anthropic's memory approach is deliberately simple and developer-controlled — file I/O, not vector search. The philosophy aligns with their "context engineering" framing: curate the right information into context, not build a complex retrieval layer. The trade-off is that semantic/associative retrieval is not supported.

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

**The Letta vs. mem0 debate.** Reflects a deeper question: should LLMs actively manage their own memory (Letta), or should memory be managed externally and passively extracted (mem0)? Benchmark comparisons are contested. Letta claims 74.0% vs. mem0's claimed 68.5% on LoCoMo, methodology dispute unresolved. Independent LongMemEval shows mem0 at 49.0%; Hindsight at 91.4% (but less known).

**Consumer memory vs. developer memory.** OpenAI has the most sophisticated consumer memory product. It is not exposed to developers. The developer API is stateless-by-default with opt-in statefulness.

**File system as a strong baseline.** Letta's own benchmark post ("Is a Filesystem All You Need?") argues a simple filesystem approach is competitive with more sophisticated architectures — which is relevant to Anthropic's design choice.

**Agent-managed vs. system-managed memory.** The philosophical split between Letta (agent manages its own memory) and everything else (system manages memory on behalf of the agent) has implications for auditability, control, and failure modes.

---

## Counterarguments / Tensions

- **Vector vs. graph:** Graph memory adds relational reasoning but at 2x token cost with mixed returns. Most production use cases may not need graph complexity.
- **Explicit vs. automatic memory management:** Mem0's explicit API approach gives observability but creates developer burden. More automatic systems (MemGPT/Letta) may be more ergonomic for agent-native workflows.
- **RAG vs. memory:** Mem0 positions itself as superior to chunk-based RAG for conversational memory. The distinction matters: RAG is document retrieval; memory is fact/preference extraction from dialogue. They serve different purposes and may be complementary.
- **Evaluation benchmark concerns:** LOCOMO is Mem0's chosen benchmark. LLM-as-a-judge metrics and prior lexical metrics (F1, BLEU) both have known weaknesses for factual accuracy evaluation.
