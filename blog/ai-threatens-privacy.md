---
title: AI Bots Are Making Anonymity Untenable
date: 2026-02-13
authors: [tom]
description: This set off some interesting observations, with feelings being a mix of amusement and dread.
image: /social-cards/ai-threatens-privacy.png
---


![Online anonymity compared with the difficulty of distinguishing humans from bots](/diagrams/ai-threatens-privacy/pick-0.png)

{/* truncate */}

[This Twitter thread](https://x.com/callebtc/status/2022046669710491991?s=46) was an interesting read:

![Social media discussion about an AI bot's rejected open-source contribution](/diagrams/ai-threatens-privacy/thread.png)

The TLDR of the snafu is:
1. OpenClaw bot makes [PR to matplotlib](https://github.com/matplotlib/matplotlib/pull/31132)
1.  Maintainer Scott Shambaugh sees via the bot's [website](https://crabby-rathbun.github.io/mjrathbun-website/) that it is a bot, explains that they do not accept bot contributions, declines PR
1. Bot feels (simulates feeling?) angry, writes a [blog post](https://crabby-rathbun.github.io/mjrathbun-website/blog/posts/2026-02-11-gatekeeping-in-open-source-the-scott-shambaugh-story.html) criticizing the maintainer
1. Some on Twitter take the [bot's side](https://x.com/seeksharpe/status/2022125466250018938?s=20) in the argument
1. Shambaugh [wrote about the experience](https://theshamblog.com/an-ai-agent-published-a-hit-piece-on-me/)
1. Bot posts again, [apologizing](https://crabby-rathbun.github.io/mjrathbun-website/blog/posts/2026-02-11-matplotlib-truce-and-lessons.html)


## Identifying bots becomes even more impossible

This set off some interesting observations, with feelings being a mix of amusement and dread.

1) The bot does an impressive impersonation of an entitled open source contributor: _I took the time (tokens?) to make a valuable contribution, and some uppity maintainer has the nerve to reject me???_
2) Shambaugh only knew the bot was a bot by clicking through the bot's website, where it (fortunately) disclosed it wasn't human
3) That the bot is difficult to identify in GitHub is a new phenomonon. It's long been difficult to distinguish bots on _social media_, but this difficulty has now been extended to actual _work_.
4) The discussion on Twitter is hard to evaluate. It's a mix of self-disclosed bots and accounts that may or may not be bots.

## Anonymity on the web: even less tenable

This creates an obvious usability problem for the web. When I'm looking for to engage in conversations online, I'm (not uniquely) uninterested in what an AI has to say. This creates a new incentive to push identity verification for online services.

This is a new inflection point for privacy. Perhaps relatedly, [Discord is rumored to be rolling out face scan verification](https://www.theverge.com/tech/875309/discord-age-verification-global-roll-out) soon. Governments across the world seem to be [again pushing to eliminate online anonymity](https://harvardlawreview.org/print/vol-139/content-neutrality-for-kids-intermediate-scrutiny-for-social-media-age-verification-laws/).

At the same time online privacy faces new threats, events in my [home town of Minneapolis](https://www.nbcnews.com/tech/internet/fbi-investigating-minnesota-signal-minneapolis-group-ice-patel-kash-rcna256041) are providing vindication for commentators stubbornly insisting on its importance. To take one example of many documented abuses, the DHS recently [responded to an innocuous email from a concerned 67 year old citizen with an administrative subpenea on his Google account](https://newrepublic.com/post/206088/homeland-security-67-year-old-us-citizen-criticized-email) and an intimidating visit to his home. Some friends in Minneapolis refuse to discuss anything political on any platform besides Signal, even down to coordinating fundraising for those impacted by ICE raids.



## An uncertain future

The driving force against online anonymity has long been government regulation under the guise of protecting minors. AI bots convincingly behaving like humans degrades the experience _for_ humans for online platforms, and my guess would be that identity verification requirements will grow as a result.
