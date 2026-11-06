---
title: Multi Agent Orchestration
date: 2026-10-14
authors: [tom]
image: /social-cards/multi-agent-orchestration.png
draft: true
---




I've reluctantly embraced multiagent development. When I've been skeptical of the early token maxers, like gas town. I've embraced multiagent development. I got there somewhat reluctantly. I was skeptical of token, maxing techniques or services like Gastown, which seemed mostly to be in service of building themselves, which even as its inventor admits was mainly used to build itself. But its models have improved. They are increasingly able to complete tasks autonomously and the my task is mostly to manage them and keep them on track. Multiagent development is has created a lot of has created tension between there's tension between developers who use multiagent and those who do not. The job of them human running an agent swarm is more, it's much more similar to a people as a pre-AI engineering manager than it is to a pre-AI software engineer. This wasn't so much a barrier to me as I just, as I was previously an engineering manager. I try to follow. I follow the principle of minimum viable multiagent. I split out roles only once one of the agents in my swarm are too overwhelmed with messages to keep up. Here's how I got there. Stage one. Sea of tabs. Embracing multi-agent has changed how I think about agent memory and context management. Initially, I thought that agents should all more or less be, should be cattle, not sheep, or cattle, not pets, and they should all build, they should, and memories and relevant context bits should be captured from agent sessions to be recalled at appropriate time. But, Recall step is too unreliable and too expensive. In my multiagent setup, I instead keep a context graph. An agent graph, which really represents a context graph. Um... Contacts on agents is. Preserved through long-running sessions. The dispatcher. The root node of the graph is the most important, and the one I interact with the most. It receives status updates from all workers and managers. has the best sense of the overall picture of what I'm working on. As it gets overwhelmed. It splits tests into managers. Importantly, one of those managers is the manager of my multi-agent of Tombot itself. Feedback from me about a pattern or a habit that I don't like, that it's emerging. Uh, becomes either an agents dot MD update or a code change. This is crucial and something the agents don't natively do. What else would they ever talk about here? Multiagent development breaks the code review process. The human driven code viewer processed. There's the volume of code is simply too great for any human to keep up with. This naturally upsets people who are still either writing code by hand or driving each individual session themselves. They are, indeed, incompatible ways of working. But there's no law of the universe that says human code review is a prerequisite for good code. Rather than trying to salvage human code review. I think the path to reliability is agent bureaucracy, burdensome, predeploy, validations, checks, and tests. Catch real bugs. The good news is. Other tools are available. Agents, which I bundle under a category of agent bureaucracy. pre-deployed checks, staging workflow tests. Any combination of an agent will happily churn through a laundry list of pre-deployed checklists, strict code linters, and pre-praud validations without complaint. autonomously, these catch real bugs, no to an extent that no human would ever put up with. This plus agent driven code review is the path reliability with agents. Scheduled checks. Challenge of multi-agent development is keeping it coherent view on what work is happening. This is the role of chief of staff, dispatcher, route agent. And ultimately, the rate limiter on how big an agent's form can be well effectively, still effectively shipping code.



I have, after a period of resistance, adopted a multi-agent setup for my work, and it's difficult to see going back. I've been skeptical of token maxing tools like Gas Town, whose created admits was mostly used to build itself[^1]. But models are now good enough to do autonomously and productively work for long periods of time. My effort goes towards keeping the fleet on track, and increasing the number of agents doing high quality work.

Rather than pitch yet another agent orchestrator[^1] to you, I'll go through how I landed here, what components of multi agent orchestration are important, and what capabilities I'm reaching for next.

# The journey to multi-agent

## Stage 1: Sea of iTerm tabs

AI allows me to make progress on several tasks at once, which I started by managing a sea of iTerm windows. This quickly got difficult to manage. For one, some tasks are long running, and I didn't really need see them rather than the primary window I was working in. It was also lossy: accidentally closing a tab means resuming by fishing the session out of Codex, or was it Claude Code?

Even when keeping tabs running, it was not alwatys trivial to remember what each tab was working on.

## Stage 2: Tmux navigation, tracking session state, naming sessions

Enter the first iteration of Bot Manager. During some (mostly failed) memory experiments, I landed on an architecture I liked: running a background daemon to snoop on local harness logs and do useful stuff with them. I used this technique to track which sessions were active, run sessions in the background, and assign session names.

