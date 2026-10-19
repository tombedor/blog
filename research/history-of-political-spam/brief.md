# Research Brief: Direct Political Spam in the United States

**Scope:** Unsolicited political messages delivered to a voter’s private communications endpoint: **telephone → email → SMS → AI-powered SMS**. Television/radio spots, display ads, and public social posts are comparison cases, not part of the main history.

## The Boundary

| Broadcast / placed advertising | Direct-to-voter outreach |
|---|---|
| Buys placement beside content or within a public feed | Uses an address or identifier tied to a person/household |
| One message for an aggregated audience | One delivery attempt per selected record |
| Recipient encounters it by consuming media | Message interrupts a private channel: ring, inbox, or notification |
| TV/radio spots, newspaper/display ads, promoted social posts | Calls/robocalls, email, SMS, conversational SMS; addressed mail is the physical precursor |

The useful definition is **unsolicited, substantially similar political messages sent in bulk to private endpoints**. A public bot post is propaganda or amplification; a bot that DMs a voter can be political spam. Addressed direct mail technically fits: an 1800 printed circular addressed Virginia voters, the Smithsonian calls an abolitionist mailing in 1835 America’s first direct-mail campaign, and a Free Soil Party circular was mailed in 1848. Between them, the [1835–1845 cheap-postage fight](./postal-reform-1835-1845.md) established a recurring bargain: Congress lowered the price of direct access while protecting the delivery monopoly, followed almost immediately by complaints about unwanted circulars. The main **electronic** story begins in 1908, when trade journals documented telephone GOTV and recorded campaign speeches. ([Library of Virginia](https://www.lva.virginia.gov/collections/virginia-print/imprints/1800.029); [Postal Museum](https://postalmuseum.si.edu/america%E2%80%99s-first-direct-mail-campaign); [USPS](https://about.usps.com/who/profile/history/pdf/advertising-mail-history.pdf))

## Four Technological Steps

| Channel | What changed | Evidence / approximate cost per 1,000 attempts |
|---|---|---:|
| **Telephone** | Campaigns could enter the home and elicit an immediate answer. Political GOTV calls and recorded speeches were documented in 1908; voter files later made phone banks targetable, and recordings separated voice from caller labor. | In 1986 the GOP planned 11m targeted calls, including 2m automated Reagan calls; live callers earned $5–$6/hour. By 2008 vendors quoted **$10–$20/1,000 robocalls**. ([1908 sources](https://earlyradiohistory.us/sec003.htm); [Washington Post](https://www.washingtonpost.com/archive/politics/1986/10/21/hired-hands-are-busy-dialing-as-gop-calls-for-big-turnout/5db45c13-debb-4fbe-85c2-d11de931d454/); [CRS](https://www.everycrsreport.com/reports/RL34361.html)) |
| **Email** | Marginal distribution cost approached zero. Messages became instantaneous, personalized, testable, forwardable, and continuous rather than election-season-only. | Grossman dates widespread U.S. political bulk email to 1998. In 2003, 74% of users called unsolicited political/advocacy email spam. Commodity transport is roughly **$0.10–$0.25/1,000**, excluding lists, staff, and deliverability. ([Grossman](https://btlj.org/data/articles2015/vol19/19_4/19-berkeley-tech-l-j-FM-1157-1575.pdf); [Pew](https://www.pewresearch.org/internet/2005/03/07/the-politics-of-spam/)) |
| **P2P SMS** | Software brought bulk throughput to a channel still perceived as personal while preserving a nominal human send step. The notification, sender ambiguity, and high open rate restore attention lost to email. | In 2018, about 12 volunteers sent 10,000 messages in under an hour. Current published campaign transport: approximately **$15–$35/1,000 SMS segments**, before data/setup. ([TIME](https://time.com/5432309/politician-campaigns-midterm-election-text-messages/); [rates](https://gotv.com/texting)) |
| **AI-powered SMS** | Automation moves from selecting and delivering a template to interpreting replies, probing, rebutting, translating, and sustaining distinct conversations. A mass sender can simulate the adaptive behavior of a caller without one human per thread. | Illustrative model inference for a 5k-input/1k-output exchange: **$0.50–$10/1,000**, often less than the SMS transport. Public evidence of deployed unsolicited U.S. LLM persuasion remains case-based; the local “Emma” transcript suggests chatbot behavior but does not prove model architecture. ([ODNI](https://www.dni.gov/files/FMIC/documents/ODNI-Election-Security-Update-20240923.pdf); [local note](../political-spam/transcript-ocr.md)) |

The sequence is: **human conversation → automated playback → near-free template delivery → software-assisted personal-channel delivery → automated adaptive conversation**.

## Preferential Treatment: Often, Not Uniformly

- **Live calls:** political solicitations fall outside the FTC Telemarketing Sales Rule and National Do Not Call Registry because those rules govern sales/covered charitable telemarketing—not advocacy. This is statutory noncoverage, not a universal political immunity.
- **Robocalls:** political artificial/prerecorded voice calls to cellphones generally still require prior express consent. Commercial calls require the heightened written form. *Barr v. AAPC* preserved this content-neutral privacy protection.
- **Email:** pure political email generally falls outside CAN-SPAM, whose history expressly avoided political, news, personal, and charitable messages. Federal committees must instead identify the sponsor on more than 500 substantially similar emails.
- **SMS:** *Facebook v. Duguid* narrowed “autodialer” to systems using random/sequential number generation. Campaigns working from voter lists and P2P workflows often fall outside that equipment definition; this is a technical opening, not a political exemption.
- **AI SMS:** no general federal rule makes every text chatbot disclose itself. Delivery-channel rules, FEC disclaimers, fraud/impersonation and voter-suppression law, FARA, state bot/deepfake laws, and carrier rules may still apply.

See [preferential-treatment.md](./preferential-treatment.md) and [law-and-foreign-influence.md](./law-and-foreign-influence.md).

## Foreign Actors

- Foreign nationals cannot spend or direct activity connected to U.S. elections but may conduct genuine issue advocacy; agents of foreign principals may separately owe FARA registration and conspicuous labeling. ([FEC](https://www.fec.gov/updates/foreign-nationals/); [DOJ](https://www.justice.gov/nsd-fara/frequently-asked-questions))
- Most documented Russian/Iranian generative-AI operations have used models to accelerate drafting, translation, fake biographies, research, and social content—not demonstrated mass LLM-to-voter SMS persuasion. ODNI’s 2024 assessment was acceleration, not revolution.
- The interview case matters precisely because it may bridge that evidence gap: direct delivery plus adaptive dialogue plus obscured or delayed identity. Attribute only what the transcript proves.

## Costs and Budget Caveat

Compare **attempted contacts**, not ads or impressions. Calls, emails, SMS segments, and multi-turn conversations still differ in delivery, answer, and persuasion rates. Campaign filings do not provide a reliable historical “direct contact share”: direct mail may be fundraising, SMS can sit inside a vendor bill, staff may answer several channels, and most 2006–2016 presidential expenditures in one review were not consistently classified. Earlier TV-budget percentages answer a different question and are retained only as contrast in [economics.md](./economics.md).

## Best Prior Art / Interview Thesis

- Closest exact work: Seth Grossman, “Keeping Unwanted Donkeys and Elephants Out of Your Inbox” (2004). Dennis Johnson supplies phone-bank history; Finn Brunton supplies spam theory. See [prior-art.md](./prior-art.md) and [timeline.md](./timeline.md).
- **Thesis:** Political spam is the history of campaigns acquiring cheaper and more automated access to private channels. The LLM is not another broadcast medium; it turns the economics of a phone-bank conversation into the economics of a text blast.
