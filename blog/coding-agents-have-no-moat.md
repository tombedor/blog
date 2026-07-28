---
title: Coding agents have no moat
date: 2026-04-24
authors: [tom]
image: /diagrams/coding-agents-have-no-moat/humans.png
---

It's been a rough few months for Anthropic.

It started out well. Their new model, according to them, was so powerful that they had concerns about releasing it, due to its hacking ability.

This narrative was undermined by several very clumsy mistakes. First, they leaked the [entire source code of Claude Code](https://www.zscaler.com/blogs/security-research/anthropic-claude-code-leak). Then, some users were able to [access Mythos early by successfully guessing an API URL](https://www.wsj.com/tech/ai/anthropic-probes-possible-unauthorized-access-to-mythos-ai-model-3da1ee20). Sophisticated attacks these were not, and it begged the question: if Mythos is so powerful for finding software exploits, why wasn't Anthropic able to avoid very simple mistakes?

Separate mistakes garnered user backlash. Anthropic [banned OpenClaw usage](https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fwww1lgui12tg1.jpeg), then [walked that policy back](https://docs.openclaw.ai/providers/anthropic). Complaints about strict rate limits are getting louder, and with them questions about how well Anthropic can support demand. In the midst of this, they [conducted a bizarre A/B experiment in which 2% of new signups to their basic subscription were denied access to Claude Code](https://x.com/TheAmolAvasare/status/2046724659039932830?s=20).

Removing Claude Code from the basic plan is a *major* policy shift, not a tweak on the look of a landing page. Surely those new users unlucky enough to get denied access to Claude Code would react with confusion and anger, given the high visibility of Claude Code?

Anthropic's [response](https://x.com/TheAmolAvasare/status/2046724659039932830?s=20) sought to reassure users that *existing* base-plan subscribers would not lose access to Claude Code, *yet*. This was met with understandable skepticism.

## Luckily, the cost of switching coding agents is zero

None of these incidents made me _mad_, but I have been increasingly hit with Claude Code rate limits. I've responded by switching the bulk of my work to Codex. It's striking how little I had to change about my workflow. I lost some conveniences like dispatching a coding-agent session from my phone, but overall it only took a *minor inconvenience* for me to switch providers, with no adjustments to how I used the tools.

{/* truncate */}

OpenAI appears to have seen the no-moat problem first, as evidenced by efforts to shift usage away from the interoperable Chat Completions API. First, there was the [Assistants API](https://openai.com/index/new-models-and-developer-products-announced-at-devday/), which shifted responsibility for storing chat messages onto OpenAI rather than the caller. When that didn't work, they announced the [Responses API](https://community.openai.com/t/introducing-the-responses-api/1140929). Neither appears to have gained much traction.

Anthropic has sought to make Claude more unique by offering more workflow enhancement features like [Cowork](https://support.claude.com/en/articles/13947068-assign-tasks-from-anywhere-in-claude-cowork). But these don't represent a real moat: the user still owns the code and data. Workflow convenience features can be quickly replicated, both by rival commercial operators and by open source - it's worth noting that Claude Code itself works very similarly to a still-active open source project that preceded it, [Aider](https://aider.chat/).

These tools are, at the end of the day, code editors, a category of software that has always had robust open source competition. Commercial vendors like Eclipse and JetBrains have made a living selling professional licenses, but they have done so by adding sophisticated tools for power users. The nature of coding agents undermines this strategy, since the entire value-add is that a complex interface is no longer necessary. All you need is to tell the agent what you want the program to do, in plain language!


## How to future-proof

If you are still worried about LLM vendor lock-in, I think the best way to guard against it is to [_optimize for humans_](/make-it-easy-for-humans/).

![Coding agents remain dependent on human direction and review](/diagrams/coding-agents-have-no-moat/humans.png)

If an agent can run a script or access a doc, organize your repos so that humans can do so just as easily. I think this strategy is the most efficient way for humans to leverage agents: the agent should conform to the human, not the other way around. This also provides future-proofing: if a human can access your LLM-facing scripts and documentation, it'll likely be quite easy to have a new coding agent enter the mix.


&nbsp;
