# Research Brief: A History of Political Spam in the United States

**Scope:** U.S. political mass outreach from print to conversational AI; foreign use; political/commercial law; and cost per contact. Costs are nominal unless marked otherwise.

## Findings

- **Recurring pattern:** each new medium makes reach cheaper, faster, more targeted, or more intimate before consent norms and law adapt. The useful line is **pamphlet/partisan press → direct mail → phone bank/robocall → email/social bot → P2P text → LLM conversation**.
- **Preferential-treatment hypothesis: often, not always.** Politics has received (1) affirmative public subsidies/access, (2) exclusions from commerce-focused consumer law, and (3) heightened First Amendment solicitude. But the TCPA protects cellphone privacy against political artificial/prerecorded calls too, and election/FARA rules burden political speech in ways ordinary commercial speech is not burdened.
- **What LLMs change:** not cheap prose, but individualized, indefinite dialogue without restoring one human per conversation. At current API prices, model inference can be cheaper than the SMS carrying the reply.

## Technology, Politics, and Cost

| Era / channel | Political affordance and evidence | Approximate cost per 1,000 attempts |
|---|---|---:|
| 1760s–1800s print/post | Pamphlets and partisan papers scaled arguments. The 1792 postal law charged newspapers 1–1.5 cents and let printers exchange papers free to foster an informed electorate. ([LOC](https://www.loc.gov/exhibits/bay-psalm-book-and-american-printing/online-exhibition.html); [USPS](https://about.usps.com/who/profile/history/periodicals-postage-history.htm)) | **$10–$15 postage** in 1792, excluding printing; roughly **$350–$520** in 2026 purchasing power (highly approximate). |
| 1950s–1980s direct mail | Computerized lists joined persuasion, testing, fundraising, and durable donor ownership. ([Johnson](https://academic.oup.com/book/27768/chapter-abstract/198005508); [Moriyama](https://www.jstor.org/stable/j.ctv2n4w5r7)) | Recent nonprofit postage alone about **$140–$250**; 2026 vendor all-in range **$300–$1,250+**. |
| 1960s–present phone | Voter files enabled targeted phone banks; recordings then separated voice from labor. In 1986 the GOP planned 2m automated Reagan calls within a $10m program. ([Washington Post](https://www.washingtonpost.com/archive/politics/1986/10/21/hired-hands-are-busy-dialing-as-gop-calls-for-big-turnout/5db45c13-debb-4fbe-85c2-d11de931d454/)) | 1986 paid callers: **$5–$6/hour**. 2008 robocall vendors: **$10–$20** per 1,000. ([CRS](https://www.everycrsreport.com/reports/RL34361.html)) |
| 1998–present email | Near-zero marginal distribution, instant testing and fundraising. In 2003, 74% of users called unsolicited political email spam. ([Grossman](https://btlj.org/data/articles2015/vol19/19_4/19-berkeley-tech-l-j-FM-1157-1575.pdf); [Pew](https://www.pewresearch.org/internet/2005/03/07/the-politics-of-spam/)) | Commodity delivery around **$0.10–$0.25**, excluding lists, staff, and deliverability. |
| 2000s–present social/bots | Algorithmic amplification, fake identities, paid microtargeting, and peer-like distribution; Russia’s IRA combined all four in 2016. ([DOJ](https://www.justice.gov/archives/sco/file/1035477/dl)) | No honest universal unit: organic posts, ads, accounts, and human operators buy different outcomes. |
| 2016–present P2P SMS | A private, high-attention channel with assembly-line human initiation; 12 volunteers sent 10,000 texts in under an hour in 2018. ([TIME](https://time.com/5432309/politician-campaigns-midterm-election-text-messages/)) | Current published campaign rate about **$15–$35** per 1,000 SMS segments, before data/setup. |
| 2024–present LLM chat | Adaptive replies, translation, objection handling, and selective identity disclosure at bulk scale. Foreign use has accelerated existing operations more than transformed reach. ([ODNI](https://www.dni.gov/files/FMIC/documents/ODNI-Election-Security-Update-20240923.pdf)) | Illustrative 5k-input/1k-output exchange: about **$0.50–$10** per 1,000 chats for model tokens, plus delivery, data, tooling, safety, and humans. |

**Do not compare these as cost per persuaded voter.** Historical figures mix postage, calls placed, messages sent, and program budgets; nonresponse and duplication vary enormously. See [economics.md](./economics.md).

## Why Politics Gets Special Treatment

- **Democratic self-government:** Washington praised the 1792 post for spreading “political intelligence”; Congress subsidized news so citizens could judge public affairs. Modern broadcast law similarly requires reasonable candidate access and, shortly before elections, the lowest rate sold to favored commercial advertisers. ([Washington](https://prod.millercenter.org/the-presidency/presidential-speeches/november-6-1792-fourth-annual-message-congress); [FCC](https://docs.fcc.gov/public/attachments/DOC-307406A1.pdf))
- **Core speech:** lawmakers and courts treat political advocacy as central First Amendment activity while commercial speech receives less protection. CAN-SPAM’s history expressly avoided political, news, personal, and charitable email.
- **Competition/access:** legislators argued that cheap unsolicited email lets unknown challengers reach voters and that annoyance will discipline senders. Grossman’s critique: incumbents benefit too, recipients bear the sorting cost, and a content-neutral consent rule need not suppress viewpoints.
- **Definitions, not immunity:** CAN-SPAM covers primarily commercial email; the FTC Do Not Call regime covers sales telemarketing. Political messages usually fall outside those definitions. By contrast, candidates get an actual preference in broadcast pricing and specified party committees can use nonprofit postal rates without being nonprofits.
- **Counterexamples:** political artificial/prerecorded calls to cellphones generally still need consent; *Barr v. AAPC* preserved that content-neutral protection. Foreign-source bans, sponsor disclaimers, FARA labels, and state election-AI rules single politics out for added controls.

See [preferential-treatment.md](./preferential-treatment.md) and [law-and-foreign-influence.md](./law-and-foreign-influence.md).

## Foreign Actors and Law

- **Continuity:** Genêt’s 1793 popular appeal, German/Nazi print networks, Russia’s 2016 fake-American social operation, and recent Russian/Iranian AI use all exploit the newest route around trusted gatekeepers. The deception shifted from hidden patronage to synthetic identity and personalized output. ([State Department](https://history.state.gov/milestones/1784-1800/citizen-genet); [DOJ FARA history](https://www.justice.gov/archives/usam/criminal-resource-manual-2062-foreign-agents-registration-act-enforcement))
- **Federal baseline:** political email is generally outside CAN-SPAM but >500 substantially similar committee emails need an FEC sponsor disclaimer; political calls are outside the FTC Do Not Call Registry but not the TCPA; *Duguid* narrowed “autodialer,” helping list-based/P2P text systems; AI voices count as artificial voices. ([FEC](https://www.fec.gov/help-candidates-and-committees/advertising-and-disclaimers/); [FCC](https://docs.fcc.gov/public/attachments/FCC-24-84A1_Rcd.pdf))
- **Foreign line:** foreign nationals may engage in genuine issue advocacy but cannot spend or direct election activity; agents of foreign principals may owe FARA registration and conspicuous labeling. ([FEC](https://www.fec.gov/updates/foreign-nationals/); [DOJ](https://www.justice.gov/nsd-fara/frequently-asked-questions))

## Best Prior Art / Interview Thesis

- Closest exact work: Seth Grossman, “Keeping Unwanted Donkeys and Elephants Out of Your Inbox” (2004). Best broader works: Finn Brunton, *Spam*; Dennis Johnson, *Democracy for Hire*; Nadine Moriyama, *Empire of Direct Mail*; Samuel Woolley, *Manufacturing Consensus*. See [prior-art.md](./prior-art.md).
- **Thesis:** Political spam is what happens when the cost of reaching one more voter collapses faster than consent norms and law can adapt; American law often tolerates that intrusion in the name of an informed electorate and open political competition, but it has never done so uniformly.
