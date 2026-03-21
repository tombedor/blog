# HN Thread Summary: "Can I run AI locally?" (canirun.ai)

**Source:** Hacker News thread on canirun.ai, ~353 comments, 1505 points
**Relevance:** Community evidence for/against local AI thesis in `open-source-models.mdx`

---

## 1. Qwen3.5 is a watershed moment for local models

Multiple independent users called Qwen3.5 a turning point:

- "Qwen3.5 is the very first model that is actually usable for serious work, ever — and I've tried them all." (dexterlagan)
- "Claude level performance on local hardware." (brcmthrowaway)
- "I can say with confidence that 2026 is the year of the local model, at last." (dexterlagan)
- Even the 9B model gets praise for reasoning quality previously unseen at that size.

This is strong community corroboration for the post's parity claim, and adds a qualitative "feel" dimension beyond benchmark scores.

---

## 2. MoE models perform much better than naive estimates suggest

A significant technical thread: tools like canirun.ai calculate token speed using *total* parameters, but MoE models only activate a fraction per token. Qwen3.5 35B-A3B has only 3B active parameters — so it produces tokens at roughly a 3-4B dense model's speed while fitting in memory like a 35B model.

Real-world user reports on modest hardware:
- Qwen3.5 35B-A3B at **30–38 t/s** on an RX 6800 XT (GrayShade)
- Qwen3.5 35B-A3B at **32 t/s** on an RX 9070 (AstroBen) — hardware the site said "can't run it"
- GPT-OSS-120B at **50+ t/s** on a Strix Halo laptop (bityard) — again contradicting the site's estimate

The takeaway: MoE architecture makes capable models much more accessible on consumer hardware than parameter counts imply. This is relevant to the post's hardware section.

---

## 3. Why users run locally: privacy dominates over cost

When asked what $/Mtok would make local worth it, the dominant answer was: **it's not about cost**.

Reasons cited:
- **Privacy / not sharing data with third parties** — most common reason; includes personal health notes, corporate policy, sensitive codebases
- **Experimentation without limits** — no rate limits, no cost anxiety, freedom to run 24/7
- **Academic/engineering curiosity** — experimenting with quants, LoRAs, fine-tunes
- **Offline access** — running without internet dependency

One user (pants2) argued there's no economic break-even: you can run a 6x larger model 30x faster on Groq at $0.60/Mtok. Counterarguments:
- Agentic workflows burn cached prompt reads constantly; cached reads are free locally (throwdbaaway)
- If you're buying a MacBook anyway, the marginal cost of local inference is near zero (xandrius)
- Rate limits on hosted plans make the comparison less clean than raw t/s suggests

---

## 4. The "local models aren't there yet" camp still exists

Several users pushed back on the local AI enthusiasm:

- "For anything where quality matters (scripting, code, complex reasoning) the local models are just not there yet compared to API." (tcbrah)
- "Local shines for specific narrow tasks — TTS, embeddings, Whisper for STT."
- Running agents on small devices (Orange Pi, low-end hardware) is "not feasible in a practical way" — long timeouts, slow inference break agentic loops (Western0)
- One user noted they'd still prefer SOTA cloud models or GLM 4.7 via Cerebras for professional programming work

This is consistent with the brief's counterargument about agentic AI being cloud-native.

---

## 5. Apple Silicon vs. NVIDIA debate

A recurring argument in the thread:

**NVIDIA case:** A single 3090 gets 100+ t/s on Qwen models. An M3 Ultra gets ~30 t/s. For token throughput, NVIDIA wins clearly.

**Apple case:** 128GB unified memory lets you run much larger models that simply don't fit in VRAM. A dual-3090 workstation has nowhere near 256GB of VRAM. Also: macOS, thermals, power efficiency.

The nuance: **Apple wins on model size ceiling; NVIDIA wins on speed per dollar at smaller model sizes.** Neither dominates across all use cases.

---

## 6. Setup is easier than it used to be

A blue-collar electrician (ProllyInfamous) reported successfully installing Ollama and local LLMs with help from an online LLM — "no more difficult than installing Linux." This is anecdotal but notable as a counter to the "too complex for normal users" assumption.

Common recommended stack: Ollama or LM Studio → llama.cpp backend → OpenAI-compatible local API → connect to VS Code Copilot, Zed, OpenCode, or Codex CLI.

---

## 7. The economics of agentic token usage

One exchange worth noting:

> "A million tokens is like 5 minutes of inference for heavy coding use." (danny_codes)

> "At work I regularly hit my 7.5mil tokens/hour limit... I'm not even a heavy user. I think people don't realize how many tokens get burned with CoT and tool calls." (girvo)

At a hard limit of 7.5M tokens/hour, $3K worth of API tokens (at $0.60/Mtok) would be consumed in ~84 days of heavy use. This reframes the economics: the break-even is shorter than it looks for heavy agentic users, and rate limits on hosted plans change the calculus further.

---

## Key quotes for the post

> "I can say with confidence that 2026 is the year of the local model, at last." — dexterlagan

> "I'd happily take something that is 80% as good as SOTA but I can run it locally 24/7." — wilkystyle

> "90% of what you pay in agentic coding is for cached reads, which are free with local inference serving one user." — throwdbaaway

> "Claude level performance on local hardware." — brcmthrowaway (on Qwen3.5)
