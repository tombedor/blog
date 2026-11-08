# Living With Data Centers: Cost-of-Living and Quality-of-Life Harms

Source notes for the brief's "why people don't like data centers" section. Organized by harm, then by geography of who bears it. Collected 2026-11-08 from search results; items marked **(unverified)** came only from search snippets or secondary coverage because the primary page could not be fetched.

## Geography of Harms

The harms fall on three different populations, which is one reason opposition doesn't sort neatly by distance:

| Harm | Who pays | Typical radius |
|---|---|---|
| Noise, generator fumes, construction, well water, transmission easements | Neighbors | ~0.5–1.5 miles (class-action definitions) / a corridor |
| Electricity capacity and transmission costs | Every ratepayer in the utility or grid region | PJM: 13 states + D.C. |
| Sales-tax exemptions, abatements | State and local taxpayers | Whole state |
| Water-rate increases from system expansion | Water-utility customers | County |

## Electricity Bills

**Strongest evidence: regional, not next-door.**
- PJM Independent Market Monitor: data centers drove **63%** of the 2025/26 capacity-auction price increase, **$9.3B** recovered from customers across PJM. Latest auction: ~$6.3–6.5B of $16.4B attributed to data-center load; clearing price hit the federal cap, which the monitor says avoided $13B more.
  - https://ieefa.org/resources/projected-data-center-growth-spurs-pjm-capacity-prices-factor-10
- NRDC projection: $100–163B cumulative PJM capacity costs through 2033 absent intervention (projection; depends on cap expiry).
- Ratepayers can pay for capacity reserved for projects that never get built; no refund mechanism.
- Dallas Fed working paper (2026): data centers raised wholesale prices **6.9% nationally** by 2025 and **15.0%** in northern regions.
  - https://www.dallasfed.org/research/papers/2026/wp2606
- Bloomberg (Sept 2025): wholesale prices at some nodes near data centers up as much as **267%** since 2020. PolitiFact: this is a peak node figure for wholesale supply (30–50% of a bill), not residential bills.
  - https://www.bloomberg.com/graphics/2025-ai-data-centers-electricity-prices/
  - https://www.politifact.com/factchecks/2026/jun/11/elizabeth-warren/data-centers-rising-electricity-costs/
- Pew-cited estimate: data centers + crypto add ~8% to the average U.S. bill by 2030; >25% in central/northern Virginia (scenario).
  - https://www.consumeraffairs.com/news/how-much-are-data-centers-affecting-your-electric-bill-082126.html

**Mechanism: special contracts.**
- Harvard Electricity Law Initiative (Martin & Peskoe, Mar 2025): dozens of confidential, bespoke utility–data center contracts negotiated outside rate cases; ~50 proceedings reviewed. Below-cost contract rates shift costs to other customers; secrecy blocks measurement.
  - https://eelp.law.harvard.edu/extracting-profits-from-the-public-how-utility-ratepayers-are-paying-for-big-tech/
  - Pull quote (title): "Extracting Profits from the Public: How Utility Ratepayers Are Paying for Big Tech's Power"

**Counterevidence.**
- EPRI/LBNL-style retrospective (2015–2024): states with more data-center growth saw *modestly lower* average retail rates (fixed costs spread over more load). Industry groups (NetChoice) promote this.
  - https://www.fortnightly.com/node/47547
  - https://www.latitudemedia.com/news/studies-say-data-centers-dont-raise-rates-does-it-matter/
- Virginia JLARC: data centers currently pay their cost of service in Virginia.
- The retrospective period predates the AI load surge and the PJM capacity shock; the two findings are not necessarily in conflict.

## Noise

- **Dowagiac, MI** — federal class action against Alliance Cloud Services (Hyperscale Data subsidiary; former crypto-mining site) on behalf of residents within one mile; 50–62 dB constant noise; city noise ordinance (65 dB day / 55 dB night) and fines; operator bought buffer land and offered to buy homes from residents who find them unlivable **(buyout terms unverified)**.
  - https://michiganadvance.com/2026/05/27/federal-class-action-lawsuit-filed-over-dowagiac-data-center-noise/
  - Resident quote via Tom's Hardware headline: "It sounds like someone set up a vacuum like in your living room."
- **Mount Pleasant, WI** — class action against Microsoft from residents within 1.5 miles.
  - https://www.fox6now.com/news/microsoft-data-center-noise-mount-peasant-class-action-lawsuit-filed
- **Sterling, VA (Loudoun)** — Vantage campus neighbors report constant noise and diesel-generator odors; flood of complaints to Board of Supervisors.
  - https://wjla.com/news/local/gallery/data-center-noise-fumes-create-flood-of-complaints-in-loudoun-county-virginia-board-of-supervisors-sterling
- **Chandler, AZ** — Brittany Heights residents with earplugs/noise-cancelling headphones against a 2014 facility; experience helped block a later proposal.
- Health claims (sleep loss, vertigo, nausea from low-frequency hum) are resident reports, not independently verified.

## Air Quality

- **Memphis (xAI/Colossus)** — SELC counted 35 unpermitted gas turbines vs. 15 applied for; neighborhood leads Tennessee in asthma hospitalizations. SELC study: $30–44M/yr health damages from Colossus 2 (advocacy estimate). University of Memphis analysis found only slight air-quality worsening; no permanent monitors in nearest neighborhoods.
  - https://www.selc.org/news/elon-musks-xai-facility-is-polluting-south-memphis/
  - https://www.eenews.net/articles/elon-musks-xai-in-memphis-35-gas-turbines-no-air-pollution-permits/
  - Pull quote (E&E headline): "'How come I can't breathe?'"
