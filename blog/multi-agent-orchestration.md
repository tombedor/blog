---
title: Multi Agent Orchestration
date: 2026-10-14
authors: [tom]
image: /social-cards/multi-agent-orchestration.png
draft: true
---

I have, after a period of resistance, adopted a multi-agent setup for my work, and it's difficult to see going back. When it comes to AI tools, I have a bad case of _not built by me_ syndrome, so I developed my own tool for this, bot-manager-3[^1].

Rather than pitch yet another agent orchestrator[^1] to you, I'll go through how I landed here, what components of multi agent orchestration are important, and what capabilities I'm reaching for next.

# Stage 1: Sea of iTerm tabs

AI allows me to make progress on several tasks at once, which I started by managing a sea of iTerm windows. This quickly got difficult to manage. For one, some tasks are long running, and I didn't really need see them rather than the primary window I was working in. It was also lossy: accidentally closing a tab means resuming by fishing the session out of Codex, or was it Claude Code?

Even when keeping tabs running, it was not alwatys trivial to remember what each tab was working on.

# Stage 2: Tmux navigation, tracking session state, naming sessions

Enter the first iteration of Bot Manager. During some (mostly failed) memory experiments, I landed on an architecture I liked: running a background daemon to snoop on local harness logs and do useful stuff with them. I used this technique to track which sessions were active, run sessions in the background, and assign session names.

<!-- diagram: bot-manager -->

I stayed with this for several months, but eventually started to feel like a human bot nudger. Sessions would do some useful work, ask for a decision, and wait until I paged back to it. This dramatically improved my ability to find past sessions and maintain long running context.

# Stage 3: Auto-routing fixup prompts

My work began to feel like flipping through tabs providing individual nudges. I also had to issue lots of repetitive instructions around workflows for when to file tickets, when to mark a PR ready for review, and what kinds of checks I wanted run on different projects. I found myself in menial loops checking GitHub PR's, finding comments, and issuing requests to respond to feedback. I added a mechanical dispatch layer to detect PR comments or CI failures, then route them to the session that authored the PR.

<!-- diagram: bot-manager-2 -->


# Stage 4: Bot Manager 3[^2]

Auto routing _helped_, but I began to find it difficult to enforce conventions for how a changes should be managed acros projects: how to create tickets, what checks to do in PR's, etc. I could add these by manually editing AGENTS.md, but I found this cumbersome.

I solved the problem by throughing AI at it. One single root node handles dispatch, receives progress reports, nudges inactive agents. Manager nodes keep tickets up to date and handle decisions not worth escalating to root.

This has increased the number of concurrent sessions I feel confident in running to ~20. It also lent itself well to self improvement - as I encountered pain points or performance bottlenecks, I could simply dispatch feature requests through the root node.

Developing the TUI as a pi extension let me pretty easily add a scrollable sidebar to see what was being worked on at a glance.

One of the more helpful features I converged to was scheduled prompts. After a change is deployed, I'm able to say things like "monitor xyz metric 3 times a day for two weeks, escalate to me if there are any problems".


# Stage 5? 



[^1]: The code for this tool belongs to my company, but can be easily open sources. If you're interested email me at tombedor.dev and I'll follow up with a release.

[^2]: Bot Manager 2 never really got off the ground. It's essentially the same as Bot Manager 3, with a web UI I never ended up using.
