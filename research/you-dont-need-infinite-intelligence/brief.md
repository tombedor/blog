# Research Brief: "You Don't Need Infinite Intelligence"

**Scope:** Evidence on (1) cost-per-task trends for frontier vs. cheaper models, and (2) whether usage/adoption data shows people actually rushing to the newest, most powerful releases (Anthropic's Fable line, OpenAI's newest GPT) at the same rate as past model generations.

**Bottom line:**
- Cost-per-task for a fixed capability level is falling extremely fast (order of magnitude every ~6-12 months), which is the core enabler of "you don't need the newest model" — yesterday's frontier is today's cheap tier.
- Aggregate usage data points the opposite way from "everyone upgrades to the smartest model": U.S. frontier labs' combined token share on OpenRouter fell from ~70% to ~30% in a year as users moved to cheaper/open models, and at least one named company (Lindy) ripped out Claude entirely for a ~90% cost cut.
- Both flagship "newest" releases covered here — Anthropic's Fable 5 and OpenAI's GPT-5.6 — show real friction on the adoption side: Fable 5 drew enterprise complaints about token/cost blowup despite capability gains, and OpenAI itself shipped GPT-5.6 via an unusually slow, gated rollout rather than the fast push typical of past releases. Neither is direct "adoption curve" telemetry, but both are evidence against clean, fast uptake of the newest tier.

---

## Cost per task: the core economic trend

**Claim / question:** How fast is the cost of a fixed level of AI capability ("cost per task") actually falling, and how much more expensive is the newest frontier model vs. a slightly-behind alternative for similar output quality?

**Finding:** Cost-per-task for equivalent capability is dropping roughly an order of magnitude within a year; concurrently, the newest frontier models cost roughly 10-60x more per task than slightly-lower-scoring competitors on the same benchmark.

**Evidence:**
- Artificial Analysis (industry-standard independent LLM benchmark) tracks a "cost per task" metric: the weighted-average $ cost to complete one task in their Intelligence Index suite, counting input + reasoning + output tokens actually billed.
- Reported mid-2026 trend: "the level of intelligence that cost $1.22 per task in February costs $0.022 today, a 56x drop in under six months." Projected pace: capability that cost $1/task at the start of 2026 could cost ~$0.01 by year-end.
- Cross-model snapshot (mid-2026): Cursor Composer 2.5 scores 62 on the Intelligence Index at ~$0.07/task, while Claude Opus 4.7 (66) and GPT-5.5 (65) cost $4.10 and $4.82/task respectively — roughly 10-60x the cost for only 3-4 index points of extra capability.
- Separate claim: GPT-5.4 was cited as the best quality-per-dollar model at $0.007/task.

