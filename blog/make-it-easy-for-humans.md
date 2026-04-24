---
title: "Optimize for Humans"
date: 2025-11-26
---

I recently wrote about [optimizing repos for AI](/optimizing-repos-for-ai), and since then I've been maintaining separate docs for humans (README, contributing guides) and AI agents (`.cursorrules`, `CLAUDE.md`, etc.). The problem? I keep writing the same information twice.

<!-- truncate -->

## The duplication problem

### You're documenting the same things in multiple places

![info](/diagrams/make-it-easy-for-humans/info.png)

Nearly everything I put in agent-specific docs is also useful for human developers - architecture decisions, coding conventions, common pitfalls, useful commands. Without AI agents I might not document all of this, but once written, there's no reason it shouldn't serve both audiences.

### AI agent doc organization is fragmented

Each coding agent uses its own configuration file pattern for repo-specific instructions:

![fragmentation](/diagrams/make-it-easy-for-humans/fragmentation.png)


This creates a hassle just keeping guidelines between agents consistent, much less making information available for humans.

## Solution: Write once, link everywhere

Instead of duplicating content across agent configs, organize information for humans first and link to it from agent-specific files[^1]:

![easy-for-humans](/diagrams/make-it-easy-for-humans/easy-for-humans.png)

This approach eliminates duplication - you write documentation once, and it serves both humans and AI. It's also more future-proof when agent file schemes inevitably change.

For commands/skills, automation can help avoid duplication entirely - for example, I wrote the [just-claude](https://github.com/tombedor/just-claude) utility for automatically synchronizing [Just](https://github.com/casey/just) recipes with [Claude Code Skills](https://www.claude.com/blog/skills).

There's really no difference between the goal of economical token use for AI and reducing cognitive overhead for humans. By organizing for humans first, you write documentation once and everyone benefits.

[^1]: I wrote about what content I put in these files in the (ironically titled) post [Optimizing repos for AI](/optimizing-repos-for-ai)
