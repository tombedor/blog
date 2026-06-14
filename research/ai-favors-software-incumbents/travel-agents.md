# Source Note: Travel Agents, Internet Adaptation, and the AI Analogy

## Bottom line

- The travel-agent case supports an **interface and distribution-channel** argument, not a literal "phones/fax versus software" argument.
- Traditional agencies were already computerized: travel agents had used airline computer reservation systems, later global distribution systems (GDSs), since the 1970s.
- The internet exposed search and booking directly to customers and let airlines bypass agent commissions and some GDS fees. Routine booking therefore stopped requiring an intermediary.
- Adaptation was uneven rather than impossible. From 1995 to 2002, small-agency air sales fell 32%, while sales at very large agencies nearly doubled. Large corporate agencies, online agencies, and specialists retained valuable capabilities.
- Corporate customers subsequently abandoned most agent-assisted booking, but not managed travel. The surviving corporate agencies became software-led travel management platforms: employees self-book while the platform supplies policy, negotiated rates, reporting, payments, duty of care, and exception support.
- The strongest AI analogy is that current software incumbents already possess more of the relevant complementary assets: digital workflows, software staff, proprietary data, distribution, and customer integrations. The analogy is probabilistic, not dispositive; organizational inertia and a new AI-native customer interface could still favor entrants.

## What supports the argument

**The customer interface changed quickly.**

- Online airline bookings rose from 7% to 30% between 1999 and 2002.
- Airlines actively shifted customers online because their sites could use internal reservation systems and avoid traditional agency commissions and some GDS fees.
- Internet users could independently compare fares and schedules and access internet-only fares.
- This removed the transaction-cost function that agencies had performed for routine trips.
- https://www.govinfo.gov/content/pkg/GAOREPORTS-GAO-03-749/html/GAOREPORTS-GAO-03-749.htm
- https://www.oig.dot.gov/sites/default/files/cr2000111.pdf
- https://www.researchgate.net/publication/49279710_Repositioning_travel_agencies_on_the_Internet

**The new channel damaged firms organized around routine intermediary work.**

- GAO found that small agencies, defined as under $2M in annual air sales, lost 32% of sales from 1995 to 2002, driven largely by leisure customers moving online.
- Travel-agent employment is now less than half its dot-com-era peak, although commission cuts and airline financial pressure were concurrent causes.
- https://www.govinfo.gov/content/pkg/GAOREPORTS-GAO-03-749/html/GAOREPORTS-GAO-03-749.htm
- https://www.stripeeconomics.com/p/the-decline-of-travel-agents

**AI adoption is more complementary to existing digital assets.**

- OECD firm-level evidence links AI use and productivity advantages to ICT skills, digital infrastructure, use of other digital technologies, and firm scale.
- NBER research finds that firms with larger data assets received greater expected benefits from generative AI, consistent with proprietary data complementing the technology.
- These assets are already concentrated in established software companies in a way that customer-facing web distribution was not concentrated in small travel agencies.
- https://www.oecd.org/en/publications/a-portrait-of-ai-adopters-across-countries_0fb79bb9-en.html
- https://www.nber.org/system/files/working_papers/w31222/w31222.pdf

## What refutes or narrows the argument

**Agents were not technologically pre-digital.**

- Computer reservation systems automated airline booking in the late 1960s and were installed in travel agencies beginning in the mid-1970s.
- Traditional bookings were entered into GDS software, not primarily executed by phone or fax. Phone and storefront relationships were the customer interface around an already computerized backend.
- Expedia, Priceline, and Travelocity often used the same GDS infrastructure as traditional agents. The internet changed who operated the interface and the economics of distribution more than it replaced every layer of the stack.
- https://www.govinfo.gov/content/pkg/GAOREPORTS-GAO-03-749/html/GAOREPORTS-GAO-03-749.htm

**Some incumbents adapted successfully.**

- Very large agencies' annual air sales nearly doubled from 1995 to 2002. They benefited from scale, GDS incentives, continued commissions, corporate travel, and customer service fees.
- More than 60% of bookings and nearly all high-yield business traffic still passed through GDSs in 2002.
- Current BLS descriptions emphasize personalized itineraries, destination expertise, disruptions, and complex trips: expertise survived where booking was not a commodity.
- https://www.govinfo.gov/content/pkg/GAOREPORTS-GAO-03-749/html/GAOREPORTS-GAO-03-749.htm
- https://www.bls.gov/ooh/sales/travel-agents.htm

**Corporate travel did not preserve the old agency workflow.**

- Amex GBT processed about **$36.3B** in total transaction value in 2025 and retained **96%** of clients, so corporate customers have not abandoned the managed-travel channel.
- But **83% of Amex GBT bookings were digital** in 2025. Human counselors remain for complex trips, disruptions, and high-touch accounts rather than routine booking.
- Navan, a software-native corporate travel and expense platform, reported that **90% of bookings were online or mobile** in 2025.
- The durable corporate product is now an integrated software and services layer: self-booking, policy enforcement, negotiated content, payments and expenses, reporting, traveler tracking, and 24/7 exception support.
- This is better described as **successful transformation and consolidation** than the survival of traditional travel agencies.
- https://www.sec.gov/Archives/edgar/data/1820872/000162828026015817/gbtg-20251231.htm
- https://www.sec.gov/Archives/edgar/data/1639723/000162828025044812/navan-sx1a.htm

**Software incumbents still face adaptation costs.**

- Research on AI as a general-purpose technology stresses that complementary assets must be reorganized with business processes, management practices, and distribution. Existing software and data do not make adaptation automatic.
- AI-native entrants could still own a new customer interface while treating incumbent SaaS products as backend systems of record.
- https://www.nber.org/system/files/working_papers/w24001/w24001.pdf
- https://www.nber.org/system/files/working_papers/w32474/revisions/w32474.rev0.pdf

## Recommended framing and charts

- Framing: **The internet moved routine travel search and booking from an agent-operated digital system to a customer-operated digital interface. AI usually enters software through systems incumbents already build, operate, and populate with proprietary data.**
- Avoid: "Travel agencies used phones and fax, so they could not become software companies."
- Historical chart, using the GAO report:
  - Online share of airline bookings: **7% in 1999 -> 30% in 2002**.
  - Air-sales index, 1995 to 2002: **small agencies 100 -> 68; very large agencies 100 -> nearly 200**.
- Modern endpoint:
  - Amex GBT bookings in 2025: **83% digital, 17% agent-facilitated**.
  - Annotate **$36.3B transaction value** and **96% client retention**.
- Together these show three stages: small agencies lose commodity leisure booking; scaled agencies retain corporate relationships; corporate booking becomes overwhelmingly self-service inside software-led TMCs.
- Implemented chart: `static/diagrams/ai-favors-software-incumbents/travel-booking-channel/`.
