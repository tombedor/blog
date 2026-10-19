# Source Note: Tracing a John McKinney Campaign Text

**Status date:** October 19, 2026. **Specimen:** the long “Dear Friend” ballot-arrival text supplied by the recipient, ending “Paid for by 1492529 Reply STOP to unsubscribe.” The originating phone number was not supplied.

## Bottom Line

- The disclaimer resolves to **John McKinney for City Attorney 2026 General**, FPPC ID **1492529**. The campaign site confirms the committee identity and sends contributions to an eFundraising Connections page.
- Los Angeles’s official filings identify **Strategy Insights, LLC** as the **primary-election committee’s** texting payee. The primary committee, FPPC **1487830**, reported **$189,357.98** in Schedule E payments explicitly labeled “Texting” to Strategy Insights.
- Those texting payments were **47.1%** of the primary committee’s **$402,317.76** in Schedule E payments, and **25.1%** of the primary and general committees’ combined **$755,150.24** through September 19. Both committees’ payments to Strategy Insights totaled **$317,191.67**, including consulting, IT, literature/mail, travel, and office costs.
- The records do **not** identify the underlying SMS platform, phone-number provider, carrier aggregator, voter/mobile-data source, message volume, or Strategy Insights’s margin. No SMS subvendor appears in the campaign’s Schedule G rows.
- The specimen is sponsored by the separate **general-election committee**, FPPC **1492529**, and arrived after the latest filing cutoff. That committee retained Strategy Insights for consulting and other work but had not yet reported an expense labeled texting. Strategy Insights is therefore the strongest lead—not a proven sender of this exact October message.

## The Trace, Layer by Layer

| Layer | What can be established | What remains hidden |
|---|---|---|
| Sponsor | Campaign site: John McKinney for City Attorney 2026 General, FPPC 1492529 | Whether the text went only to registered Democrats or a broader modeled universe |
| Lead consultant / billed SMS vendor | Primary committee: Strategy Insights, LLC; $189,357.98 explicitly labeled texting. General committee: Strategy retained, but no payment yet labeled texting | Whether Strategy sent this exact general-election text; contract, markup, list cost, volume, creative/testing, performance terms |
| People behind the vendor | Redistricting Insights identifies Matt Rexroad as president of Strategy Insights | Who wrote, approved, or manually initiated this message |
| Data / targeting | Almost certainly requires a voter/mobile match or acquired list; the greeting is generic | Exact voter-file vendor, mobile match, targeting model, consent provenance |
| Sending platform | Not disclosed in Schedule E or G | P2P software, 10DLC registration, originating-number owner, upstream aggregator/carrier |
| Recipient action | Link points to the campaign’s public homepage | Clicks, replies, opt-outs, supporter IDs, and experimental holdout results |
| Donation path | Site routes donations to eFundraising Connections; its form invokes PayPal for payment/ACH verification | Whether any donation can be attributed to this text; this specimen is not a donation ask |

