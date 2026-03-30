# Agent Memory Evaluation Techniques

Research notes on benchmarks, metrics, and practices for evaluating agent memory systems (2025–2026).

## Key Benchmarks

### LoCoMo (Long-Horizon Conversational Memory)

**Paper:** "Evaluating Very Long-Term Conversational Memory of LLM Agents" — Maharana et al., 2024 (arXiv:2402.17753)
**Project page:** https://snap-research.github.io/locomo/

**What it measures:** Long-term, multi-session conversational memory. Tests storage, retrieval, and reasoning over extended dialogue history — not just recall but building, maintaining, and reasoning over evolving multi-session memory.

**Dataset structure:**
- Dialogues between LLM-architected virtual agents seeded with multi-sentence personas
- Temporally organized event graphs: up to 25 events over 6–12 months
- Up to 32 sessions, avg ~600 turns (~16,000 tokens per conversation)
- 1,986 total questions across 4 categories: Factual, Temporal, Inference, Adversarial

**Evaluation metrics:**
- Partial-match F1 for extractive QA
- LLM-as-a-judge accuracy (binary CORRECT/WRONG)
- Recall@k for RAG context retrieval

**Baseline scores:** GPT-4 achieves ~32.1 F1; human ceiling is 87.9. Long-context and RAG approaches improve scores 22–66% but still underperform humans by ~56%.

**Recent leaderboard (2025–2026):**
- Hindsight (Vectorize.io + Virginia Tech + WaPo): 89.61% on LoCoMo; 91.4% on LongMemEval
- Zep: 75.14% ± 0.17 (corrected, self-reported; Mem0 originally reported 65.99%)
- Letta (GPT-4o-mini, flat file storage): 74.0%
- Mem0 Graph: ~68.5% (claimed in Mem0 paper; disputed)
- Full-context baseline: ~73%

**Note on saturation:** Hindsight's paper itself flags that scores approaching 90% on LoCoMo and LongMemEval mean "current benchmarks are no longer sufficient for testing state-of-the-art memory systems." LifeBench (March 2026) was designed specifically to address this.

**Limitations:**
- Conversations relatively short (~9k–16k tokens) — within modern LLMs' context windows, so "memory" isn't actually needed
- Simple baseline (full-context) achieves ~73%, beating specialized memory systems (~68% for Mem0)
- Category 5 unusable due to missing ground truth answers
- Multimodal errors from BLIP-generated image descriptions
- Speaker misattribution and ambiguous questions
- Only covers personal/casual domains; no non-declarative memory (habits, skills)

---

### LongMemEval

**Paper:** "LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory" — Wu et al., ICLR 2025 (arXiv:2410.10813)
**GitHub:** https://github.com/xiaowu0162/LongMemEval

**What it measures:** Five core long-term memory abilities:
1. **Information extraction** — recall specific facts from long history
2. **Multi-session reasoning** — synthesize information across sessions
3. **Temporal reasoning** — awareness of when things happened
4. **Knowledge updates** — recognize when information has changed
5. **Abstention** — know when to not answer (information not present)

**Scale:** 500 curated questions in chat histories of:
- LongMemEval_S: ~115,000 tokens
- LongMemEval_M: up to 1.5 million tokens

**Key findings:**
- State-of-the-art commercial systems (GPT-4o) achieve only 30–70% accuracy on the simpler setting
- Long-context LLMs show 30–60% performance drop on LongMemEval_S
- Best published result: RAG-based system achieving 86% on LongMemEval_S
- Zep achieves 71.2% on LongMemEval_S
- Oracle GPT-4o (given only relevant sessions): 82.4%

**Effective design patterns identified:**
- Round (not session) is the best granularity for storing history
- Fact-augmented key expansion for indexing
- Time-aware query expansion for retrieval
- Chain-of-Note + structured JSON prompt format: +10 absolute points on reading accuracy

**Advantage over LoCoMo:** More realistic conversation lengths that actually stress memory systems; covers temporal reasoning explicitly.

