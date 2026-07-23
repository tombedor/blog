---
title: The Arguments Against Open Source AI are Very Bad
date: 2026-07-21
draft: true
---

The release of Kimi K3 has opened a fresh round of angst and confused discourse. There's a loud cohort of journalists, business leaders, and politicians arguing that open source AI is a dangerous threat. OpenAI's [Dean Ball](https://x.com/deanwball/status/2078133895766114412):

> One probable outcome of an open-weight-model-dominant world is full AI communism... rather than a market product, AI is a "public good"

Freely available AI for anyone? The horror!

Frontier labs' case against open source AI is essentially: Open source models[^1] are dangerous (_and un-American!_). We should open the AI Pandora's Box, but only with responsible gatekeepers (_toll collectors, preferably us!_). Only trusted users (_our most profitable customers_) should be able to use it.

[^1]: I'll use the terms "open source model" as in, "open weights model".

I want to address some bad arguments against open source AI, but some corrections on how the argument is being framed are in order:

### Open source software is the foundation for commercial software

Ball's framing strolls past the fact that _open source software is the foundation of all proprietary software._ This includes frontier models, which at the end of the day are software products.

Open source software is counterintuitive to people outside of the software industry. Why work hard on a product, and give it away for free?

A software program is a stack of programs, with each layer built on top of another. To build Uber, you need programming language frameworks, software to send and recieve web traffic, data analysis tools, and countless other components. Most of these are not differentiators for a commercial enterprise, so it serves commercial actors to cooperate on lower components in the stack and compete on the higher level pieces that actual differentiate their products.

![software stack](/diagrams/arguments-against-open-source-ai-are-very-bad/stack.png)

Frontier labs would _very much_ like AI models to _not_ fall into the category of "so commonplace that it doesn't make sense to compete on". Whether this will be the case remains to be the case.

### Open source software is very difficult to suppress

In reality, the argument about suppressing open source models is irrelevant. History tells us that suppression of open source software is _extremely_ difficult, and attempting to do so only serves to weaken comapnies against international competitors. A brief history of encryption is illustrative:

Today, **PGP** is a commonplace tool anyone can use, and most devs are at least familiar with. But when Phil Zimmermann invented it in 1991, the U.S. government considered encryption a "weapon of war". A criminal investigation was opened against Zimmermann.

When Netscape created **SSL**, the U.S. government allowed it to only release a weakened version of it internationally. These controls backfired: it was much easier to acquire the weakened, "international" version, so even most Americans used it.

Export controls did not succeed in limiting encryption as the government wished. SSL, PGP, and similar tools were readily available throughout the world, and the controls disadvantaged Americans. Eventually, Zimmermann's release of PGP was ruled to be protected speech, and the U.S. government relaxed encryption export controls.

---

Narrowing suppression to "Chinese" models won't make things easier. What, exactly, makes an AI model Chinese? Is it Chinese if, as frontier models alledge, it was distilled from American models? What about if an American fine-tunes a Chinese model? At best, regulating AI in this way will (temporarily) encumber Americans with red tape and diminished AI access relative to the rest of the world.


### Open source AI is not just a Chinese phenomenon

There's an assumption baked into the open source AI debate that open source models is something that only the Chinese government has an incentive to develop. In reality there are many commercial actors with ample incentive to develop open source AI:

- **Chip makers**: Nvidia CEO Jensen Huang has described what Nvidia is building as “token factories”[^2]. Nvidia doesn't care if its chips are used to run frontier models or cheap open source models[^3] - it just wants to produce and generate demand for as many tokens as possible. And indeed Nvidia has itself released a suite of open source models.
- **American Startups**: Thinking Machines Labs recently released a frontier-grade open source model. They and others are betting that models will be commoditized, and a defensible moat can be built around auxilery services that complement or customize models.
- **Enterprises AI users**: Frontier model customers aren't currently all that active in open source AI development, but they will be. They will want lower-cost models for low-complexity tasks, and more fine grained control over customer facing features.
- **BigCo's**: You can be sure that Google and Meta are watching OpenAI's new [ad product](https://ads.openai.com/) closely. Should frontier model ad products gain traction, it would be well worth it for these behemouths to commoditize ad-free, open source models to squash ad competition.


[^2]: Quote taken from Derek Thompson's recent [article](https://stratechery.com/2026/whos-afraid-of-chinese-models/) on Chinese AI. Which, while we're here, gets a few things wrong:
    > whoever is on the frontier is the best placed to dominate non-frontier markets as well, which are just the frontier minus n-months, i.e. months in which the frontier model makers have been optimizing their cost of serving.

     It's unclear why this should be the case. Their access to massive capital does not advantage them as much in the development of small models, and they lack incentive to do so rather than push users to their more expensive models.

     > It’s striking the extent to which Claude Code and Codex are proving to be quite sticky; whichever harness you start working with is likely to be the one you stick with

     Claude Code and Codex are sticky in the way that Coke and Pepsi are sticky: once you choose one, there's not much reason to switch. But this assumes similar cost and quality. In reality, coding agents have no moat (MAKE THIS A LINK TO MY POST ABOUT NO MOAT). It takes a very small inconvenience to motivate users to switch agents, whether that be price difference, model quality, or reliability issues.

[^3]: Ok, it cares a _little_ - the ocean of capital going to train frontier models is certainly a good thing for Nvidia. But in the long run, if commercial token demand is replaced by demand for open source tokens, Nvidia still wins.


### The "AI race" is... What exactly is the AI race, exactly?

Much of the angst around China's models center on "losing the AI race". But what's the goal of this race? Is it to develop the best model? To sell the most tokens? To destroy humanity first?

Talking about an "AI Race" doesn't make more sense than talking about an "Internet Race". We're not competing to be the first to send a rocket to the moon, we're reacting to a new, transformational technology. To the extent there's a race between nations, it's to abosrb this transition and grow economies. In this framing, free AI models are a boon, not a threat.

## Bad arguments to fear Chinese AI models

### China is "AI dumping!"

[Scott Galloway has argued](https://open.spotify.com/episode/2ulNXWCIYUNx6yE97kmrIC?si=19b6242c57ad49fa) that free Chinese AI is an attempt to eliminate competitors in the long run:

>  This is what China did to solar panels, steel, EVs, and batteries. First, they match Western quality, or they don't even match it. 89%. Close. Actually, match it with cars, they've matched it, but go ahead. Then they cut the price by two thirds, then they own the market.

But apart from chips, AI isn't a physical good. Solar panels and steel require physical supply chains, each link of which cannot easily exist on it's own. If no one is manufactoring solar panels in your country, it's difficult to develop a business selling solar-grade silicon wafers.

Software isn't like that. An open source model coming from China doesn't prevent a fine-tuning business from succeeding in the US - quite the opposite!

### They will spread propaganda!

It's not unreasonable to assume that Chinese models will be shipped with a pro-China point of view. But this is not a reason to suppress them. _The models are open source!_ If any American has an issue with the political slant of Chinese AI models, they are free to change and release an "Americanized" one. At least within the U.S., it's difficult to forsee a model seen as having a distorted pro-China bias outcompeting a substantially similar model with a distorted pro-U.S. bias.

### They will add backdoors!

The finding and patching of software vulnerabilities is a cat and mouse game that will never end. AI does not change the basic market for vulnerabilities: responsible actors patch them, attackers exploit them. Limiting tools for responsible actors only serves attackers.

It's theoretically possible for a bad actor to embed hidden adversarial behavior in a model. But if this happens, it serves the interest of responsible actors to find these exploits as soon as possible, and the best way to do this is to let anyone who wants to inspect them.

## Open source AI is coming

It doesn't matter much what policy makers or business leaders want: open source AI is too powerful, and too difficult to control. It's coming, and attempts to squash it will not amount to anything more than noise along the way.
