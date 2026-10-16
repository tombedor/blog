# Source Note: The Falling Cost of Political Outreach

## How to Compare Unlike Media

Use **cost per 1,000 attempted deliveries** only as a rough measure of distribution economics. Keep separate:

1. **production** — printing, recording, writing, model inference;
2. **distribution** — postage, call minutes, email/SMS fees, ads;
3. **targeting** — lists, enrichment, registration, data hygiene;
4. **response** — volunteers, agents, safety review, human handoff; and
5. **outcome** — delivered, read/answered, replied, persuaded, donated, or voted.

An email “send,” a postcard delivery, a robocall dial, and a live conversation are not equivalent units. Cost per persuaded voter would be better, but comparable historical conversion data do not exist.

## Benchmarks

| Medium | Date / evidence | Nominal cost | Per 1,000 attempts | What is excluded |
|---|---|---:|---:|---|
| Four-and-a-half-sheet pamphlet | 1764 Maryland invoice: 500 copies for £17 6s. 6d. all-in | about 8.3d/copy | **Do not extrapolate linearly** | Includes printing, paper, folding/stitching, and box; composition was a fixed cost, and this predates the Revolution by 12 years |
| *Common Sense* retail price | 1776 first edition: 1,000 copies at 2s.; later edition 1s. | 1–2s./copy | **£50–£100 at list price** for 1,000 | This is reader price/gross receipts, not Paine’s production or distribution cost |
| Newspaper postage | 1792 federal rate: 1 cent up to 100 miles; 1.5 cents beyond | $0.01–$0.015/paper | **$10–$15** | Type, paper, printing, editorial labor, transport beyond postage assumptions |
| Newspaper postage, purchasing-power illustration | $1 in 1792 ≈ $34.78 in 2026 using a reconstructed pre-BLS CPI series | — | **≈$348–$522 (2026 dollars)** | This is a rough purchasing-power comparison, not a labor-value or share-of-income comparison |
| Live campaign calling | 1986 GOP program paid callers $5–$6/hour; calls normally no more than one minute | $5–$6/labor hour | **Not safely derivable** | Dialing/no-answer time, supervision, data, phone service; completed calls per hour unknown |
| Automated robocall | 2008 CRS: vendors quoted 1–2 cents/call; some references said “a few cents” | $0.01–$0.02/dial | **$10–$20** | List, recording, setup, compliance, wrong/no-answer numbers |
| Nonprofit direct-mail postage | 2025 USPS nonprofit Marketing Mail letter schedule varies by sort/entry | roughly $0.14–$0.25/piece | **≈$140–$250 postage** | Design, printing, list, sorting, transport, returns |
| Direct mail, current vendor benchmark | 2026 commercial vendor range varies by format and volume | $0.30–$1.25+/piece | **$300–$1,250+ all-in claim** | Vendor-specific; treat as market quote, not audited industry average |
| Bulk email infrastructure | Current commodity transactional/bulk email benchmark | roughly $0.0001–$0.00025/email | **$0.10–$0.25** | Staff, CRM, domain/IP reputation, list acquisition, compliance, spam-folder loss |
| Campaign SMS | Aug. 2026 published political vendor rates: 1.5–3.5 cents/SMS at listed volumes | $0.015–$0.035/segment | **$15–$35** | Data, registration, MMS, multi-segment messages, replies, staff |
| LLM inference | Illustrative 5,000 input + 1,000 output tokens; current official API list rates | $0.0005–$0.010/chat | **$0.50–$10** | SMS/email transport, retrieval, history growth, moderation, orchestration, monitoring, human handoff |

## Sources and Calculations

### Print and Postage

- A 1764 Maryland printing account is the best concrete pre-Revolution production benchmark located. Five hundred copies of a four-and-a-half-sheet political pamphlet cost £11 5s. for printing, £3 14s. for paper, £2 for folding/stitching, and 7s. 6d. for a box: **£17 6s. 6d. total, or about 8.3 pence per copy**. The accompanying analysis estimates roughly a 35% net margin for the printer. Franklin’s 1754 Philadelphia schedule also quoted printing-only prices of 2 pence each for runs of 300+ broadsides; paper was added separately.
  - https://research.colonialwilliamsburg.org/DigitalLibrary/view/index.cfm?doc=ResearchReports%5CRR0024.xml&highlight=