**Sources:**
- Artificial Analysis methodology (direct fetch blocked in this environment; figures below via secondary citation) — [Cost Per Task Is the New AI Benchmark, UsageBox](https://usagebox.com/articles/cost-per-task-workhorse-models-2026)
- [Cost Per Task Is the New Agentic AI Model Benchmark, WhatLLM.org](https://whatllm.org/blog/agentic-ai-cost-per-task)
- [AI Agent Cost Per Task 2026: Token Budgets & Math, Kunal Ganglani](https://www.kunalganglani.com/blog/ai-agent-cost-per-task-2026)
- [What Happens When the Cost of Intelligence Drops 100x, CatalystNeuro](https://catalystneuro.com/blog/cost-of-intelligence-drops-100x/)

**Pull quotes:**
- "The level of intelligence that cost $1.22 per task in February costs $0.022 today, a 56x drop in under six months."
- "Claude Opus 4.7 (66) and GPT-5.5 (65) cost $4.10 and $4.82 per task, roughly ten to sixty times more for three to four index points [than Cursor Composer 2.5]."

**Caveats / counterpoints:**
- Primary source (artificialanalysis.ai) was unreachable directly in this environment (egress-blocked); all figures above come from secondary blogs paraphrasing it. Several of those sites (UsageBox, WhatLLM.org) read as SEO/content-farm output rather than established outlets — treat exact dollar figures as directionally right, not citation-grade precise. Before publishing, verify current numbers directly at artificialanalysis.ai/methodology and the Intelligence Index leaderboard.
- "Index points" are not linear in real-world usefulness — a few points can matter a lot for some tasks (e.g. long-horizon agentic coding) and not at all for others (classification, extraction).

---

## Model routing / cascading: how much of real work actually needs the frontier model

**Claim / question:** For realistic workloads, how much traffic genuinely benefits from the newest/most powerful model vs. a cheaper one?

**Finding:** Practitioner and research consensus puts roughly 60-80% of agentic/production workloads as well-served by cheap models, with routing/cascading to the frontier model reserved for the harder 20-40%, cutting costs 40-90%+ with little to no measured quality loss when done with an eval set.

**Evidence:**
- RouteLLM-style routers: keep ~95% of GPT-4-level quality while sending only ~14-26% of calls to the strong model.
- Cascade routing (cheap model first, escalate on low confidence / failed quality check) reported cost reductions up to ~98% in foundational work, and 40-85% in practitioner write-ups, "with no visible quality loss" when properly evaluated.
- One named SaaS team cut an LLM bill from $14K/month to $5.4K/month via classifier-based routing with "zero accuracy regression."
- Anthropic's own pricing structure encodes this: Haiku 4.5 ($1/$5 per M tokens) vs. Sonnet vs. Opus vs. Fable, with official guidance to use Haiku for classification/routing/simple chat and escalate only when complexity warrants it — i.e. the model maker itself is telling customers not to default to the newest/biggest model.

**Sources:**
- [How many of your agent's calls actually need a frontier model?, LangChain](https://www.langchain.com/blog/switchyard-agent-routing-benchmark)
- [How to Use Model Routing to Cut AI Agent Costs by 60%, MindStudio](https://www.mindstudio.ai/blog/model-routing-cut-ai-agent-costs)
- [Model Routing for Coding Agents: Real Savings?, Unblocked](https://getunblocked.com/blog/model-routing-coding-agents/)
- [Claude API Pricing 2026, MetaCTO](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration)

**Pull quotes:**
- "The biggest mistake is routing without an eval set—you will save money and never notice you also lost 8 points of accuracy."
- "Teams that push 90%+ of traffic to Tier 1 usually see quality regressions they didn't anticipate because they underestimate how many tasks require nuanced handling." (useful as the counter-argument / nuance beat for the post)

**Caveats / counterpoints:**
- These are practitioner blog posts, not peer-reviewed studies; specific percentages vary a lot by source and should be treated as illustrative ranges, not precise figures.
- The nuance quote above is important: the post's thesis shouldn't be "always use the cheapest model," it's "match model to task" — over-routing to cheap tiers does cause measurable regressions on the harder slice of work.

---

## Enterprise and platform-level usage: the flight to "good enough," not to the newest

**Claim / question:** When a new, more capable/expensive frontier model ships, do users and enterprises actually shift usage to it, or do they stay on cheaper/older models?

**Finding:** Aggregate usage data shows real flight toward *cheaper* models (including open-weight/Chinese models), not toward the newest/most expensive frontier tier — the opposite of what "everyone upgrades" would predict.

**Evidence:**
- OpenRouter ("State of AI" study, ~100T tokens analyzed): combined US frontier-lab (OpenAI + Anthropic + Google) token share fell from ~70% in June 2025 to ~30% in June 2026, as usage shifted to cheaper Chinese open models (DeepSeek, Tencent, Xiaomi, MiniMax, Alibaba's Qwen).
- Total weekly token volume on OpenRouter still grew ~12.7x year over year (5T/week in April 2025 to 20T+/week by April 2026) — so this isn't shrinking demand, it's demand growing while shifting away from the priciest frontier tier.
- Anthropic still gained enterprise *spend* share even as this happened: Menlo Ventures' Dec-2025 enterprise report puts Anthropic at 40% of enterprise LLM API spend (up from 12% in 2023), OpenAI down to 27%, driven specifically by Anthropic's coding-market dominance (54% coding share vs. OpenAI's 21%). This is a different axis than raw token share — it suggests enterprises will pay a premium for the model that's best at a specific job (coding), while broader/cheaper workloads drift to lower-cost options.
- Case study: Lindy (AI agent startup) migrated 100% of its traffic off Claude onto DeepSeek v4, cutting inference costs on migrated routes by ~90%. CEO Flo Crivello called it "a matter of survival for the business" and said AI costs had become "unsustainable," exceeding personnel costs — and said he'd switch back if Anthropic cut prices.

**Sources:**
- [State of AI 2025: 100T Token LLM Usage Study, OpenRouter](https://openrouter.ai/state-of-ai)
- [Share Of US Models Being Used On OpenRouter Has Collapsed From 70% To 30%, OfficeChai](https://officechai.com/ai/share-of-us-models-being-used-on-openrouter-has-collapsed-from-70-to-30-over-the-past-year/)
- [2025: The State of Generative AI in the Enterprise, Menlo Ventures](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/)
- [AI startup Lindy ditched Claude entirely for DeepSeek, saving millions, The Decoder](https://the-decoder.com/ai-startup-lindy-ditched-claude-entirely-for-deepseek-saving-millions-as-cost-pressure-mounts-on-anthropic/)
- [This AI agent startup ditched Anthropic for DeepSeek, The New Stack](https://thenewstack.io/lindy-deepseek-anthropic-switch/)

**Pull quotes:**
- "[Lindy's move was] a matter of survival for the business" — Flo Crivello, CEO, on switching 100% of traffic from Claude to DeepSeek.
- "[AI costs had become] unsustainable," exceeding personnel costs, per Crivello — a small (25-person) startup where model spend outgrew payroll.
- Crivello said he would switch back if Anthropic cut prices — useful nuance: this isn't anti-Anthropic, it's price-sensitivity full stop.

**Caveats / counterpoints:**
- OpenRouter is a specific, price-sensitive, developer-heavy marketplace (routing/aggregator traffic) — its mix skews toward cost-optimizing buyers and may overstate the "flight to cheap" trend relative to, say, direct enterprise contracts or consumer ChatGPT/Claude.app usage.
- Menlo's enterprise *spend* share numbers cut the other way for coding specifically — enterprises pay up for the best coding model. The honest framing for the post is "people are selective, not uniformly cost-minimizing" — cheap-if-it-works, expensive-if-it-matters.

---

## Newest-release friction: Fable 5 (Anthropic) and GPT-5.6 (OpenAI)

**Claim / question:** Are the newest flagship releases from Anthropic and OpenAI being adopted as fast/smoothly as past generations, or is there visible resistance/hesitation?

**Finding:** Both companies' most recent flagship releases show adoption friction not typically associated with a clean "everyone upgrades" story — cost complaints for Fable 5, and an unusually cautious rollout for GPT-5.6.

**Evidence:**
- **Anthropic Fable 5** (released June 9, 2026; billed as the first "Mythos-class" model, positioned above the Opus family): early enterprise case studies show strong capability gains (e.g. Stripe reportedly compressed a 50M-line Ruby migration, estimated at 2+ months of human work, into a single day). But enterprise customers and developers publicly criticized Fable 5's token consumption in production — it "burns through token budgets faster than expected, driving up effective costs" even when the free introductory window (June 9-22) made raw access cheap. Separately, a June 12 US export-control order forced Anthropic to pull global access entirely for a period, an unrelated but compounding adoption disruption.
- **OpenAI GPT-5.6** (released July 9, 2026): shipped via a phased rollout to "a small group of organizations" first — described as "an unexpected change of pace for OpenAI, a company known for fast rollouts." Commentary noted skepticism/governance caution before adoption spreads across departments, and that the market was already discussing the *next* rumored model before GPT-5.6 had time to prove itself in production ("ChatGPT 5.6 is knocking before GPT-5.5 has settled").
- **Historical precedent for forced-upgrade backlash:** When OpenAI launched GPT-5 (Aug 7, 2025) it removed legacy GPT-4o access outright, forcing all users onto the new model. This triggered a fast, sharp backlash — users called it a "disaster," criticized its colder "personality" vs. GPT-4o — and OpenAI restored GPT-4o access for paid users within 24 hours, with ChatGPT lead Nick Turley admitting "not continuing to offer 4o, at least in the interim, was a miss." OpenAI committed going forward to not retiring models without warning. Notably, overall ChatGPT usage kept growing through this — the backlash was about *forced* migration and loss of choice, not about GPT-5's capability.

**Sources:**
- [Anthropic is bringing back Claude Fable 5 globally after US lifts export control order, VentureBeat](https://venturebeat.com/technology/anthropic-is-bringing-back-claude-fable-5-globally-after-us-lifts-export-control-order-where-can-enterprises-access-it)
- [Claude Fable 5: Release Date, Availability & Pricing 2026, CodersEra](https://codersera.com/blog/claude-fable-5-launch-guide-2026/)
- [Claude Fable 5 Access After the June 22 Deadline, Developers Digest](https://www.developersdigest.tech/blog/claude-fable-5-june-22-deadline)
- [GPT-5.6 launches, but OpenAI is taking it slow, IBM](https://www.ibm.com/think/news/gpt-5-6-launches-openai-taking-it-slow)
- [ChatGPT 5.6 is knocking before GPT-5.5 has settled, Webiano](https://webiano.digital/chatgpt-5-6-is-knocking-before-gpt-5-5-has-settled/)
- [ChatGPT brings back GPT-4o after GPT-5 rollout backlash, Neowin](https://www.neowin.net/news/chatgpt-brings-back-gpt-4o-boosts-limits-after-gpt-5-rollout-backlash/)
- [ChatGPT 5 Backlash, SimplifyAITools](https://simplifyaitools.com/blog/chatgpt-5-backlash-and-issues/)

**Pull quotes:**
- "[Fable 5] tends to burn through token budgets faster than expected, driving up effective costs."
- "An unexpected change of pace for OpenAI, a company known for fast rollouts." (on GPT-5.6's gated launch)
- "In retrospect, not continuing to offer 4o, at least in the interim, was a miss." — Nick Turley, OpenAI head of ChatGPT, on the forced GPT-5 migration.

**Caveats / counterpoints:**
- None of this is direct adoption-rate telemetry (no "X% of traffic moved to the new model within N weeks" number was found for either Fable 5 or GPT-5.6). The evidence is qualitative/anecdotal: cost complaints, a deliberately slow rollout, and one well-documented forced-migration backlash from the prior GPT-5 launch. Frame in the post as "friction signals," not as a quantified slower-adoption-curve claim.
- Export-control disruption for Fable 5 is a confound — some of its adoption dip is regulatory, not a market verdict on whether people wanted it.
- Several sourcing domains here (CodersEra, Webiano, TechJack, AIBusinessWeekly) are lower-tier/aggregator outlets; corroborate against OpenAI's and Anthropic's own release posts before quoting specifics in the published piece.

---

## Source Notes

- No separate source-note files created; all sources fetched via web search summaries only (direct WebFetch was blocked for every external domain tried in this environment — artificialanalysis.ai, openrouter.ai, menlovc.com, arxiv.org, wikipedia.org, cloudzero.com, catalystneuro.com, usagebox.com, infoworld.com all returned `EGRESS_BLOCKED`). All figures above should be treated as **secondary-sourced** and re-verified against primary pages before publication if precision matters.

## Open Questions

- Direct, quantified adoption-curve data (e.g., % of API/chat traffic on the newest model at 30/60/90 days post-launch, compared across model generations) was not found and may not be publicly published by either lab — worth one more targeted search pass, or treat the post's "adoption" claim as qualitative rather than statistical.
- Would be good to get a cleaner apples-to-apples cost-per-task table for a single fixed task (e.g., SWE-bench Verified) across the current frontier tier (Fable 5, GPT-5.6) vs. one generation back, rather than relying on Artificial Analysis's blended Intelligence Index.
- Consumer-side (ChatGPT/Claude.ai) usage-share-by-model data would strengthen the piece alongside the API/OpenRouter-heavy evidence gathered here — not found in this pass.
