# Frontier-vs-Frontier Lead Notes

**Purpose:** Notes for a chart analogous to open-source time-to-parity, but measuring how long frontier model leads lasted against other frontier models.  
**Research date:** 2026-04-10

## Method Recommendation

- Use a **single benchmark family per chart**. SWE-bench Verified is the cleanest for modern frontier coding leads because OpenAI, Anthropic, and Google report comparable headline numbers.
- Avoid mixing SWE-bench Verified, SWE-bench Pro, LMArena, MMLU, GPQA, and company-specific agentic evals in one bar chart; it will create false precision.
- Label ongoing leads explicitly rather than forcing a month count.

## Candidate Dataset: SWE-bench Verified / Coding

| Lead model | Provider | Lead date | Lead benchmark | Lead score | Matched / beaten by | Provider | Match date | New score | Months held | Status | Sources |
|---|---|---:|---|---:|---|---|---:|---:|---:|---|---|
| GPT-5 | OpenAI | 2025-08-07 | SWE-bench Verified | 74.9 | Claude Sonnet 4.5 | Anthropic | 2025-09-29 | 77.2 | 1.7 | beaten | OpenAI GPT-5 system card; Anthropic Sonnet 4.5 announcement |
| Claude Sonnet 4.5 | Anthropic | 2025-09-29 | SWE-bench Verified | 77.2 | Claude Opus 4.5 | Anthropic | 2025-11-24 | 80.9 | 1.8 | beaten by same lab | Anthropic Sonnet 4.5; Anthropic Opus 4.5 system card |
| Claude Opus 4.5 | Anthropic | 2025-11-24 | SWE-bench Verified | 80.9 | None found on same benchmark | n/a | n/a | n/a | 4.6+ | ongoing as of 2026-04-10 | Anthropic Opus 4.5 system card; OpenAI release index |

## Readout For Mythos Post

- The strongest support for "frontier model leads are short-lived" is GPT-5 -> Sonnet 4.5 and Sonnet 4.5 -> Opus 4.5, both under two months.
- The claim is weaker if the intended meaning is **cross-lab** competition only: Opus 4.5's public SWE-bench Verified lead appears to have lasted at least several months.
- A defensible phrasing: "Even frontier labs leapfrog each other on the scale of months, though individual benchmark leads can last longer and the answer depends heavily on which benchmark you choose."

## Sources To Use When Building Chart

- OpenAI release index: https://openai.com/research/index/release/
- GPT-5 system card: https://cdn.openai.com/gpt-5-system-card.pdf
- Anthropic Sonnet 4.5 announcement: https://www.anthropic.com/news/claude-sonnet-4-5
- Anthropic Opus 4.5 system card: https://assets.anthropic.com/m/64823ba7485345a7/Claude-Opus-4-5-System-Card.pdf
- Google Gemini 3 announcement if adding non-Anthropic comparison: https://deepmind.google/models/gemini/pro/

## Chart Caveats

- GPT-5.4 and Mythos use newer eval framings and may not report the same SWE-bench Verified setup publicly.
- Model providers sometimes report different harnesses, budgets, and scaffold settings; use chart labels like "reported public benchmark lead" rather than "absolute capability lead."
- If the post uses this chart rhetorically, keep it adjacent to the open-source parity chart but separate from it. Open-source parity is a "catch-up" chart; frontier-vs-frontier is a "leaderboard churn" chart.
