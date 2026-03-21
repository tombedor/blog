# Zep AI: Research Notes

Notes on Zep's memory architecture, benchmarks, integration model, and tradeoffs.

## Overview

Zep is a memory layer (now calling itself a "context engineering platform") for AI agents. Founded around 2023, now offering Zep Cloud (managed) and previously Graphiti open-source. Core innovation: temporal knowledge graph that tracks how facts change over time, rather than a static vector store.

**Paper:** "Zep: A Temporal Knowledge Graph Architecture for Agent Memory" — arXiv:2501.13956, published January 20, 2025. Presented at Knowledge Graph Conference 2025.

---

## Core Architecture: Graphiti

The core engine is **Graphiti**, an open-source temporal knowledge graph. The architecture uses three subgraphs:

### 1. Episode Subgraph (Episodic Memory)
- Records raw events/messages with original timestamps
- Stores high-fidelity inputs: JSON documents, conversation logs, transactional snapshots
- Ground truth corpus — never modified, only augmented

### 2. Semantic Entity Subgraph (Semantic Memory)
- Entities and facts extracted from episodes via LLM-powered semantic extraction
- Each entity embedded in high-dimensional space (1024D) for cosine similarity search
- Entity relationships stored as graph edges with temporal metadata

### 3. Community Subgraph (Abstract Knowledge)
- Clusters of strongly connected entities with shared context
- Updated via dynamic label propagation
- Provides summary information for higher-level retrieval
- Mirrors the distinction between episodic memory (raw recall) and semantic memory (abstracted knowledge)

---

## Bitemporal Data Model

Zep's core innovation vs. other systems: **explicit bitemporal modeling**.

Every node and edge carries two timestamps:
- **Event Time (T):** When the fact/event actually occurred
- **Ingestion Time (T′):** When the information was observed/added to Zep

**What this enables:**
- Query "what was true at time X" (historical state)
- Query "what do we currently believe is true" (current state)
- Handle retroactive corrections — updating past records without losing history
- Fact invalidation: old facts are marked invalid (not deleted) when superseded

Example: If a user's address changes, Zep marks the old address fact with `invalid_at` timestamp and creates a new valid fact — allowing queries like "what was the customer's address before they moved?"

**Contrast with Mem0:** Mem0 timestamps memories at creation but has no concept of fact validity windows or temporal supersession. There's no way to ask what was true at a previous point in time.

---

## Retrieval

Zep's default "Context Block" uses multiple retrieval strategies:
1. **Semantic search** (vector similarity on entity embeddings)
2. **Full-text search** (keyword/BM25)
3. **Breadth-first search** (graph traversal from query entities)

These are combined and reranked to produce a pre-formatted context string optimized for LLM consumption.

**Latency:** P95 < 200ms for Context Block retrieval

**Multi-hop queries:** The graph structure enables traversing entity relationships — e.g., "What decisions were made about the API after the security review?" requires linking: security review → decisions → API. This is Zep's core strength over vector-only systems.

---

## Benchmarks

### Deep Memory Retrieval (DMR)
The MemGPT team's primary benchmark. Zep: **94.8%** vs. MemGPT: 93.4%.

