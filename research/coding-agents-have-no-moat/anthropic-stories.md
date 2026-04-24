# Source Notes: Anthropic Claude Code Stories

**Research date:** 2026-04-24

## Core Links

- Product page: https://www.anthropic.com/product/claude-code
- Internal-use article: https://www.anthropic.com/news/how-anthropic-teams-use-claude-code
- Ramp case study: https://www.anthropic.com/customers/ramp
- Rakuten case study: https://www.anthropic.com/customers/rakuten

## What They Establish

- Anthropic markets Claude Code with both **internal stories** and **customer case studies**.
- The stories consistently emphasize:
  - Faster navigation of unfamiliar repos
  - Multi-file changes across a codebase
  - Test writing and debugging
  - Incident response / ops workflows
  - Parallel-agent workflows
  - Non-engineer use cases

## Reusable Facts

- Product page:
  - Anthropic says **"the majority of code is now written by Claude Code."**
  - Stripe example: **1,370 engineers** deployed through a zero-config enterprise binary; one migration finished in **4 days** vs **10 engineer-weeks** estimate.
  - Ramp example: **80% reduction** in incident investigation time.
  - Wiz example: **50,000-line** Python-to-Go migration in **~20 hours** of active development.
  - Rakuten example: average feature delivery time from **24 working days to 5**.
- Internal-use article:
  - Product Engineering calls Claude Code their "**first stop**" for programming tasks.
  - Incident debugging example: issues that took **10-15 minutes** now resolve **3x as quickly**.
  - Product Design used autonomous loops where Claude writes code, runs tests, and iterates.
  - Data scientists without TypeScript fluency used Claude Code to build React visualizations.
- Ramp case study:
  - **1M+ lines** of AI-suggested code implemented in 30 days.
  - Nearly **50%** weekly active usage across engineering.
  - "**up to 80%**" reduction in incident investigation time.
  - Case study explicitly says Ramp evaluated **multiple AI coding assistants** before choosing Claude Code.
- Rakuten case study:
  - **79%** reduction in time to market.
  - **7 hours** of sustained autonomous coding on a complex refactoring task.
  - **99.9%** accuracy claim on a complex code-modification task.
  - Explicit parallelism quote: you can have "**five tasks running in parallel**" by delegating four to Claude Code.

## Use In Post

- Good support for: Claude Code has real adoption, strong stories, and strong marketing.
- Weak support for: durable switching costs. Most stories rely on Claude operating inside the user's existing repo, terminal, CI, docs, and tooling, which are portable assets.
- Strong rhetorical contrast available:
  - **Value is real**
  - **Lock-in is less obvious**

## Caveat

- These are first-party Anthropic materials. Good for proving Anthropic's own positioning and messaging; weaker for proving a market-wide moat.