<!-- diagram: bot-manager -->

I stayed with this for several months, but eventually started to feel like a human bot nudger. Sessions would do some useful work, ask for a decision, and wait until I paged back to it. This dramatically improved my ability to find past sessions and maintain long running context.

## Stage 3: Auto-routing fixup prompts

My work began to feel like flipping through tabs providing individual nudges. I also had to issue lots of repetitive instructions around workflows for when to file tickets, when to mark a PR ready for review, and what kinds of checks I wanted run on different projects. I found myself in menial loops checking GitHub PR's, finding comments, and issuing requests to respond to feedback. I added a mechanical dispatch layer to detect PR comments or CI failures, then route them to the session that authored the PR.

<!-- diagram: bot-manager-2 -->


## Stage 4: An agent graph

Auto routing _helped_, but I began to find it difficult to enforce conventions for how a changes should be managed acros projects: how to create tickets, what checks to do in PR's, etc. I could add these by manually editing AGENTS.md, but I found this cumbersome.

I solved the problem by throwing AI at it. One single root node handles dispatch, receives progress reports, nudges inactive agents. Manager nodes keep tickets up to date and handle decisions not worth escalating to root.

This has increased the number of concurrent sessions I feel confident in running to ~20. It also lent itself well to self improvement - as I encountered pain points or performance bottlenecks, I could simply dispatch feature requests through the root node.

Developing the TUI as a pi extension let me pretty easily add a scrollable sidebar to see what was being worked on at a glance.

One of the more helpful features I converged to was scheduled prompts. After a change is deployed, I'm able to say things like "monitor xyz metric 3 times a day for two weeks, escalate to me if there are any problems".

# Out with memory, in with agent graph

My previous mental model of self-improving agents was _memory_. In this model, agents are cattle not pets. They boot up, load necessary context from a pool of memory, do work, and contribute back to the memory pool:

<!-- diagram: memory pool -->

But managing context via memories is _hard_. It's difficult for an agent working on a narrow task to determine what broader context that task informs. The most useful context from a task session is what the status of the task is, but that information is useful for a very short amount of time, and quickly gets stale.

Even given a set of ideal memories, it's also difficult to build an effective recall system. Some tasks are one offs with very little outside context required, others interact with other ongoing work.

An agent fleet structured as a graph solves this problem much better. A central dispatcher node maintains high level awareness of what work is happening, and maintains a sense of what context a worker needs. Status updates are delivered to the dispatcher, which then reacts and discards them.

<!-- diagram dispatcher -->

# Tension, human code review, and agentic beauracacy

Working in this way is more similar to a pre-AI engineering manager than a pre-AI software engineer. There's less technical growth, less in depth understanding of the code.

It also breaks traditional code review. The scale of code being produced is too much to ask human collaborators to review. It's natural for someone who reviews PR's themselves to feel resentment at being asked to review a firehose of AI generated code the author didn't read closely.

I don't disagree. Human code review of multi-agent produced code is untenable. I also don't think it's _necessary_.

The solution is twofold, AI code review (which to my surprise is _really good_), and what I call _agentic beauracracy_: a laundry list of pre-merge and/or pre-deploy verifications that an agent is forced to do.

In an ideal world, we'd all abide by strict linters, pre-deploy staging tests, careful canary deploys, and careful rollout metric inspection. But these tax velocity and annoy humans. There's a limit to how much mundane verification work a human will put up with before getting a change into prod.

Not so for bots. Your pre-merge, pre-deploy checklists can no be unbounded, and an agent will churn through it without complaint.

# Change

Changing development processes to accomodate multi-agent fleets doesn't make it mesh better with human development. It makes it worse. Ultimately organizations will have to pick an approach. This is, obviously the biggest change to software engineering of my career.

But becoming a software engineer meant signing up for rapid change, whether we acknowledge it or not. 





This approach does not coexist easily with teammates who write code by hand or drive each worker session themselves. The code output is




[^1]: I'm a bit skeptical Yegge's recent assertions that his new, unreleased token maxing tool is actually *very good*/

[^1]: The code for this tool belongs to my company, but can be easily open sources. If you're interested email me at tombedor.dev and I'll follow up with a release.

[^2]: Bot Manager 2 never really got off the ground. It's essentially the same as Bot Manager 3, with a web UI I never ended up using.