Sources: [campaign identity and consent language](https://mckinney4la.com/contact/), [campaign volunteer/autodialer disclosure](https://mckinney4la.com/support/), [contribution form](https://www.efundraisingconnections.com/c/JohnMcKinneyG), [LA City Campaign Expenditures](https://data.lacity.org/d/5mrt-4zhe), [statement index](https://data.lacity.org/d/br3a-db9a), [Strategy Insights principal](https://redistrictinginsights.com/).

## What the Filings Actually Say

Method: use the city’s statement index to separate FPPC **1487830 (primary)** from **1492529 (general)**, then verify each Form 460 PDF. Restrict totals to Schedule E so Schedule F debt-incurred and debt-paid rows are not double-counted. The primary committee’s five reports total $402,317.76 in Schedule E payments; the general committee’s two total $352,832.48; combined, $755,150.24. The latest reporting cutoff is September 19.

Key filings: [primary May 17–27](https://ethics.lacity.gov/view/?document_id=143489), [primary July 1–Sept. 19](https://ethics.lacity.gov/view/?document_id=146839), [general July 1–Sept. 19](https://ethics.lacity.gov/view/?document_id=146793).

| Payment date | Payee | Filed purpose | Schedule E amount |
|---|---|---|---:|
| May 20, 2026 | Strategy Insights, LLC | Primary committee; IT costs: Texting | $18,591.72 |
| Sept. 2, 2026 | Strategy Insights, LLC | Primary committee; six entries, IT costs: Texting | $170,766.26 |
| **Total** |  |  | **$189,357.98** |

The six September entries were $21,498.12, $441.28, $457.24, $48,353.48, $49,328.16, and $50,687.98. The general committee’s July–September report shows Strategy Insights consulting and smaller IT/office/mail costs, but nothing labeled texting. The public records expose the consultant bill, not its unit economics. Schedule G discloses other Strategy pass-throughs—printing, signs, and hosting—but no text platform or carrier. That can mean the SMS service was provided directly, bundled below the disclosure threshold, or insufficiently itemized; the filings alone cannot distinguish those explanations.

## What This One Message Probably Cost

As pasted, the body is **785 GSM-7 characters**, which becomes **six concatenated SMS segments** (153 characters per segment after concatenation overhead). If a typographic character forced UCS-2 encoding, the same length would be about **12 segments**. At the published campaign-market range of roughly **1.5–4 cents per SMS segment**, transmission alone is approximately:

- **9–24 cents per recipient** for the six-segment GSM-7 version;
- **$9,000–$24,000 per 100,000 recipients**;
- potentially twice that if UCS-2 encoding doubled the segment count.

These are transport estimates, not the campaign’s invoice. Data, phone matching, failed deliveries, staff/reply handling, setup, compliance, consulting, and vendor margin can all sit above transport. Conversely, large buyers may negotiate lower rates. The filings cannot reveal how many recipients or messages the primary committee’s $189,357.98 bought, or what the October general-election text cost.

## ROI: What Can and Cannot Be Claimed

This is a **persuasion / introduction / soft-GOTV message**, not a fundraising text. Its proper outcomes are delivered contacts, clicks, favorable-ID shifts, ballot return, and incremental votes—not gross donations.

- Exact ROI is unavailable publicly. The link is a plain campaign domain, the filings contain no recipient count, and votes cannot be attributed without a randomized holdout or other credible counterfactual.
- The best-known U.S. field experiment, Dale and Strauss (2009), found a **3.0 percentage-point turnout increase** from short, nonpartisan reminders sent to people who had provided their mobile numbers; actual sending costs yielded **$1.56 per additional vote in 2006**. That is evidence that noticeable reminders can work, not an estimate for an unsolicited, partisan candidate biography in 2026.
- For this six-segment message, the transport-only cost per incremental vote would be roughly **$90–$240 at a 0.1-point effect; $18–$48 at 0.5 points; $9–$24 at 1 point; and $3–$8 at 3 points**. Those are sensitivity calculations, not observed results.
- “Open rate” is not ROI, and clicks are not votes. A campaign claiming effectiveness should disclose the treated universe, holdout, delivery rate, outcome window, and incremental—not attributed—conversions.

Primary research: [Dale & Strauss, “Don’t Forget to Vote”](https://doi.org/10.1111/j.1540-5907.2009.00401.x).

## The Industry’s Candid Revenue Thesis

FullPAC’s 2025 SEC offering circular says RoboCent is used for persuadable voters but that this does not generate most revenue. It then describes the commercial logic in unusually direct terms:

> While RoboCent is regularly utilized in contacting such undecided voters, it is not what generates the majority of our revenue. In recent years, leading candidates within both of the main political parties in the United States have increasingly adopted base politics, which often involves sending sensationalized communications to supporters and members of their own political party to elicit emotional reactions. We believe that this strategy is highly effective at driving voter turnout, generating donations, raising awareness, and shaping the narrative of key events amongst a candidate’s supporters, and that we are positioned to significantly benefit from a trend that regularly involves messaging outreach campaigns to a significant portion of the electorate.

This is a vendor’s investor claim, not independent proof of effectiveness. Its value is as a statement of incentive: the scalable business is not only converting undecided voters; it is repeatedly activating a known partisan base for turnout, money, attention, and narrative control. [SEC offering circular](https://www.sec.gov/Archives/edgar/data/2076148/000149315225026771/form253g2.htm)

## What Would Complete the Trace

- The originating phone number and a screenshot with timestamp: useful for number ownership/10DLC and carrier-route research.
- The next Form 460 covering the message date: may identify the October invoice, although it may remain bundled.
- Campaign or vendor records: recipient universe, segment count, delivered count, replies/opt-outs, link analytics, list source, platform invoice, and any experimental control group.
- A campaign/vendor interview: ask whether Strategy Insights sends directly or through a white-label platform and whether its texting invoices bundle data and consulting.
