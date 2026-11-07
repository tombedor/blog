# Research Brief: AI Needs to Sweeten the Deal

**Scope:** Test whether opposition to AI data centers is mainly anti-AI sentiment or resistance to uncompensated local costs, and identify a defensible precinct-level map.

**Bottom line:**
- Local costs appear to be the larger component: voters most often cite water, power, bills, land use, noise, and quality of life; support falls when a project is nearby.
- AI adds a distinct penalty. Identical infrastructure is more acceptable when described as supporting banking or government data than when it trains AI models.
- The most persuasive “sweeteners” directly neutralize local costs. A randomized experiment found that a binding ratepayer guarantee or home-energy benefits raised project favorability by 14 points; generic economic-benefit messaging is weaker.
- Pataskala, Ohio is the best map case found: eight precincts, official vote data, current GIS boundaries, and an exact proposed parcel. The pattern is suggestive, not causal.

---

## Is Opposition Mainly Local or Anti-AI?

**Finding:** Both matter, but the strongest evidence points to local burdens as the larger driver.

**Evidence:**
- Gallup found **71% opposed** an AI data center in their area versus **53% opposed** a local nuclear plant. Among opponents, half mentioned excessive resource use; roughly one-fifth cited quality-of-life effects and another fifth negative economic effects such as utility bills.
- UMass found **65% opposed** and 11% supported a local AI data center. Open-ended reasons were environmental/resource use (28%), land use/local disruption (15%), bills/economic burden (10%), and general distrust of AI or the industry (13%).
- Reuters/Ipsos found opposition increased from **44% nationally** to **57% within the respondent’s community**.
- AI still carries its own stigma: Public First/ITIF found support of 42% for data centers serving banking/streaming/storage but 31% for AI-training facilities; data centers ranked last among ten kinds of local development.

**Sources:**
- https://news.gallup.com/poll/709772/americans-oppose-local-ai-data-centers.aspx
- https://www.umass.edu/news/article/just-1-9-americans-support-ai-data-center-construction-their-local-communities
- https://www.ipsos.com/sites/default/files/ct/news/documents/2026-06/Reuters%20Ipsos%20Large%20Issue%20Topline%20June%202026%206.12%20release.pdf
- https://itif.org/publications/2026/08/26/data-centers-are-americans-least-favored-form-of-development/

**Pull quote:**
- “Americans may agree that AI represents the future, but they appear far less certain about who should pay the price for building it.” (UMass Poll)

**Caveats / counterpoints:**
- Poll wording varies materially: “AI data center,” generic “data center,” national construction, and a project “in your community” are not interchangeable treatments.
- Attitudes toward AI can be the strongest individual-level predictor even when respondents describe local costs. GoodPower found AI outlook predicted project support better than party, place, or cost strain.

---

## What Would Actually Sweeten the Deal?

**Finding:** Benefits are persuasive when they are binding, local, and matched to the feared cost.

**Evidence:**
- GoodPower/Data for Progress randomized 2,610 registered voters across project descriptions. A binding commitment to pay for grid upgrades and prevent household rate increases raised the favorable share by **14 points**.
- A community-benefit agreement funding home efficiency upgrades and rooftop solar produced the same increase in project favorability as the rate guarantee.
- Merely describing the project as solar-powered rather than gas-powered had no statistically detectable effect. The protections, not the energy branding, moved opinion.
- Only **22%** trusted data center developers not to raise rates, explaining why vague promises are unlikely to substitute for enforceable agreements.

**Sources:**
- https://goodpower.org/research/data-center-acceptability-experiment/
- https://www.umass.edu/poll/about/reports/2026-09-national-public-opinion-poll-2

**Caveats / counterpoints:**
- The GoodPower study was conducted by an advocacy organization and tested hypothetical projects, but its randomized design is stronger causal evidence than ordinary message polling.
- “Sweeteners” cannot resolve objections rooted in AI risk, land use, distrust, or a preference for no development.

---

## Pataskala Precinct Map

**Finding:** Pataskala can show that opposition was universal but uneven; it cannot establish that proximity caused the difference.

**Evidence:**
- On November 3, 2026, every Pataskala precinct supported an immediate ban on data centers over 25 MW. Support ranged from **70.08% to 78.63%**, versus **73.62% citywide**.
- The rejected Aligned project is an exact **89.7-acre parcel at 6771 Mink Street**, at Broad and Mink. The parcel lies inside precinct 1-B, where support for the ban was **71.82%**—below the citywide result.
- Using precinct centroids as a rough distance measure, the two farthest precincts were the two least supportive, but the host precinct was only the third-lowest. This is a mixed, eight-observation pattern.

**Sources:**
- [Pataskala map data and methodology](pataskala-map-data.md)
- https://www.boe.ohio.gov/licking/c/elecres/20261103precinct.pdf
- https://gis.lickingcounty.gov/server/rest/services/Auditor/Boundaries/FeatureServer
- https://gis.lickingcounty.gov/server/rest/services/Auditor/Parcels/FeatureServer

**Recommended map claim:** “Every precinct backed the ban; support was somewhat stronger in several precincts nearer the proposed site.”

**Do not claim:** “The closer voters lived to the site, the more likely they were to oppose it.” Precinct centroids are not voter addresses, the site precinct is not the most opposed, and eight precincts cannot isolate distance from demographics or campaign activity.

---

## Source Notes

- [pataskala-map-data.md](pataskala-map-data.md) — Official precinct results, parcel identification, distance calculation, and map-production guidance.

## Open Questions

- Do certified November 24 results materially change any Pataskala precinct percentages?
- Can voter-population-weighted centroids or block-level population improve the distance measure?
- Which binding protections would survive bankruptcy, project resale, or a change in operator?
- Are there completed community-benefit agreements with measured effects on household bills, water use, noise, or local tax burdens?
