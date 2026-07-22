---
title: The Arguments Against Open Source AI are Very Bad
date: 2026-07-21
draft: true
---

The release of Kimi K3 has opened a fresh round of angst and confused discourse. There's a loud cohort of journalists, business leaders, and politicians arguing that open source AI is a dangerous threat. OpenAI's Dean Ball:

> One probable outcome of an open-weight-model-dominant world is full AI communism... rather than a market product, AI is a "public good"

Freely available AI for anyone? The horror!

I want to address some bad arguments against open source AI, but some corrections on how the argument is being framed are in order.

# Things talking heads are missing

## Open source software is the foundation on which commercial software is built

AI models are, at the end of the day, _software_. In Ball's framing, there's a dichotomy between free (Communist! Bad!) AI and proprietary (Capitalist! America! Good!) software. The reality is that proprietary software is built on top of open source, given away by maintainers for free. This isn't charity!

<!-- stack of programs diagram -->

A software program is a stack of programs. To build Uber, you need programming language frameworks, software to send and recieve web traffic, data analysis tools, and countless other components. Most of these are not differentiators for a commercial enterprise, so it serves commercial actors to share lower components and compete on the pieces that actual differentiate their product.

Frontier labs would _very much_ like AI models to _not_ fall into the category of "so commonplace that it doesn't make sense to compete on". Whether this will be the case remains to be the case.

## Open source software is very difficult to regulate

David Sack's accurately characterized advocay of open source AI as an attempt to regulatory capture. Frontier providers are arguing that we should open the AI Pandora's Box, but only a little, and with responsible gatekeepers (aka, toll collectors) (aka, them).

Even if we accept the premise that open source AI should be banned, my message to regulators is: Good luck! Open source software is _very resilient_ to regulatory suppression, especially when it's use does not need network access..

Cryptographyy, bittorrent

Even if we narrow the regulatory target to "Chinese" models, regulators will have a difficult time. What, exactly, makes an AI model Chinese?

<!-- whats a chinese model? -->

## Open source AI is not just a Chinese phenomenon

There's an assumption baked into the open source AI debate that open source models is something that only the Chinese government has an incentive to develop. In reality there are many commercial actors with ample incentive to develop open source AI:

- Chip makers: Nvidia CEO Jensen Huang has described what Nvidia is building as “token factories”[^1]. Nvidia doesn't care if its chips are used to run frontier models or cheap open source models[^2] - it just wants to produce and generate demand for as many tokens as possible. And indeed Nvidia has itself released a suite of open source models.
- Startups: (American company) Thinking Machines Labs recently released a frontier-grade open source model. They and others are betting that models will be commoditized, and a defensible moat can be built around auxilery services that complement or customize models.
- Non-AI enterprises: Frontier model customers aren't currently all that active in open source AI development, but they will be. They'll be motivated by:
    - Cost: Enterprise spending management on AI is currently in it's infancy, in general limited to crude spending caps. These customers are already working on cost controls via intelligent routing based on task complexity. In the future, it will serve them to customize open source models to handle bespoke, low complexity tasks cheaply
    - Control: Anyone maintaining an actively running, customer facing AI product has a problem: the product's behavior can change wildly if the underlying model changes. These companies will be motivated to develop customized models they fully control.
- BigCo's: You can be sure that Google and Meta are watching OpenAI's new [ad product](https://ads.openai.com/) closely. Should frontier model ad products gain traction, it would be well worth it for these behemouths to commoditize ad-free, open source models to squash ad competition.


[^1]: Quote taken from Derek Thompson's recent [article](https://stratechery.com/2026/whos-afraid-of-chinese-models/) on Chinese AI. Which gets a few things wrong:
[^2]: Ok, it cares a _little_ - the ocean of capital going to train frontier models is certainly a good thing for Nvidia. But in the long run, if commercial token demand is replaced by demand for open source tokens, Nvidia still wins.

## The open source threat to frontier labs is real

Derek Thompson's [article](https://stratechery.com/2026/whos-afraid-of-chinese-models/) gets a few things backwards about the frontier labs' position with respect to open soure models:

 > whoever is on the frontier is the best placed to dominate non-frontier markets as well, which are just the frontier minus n-months, i.e. months in which the frontier model makers have been optimizing their cost of serving.

 It's highly unclear why this should be the case.

 > It’s striking the extent to which Claude Code and Codex are proving to be quite sticky; whichever harness you start working with is likely to be the one you stick with

 It's unclear where he's getting this information. Claude Code and Codex are sticky in the way that Coke and Pepsi are sticky: once you choose one, there's not much reason to switch. But this assumes similar cost and quality. In reality, coding agents have no moat (link to my post). It takes a very small inconvenience to motivate users to switch agents, whether that be price difference, model quality, or reliability issues.

 If a cheaper, good-enough model comes, users will switch to it, and changing model harness will not be a major impediment.

## The "AI race" is... What exactly is the AI race, exactly?

Much of the angst around China's models center on "losing the AI race". But what's the goal of this race? Is it to develop the best model? To sell the most tokens?

In reality, talking about the "AI Race" doesn't make more sense than talking about the "Internet Race". We're not competing to be the first to send a rocket to the moon, we're reacting to a new, transformational technology. To the extent there's a race between nations, it's to abosrb this transition and grow economies. In this framing, free AI models are a boon, not a threat.

# Bad arguments to fear Chinese AI models

## They're "AI dumping"

Scott Galloway has argued that free Chinese AI is an attempt to eliminate competitors in the long run:

>  This is what China did to solar panels, steel, EVs, and batteries. First, they match Western quality, or they don't even match it. 89%. Close. Actually, match it with cars, they've matched it, but go ahead. Then they cut the price by two thirds, then they own the market.

But apart from chips, AI isn't a physical good. Solar panels and steel require capital heavy supply chains, each link of which cannot easily exist on it's own. If no one is manufactoring solar panels in your country, it's difficult to develop a business selling <!-- some example component of solar panels -->

<!-- diagram: software vs solar panels -->

Software isn't like that. An open source model coming from China doesn't prevent a fine-tuning business from succeeding in the US - quite the opposite.

## They will spread propaganda

## They will add backdoors

- Asymmetry of vulnerabilities (irony of openai having to use open source ai models)
- easy inspection and customization of open source models
- pandora's box

# Open source AI is coming

It doesn't matter much what policy makers or business leaders want: open source AI is too powerful, and too difficult to control. It's coming, and attempts to squash it will not amount to anything more than noise along the way.




- efforts to regulate open source cryptography



- ai communism
    > “One probable outcome of an open-weight-model-dominant world is full AI communism, which is precisely what China proposes: rather than a market product, AI is a ‘public good’ which will ultimately be provided by the state as a kind of ‘digital public infrastructure,’” Dean Ball, OpenAI’s head of strategic futures, said in an X post Friday.
- "AI dumping" galloway quote on chinese

- derek thompson
    - > whoever is on the frontier is the best placed to dominate non-frontier markets as well, which are just the frontier minus n-months, i.e. months in which the frontier model makers have been optimizing their cost of serving.
    - quote about stickiness
- "AI communism!"
    - some trump guy made this quote
- "They will corner the market"
- "They will spread propaganda"
- "They will add backdoors"

