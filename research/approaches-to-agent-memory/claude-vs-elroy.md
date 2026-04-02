  ---
  Elroy vs. Claude Code: Key Differences

  Store

  Both use flat markdown files (validates your preferred approach). The divergence:
  - Elroy adds PostgreSQL + ChromaDB on top — memories are embedded via text-embedding-3-small
  - Claude Code is pure files — no vector store at all

  Claude Code's design is architecturally notable: it skips embeddings entirely and uses Sonnet to read human-readable description frontmatter fields and rank relevance. Trades infrastructure for an extra
   LLM call per turn.

  Retrieve — Two distinct paradigms

  - Elroy: L2 vector distance (ChromaDB). Fast, no extra LLM call, requires embeddings.
  - Claude Code: Sonnet reads all memory file descriptions, returns top 5 relevant paths. No embeddings needed, but costs a Sonnet call per turn.

  Latency strategies also diverge:
  - Elroy: two-stage classifier (heuristics → LLM) that decides whether to recall at all (skips greetings, short messages)
  - Claude Code: always prefetches, but async — latency is hidden, not avoided

  Elroy also has reflective recall: a second LLM call that converts raw memories into first-person internal thoughts and filters irrelevant ones during generation.

  Inject

  Both avoid system-message updates (cache invalidation). But:
  - Elroy: synthetic tool call (TOOL role messages) — matches your current approach
  - Claude Code: <system-reminder> attachments — a fourth injection variant not in the current post

  Emit

  - Elroy: fully automatic, triggered every 10 messages, LLM summarizes context → stores to file + DB + embeddings. Plus DBSCAN consolidation after every 5 new memories.
  - Claude Code: forked extraction subagent with restricted permissions (can't rm, writes only to memory dir). Mutual exclusion: if main agent saved this turn, extractor is skipped.

  ---
  Content gaps the comparison surfaces for the post:
  1. Embeddings-optional retrieval (LLM-as-ranker) is worth naming
  2. "Always prefetch vs. classify first" are the two named latency strategies
  3. <system-reminder> is a 4th injection variant
  4. Elroy's DBSCAN consolidation is the concrete implementation of what the post describes abstractly
