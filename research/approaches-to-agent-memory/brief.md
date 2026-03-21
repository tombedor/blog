# Research Brief: Approaches to Agent Memory

**Post:** `blog/approaches-to-agent-memory.md`
**Last updated:** 2026-03-21 (platform sections updated with web research)

---

## Summary

This brief covers prior art and key libraries for agent memory management. The main systems researched are Mem0 and Letta (formerly MemGPT), along with approaches from OpenAI and Anthropic/Claude.

---

## Key Claims to Fact-Check / Explore

- Agent memory is the primary unsolved problem for production AI agents
- Vector-only memory is insufficient for complex relational reasoning
- Graph memory adds accuracy at meaningful token cost
- Mem0 claims 26% accuracy improvement over OpenAI Memory and 91% latency reduction vs. full-context approaches (LOCOMO benchmark)

---

## Sources

- [mem0.md](./mem0.md) — Deep research on Mem0: architecture, integration, limitations, version history

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

### Mem0 (researched)

See [mem0.md](./mem0.md) for full notes. Key points:
- Memory layer that extracts facts from conversations, stores them as vectors (and optionally as a knowledge graph), and retrieves relevant context on future queries
- Three scopes: user memory, session memory, agent memory
- Two-phase pipeline: extraction (LLM extracts candidate facts) then consolidation (LLM decides keep/update/merge/delete against existing memories)
- Graph variant (Mem0g) adds ~2% accuracy, doubles token cost, underperforms on simple single-hop queries
- Strong ecosystem integrations: LangGraph, CrewAI, AutoGen, Azure AI, AWS Agent SDK
- v1.0.0 released Oct 2025; currently at v1.0.6 (Mar 2026)
- Main limitations: developer must manage memory lifecycle explicitly, embedding dimension lock-in, graph overhead rarely justified

### Letta (formerly MemGPT)

Origins: research project from UC Berkeley; MemGPT paper introduced self-editing memory for LLMs. Rebranded to Letta, raised $10M to commercialize. ~21K GitHub stars, Apache 2.0.

**Architecture: OS-inspired memory hierarchy**
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

| Dimension | Anthropic (Claude) | OpenAI | mem0 | Letta |
|---|---|---|---|---|
| Memory type | File system (key-value files) | Session state + stateful chaining | Semantic/vector + optional graph | Core/Recall/Archival hierarchy |
| Agent control over memory | High (Claude writes files explicitly) | Medium (SDK manages sessions) | Low (passive extraction) | High (agent self-edits) |
| Framework lock-in | Moderate (Claude API) | Moderate (OpenAI API + Agents SDK) | None (framework-agnostic) | High (full runtime) |
| Long-term persistence | Developer-managed files | Developer-managed + SQLite/Redis | Managed by mem0 | Managed by Letta runtime |
| Semantic retrieval | No (file I/O only) | No (trimming/summarization) | Yes | Yes (archival memory) |
| Open source | No | Partial (Agents SDK is open) | Partial | Yes (Apache 2.0) |
| Production maturity | Beta (memory tool) | GA | GA | GA |
| Python SDK | Yes | Yes | Yes | Yes |
| TypeScript SDK | Yes | Yes | Yes | No |

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
