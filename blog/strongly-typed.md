---
title: Optimizing repos for AI
date: 2025-10-25
draft: true
---


A word about whether this is a good goal at all: I'm a believer to agent based coding. I no longer _ever_ write code without one assistant or another open. So we'll proceed on the assumption that AI coding bots are _really good_, and not especially existentially risky (I am, for the moment, the one giving the directions).

Why optimize for AI? These bots are supposed to be pretty smart right?

- **Increase _iterative speed_**: Avoid repeated context gathering, enable the AI to quickly self correct its mistakes.
- **Improve adherence to evergreen instructions**: Over time, repeated AI mistakes emerge. Context within the repo helps the AI avoid these and adopt a more consistent workflow
- **Help the most [agentic agents of them all](https://en.wikipedia.org/wiki/Human)**: Humans and agents scan docs and code in very similar ways, so organizing information so it's easily understood by humans is a good rule of thumb for helping the agents anyways!


<!-- truncate -->

## Strategies

### Increased static analysis

Pushing detection of quality issues to compile time creates a virtuous cycle where the AI can quickly spot and correct mistakes.

![runtime-oops](/diagrams/runtime-oops.png)

This implies strong, opinionated linters, and strong type checks for dynamically typed language[^1].

### [just](https://github.com/casey/just) for repeated agent commands

There's fragmentation in how to make commands available to agents - there's MCP, the newly released [Claude Skills](https://www.anthropic.com/news/skills), or embedding information in `CLAUDE.md` / `AGENTS.md`.

A `justfile` is the most interoperable place to put commands shared between different agents and humans, and is a straightforward place to iterate.

One additional refinement is to make these commands *economical in their output volume*. For example, I take care to direct build logs to dedicated files - healthy build logs can eat up a lot of tokens if outputted directly to the agent.

### Organize docs on code review practices, project plans, etc in `docs/`, and reference them in `AGENTS.md`/`CLAUDE.md`

Simon Willison recently [wrote about this topic](https://simonwillison.net/2025/Oct/25/coding-agent-tips/), and expressed that docs aren't so important. I agree that docs _explaining the code_ aren't all that helpful, but I get a lot of mileage out of having docs like `CODE_REVIEW.md`, `PRD.md`, `ROADMAP.md`, and `CAPTAINS_LOG.md`. This helps the agent stay on track with the overall intent of the project, and adhere to consistent review practices.

Putting these in a `docs/` folder and referencing them in agent instructions helps reduce context bloat, and provides interoperability between humans and various agents.

Frameworks have begun to emerge that handle some of this for you. I've tried [spec-kit](https://github.com/github/spec-kit) and found it to be a little heavy handed. In general I favor a more documentation-heavy approach when building with AI, but the need for different docs comes with iteration, and I think generating the full compliment of docs a bit overkill right off the bat.


[^1]: Should you use a dynamically typed language at all? For my projects, I've traded Python for Rust, where "if it compiles, it works".
