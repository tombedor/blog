---
title: Coding agents have no moat
date: 2026-04-24
draft: true
---

It's been a rough few weeks for Anthropic.

It started out well they have a brand new model, Mythos, that's so powerful that figures up through Jerome Powell had meetings with them to talk about safety. This seemed to be a zero day apocalypse in the making, and they were doing the right things.

This narrative by several very clumsy mistakes. First, they leaked the entire source code of Claude Code. Then, some users were able to access Mythos early by successfully guessing API url. Sophisticated attacks these were not, and it begged the question: if Mythos is so powerful for finding software exploits, why wasn't Anthropic able to avoid very simple mistakes?

Separate mistakes garnered user backlash. Anthropic [bannedf OpenClaw usage](https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fwww1lgui12tg1.jpeg), then [walked that policy back](https://docs.openclaw.ai/providers/anthropic). Complaints about strict rate limits are getting louder, and with them questions about how well Anthropic can support demand. In the midst of this, they [conducted a bizarre A/B experiment in which 2% of new signups to their basic subscription were denied access to Claude Code](https://x.com/TheAmolAvasare/status/2046724659039932830?s=20).

As many pointed out, this is a puzzling experiment. Removing Claude Code from the basic plan is a *major* policy shift, not a tweak on the look of a landing page. Surely those new users unlucky enough to get denied access to Claude Code would react with confusion and anger, given the high visibility of Claude Code?

Anthropic's [response](https://x.com/TheAmolAvasare/status/2046724659039932830?s=20) sought to reassure users that *existing* base plan subscriptions would not lose access to Claude Code, *yet*. This garnered understandable skepticism.

## The cost of switching coding agents is zero, despite provider's best efforts

I've been increasingly hit with Claude Code rate limits, and have switched the bulk of my work to Codex. It's striking how little I had to change about my workflow. I lost some conveniences like dispatching coding agent session from my phone, but overall it only took a *minor inconvenience* for me to switch providers, with no adjustments to how I used the tools.

OpenAI appears to have seen the no-moat problem first, as evidenced by efforts to shift usage from the interoperable ChatCompletions API. First, there was the Assistants API (link to announcement), which shifted responsibility for storing chat messages to themselves rather than callers. When that didn't work, they announced the Responses API (linked to announcement). Neither appears to have gained much traction.

Anthropic has sought to make their workflow product more unique by offering more work-oriented features. BUt these don't represnt a real moat: the user still owns the code/data. Workflow convenience functionality can be quickly replicated, both by rival commerical operators and by open source - it's worth noting that Claude Code itself appears to be largely based on the still-active open source project [Aider](https://aider.chat/).

## How to future proof

![humans](/diagrams/coding-agents-have-no-moat/humans.png)

I think the best way guard against vendor lockin for LLM's is to _optimize for humans_ (optimize for humans post). If an agent can run a script or access a doc, can a human do it just as easily? I think this strategy is the most efficient way for humans to leverage agents: the agent should conform to the human, not the other way around. This also provides future proofing: if a human can access your LLM facing scripts and documentation, it'll likely be quite easy to having a new coding agent enter the mix.