---

### MemBench (ACL 2025)

**Paper:** Tan et al., Findings of ACL 2025
**GitHub:** https://github.com/import-myself/Membench

Two memory levels: factual and reflective
Two interactive scenarios: participatory (agent is part of conversation) and observational (agent observes)

Evaluates: effectiveness, efficiency, and capacity across:
- Information extraction
- Multi-hop reasoning
- Knowledge updating
- Preference following
- Temporal reasoning

---

### LifeBench (March 2026)

**Paper:** "LifeBench: A Benchmark for Long-Horizon Multi-Source Memory" — arXiv:2603.03781

Designed to address the saturation of LoCoMo and LongMemEval by SOTA systems like Hindsight.

**What makes it harder:**
- Captures non-declarative memory (habits, skills, routines) alongside explicit episodic/semantic facts
- Dense event streams: ~14 events per day, distributed across 24 diverse digital artifacts (apps, logs, messages, calendar)
- Context depth exceeds 2x LongMemEval trajectories
- User actions must be *inferred* from fragmented, multi-source traces — not just recalled from dialogue
- Single-domain synthetic benchmarks don't capture real cross-domain personalization

SOTA memory systems (Hindsight, Mem0, Zep, etc.) that perform well on LoCoMo and LongMemEval "still struggle significantly" on LifeBench. This is the benchmark to watch as the field matures.

---

### MemoryCD (March 2026)

**Paper:** "MemoryCD: Benchmarking Long-Context User Memory of LLM Agents for Lifelong Cross-Domain Personalization" — arXiv:2603.25973

Focuses specifically on cross-domain personalization (e.g., does a preference expressed in a cooking conversation affect a travel recommendation?). Addresses a gap in prior benchmarks that silo interactions within a single domain.

---

### AMA-Bench (2026)

**Paper:** arXiv:2602.22769 (submitted Feb 26, 2026)

Addresses a gap: existing benchmarks focus on dialogue-centric interactions. Real agent memory is primarily machine-generated (JSON, logs, state transitions) not human conversation.

Two components:
1. Real-world agentic trajectories (diverse agentic applications) with expert-curated QA
2. Synthetic agentic trajectories scaling to arbitrary horizon lengths, with rule-based QA

**Key finding:** Compression and similarity-based retrieval fail on agent trajectories because:
- Compression methods designed for natural language (redundancy, fillers) — agent trajectories are dense, causally structured state transitions
- Similarity retrieval fails to extract causally relevant evidence from machine-generated representations

---

### MemAE (Memory Agent Evaluation, 2025)

Unified framework targeting four core memory competencies:
1. **Accurate retrieval** — needle-in-a-haystack extraction
2. **Test-time learning** — in-context adaptation to new information
3. **Long-range understanding** — global summarization
4. **Conflict resolution** — updating prior facts with new evidence

Finding: No current approach masters all four. Conflict resolution is the key bottleneck — even advanced systems fail at correctly overwriting outdated facts.

---

## Evaluation Metrics

### LLM-as-Judge vs. Lexical Metrics

| Dimension | LLM-as-Judge | Lexical Metrics (F1, BLEU, EM) |
|---|---|---|
| Semantic understanding | High | Low |
| Cost | High | Low |
| Latency | High | Low |
| Hallucination risk | Present | None |
| Human alignment | Better | Weaker |
| Verbose output handling | Can fail | Keyword matching helps |
| Reference-free eval | Possible | Reference required |

**LLM-as-judge strengths:** Captures semantic correctness, understands paraphrases, can assess nuanced correctness. Works reference-free.

**LLM-as-judge weaknesses:**
- Best judge (Llama-3 70B) still 8 points behind human judgment
- Systematic biases and overconfidence even in strong models (GPT-4)
- High cost makes large-scale evaluation impractical
- Susceptible to hallucination

