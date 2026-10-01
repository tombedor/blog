# Data tables: reverts, rework, velocity, scope (squareup/java, squareup/go-square)

All numbers computed with era-neutral detectors applied identically to every year. Full data and scripts: `~/Development/pr-evolution/` (local repo). Sources: GA2 Snowflake tables for revert/prose-rework/body-coverage; local git clones (full history to 2010/2011) for everything blame- and log-based.

## Reverts (title/branch linkage, ~49% recall, uniform across years)

| Repo | Year | Merged PRs | Reverted % |
|---|---|---:|---:|
| java | 2021 | 27,607 | 0.76 |
| java | 2022 | 31,743 | 0.91 |
| java | 2023 | 44,374 | 0.86 |
| java | 2024 | 48,210 | 0.94 |
| java | 2025 | 53,853 | 0.71 |
| java | 2026* | 40,675 | 0.40 (right-censored) |
| go-square | 2021 | 5,993 | 0.63 |
| go-square | 2022 | 7,678 | 0.63 |
| go-square | 2023 | 10,787 | 0.98 |
| go-square | 2024 | 11,776 | 0.58 |
| go-square | 2025 | 10,269 | 0.74 |
| go-square | 2026* | 8,156 | 0.33 (right-censored) |

Revert latency (median hours from original merge to revert merge, java): 22.3 / 24.4 / 24.1 / 24.8 / 21.2 for 2021–2025 — flat. \*2026 partial through Aug 22.

## Prose-based rework (body cites `#<n>` + fix/causal words, ≤14d) — the artifact

| Repo | 2021 | 2022 | 2023 | 2024 | 2025 | 2026* |
|---|---:|---:|---:|---:|---:|---:|
| java | 0.29% | 0.30% | 0.21% | 0.26% | 0.30% | **5.63%** |
| go-square | 0.22% | 0.10% | 0.16% | 0.22% | 0.31% | **6.89%** |

Body coverage (share of merged PRs with non-empty body) rose 73→93% (java) and 71→97% (go-square) 2021→2026 — a <10% relative effect on 2025→2026, cannot explain 20×.

## Code-based churn (blame provenance: later PR overwrote ≥3 of your lines ≤14d)

Windows: java April (+14d tail); go-square Apr–May (+14d tail). 28,663 PRs traced.

| Repo | 2021 | 2023 | 2025 | 2026 |
|---|---:|---:|---:|---:|
| java | 5.9% | 14.4% | 22.8% | 24.0% |
| go-square | 4.3% | 16.0% | 17.8% | 24.5% |

2025→2026: 1.05× / 1.38×. 2021→2026: ~4.1× / ~5.7× (secular; biggest step 2021→2023). Self-rework 68–75% of reworked originals in every era. N=1 and N=10 sensitivity show the same shape.

## Defect calibration (391 judged pairs, ~50/repo/year, judged from diffs)

| Repo | Year | Defect fix | Planned iteration | Mechanical | Implied defect repair (churn × defect share) |
|---|---|---:|---:|---:|---:|
| java | 2021 | 20.4% | 61.2% | 18.4% | 1.2% |
| java | 2023 | 24.0% | 68.0% | 8.0% | 3.5% |
| java | 2025 | 22.0% | 62.0% | 16.0% | 5.0% |
| java | 2026 | 24.0% | 62.0% | 14.0% | 5.8% |
| go-square | 2021 | 31.7% | 58.5% | 9.8% | 1.4% |
| go-square | 2023 | 32.7% | 61.2% | 6.1% | 5.2% |
| go-square | 2025 | 34.7% | 57.1% | 8.2% | 6.2% |
| go-square | 2026 | 20.0% | 74.0% | 6.0% | 4.9% |

First-follow-up-only (underestimates any-repair); n=50/cell → ±11–13pp CIs. Unclear rate ≤2%.

## Contributor velocity and scope (per author, same windows, bots excluded)

java (April windows):

| Metric | 2021 | 2023 | 2025 | 2026 |
|---|---|---|---|---|
| Active authors | 438 | 640 | 610 | 448 |
| PRs/active-week, median / p90 | 1.5 / 3.2 | 1.5 / 4.0 | 1.5 / 3.75 | 2.0 / 5.6 |
| Merged PRs/author, median / p90 | 3 / 12 | 3 / 12 | 4 / 14 | 5 / 24 |
| Median PR lines, median / p90 | 40 / 233 | 51 / 304 | 62 / 300 | 79 / 397 |
| Median PR files | 3 | 3 | 3 | 3 |
| Distinct files, median / p90 | 11 / 66 | 12 / 56 | 13 / 71 | 20 / 127 |
| New-territory share, median | 0.07 | 0.0 | 0.0 | 0.20 |
| Authors new to repo (24mo) | 14% | 8% | 7% | 14% |

go-square (Apr–May windows):

| Metric | 2021 | 2023 | 2025 | 2026 |
|---|---|---|---|---|
| Active authors | 178 | 280 | 230 | 172 |
| PRs/active-week, median / p90 | 1.0 / 2.83 | 1.33 / 2.5 | 1.33 / 2.86 | 1.5 / 3.75 |
| Merged PRs/author, median / p90 | 3 / 13 | 3 / 13 | 4 / 15 | 3 / 24 |
| Median PR lines, median / p90 | 30 / 252 | 54 / 310 | 58 / 371 | 81 / 570 |
| Median PR files | 2 | 3 | 2.5 | 3 |
| Distinct files, median / p90 | 9 / 51 | 12 / 63 | 13 / 66 | 13 / 123 |
| New-territory share, median | 0.18 | 0.0 | 0.0 | 0.45 |
| Authors new to repo (24mo) | 26% | 19% | 13% | 28% |

Commit-side (GA2 commit table, whole-year, both repos): median commits/author-week java 2 (2021–2023) → 3 → 4 → 5 (2026); p90 7 → 12 → 17 → 28. go-square p90 12 → 15 → 17 → 29.

Caveat for all velocity/scope tables: cross-sectional over a shrinking author base (−25% 2025→2026), not a matched cohort.

## Consistency check vs pr-failure-learnings

- Pair overlap on their catchable 2026 derived pairs: 170/171 (java), 31/31 (go-square) at N=1.
- Their fixup label precision vs diff-based judgment: 25/30 fresh + 4/4 intersection = 29/34 ≈ 85% defect_fix.
- Aligned 7d fixed-side rates: ours 4.3%/3.9%; their brackets 2.8–10.3% (java), 1.5–4.9% (go-square). Verdict: consistent after alignment.
