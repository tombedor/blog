---
title: Optimizing repos for AI
date: 2025-10-25
---


A word about whether this is a good goal at all: I'm a believer to agent based coding. I no longer _ever_ write code without one assistant or another open. So we'll proceed on the assumption that AI coding bots are _really good_, and not especially existentially risky (I am, for the moment, the one giving the directions).

Why optimize for AI? These bots are supposed to be pretty smart right?

The fundamental goal is to increase _iterative speed_ and avoid repeated context gathering, and decrease poor tendencies of the AI tools.

My strategy for increasing iterative speed is to push detection of quality issues to compile time or static checking. It's a lot faster for a compile to pick up on problems than to catch them at runtime:

![runtime-oops](/diagrams/runtime-oops.png)

This implies strong, opinionated linters, and strong type checks for dynamically typed language.

But should you use a dynamically typed language at all? A compelling alternative to e.g. Python is Rust, where "if it compiles, it works"

I've personally traded Python for Rust, a language I have very little familiarity with, for this reason. The speed of development that comes with Python's structure is less valuable to me.


# Agent instructions

AI tools tend to have short memories and annoying coding tendencies. The most persistent I've found that bots chronically write code that fails open, leaving behind nonsensical fallbacks and difficult to detect placeholders. That and silly comments!

There's _some_ standardization with how to go about this. Markdown files are the de facto standard, and most coding bots support MCP.

But there's fragmentation. Claude Code looks for `CLAUDE.md`, and seem to be taking a step away from MCP with [Claude Skills](https://www.anthropic.com/news/skills), which adds some special syntax to reference a prompt library buried in `.claude/skills`. Cursor does (XYZ, for what cursor does). Most agents seem to have some awareness of `AGENTS.md`, but these files can quickly get overloaded with code style rules, requirements, and code review prompts.

Side note: A colleague was recently complaining about the complexity and hassle of organizing agent facing docs - this is the mark of a real practitioner! That colleague has gone from amazement at magic of a new tech, to internalizing it's capabilities and considering them routine, to being annoyed at the next bottleneck.

Another issue with stuffing all relevant instructions and learnigns into these files is that it doesn't well suit the most agentic agent of them all: [humans](https://en.wikipedia.org/wiki/Human).

There's much angst around humans being replaced or left behind by focusing on optimizing repos for coding agents. Lucky for robot/human harmony, humans and robots have pretty similar tastes when it comes to organizing instructions: if I'm thinking about how to best organize agent-facing documentation, I think about how to best organize human-facing documentation!

Ie, rather than code review instructions in AGENTS.md, I make a `docs/CODE_REVIEW.md` file, and reference it in the various agent-specific files. For newer projects I've usually also included a `PRD.md`, a `ROADMAP.md`, and a `CAPTAINS_LOG.md`.

Frameworks have begun to emerge that handle some of this for you. I've tried [spec-kit](https://github.com/github/spec-kit) and found it to be a little heavy handed. In general I favor a more documentation-heavy approach when building with AI, but the need for different docs comes with iteration, and I think generating the full compliment of docs a bit overkill right off the bat.






new tradeoffs:
- the goal: better iterative speed with ai



linter


AGENTS.md / CLAUDE.md / extensions







Choosing Programming Languages in the Age of AI: Why Static Typing Wins



Outline
Introduction

Hook: AI makes different kinds of mistakes than humans
Thesis: Strong typing + modern tooling = better AI coding outcomes
Why this matters now

The Traditional Trade-off (Now Obsolete)
[DIAGRAM: Before/After comparison]

Before AI: Dynamic typing = faster iteration, less boilerplate
With AI: Boilerplate cost → zero
The cost-benefit calculation has flipped

Case Study: Python vs Rust
Python's AI Pitfalls

Type confusion bugs AI commonly makes
Runtime errors that slip through
Examples of subtle bugs that pass code review

Rust's AI Advantages

Compiler as AI error-checker
The self-correcting loop in action
Concrete example: same task, different outcomes

[DIAGRAM: Self-correcting loop flowchart]

AI writes code → Compiler catches error → AI fixes → Success
vs. AI writes code → Runs → Runtime error → Debug cycle → Confusion

Why This Matters Beyond Types
Modern Dev Tools Amplify the Effect

LSP/IDE integration catches AI mistakes in real-time
Build systems prevent configuration drift
Linters enforce consistency AI naturally lacks

The Responsibility Shift

Less human vigilance required
Compiler becomes AI's pair programmer
You review logic, not syntax/types

[DIAGRAM: Responsibility allocation]

Human: High-level logic, architecture
AI: Implementation, boilerplate
Compiler/Tools: Correctness, consistency

Practical Implications

When to choose static over dynamic
Exceptions where dynamic still wins
Migration considerations

Conclusion

Static typing is AI's guardrails
The future: tooling-first language selection
Call to action: rethink your stack


Total diagrams: 3

Each should be simple, visual, punchy (like your floor/ceiling raiser post)
Focus on showing the shift or difference, not explaining complexity