- *Common Sense* offers a retail-price benchmark rather than a production-cost benchmark. Bell’s first 1,000-copy run sold at two shillings each; a later printer charged one shilling. The Library of Congress copy is itself inscribed “cost 1/.” At full list price, 1,000 sales therefore represented £50–£100 in gross receipts, but the actual print bill, reseller discounts, complimentary copies, and transport are unknown.
  - https://clements.umich.edu/exhibit/revolutionary-paine/going-viral-in-1776/
  - https://www.loc.gov/item/18023774/
- Currency varied by colony and wartime inflation makes dollar conversion misleading. A better intuition is wages: Pennsylvania building trades in 1750–1775 commonly earned roughly 5s. 6d.–6s. per day. A one-to-two-shilling pamphlet was therefore around one-sixth to one-third of a skilled worker’s day—not a disposable free handbill.
  - https://fraser.stlouisfed.org/files/docs/publications/bls/bls_0604_1934.pdf
- USPS: 1792 newspaper postage was one cent for up to 100 miles and 1.5 cents beyond; printers could exchange newspapers free.
  - https://about.usps.com/who/profile/history/periodicals-postage-history.htm
- Inflation illustration uses the CPI-style historical series at OfficialData: $1 in 1792 ≈ $34.78 in 2026. U.S. BLS CPI begins in 1913, so the earlier portion is reconstructed and should be labeled approximate.
  - https://www.officialdata.org/us/inflation/1792?amount=1
  - https://www.bls.gov/cpi/questions-and-answers.htm
- Current USPS price list (Jan. 2025 schedule):
  - https://pe.usps.com/Archive/NHTML/DMMArchive20250119/Notice123.htm
- One 2026 vendor’s all-in range is $0.30–$1.25+ per piece; this is a useful quote, not an industry statistic.
  - https://directmail.io/direct-mail-cost
- Qualified national/state party committees and named congressional committees may use nonprofit prices without regard to nonprofit status:
  - https://pe.usps.com/Archive/NHTML/DMMArchive20250407/703.htm
- USPS OIG reported about 1.5 billion Political Mail pieces from Sept. 1–Nov. 15, 2024 and noted Marketing Mail generated about $0.31 less revenue per piece than First-Class Mail. This shows scale and subsidy-like pricing, but not campaign all-in cost.
  - https://www.uspsoig.gov/sites/default/files/reports/2025-04/24-143-r25.pdf?inline=1

### Calls

- 1986 GOP program: approximately 11 million targeted contacts, two million automated Reagan calls, paid callers at $5–$6/hour, inside a broader $10 million integrated voter-contact effort. Because the budget combined data, mail, phones, field offices, and staff, do not divide $10 million by calls.
  - https://www.washingtonpost.com/archive/politics/1986/10/21/hired-hands-are-busy-dialing-as-gop-calls-for-big-turnout/5db45c13-debb-4fbe-85c2-d11de931d454/
- CRS (2008) reported vendor prices around one to two cents per automated call and warned that public data on political robocall spending were weak.
  - https://www.everycrsreport.com/reports/RL34361.html

### Text and Email

- FullPAC’s published August 2026 partner schedule ranges from 2.5 cents under 250,000 SMS to 1.5 cents at 1–5 million; standard rates start at 3.5 cents. This is a vendor quote, not a neutral market survey.
  - https://gotv.com/texting
- Amazon SES is a useful infrastructure benchmark, not an estimate of campaign program cost. Pricing changes by plan/region and should be rechecked at publication.
  - https://aws.amazon.com/ses/pricing/

### LLM Conversation

Illustration using current official OpenAI standard list prices:

- lower-cost model: $0.05/million input tokens + $0.25/million output tokens;
- higher-capability model: $1/million input + $5/million output;
- assumed exchange: 5,000 input + 1,000 output tokens;
- result: $0.0005 or $0.010 per exchange; **$0.50 or $10 per 1,000 exchanges**.

Source: https://platform.openai.com/pricing

This is not a campaign quote. Long conversations repeatedly resend history, and retrieval, tool calls, moderation, logging, identity disclosure, carrier transport, and human escalation can dominate. At a 1.5–3.5 cent SMS rate, even one outbound SMS costs 1.5–70 times the illustrative model inference; multiple turns widen delivery cost.

## Interpretation

- The largest discontinuity was not LLMs but electronic distribution: email made the next attempted contact effectively free.
- Robocalls and P2P texting restore attention by entering a more personal channel, at tens of dollars per thousand rather than hundreds for physical mail.
- LLMs reduce the **response labor** that previously prevented bulk outreach from being genuinely conversational. The relevant comparison is not LLM versus template copy; it is LLM versus a paid caller or volunteer who listens and adapts.
- As marginal cost falls, the sender can tolerate lower response rates. More of the cost is externalized as recipient attention, carrier filtering, and social distrust—exactly the dynamic that turns outreach into spam.