### LongMemEval
More realistic benchmark emphasizing temporal reasoning and multi-session synthesis:
- Zep achieves accuracy improvements of up to **18.5%** vs. baseline
- Reduces response latency by **90%** compared to baseline implementations
- Biggest gains in: single-session-preference, multi-session reasoning, temporal reasoning
- Overall score: **71.2%** (Zep's published number)
- Independent evaluation: ~63.8% (using GPT-4o, vectorize.io)

### LoCoMo Controversy
Mem0's paper reported Zep at ~65.99% on LoCoMo. Zep disputes this:
- Mem0 used incorrect role assignment (assigned user role to both conversation participants)
- Zep's corrected self-evaluation: **75.14% ± 0.17**
- Third-party corrected figure: 58.44% (different methodology)
- The dispute remains unresolved — illustrates broader benchmarking credibility problems in this space

See [evaluation-techniques.md](./evaluation-techniques.md) for full benchmark controversy details.

---

## Integration

### SDKs
- Python, TypeScript, Go SDKs
- Simple three-line API for core operations
- Under 15 minutes to "Hello World" per developer reports

### Core integration pattern
```python
# 1. Create user
zep_client.users.add(user_id=user_id, first_name="Alice")

# 2. Create thread per conversation
thread = zep_client.memory.add_session(session_id=session_id, user_id=user_id)

# 3. Before generating response: retrieve context
context = zep_client.memory.get_context(session_id=session_id)
# context is a pre-formatted string ready to inject into system prompt

# 4. After getting user message: add to memory
zep_client.memory.add(session_id=session_id, messages=[...])
```

### Framework integrations
- LangGraph (agentic tool search of user graphs)
- Autogen (multi-agent applications)
- Chainlit (conversational AI with memory)
- LangChain
- MCP (Model Context Protocol) — connect to Claude, ChatGPT, Cursor

### Data types
Any text: structured JSON, semi-structured logs, plain text. Structured business data can be ingested alongside conversational history.

---

## Deployment Options

### Zep Cloud (Managed)
- Managed service with SOC2 Type 2 and HIPAA compliance
- Enterprise-grade scalability
- Free tier available (no credit card required)
- Pricing not publicly listed for enterprise tiers

### Self-Hosted / Open Source (Deprecated)
**Important:** Zep deprecated the open-source Community Edition in **April 2025**. Self-hosted is now primarily through Graphiti directly (graph database required).

Graphiti remains open source: https://github.com/getzep/graphiti

---

## Comparison to Competitors

### vs. Mem0

| Dimension | Zep | Mem0 |
|---|---|---|
| Architecture | Temporal knowledge graph | Vector store + optional graph |
| Temporal reasoning | Native (bitemporal model) | Not supported |
| Multi-hop queries | Strong (graph traversal) | Weak (vector-only on free/starter) |
| Memory footprint | High (600K+ tokens/conversation) | Low (~1,764 tokens/conversation) |
| Real-time retrieval | Delayed (background graph build) | Immediate |
| Graph access | Included | Paywalled (Pro tier, $249/mo) |
| Deployment | Cloud + Graphiti open-source | Cloud + self-hosted |
| Best for | Temporal/relational reasoning, enterprise | Quick deployment, simple semantic retrieval |

### vs. Letta (MemGPT)

Letta (formerly MemGPT) uses an OS-inspired paged memory model where an LLM actively manages its own context window. Key differences:
- Letta: agent controls its memory; Zep: infrastructure manages memory automatically
- Letta: good for research, complex agentic control; Zep: better for production deployment
- Letta's LoCoMo score (74% with flat files) highlights that Letta's approach is effective but not "memory" in the specialized sense

---

## Limitations and Tradeoffs

1. **Memory footprint is large.** Mem0's paper (disputed) found Zep uses 600K+ tokens per conversation vs. Mem0's ~1,764. Graph construction is thorough but resource-intensive.

2. **Delayed availability.** Background graph processing means freshly ingested information may not be immediately retrievable. For real-time applications (live conversation), this is a real constraint.

3. **Operational complexity for self-hosting.** Graphiti requires managing a graph database (Neo4j or compatible). Zep Cloud abstracts this, but at the cost of vendor dependency.

4. **Community Edition deprecated.** April 2025 deprecation removes the free self-hosted option. Developers who want to avoid cloud costs must work directly with Graphiti, which is lower-level.

5. **Benchmark credibility issues.** The LoCoMo dispute (Zep vs. Mem0) makes it hard to trust published numbers. Zep publishes their own favorable numbers; Mem0 publishes different numbers. Independent evaluation suggests the truth is somewhere in between.

6. **Overkill for simple use cases.** If you just need "remember this user likes dark mode," the temporal graph architecture is significant overhead. Mem0 or even simple vector storage suffices.

---

## Recent Updates (Early 2026)

- Zep repositioned as "Context Engineering Platform" (broader than just memory)
- Graphiti continues active development on GitHub
- Community Edition deprecated April 2025
- MCP integration added for connecting to Claude, ChatGPT, Cursor
- Focus on enterprise: SOC2 Type 2, HIPAA compliance added

---

## Sources

- [Zep paper (arXiv:2501.13956)](https://arxiv.org/abs/2501.13956)
- [Graphiti GitHub](https://github.com/getzep/graphiti)
- [Zep documentation](https://help.getzep.com/)
- [Zep blog: Is Mem0 Really SOTA?](https://blog.getzep.com/lies-damn-lies-statistics-is-mem0-really-stata-in-agent-memory/)
- [Mem0 vs Zep comparison (vectorize.io, 2026)](https://vectorize.io/articles/mem0-vs-zep)
- [Mem0 vs Zep vs LangMem vs MemoClaw (2026)](https://dev.to/anajuliabit/mem0-vs-zep-vs-langmem-vs-memoclaw-ai-agent-memory-comparison-2026-1l1k)
- [Zep corrected LOCOMO evaluation (GitHub issue)](https://github.com/getzep/zep-papers/issues/5)
- [Zep for Developers](https://www.getzep.com/solutions/for-developers/)
