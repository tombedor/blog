# Research Brief: "Is the Future of AI Local?"

**Post:** `blog/open-source-models.mdx`
**Research date:** 2026-03-15
**Purpose:** Fact-check and expand on post claims with published evidence

---

## Overall Verdict

The post's core thesis is well-supported. The open-source parity case and Apple's contrarian strategy are its strongest points. The weakest assumption is that pricing pressure on consumers will come from sticker price increases — the better framing, supported by evidence, is **subscription value decay** plus the **Jevons paradox** keeping aggregate spend high regardless of per-token deflation.

---

## Claim 1: Remote providers are pricing at unsustainable levels

**Verdict: Strongly supported — with the pricing direction caveat**

- OpenAI burned **$8B on compute in 2025** despite $13B+ revenue; projects $14B cumulative losses by end of 2026. ([AI2 Work](https://ai2.work/technology/ai-market-openai-anthropic-inference-losses-2025/))
- AI-first SaaS gross margins run **20–60%** vs. 70–90% for traditional SaaS. ([GPUnex](https://www.gpunex.com/blog/ai-inference-economics-2026/))
- Per-token inference costs have fallen ~1,000x from late 2022 to early 2026 — from $20/M to $0.40/M for GPT-4-class performance. This deflation is structural and ongoing.

**The framing that holds up better than "prices will rise":** The mechanism is subscription value decay, not headline price increases:
- Anthropic introduced weekly rate limits for Claude Code in August 2025 to stop a small group running it "continuously 24/7." One user documented a **~60% effective reduction** in throughput within the Max plan. ([TechCrunch](https://techcrunch.com/2025/07/28/anthropic-unveils-new-rate-limits-to-curb-claude-code-power-users/), [The Register](https://www.theregister.com/2026/01/05/claude_devs_usage_limits/))
- Anthropic doubled consumer limits over December 25–31, 2025 as a holiday gift — explicitly *because* enterprise customers were on vacation and their absence freed up compute headroom. This reveals enterprise workloads ordinarily consume priority capacity.
- Claude Code Review at $15–25/PR is a signal of where the pricing frontier sits for serious usage — metered enterprise, not flat subscription.

**The Jevons Paradox supports the total-cost argument:**
- Enterprise GenAI spending rose **320% in 2025** (from $11.5B to $37B) while per-token costs fell 1,000x. Demand grew ~10,000x. Organizations spending $100K+/month on AI doubled to 45% of the market. ([NavyAI](https://www.navyaai.com/reports/ai-cost-report-token-prices-vs-ai-bill), [ArturMarkus](https://www.arturmarkus.com/the-inference-cost-paradox-why-generative-ai-spending-surged-320-in-2025-despite-per-token-costs-dropping-1000x-and-what-it-means-for-your-ai-budget-in-2026/))
- Satya Nadella explicitly invoked Jevons Paradox by name when DeepSeek launched: "As AI gets more efficient and accessible, we will see its use skyrocket."
- Even as unit costs fall, the absolute AI invoice keeps growing because usage expands faster than efficiency improves.

---

## Claim 2: Open source models reach parity with frontier models within ~6 months

**Verdict: Strongly supported**

- Chatbot Arena Elo gap shrank from **8% to 1.7%** between January 2024 and February 2025. ([Stanford HAI AI Index](https://hai.stanford.edu/ai-index/2025-ai-index-report))
- DeepSeek-V3.2 (open weights, MIT license) achieved parity with GPT-5 on multiple reasoning benchmarks at **$0.28/M input tokens** — 94% cheaper than Claude Opus 4.5. ([ArXiv — DeepSeek-V3.2](https://arxiv.org/html/2512.02556v1))
- Llama 4 Maverick, Qwen3-235B, Mistral Large 3: all at 85–90% of frontier on key benchmarks. ([BentoML](https://www.bentoml.com/blog/navigating-the-world-of-open-source-large-language-models))

**On benchmark gaming:** The post acknowledges this but notes "the same could be argued of frontier models" — this is now well-documented:
- Meta admitted it "cheated a little" on Llama 4 benchmark testing.
- OpenAI found SWE-bench Verified contaminated with training data; top models score ~23% on contamination-resistant SWE-bench Pro vs. 70%+ on the standard version.
- The contamination problem is symmetric — neither side has clean hands. ([The Register](https://www.theregister.com/2025/11/07/measuring_ai_models_hampered_by/))

---

## Claim 3: The "waterslide" — frontier models inadvertently train open source competitors

**Verdict: Strongly supported**

- DeepSeek-R1 generated 800K chain-of-thought training samples to distill reasoning capabilities into 6 smaller open-source models. ([HTEC](https://htec.com/insights/ai-model-distillation-evolution-and-strategic-imperatives-in-2025/))
- OpenAI itself ships a [Model Distillation API](https://labelbox.com/blog/a-pragmatic-introduction-to-model-distillation-for-ai-developers/) for fine-tuning smaller models on GPT-4o and o1 outputs.
- "Black-box adversarial distillation" — using a competitor's API as a teacher — is an active research area. "Comparative Knowledge Distillation" generates N² training pairs from N API calls. ([ArXiv — KD Using Frontier Open-Source LLMs](https://arxiv.org/abs/2410.18588))
- The field of distilling from proprietary LLMs (GPT-4, Claude) to open-source counterparts (LLaMA) is now a well-established literature. ([Springer, 2025](https://link.springer.com/article/10.1007/s10462-025-11423-3))

---

## Claim 4: Small, specialized models will fill the void

**Verdict: Strongly supported — already happening faster than the post implies**

- **Gartner (April 2025):** By 2027, organizations will use small task-specific models **3x more** than general-purpose LLMs. ([Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-04-09-gartner-predicts-by-2027-organizations-will-use-small-task-specific-ai-models-three-times-more-than-general-purpose-large-language-models))
- A 7B-parameter medical SLM outperformed GPT-4 on clinical summarization (Stanford HAI).
- GPT-4o-mini fine-tuned on 1,000 domain examples achieves 91.5% accuracy on par with GPT-4o at **2% of the price**.
- Global SLM market valued at ~$1B in 2025, projected **28%+ CAGR**. ([V2Solutions](https://www.v2solutions.com/blogs/specialized-language-models-domain-focused-ai-2025/))
- Enterprise generative AI investment was almost entirely in domain-specific applications by 2025. ([BayTech](https://www.baytechconsulting.com/blog/the-state-of-artificial-intelligence-in-2025))

---

## Claim 5: Apple is betting on local

**Verdict: Supported — with nuance on "hybrid" vs. "fully local"**

- Apple FY2025 capex: **$12.72B** (+35% YoY). Amazon plans $200B for 2026; Alphabet $175–185B; Meta $115–135B; Microsoft ~$145B. Apple spends ~1/10th of its nearest competitor. ([Fortune](https://fortune.com/2026/02/17/why-apple-isnt-spending-big-on-ai-capex-commodity-integration-strategy/), [CNBC](https://www.cnbc.com/2025/10/30/apple-isnt-playing-the-same-ai-capex-game-as-the-rest-of-the-megacaps.html))
- Strategy is explicitly **hybrid**: Private Cloud Compute (on M-series chips) + third-party cloud for overflow + $1B/year Google Gemini licensing deal.
- 2026 Siri overhaul is designed around local-first with selective cloud offload. ([ITP.net](https://www.itp.net/digital-culture/apple-ai-strategy-2026))
- Apple's bet is that the model layer commoditizes — making infrastructure ownership a liability rather than a moat.

---

## Claim 6: MacBook hardware can now run meaningful open source models (M5 Max leap)

**Verdict: Supported — with a ceiling caveat**

- M5 Max confirmed: up to **128GB unified memory**, **614 GB/s memory bandwidth**, Neural Accelerators in every GPU core. ([Apple Newsroom](https://www.apple.com/newsroom/2026/03/apple-introduces-macbook-pro-with-all-new-m5-pro-and-m5-max/))
- LLM prompt processing **4–6.7x faster** vs. M4 Max and M1 Max. ([Apple ML Research](https://machinelearning.apple.com/research/exploring-llms-mlx-m5))
- 70B Q4_K_M model (~40GB) fits entirely in memory with 88GB to spare, runs at **18–25 tokens/second** — serviceable for interactive use. ([ModelFit](https://modelfit.io/blog/m5-pro-max-local-llm-2026/), [Hardware Corner](https://www.hardware-corner.net/m5-max-local-llm-benchmarks-20261233/))
- Apple officially demoed M5 Pro/Max running models in LM Studio at the chip launch.

**Ceiling:** 128GB caps out around 70B parameters for quality inference. The largest frontier-matching open models (DeepSeek V3 671B, Qwen3.5 397B) still require multi-GPU cloud setups. The "frontier parity" models are not yet locally runnable on a single device.

---

## Claim 7: "Private and free is hard to beat"

**Verdict: Qualitatively supported; structurally contested**

**Supporting the privacy/ick-factor argument:**
- All major AI providers — OpenAI, Google, Anthropic, Microsoft, xAI — shipped persistent memory features by mid-2025.
- Italy fined OpenAI €15M for GDPR violations; 225K+ OpenAI credentials appeared on dark web markets; Samsung employees leaked proprietary data via ChatGPT. ([MIT Technology Review](https://www.technologyreview.com/2026/01/28/1131835/what-ai-remembers-about-you-is-privacys-next-frontier/), [TechPolicy.Press](https://www.techpolicy.press/the-privacy-challenges-of-emerging-personalized-ai-services/))
- Ollama surpassed **100K GitHub stars**; native desktop app launched July 2025; described as the "default choice" for local LLMs in 2026. ([Infralovers](https://www.infralovers.com/blog/2025-08-13-ollama-2025-updates/))

**Counterforces:**
- The "context flywheel" is real: AI that knows your history is genuinely more useful, driving memory adoption despite privacy concerns. ([New America OTI](https://www.newamerica.org/oti/briefs/ai-agents-and-memory/))
- Agentic AI — the dominant 2026 enterprise growth vector — is inherently cloud-centric: it requires external API calls, orchestration across systems, persistent state, and data pipelines that local models can't access. ([NextGov](https://www.nextgov.com/artificial-intelligence/2025/12/2026-set-be-year-agentic-ai-industry-predicts/410324/))

---

## Counter to "agentic AI is cloud-native"

The objection that AI workloads are cloud-native by nature has a composition problem: it describes the *most complex* use cases as if they represent the *typical* use case. The evidence on where tokens actually go undercuts it.

**Coding dominates token consumption:**
- Coding went from ~11% of token volume in early 2025 to **over 50% of all tokens** by end of 2025 — by OpenRouter's State of AI data. It is now the majority use case by volume, still accelerating. ([OpenRouter — State of AI](https://openrouter.ai/state-of-ai))
- **92.6% of developers** use an AI coding assistant at least monthly; **26.9% of all production code** is now AI-authored (up from 22% last quarter). ([DX — AI-Assisted Engineering Q4 2025](https://getdx.com/blog/ai-assisted-engineering-q4-impact-report-2025/))
- Gartner estimated the 2025 AI code-assistant market at **$3.0–$3.5 billion**; growing to $30.1B by 2032 at 27.1% CAGR.
- Between 20–40% of workers across industries use AI on the job, but **the highest use is in software development** — consistently. ([Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/ai))

**Coding is structurally local-friendly — the opposite of cloud-native:**
- Reads and writes local files; the entire context is already on the machine
- Runs local tests; the feedback loop is local
- No external orchestration required — even "agentic" coding tools like Claude Code and Cursor primarily operate on the local filesystem
- Strong IP/compliance incentive: sending proprietary code to a third-party provider is a genuine legal and security risk, already driving enterprise demand for local coding assistants specifically (Samsung data leak via ChatGPT is the canonical example)
- Coding prompts are long (routinely 20K+ input tokens), making per-request cloud cost high and the economics of local inference more attractive as hardware improves

**The reframe:** Local AI doesn't need to win every use case — it just needs to win its natural home. That home happens to be where most tokens live right now. The cloud-native objection correctly describes *agentic enterprise workflow* AI (customer pipelines, CRM orchestration, cross-system agents), but that's a downstream, still-emerging use case. The current dominant use case — coding — runs most naturally local.

---

## Related: canirun.ai (HN front page, March 13 2026)

[canirun.ai](https://www.canirun.ai/) — built by midudev — is a browser tool that detects your hardware and tells you which local AI models you can run. It went viral on HN with **899 points and 235 comments**. ([HN discussion](https://news.ycombinator.com/item?id=47363754))

**Intersection with the post:**
- Uses the same methodology as the post's appendix: memory bandwidth as the primary inference speed constraint, VRAM/RAM as the fit constraint, Q4 quantization as baseline — independently arrived at the same framework
- Viral success is itself demand validation for the post's thesis: a large audience is actively trying to run models locally and frustrated by the lack of clear guidance
- HN comments called out small models (Qwen3.5 9B) as "fantastic for local tool use and information extraction" — validates the small-specialized-models section
- One commenter noted a 3090 hitting "100+ tokens/second for Qwen" — the post's 8 t/s threshold in the appendix is quite conservative; the practical ceiling is much higher on mid-range hardware
- The tool's **device comparison feature** (highlighted by Gigazine as "useful when considering buying a new graphics card") implies a forming market for dedicated local AI hardware — purchasing decisions, not just capability assessment

**Where the post's analysis is stronger:** The post shows the split between RAM-fit and speed-fit separately; canirun.ai blends them into a single 0–100 score, hiding which constraint is actually binding.

**Known limitations of canirun.ai** (likely discussed in HN thread):
- Database covers only ~40 GPUs and ~12 Apple Silicon chips; many configs unrecognized
- ±20% variance on performance estimates
- Firefox detection failures (Chrome/Edge recommended)
- CPU+GPU hybrid inference not modeled

---

## Key counterarguments the post doesn't address

**1. Agentic AI is cloud-native by architecture**
The biggest near-term AI use case growth (agents, multi-step workflows, tool-calling) requires coordination across APIs, databases, and external services. Local models are structurally disadvantaged here — not because of capability, but because of network access and orchestration requirements. Serverless cloud is projected to be the default for 80% of AI agents by 2026 (Forrester). *See counter above — this objection has a composition problem given coding's dominance of token volume.*

**2. Inference deflation continues structurally**
Algorithmic efficiency is improving at ~3x/year independent of competition. If GPT-4-class performance reaches $0.05/M tokens, the cost argument for local becomes much weaker (though privacy and latency arguments remain). The post assumes "Uber cheap rides" must end; the efficiency curve suggests prices can keep falling.

**3. The largest open models still require cloud**
True frontier-class open models (DeepSeek-V3, Qwen3.5-397B) are not runnable locally. They require the same datacenter infrastructure as closed models. "Local" in practice means models one or two generations behind the state-of-the-art open frontier.

---

## Summary table

| Claim | Verdict | Notes |
|---|---|---|
| Providers pricing at unsustainable levels | ✅ Supported | Negative margins documented |
| Prices will rise (end of cheap era) | ⚠️ Contested | Per-token deflation continues; decay-of-value is sharper framing |
| Subscription value quietly decays | ✅ Supported | Rate limits, enterprise priority, holiday capacity story |
| Total AI spend high despite falling unit costs | ✅ Supported | Jevons paradox; 320% enterprise spend increase in 2025 |
| OS models reach parity in ~6 months | ✅ Supported | Elo gap 8% → 1.7% (Stanford HAI) |
| Benchmark gaming symmetric (both sides) | ✅ Supported | Meta admitted cheating; SWE-bench contaminated across labs |
| Waterslide / distillation propagates capabilities | ✅ Supported | Active research field; DeepSeek-R1, OpenAI's own distillation API |
| Small specialized models are the future | ✅ Supported | Already happening; Gartner 3x prediction |
| Apple is contrarian on capex | ✅ Supported | 1/10th of nearest competitor |
| Mac hardware can run meaningful models | ✅ Supported (with ceiling) | 70B practical max; frontier-class open models still cloud-only |
| Privacy/local is hard to beat | ✅ Qualitatively | Weakened for agentic use cases |
| Local will eat cloud market share | ⚠️ Mixed | Strong for consumer/dev; weak for enterprise agentic |
| Coding dominates token volume (~50%+) | ✅ Supported | OpenRouter data; coding is structurally local-friendly |
| Agentic = cloud-native objection | ⚠️ Composition problem | True for complex agents, but coding is the dominant use case |
