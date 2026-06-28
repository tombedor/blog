---
title: My First Encounter With a Political Spambot
date: 2026-06-26
---

import ScreenshotCarousel from '@site/src/components/ScreenshotCarousel';

I had my first encounter with a political spambot this week: a polite robot named Emma texted me wanting to talk about Israel.

<a className="screenshot-single" href="/diagrams/political-spam/spam-00.png">
  <img src="/diagrams/political-spam/spam-00.png" alt="Initial text from Emma asking to chat about U.S. and Israel efforts to reach peace with Iran." />
</a>

When I asked who she was, she first said she was with a group called "Friends for Peace," but her group's [website](https://allyvia.org/) is for an organization called Allyvia.

<!-- truncate -->

<a className="screenshot-single" href="/diagrams/political-spam/spam-01.png">
  <img src="/diagrams/political-spam/spam-01.png" alt="Emma says she is with Friends for Peace and links to Allyvia." />
</a>

## Testing spambot nonsense tolerance

At this point I decided to have a little fun. I turned the conversation towards polyamory, invited Emma to join my polycule[^1], and professed my love for her. Emma was not receptive!

[^1]: Disclosure: I am not, and have never been, a member of a polycule.

<ScreenshotCarousel
  images={[
    {
      src: '/diagrams/political-spam/spam-02.png',
      alt: 'Emma redirects questions about polyamory back to the U.S.-Israel relationship.',
    },
    {
      src: '/diagrams/political-spam/spam-03.png',
      alt: 'Emma responds to a polyamory argument by returning to Iran and U.S.-Israel security.',
    },
    {
      src: '/diagrams/political-spam/spam-04.png',
      alt: 'Emma responds politely to a profession of love and asks for an email address.',
    },
    {
      src: '/diagrams/political-spam/spam-05.png',
      alt: 'Emma refuses further personal conversation and again asks for an email address.',
    },
  ]}
/>

The convo seemed to be hitting a dead end, so I changed personas to a confused grandparent, which got better engagement from Emma.

<ScreenshotCarousel
  images={[
    {
      src: '/diagrams/political-spam/spam-06.png',
      alt: 'Emma responds literally to confusion about Israel, Slytherin, and Hogwarts.',
    },
    {
      src: '/diagrams/political-spam/spam-07.png',
      alt: 'Emma continues responding literally to confusion about Israel and fictional places.',
    },
  ]}
/>

I can't, of course, _prove_ that the responses here were LLM-generated. But the repetitive phrasing ("I'm here to listen"), guardrail behavior, and credulous responses to absurd personas give me high confidence that I've been chatting with an LLM.

## Who is Friends for Peace / Allyvia?

I couldn't find any online presence for "Friends for Peace". Allyvia's site gave some hints though:

_This material is distributed by Clock Tower X LLC on behalf of the State of Israel. Additional information is available at the Department of Justice, Washington, DC._

Entities doing political outreach on behalf of foreign governments must register as a foreign agent under [Foreign Agents Registration Act](https://www.justice.gov/nsd-fara). Clock Tower X LLC's [registration statement](https://efile.fara.gov/docs/7649-Registration-Statement-20250918-1.pdf) discloses it is controlled by [Bradley Parscale](https://en.wikipedia.org/wiki/Brad_Parscale) and working on behalf of [Havas Media](https://havasmedianetwork.com/), a media and communications agency. Havas is disclosed to be working on behalf of the State of Israel.

Havas is huge: [It has 23,000 employees and operates in 100+ countries](https://www.havas.com/who-we-are/our-mission/), and had €2.8B in revenue in 2025. It advertises LLM capabilities in [research](https://havasmedianetwork.com/news/why-the-future-of-ai-in-agencies-depends-on-culture-not-code/) and [media buying](https://pubmatic.com/news/pubmatic-havas-telefonica-launch-the-first-agentic-campaign/), and lists [AI chatbot development](https://lon.havas.com/inviqa/) as a capability.

Brad Parscale is (or was) a major MAGA figure: in 2016 he was the digital director for the Trump campaign, which infamously hired [Cambridge Analytica](https://en.wikipedia.org/wiki/Cambridge_Analytica). He was [named Donald Trump's 2020 campaign manager in February 2018](https://www.wired.com/story/brad-parscale-campaign-manger-trump-2020/), before being [fired in July 2020](https://www.pbs.org/newshour/politics/trump-replaces-campaign-manager-amid-sinking-poll-numbers).

It's all pretty confusing!

![web](/diagrams/political-spam/web.png)

## Is this legal?[^2]

[^2]: Disclosure: heavy LLM-based amateur lawyering ahead!

Under [TCPA](https://www.law.cornell.edu/uscode/text/47/227), cold texts require prior consent if automated. If the text is auto-generated, cold texts are allowed by TCPA so long as a human actually [pushes the send button](https://docs.fcc.gov/public/attachments/DA-20-670A1.pdf).

I think Emma's texts were being sent in this way. Her responses were sporadic - sometimes coming quickly, sometimes taking several hours.

The use of AI is a new element. There doesn't appear to be any federal laws around using LLMs to generate cold-text content. California, where I live, has stronger rules. The [Business & Professions Code § 17941](https://law.justia.com/codes/california/code-bpc/division-7/part-3/chapter-6/section-17941/) bans chatbots that pretend to be human to incentivize commercial transactions or influence elections.

In 2025 California passed [SB 243](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243), which requires clear disclosure when a reasonable person interacting with a companion chatbot could be misled into thinking it is human. However, this is more aimed at digital companions than marketing outreach.

Emma didn't exactly _deny_ she was an LLM, but so far she has not responded to direct questions about whether she is an LLM.

## Is this _good_?

I'll leave this to the reader. But polycule recruiters shouldn't hold their breath.