- Backup diesel generators are a recurring complaint in Loudoun (odor, testing runs).

## Water

- **Newton County, GA (Meta, Stanton Springs)** — Morris family well, ~1,000 ft from site, went dry/sediment-filled after construction (NYT, 2025). Four families sued Meta (Sept 2026) alleging construction contaminated wells; Meta's commissioned study found no impact. Neither EPA nor Georgia regulates private wells.
  - https://www.ajc.com/news/2026/09/georgia-families-sue-meta-accuse-its-data-center-of-tainting-their-water/
  - https://www.spokesman.com/stories/2025/jul/19/their-water-taps-ran-dry-when-meta-built-next-door
- County water rates projected to rise ~33%; county projected to reach water deficit by 2030. Share of county usage attributed to Meta is disputed (2% vs. 10% in different reports).
- Heatmap Pro (Aug 2025): "may increase utility bills" argument +46 net convincing vs. water argument +34 — bills beat water as a persuader.

## Property Values

Mixed; not a reliable cost-of-living claim.
- No significant effect: GMU (Northern Virginia 2023 sales); Integra Realty (4 Indiana sites — but 3 of 4 trailed county appreciation); Realtor.com (43 ZIPs).
- Negative: UC Berkeley Energy Institute working paper ("Data Centers Lower Nearby Housing Values"), larger near hyperscale, urban, first-in-community sites; GWU (Feb 2026) ~2.8% discount within 0.5 mi of announced Loudoun sites.
  - https://www.bisnow.com/national/news/data-center-community-relations/data-centers-may-not-be-a-drag-on-nearby-home-prices-135084
  - https://www.wvpe.org/wvpe-news/2026-04-14/study-property-values-near-data-centers-grew-less-than-county
- NAR agent survey: 25% saw higher, 22% lower, 32% no change.

## Land Use, Construction, Transmission

- **Prince William Digital Gateway, VA** — up to 27M sq ft; county traffic analysis projected up to 27,000 added daily trips (cited by opponents); rural Pageland Lane widened to four lanes; quarry trucks for construction. Litigation by Oak Valley HOA.
  - https://virginiamercury.com/2022/08/16/prince-william-could-steal-loudouns-title-of-data-center-alley-but-land-use-battles-are-raging/
- **Maryland Piedmont Reliability Project** — 67-mile, 150-ft-wide PSEG line across Frederick/Carroll/Baltimore counties; court allowed survey access to 300+ private properties under eminent-domain authority; Farm Bureau opposed. Critics call it an "extension cord to Virginia." Direct data-center attribution not confirmed in sources found.
  - https://www.renewableenergyworld.com/energy-business/new-project-development/an-extension-cord-to-virginia-marylanders-push-back-against-proposed-pjm-transmission-line-carving-through-farmland/

## Taxes and Jobs

- Virginia sales-tax exemption: **$1.6B** in FY2025, ~16× initial projections. Georgia: $625M, up from $10M in 2020. At least 10 states forgo >$100M/yr; 12 of 32 incentive states don't disclose cost.
  - https://news.bgov.com/banking-law/state-losses-from-data-center-tax-breaks-top-3-billion-annually
- Cost per permanent job: Illinois ~$1.4M; Columbus abatement $2.7M/job (20 jobs); Good Jobs First 2016 megadeals avg $1.95M. U.S. Chamber counters with 157 permanent jobs/facility.
  - https://www.datacenterdynamics.com/en/news/research-us-state-subsidies-pay-2-million-per-data-center-job/
- Virginia (WaPo–Schar, Mar 2026): only 26% back continuing the sales-tax exemption; 67% want it ended.

## Distance and Opposition

- Hypothetical-distance framing raises opposition: Reuters/Ipsos 45–16 overall → 59–10 within 10 miles; CNBC 63% oppose within 10 miles.
  - https://www.cnbc.com/2026/10/24/trump-ai-data-centers-voter-backlash-midterms.html
- But actual exposure doesn't clearly predict opposition: VoteHub (Oct 28, 2026) reports ~zero correlation between a state's data-center capacity and net opposition across ten polled states **(unverified — page could not be fetched)**.
  - https://votehub.com/2026/10/28/the-data-center-midterm/
- Virginia (heaviest exposure) shows collapse rather than saturation: support for nearby construction 69% (2023) → 35% (2026); 57% say data centers hurt home energy bills vs. 14% help.
  - https://schar.gmu.edu/news/2026-10/washington-post-schar-school-poll-shows-virginia-support-data-centers-has-fallen
- Gallup: majorities of every major demographic and party group oppose a local data center.

## Policy Responses Already in Place

- **AEP Ohio data center tariff** (PUCO, July 9, 2025): new data centers >25 MW pay for ≥85% of contracted capacity for up to 12 years whether used or not; exit fee = 3 years of minimum charges. AEP's large-load forecast fell from 30 GW to 13 GW afterward — speculative requests evaporated.
  - https://www.powermag.com/regulator-approves-aep-ohios-landmark-data-center-tariff/
- 23–25 states have approved at least one large-load tariff (EEI, May 2026; BGov). Pennsylvania model tariff (collateral, exit provisions). Delaware paused new large-load interconnections pending a tariff.
  - https://www.utilitydive.com/news/large-load-tariffs-proliferate-as-states-take-more-active-role-in-data-cent/816184/
- Federal Ratepayer Protection Act passed House 417–3 (Sept 16, 2026); requires states to *consider* full-incremental-cost standards. Unlikely to pass Senate soon.
- Note: none of these address noise, water, air, or tax-break costs — they are bill protections only.
