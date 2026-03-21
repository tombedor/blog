# Letta (formerly MemGPT) — Research Notes

Sources consulted: [Letta Docs](https://docs.letta.com/), [GitHub](https://github.com/letta-ai/letta), [Letta Blog](https://www.letta.com/blog/), [Vectorize comparison](https://vectorize.io/articles/mem0-vs-letta), [Letta V1 architecture post](https://www.letta.com/blog/letta-v1-agent), [Letta Code blog](https://www.letta.com/blog/letta-code), [Memory blocks blog](https://www.letta.com/blog/memory-blocks), [Medium deep dive Feb 2026](https://medium.com/@piyush.jhamb4u/stateful-ai-agents-a-deep-dive-into-letta-memgpt-memory-models-a2ffc01a7ea1)

---

## 1. Origins & Naming

- Started as the **MemGPT** research project at UC Berkeley. The paper introduced self-editing memory for LLMs — agents that update their own memory during a conversation.
- **MemGPT** now refers specifically to the original agent design pattern from the paper. **Letta** is the production framework built on top of that research.
- Raised $10M, emerged from stealth to productionize the MemGPT ideas.

---

## 2. Core Architecture: The LLM-as-OS Paradigm

The founding metaphor is that an LLM agent can operate like an OS managing virtual memory:

- Context window = RAM (fast, limited, visible to the model right now)
- External stores = disk (slower, unlimited, requires a read operation to bring into context)

The agent actively manages what lives in context vs. what is paged out, just as an OS manages memory pages.

---

## 3. Memory Tiers

### Tier 1: Core Memory (In-Context)

- A reserved section of the context window that the agent can read and write directly.
- Organized into **memory blocks** — labeled string chunks pinned to the system prompt.
- Default blocks: `human` (facts about the user) and `persona` (agent personality/instructions).
- The agent edits these via tools: `core_memory_append`, `core_memory_replace`.
- Memory blocks can be **attached/detached** at runtime and **shared across multiple agents** (see multi-agent section below).

### Tier 2: Recall Memory (Conversational History)

- The complete transcript of all past interactions, stored outside the context window.
- Automatically persisted to disk by Letta (unlike most frameworks where developers handle this manually).
- Agent searches it via `conversation_search` (text and date search).
- Even after context compaction/eviction, old messages remain accessible via the API for developers.

### Tier 3: Archival Memory (Long-Term External Storage)

- Vector database table for explicitly formulated long-term knowledge.
- Can also be loaded with external data sources (documents, PDFs, etc.) — effectively RAG that the agent controls.
- Agent uses `archival_memory_insert` and `archival_memory_search` to write and retrieve.
- Unlike RAG, the agent decides what to insert — it is active, not passive retrieval.

---

## 4. Key Design Decisions

### Self-Editing Memory (Active vs. Passive)
The biggest differentiator from standard RAG: the agent decides what to remember and how. It calls memory tools during its reasoning loop. This is more adaptive but also more expensive (every memory operation costs inference tokens) and more error-prone (if the model doesn't judge something worth saving, it's lost).

### Context Engineering Philosophy
Designing a Letta agent's memory is essentially designing what tokens enter the context window and when. The framework provides the primitives; the developer designs the memory schema (what blocks exist, what goes in archival vs. core).

### Memory Blocks as Coordination Primitives
Blocks can be shared across agents. One agent updates a block; all others see the change immediately. This enables real-time coordination without explicit message-passing.

Concurrent write semantics matter:
- `memory_insert` — additive, safe for concurrent writes, appends content
- `memory_replace` — validates old content exists before replacing; fails on conflict
- `memory_rethink` — full rewrite ("most recent write wins"), destructive in multi-agent contexts

Blocks can be set **read-only** (agent cannot modify, but can read). Useful for reference data or policies.

### Agent Loop (MemGPT vs. Letta V1)
Original MemGPT architecture: every action is a tool call. Special kwargs like `thinking` (chain-of-thought) and `request_heartbeat` (continue executing) were injected into tool schemas. This required models capable of reliable tool calling.

**Letta V1 architecture** (`letta_v1_agent`): Deprecates heartbeats and the `send_message` tool. Native reasoning and direct assistant message generation are used instead. Designed for frontier reasoning models (GPT-5, Claude 4.5 Sonnet). Tool calling is no longer required to connect an LLM. Both architectures are supported; Letta recommends V1 for modern models.

---

## 5. Developer Integration

### Deployment Model
Letta runs as a **server** (self-hosted via Docker or Letta Cloud). Agents are persistent services behind a REST API. Your application connects to the Letta server — you don't run agents inline in your code.

This is the most important architectural fact: Letta is not a library you import; it is a runtime you deploy. Agents live in it.

### SDKs
- Python SDK: `letta-client` (primary)
- TypeScript SDK: in preview
- Both generated from an OpenAPI spec via Fern; feature parity with REST API.
- Supports sync, async, and streaming.

Basic usage pattern:
```python
from letta_client import Letta
client = Letta(api_key="...")

agent = client.agents.create(
    model="openai/gpt-4o",
    memory_blocks=[
        {"label": "human", "value": "Name: Alice"},
        {"label": "persona", "value": "You are a helpful assistant."},
    ],
    tools=["web_search"]
)

response = client.agents.messages.create(
    agent_id=agent.id,
    input="What do you know about me?"
)
```

### Agent Development Environment (ADE)
GUI for creating, editing, and debugging agents. Useful for observing an agent's memory state, inspecting tool calls, and testing behavior before integrating into production.

### Multi-Agent Communication
Built-in tool `send_message_to_agent_async`: one agent sends a message to another asynchronously. The receiving agent can reply. Shared memory blocks are a lower-latency coordination alternative (no message round-trip).

### Sleep-Time Agents
Agents can run in the background during idle periods, processing past conversation history and updating shared memory blocks with "learned context." The output is written to a memory block accessible to other agents.

---

## 6. Limitations and Tradeoffs

| Issue | Detail |
|---|---|
| Full runtime, not a drop-in | You replace your agent stack with Letta, not add memory to an existing stack. LangGraph, CrewAI, etc. don't integrate — Letta is the runtime. |
| Token cost of self-editing | Every memory operation costs inference tokens. The agent must reason about what to store. |
| Model-dependence | Memory quality depends on the LLM's judgment. If the model doesn't save something important, it's gone. |
| Stack lock-in | Adopting Letta means committing to its ecosystem. Swapping out is non-trivial. |
| No temporal reasoning | Archival memory doesn't model time explicitly. Can't answer "who was the account owner before March?" natively. Zep/Graphiti do this better. |
| No native knowledge graph | Doesn't auto-extract entity/relationship data. Graph-oriented alternatives (Graphiti, Zep) do this automatically. |
| No published benchmarks | Neither Letta nor LangMem has published LongMemEval results as of early 2026. Hard to compare accuracy objectively. |
| Python-first (historically) | TypeScript SDK is still in preview. Python required for full feature set. |

---

## 7. Recent Updates (Timeline as of March 2026)

| Date | Update |
|---|---|
| March 2026 | "Letta's next phase" announced: persistent memory, real computer access, self-improvement from lived experience. **Letta Code** (memory-first coding agent) is the flagship. |
| January 2026 | **Conversations API** — shared agent memory across concurrent user sessions. |
| December 2025 | **Letta Code** introduced. Ranked #1 on Terminal-Bench (model-agnostic coding benchmark). |
| December 2025 | **Programmatic tool calling** for any LLM, including non-tool-calling models. |
| October 2025 | **Letta Evals** — open-source evaluation framework for stateful agents. |
| October 2025 | **Letta V1 agent loop** officially introduced; optimized for frontier reasoning models. |
| September 2025 | Claude Sonnet 4.5 + Memory Omni-Tool integration. |

---

## 8. Letta Code (Flagship Product as of Early 2026)

A memory-first coding agent built on the Letta API. Key differentiator: persists across sessions and learns from them. Commands:
- `/init` — initialize the agent's memory system
- `/remember` — explicitly guide the agent to store something
- `/skill` — save a learned capability as a reusable skill

Supports "skills" (reusable modules in a `.skills` directory) and subagents. Fully model-agnostic (Claude Opus 4.5, GPT-5.2-Codex, Gemini 3 Pro, etc.).

The "Agent File" (`.af`) format is an open file format for serializing stateful agents with persistent memory and behavior, enabling portability.

---

## 9. Positioning vs. Alternatives

- **vs. Mem0**: Mem0 is a lightweight memory layer you add to an existing stack. Letta is a full runtime. Mem0 is more token-efficient (passive extraction), Letta is more adaptive (active self-editing). Mem0 has less lock-in.
- **vs. Zep/Graphiti**: These offer temporal reasoning and automatic knowledge graph construction — things Letta doesn't do natively.
- **vs. LangChain Memory / LangMem**: LangMem is framework-coupled (to LangGraph). Letta is framework-agnostic but runtime-replacing.
- **vs. simple RAG**: Letta agents actively decide what to store; RAG passively retrieves. Letta gives agents more agency over memory but costs more tokens and introduces model-judgment risk.

The core tension: Letta offers the most sophisticated, autonomous memory management available — but only if you commit to its full runtime. Teams that want to add memory to an existing stack usually look at Mem0 or Zep instead.
