---
title: yaaml
date: 2026-06-14
draft: true
---

- memory systems:
    - basic recall: tool calls, emits memories, has recall tools
    - problems:
        - context bloat
        - latency
        - memory relevance
    - likely because of this, codex and anthropic don't have memory systems baked in very prominently in their agents. in codex, it remains an experimental feature,



- yaaml:
    - does memory formation and consolidation async, recall is done continuously, written to a file, so recall within the agent loop is barely perceptible.
    - one nice feature of having memory be a separate process is that memories can span coding agents.
    - for relevance, memories have either a project-scope or a global scope.
    - evals:
        - also async, built into the tool itself. this is available to the user, so you can see how and whether yaaml is helping your agent in real time. but the evals also impact recall: recalled memories shown to have poor relevance are downweighted for future iterations. 



-