**Lexical metric weaknesses:**
- Penalizes correct answers that don't match reference phrasing
- Struggles with temporal reasoning and multi-hop inference
- Miss semantically equivalent answers

**Emerging best practice (2025):** Hybrid approaches — lightweight lexical/embedding signals with selective LLM judging for borderline cases. Prompting judges to explain ratings significantly improves alignment with human judgment. SMILE framework (Semantic Metric Integrating Lexical Exactness) attempts to bridge the gap.

---

### Retrieval Metrics for Memory Systems

For evaluating the retrieval component specifically:
- **Precision@k** — are the top-k retrieved memories relevant?
- **Recall@k** — how much of the relevant information was retrieved?
- **MRR (Mean Reciprocal Rank)** — are correct memories ranked early?
- **nDCG** — graded relevance with position weighting

**Precision-recall tradeoff in memory:**
- High recall, low precision → memory bloat, retrieval degradation, noise
- High precision, low recall → missing context, conversation failures
- A-MAC system achieves precision 0.417 with recall 0.972 as a practical balance

---

### What Makes Memory Evaluation Hard

1. **Semantic correctness vs. lexical match** — correct answer may be phrased differently than ground truth
2. **Temporal reasoning** — requires understanding when facts were true, handling contradictory updates
3. **Multi-hop reasoning** — combining facts from multiple sources/sessions
4. **Knowledge update detection** — recognizing when old information has been superseded
5. **Long-horizon coherence** — maintaining consistency across many sessions
6. **Machine-generated trajectories** — current benchmarks (mostly dialogue) don't cover agent environment interactions

---

## Practical Evaluation Approaches

### Offline Evaluation
- Run standard benchmarks (LongMemEval, MemBench) on representative test sets
- Compare retrieval strategies: sparse (BM25) vs. dense (DPR) vs. hybrid
- Use CI/CD gates to prevent regressions between versions

### Production Monitoring
- Track retrieval precision/recall on sampled production queries
- Monitor: faithfulness, context utilization, answer completeness, latency, cost
- Dashboard metrics: hallucination rate, retrieval precision, latency, cost per query

### A/B Testing
- **Offline A/B:** Compare retrieval strategies on historical data before live exposure
- **Online A/B:** Measure whether offline improvements translate to user engagement
- Build evaluation datasets from production logs
- Key principle: "It feels better" is not an engineering metric

### User Feedback Loops
- Thumbs up/down on responses
- Implicit signals: conversation length, task completion rates
- Sample human evaluation on memory-specific questions

---

## Benchmark Controversy: The Mem0/LoCoMo Dispute

A notable controversy erupted in 2025 over benchmarking practices in agent memory.

**What happened:** Mem0 published a paper claiming state-of-the-art performance on LoCoMo. Competitors and independent researchers identified multiple issues:

1. **Incorrect competitor evaluation:** Mem0 assigned user role to both participants in Zep's evaluation (Zep uses a single user-assistant structure). This is a fundamental setup error that inflated Mem0's relative standing.
2. **Disputed scores:** Mem0 reported Zep's LoCoMo score as 65.99%. Zep's own corrected evaluation showed 75.14% ± 0.17 — a 10% relative improvement over Mem0 Graph. Zep also found Mem0 used a sequential search implementation that inflated Zep's reported latency (0.778s vs. Zep's actual concurrent p95 of 0.632s).
3. **MemGPT benchmarking opaque:** The Letta team couldn't reproduce how Mem0 ran LoCoMo on their system; Mem0 didn't respond to requests for methodology clarification.
4. **Timestamp errors:** Community members reported Mem0's evaluation used current date (Jan 2026) instead of LoCoMo dataset timestamps, which distorts temporal reasoning evaluation.
5. **Template drift:** Mem0 replaced the retrieval template from prior DMR benchmarks, introducing a confounding variable not present in prior evaluations.