## What Share Went to Direct-to-Voter Contact?

There is **no defensible continuous series for calls + email + SMS + conversational AI as a share of campaign budgets**. Before modern disclosure law, parties, clubs, patrons, and candidates often paid separately. Since the FEC era, filings use inconsistent descriptions; outside groups spend alongside candidates; and a vendor bill can combine voter data, software, email, SMS, fundraising, and staff. A 2019 review found 76% of congressional and 97% of presidential expenditures unclassified in the available FEC category data for 2006–2016.

The 1986 Republican program is a useful scale marker, not a share: a reported **$10 million integrated effort** combined computer data, mail, roughly 11 million targeted calls, two million automated calls, field offices, and staff. Neither the phone portion nor a comparable whole-campaign denominator is available. Direct-response channels further complicate the accounting because fundraising mail, email, and SMS can generate revenue while consuming budget.

### Contrast Only: Paid Broadcast/Media Share

The figures below answer the older question, “How dominant was paid media?” They **do not measure direct-to-voter contact** and should not be mixed into the phone/email/SMS cost series.

| Election / scope | Measured media share / anchor | Comparability note |
|---|---:|---|
| Revolutionary era | **Unknown / denominator absent** | Printers sold pamphlets commercially or were retained by governments/patrons; political organizing was not a disclosed candidate budget. |
| Hoover, 1928 | Radio was **21% of the campaign’s publicity/advertising budget** | Not 21% of total campaign spending. |
| Citizens for Eisenhower-Nixon, 1952 | TV was **$634k of $1.45m = 44%** | One independent national committee, not the whole Eisenhower/party campaign; Eisenhower’s overall TV spending was nearly $2m. |
| Nixon, 1968 plan | **About 70%** of a planned $10m budget for TV | Contemporary campaign plan; budget later rose to $12m. |
| Bush, 1988 plan | **More than 60%** of the $54m candidate budget for TV | Parties separately financed mail, registration, and GOTV with soft money. |
| Federal campaigns, early–mid 1990s | Broadcast: **27% House; 40–45% Senate; at least 50% president** | CRS aggregate; competitive Senate races could exceed 60%. All advertising was 30% of House and 43% of Senate spending in a cited 1990 study. |
| Clinton/Dole general election, 1996 | Electronic media **over 60%** | Candidates plus national parties; mostly television. |
| Competitive congressional races, 2000–2014 | TV alone **about 35%** of candidate expenditures | Academic estimate; TV was about 90% of measured ad expenditure in the study. |
| Federal elections, 2024 | TV/radio buying **30.6%** of federal spending | Does not include digital ads, mail, texts, field, or unpaid/earned media; comparable figure was 38% in 2020. |

Sources:

- 1928 radio: https://libres.uncg.edu/ir/uncg/f/sanghvi_uncg_0154d_11498.pdf
- 1952 committee spending: https://www.govinfo.gov/content/pkg/SERIALSET-11578_00_00-228-2517-0000/pdf/SERIALSET-11578_00_00-228-2517-0000.pdf
- 1968 Nixon plan: https://content.time.com/time/subscriber/article/0,33009,723848-4,00.html
- 1988 Bush plan: https://www.washingtonpost.com/archive/politics/1988/09/22/bush-to-spend-at-least-32-million-on-tv-ads/455ba854-0fb2-4bba-b28f-a02dd6cb0bcd/
- 1990s aggregate and 1996 presidential: https://www.everycrsreport.com/reports/97-680.html
- 2000–2014 congressional races: https://academic.oup.com/jeea/article/22/6/2782/7595784
- FEC categorization warning: https://bipartisanpolicy.org/download/?file=/wp-content/uploads/2019/05/Trends-in-Campaign-Financing-1980-2016.-Zachary-Albert..pdf
- 2020/2024 TV and radio share: https://doi.org/10.1515/for-2025-2002

### Interpretation

- The media share did not rise monotonically. It surged when television became the scarce route to mass attention, then fragmented as digital, direct response, data, and outside spending grew.
- A lower television share today does **not** mean less outreach. It means outreach is split across more channels, and some digital activity is cheap enough to disappear inside vendor, staff, or fundraising categories.
- Fundraising communication complicates the numerator: direct mail, email, and SMS can simultaneously raise money and persuade or mobilize voters. Gross spending overstates net cost when an appeal pays for itself.
