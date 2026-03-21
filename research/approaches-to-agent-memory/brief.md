# Research Brief: Approaches to Agent Memory

**Post:** `blog/approaches-to-agent-memory.md`
**Last updated:** 2026-03-21

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

- TODO: research in detail
- Hierarchical memory model with "infinite context" framing
- More opinionated agent architecture (tighter coupling)
- Outperforms Mem0 in some domain-specific benchmarks

### OpenAI Memory

- TODO: research in detail
- Mem0 claims 26% accuracy improvement over OpenAI Memory on LOCOMO
- Native to ChatGPT product; API access limited

### Anthropic / Claude

- TODO: research in detail
- No native persistent memory product as of early 2026
- Memory typically delegated to application layer

---

## Counterarguments / Tensions

- **Vector vs. graph:** Graph memory adds relational reasoning but at 2x token cost with mixed returns. Most production use cases may not need graph complexity.
- **Explicit vs. automatic memory management:** Mem0's explicit API approach gives observability but creates developer burden. More automatic systems (MemGPT/Letta) may be more ergonomic for agent-native workflows.
- **RAG vs. memory:** Mem0 positions itself as superior to chunk-based RAG for conversational memory. The distinction matters: RAG is document retrieval; memory is fact/preference extraction from dialogue. They serve different purposes and may be complementary.
- **Evaluation benchmark concerns:** LOCOMO is Mem0's chosen benchmark. LLM-as-a-judge metrics and prior lexical metrics (F1, BLEU) both have known weaknesses for factual accuracy evaluation.