Zep published a detailed post-mortem on December 10, 2025: ["Is Mem0 Really SOTA in Agent Memory?"](https://blog.getzep.com/lies-damn-lies-statistics-is-mem0-really-sota-in-agent-memory/). As of March 2026, Mem0 has not publicly responded to the methodology criticisms.

**Emergence AI's independent k=42 issue:** A separate analysis of Emergence AI's LoCoMo results (documented by Calvin Ku on Medium) found a hardcoded retrieval limit of `k=42` in their implementation that caused a performance dip. Even after fixing it, scores remained below Zep — suggesting the remaining gap was a data representation problem, not algorithmic.

**Broader lesson:** The controversy revealed LoCoMo's fundamental limitations — it may be too easy (modern LLMs can fit conversations in context) and too simple for a "state-of-the-art" claim to carry weight.

**Key insight from Letta:** Their agents achieve 74% accuracy on LoCoMo by simply storing conversation history as flat files ("Is a Filesystem All You Need?", Letta blog). If flat-file storage beats specialized memory systems, the benchmark isn't measuring what it claims to measure. Hindsight's 89.61% in 2026 corroborates this: the benchmark is now effectively saturated.

**Hindsight and the post-saturation landscape:** Hindsight (arXiv:2512.12818, Vectorize.io + Virginia Tech + Washington Post) is a four-network memory architecture using TEMPR (semantic + BM25 + graph traversal + temporal filtering, merged via Reciprocal Rank Fusion) and CARA (adaptive reflection). It hit 91.4% on LongMemEval and 89.61% on LoCoMo. Notably, the Hindsight paper itself argues these results mean LoCoMo and LongMemEval are no longer adequate benchmarks — which is why LifeBench and MemoryCD were introduced in 2026.

---

## Sources

- [LoCoMo project page](https://snap-research.github.io/locomo/) — Snap Research
- [LongMemEval paper (arXiv:2410.10813)](https://arxiv.org/abs/2410.10813) — Wu et al., ICLR 2025
- [LongMemEval GitHub](https://github.com/xiaowu0162/LongMemEval)
- [AMA-Bench (arXiv:2602.22769)](https://arxiv.org/abs/2602.22769)
- [MemBench (ACL 2025)](https://aclanthology.org/2025.findings-acl.989/)
- [LifeBench (arXiv:2603.03781)](https://arxiv.org/abs/2603.03781) — Long-horizon, multi-source, non-declarative memory benchmark, March 2026
- [MemoryCD (arXiv:2603.25973)](https://arxiv.org/abs/2603.25973) — Cross-domain lifelong personalization benchmark, March 2026
- [Hindsight paper (arXiv:2512.12818)](https://arxiv.org/abs/2512.12818) — Vectorize.io + Virginia Tech + WaPo; TEMPR + CARA architecture, 91.4% LongMemEval
- [Is Mem0 Really SOTA in Agent Memory?](https://blog.getzep.com/lies-damn-lies-statistics-is-mem0-really-sota-in-agent-memory/) — Zep blog, Dec 10 2025
- [Zep LOCOMO issue: Corrected Evaluation](https://github.com/getzep/zep-papers/issues/5)
- [Benchmarking AI Agent Memory: Is a Filesystem All You Need?](https://www.letta.com/blog/benchmarking-ai-agent-memory) — Letta
- [Emergence AI broke the agent memory benchmark](https://medium.com/asymptotic-spaghetti-integration/emergence-ai-broke-the-agent-memory-benchmark-i-tried-to-break-their-code-23b9751ded97) — Calvin Ku on Medium (k=42 hardcoding issue)
- [LLM-as-a-Judge complete guide](https://www.evidentlyai.com/llm-guide/llm-as-a-judge) — Evidently AI
- [RAG Evaluation guide 2025](https://www.getmaxim.ai/articles/rag-evaluation-a-complete-guide-for-2025/) — Maxim
- [A/B Testing Retrieval](https://www.shaped.ai/blog/ab-testing-retrieval-how-to-prove-your-agent-is-getting-better) — Shaped
