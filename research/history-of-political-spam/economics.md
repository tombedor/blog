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
