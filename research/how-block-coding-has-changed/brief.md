# Research Brief: How coding at Block has changed (reverts and fixups, pre-AI vs now)

**Scope:** What actually changed in how code ships at Block across the AI transition, measured from squareup/java and squareup/go-square history (2019–2026) with detectors that behave identically in every era. Verifies whether AI-era code gets reverted or fixed up more than human-era code, and what did change (velocity, scope, iteration style).

**Bottom line:**

- Reverts did not rise. Same detector, every year: java 0.71–0.94% and go-square 0.58–0.98% of merged PRs reverted, flat 2021–2025, no step at the 2023 Copilot boundary or the 2025 agentic ramp. Revert latency (median ~21–25h to revert, java) is also flat — humans notice-and-revert at the same speed they always did.
- A naive prose-based fixup detector shows a ~20× rework explosion in 2026 — and it is a measurement artifact, not a quality collapse. Agent-written PR bodies cite `#<n>` with fix/causal language far more, and stacked-PR tooling turns fixup commits into follow-up PRs, so the detector's recall shifted, not (mostly) the behavior.
- The code-only measure (git blame provenance: a later PR overwrote ≥3 lines you wrote within 14 days) moved 1.05× (java) and 1.38× (go-square) from 2025→2026. The bigger story is secular: 2021→2026 is ~4.1×/~5.7×, and the largest step is 2021→2023, before agents.
- What the overwrites are: judged samples (391 pairs, from the diffs) say 57–74% is planned iteration, only 20–35% defect fixes — and the defect share did not rise 2025→2026 (java flat 22→24%; go-square fell 34.7→20.0%). Implied defect-repair rate is flat across the AI transition (~5–6%).
- What did change: throughput and scope, concentrated in the tail. p90 PRs/author-week +49% (java) in one year; p90 distinct files/author ~+80%; the median contributor's "new territory" share (PRs touching a top-level dir they hadn't touched in 24 months) jumped from 0.0 to 0.20 (java) / 0.45 (go-square) in 2026. Fewer active authors (−25%) shipping the same or more volume; new-to-repo authors doubled.

## Do AI-era PRs get reverted more?

**Claim or question:** AI-assisted code is reverted more often than human code.

**Finding:** No. Revert rates are flat across the entire transition, within a detector whose recall is constant across years.

**Evidence:**

- Title/branch revert linkage (`Revert "…"` titles + `revert-<n>-` branches, revert merged after original), applied to every year 2020–2026: java 0.71–0.94%, go-square 0.58–0.98% for all full years. 2026 partials (0.40%/0.33%) are right-censored floors, not improvements.
- Detector recall ~49% of true reverts (measured in tech-health's `int_velocity__pr_revert_linkage`), so true rates are plausibly ~1.3–1.9% — but the undercount is uniform across years, so the flat trend holds.
- Revert latency: java median in a tight 21–25h band every full year 2021–2025.

**Sources:**

- `~/Development/pr-evolution/reports/baseline-revert-rework-report.md` (+ `data/baseline-revert-rework-data.json`)
- `squareup/agents` PR #6171, `docs/design/verified-success-human-baseline.md` (reviewed version)

**Caveats or counterpoints:**

- 2026 revert rows are right-censored (no window cap) — exclude 2026 from any "still flat" claim.
- Squash-merged manual reverts, partial reverts, and fix-forward are invisible to this detector in every era.

## The 20× fixup explosion that wasn't

**Claim or question:** Post-merge fixups jumped ~20× in 2026 (prose detector: follow-up PR body cites `#<n>` + fix/causal words, merged ≤14d after original).

**Finding:** Real signal in the detector, artifact in the interpretation. The prose rule reads 0.2–0.3% every year 2021–2025, then 5.6% (java) / 6.9% (go-square) in 2026 — but its recall depends on PR-body writing style, which is exactly what agents changed.

**Evidence:**

- Body-coverage control rules out the boring explanation (coverage rose only 85→93% java, 90→97% go-square — a <10% relative effect, nowhere near 20×).
- The code-only churn measure (blame provenance, no prose): java 5.9% (2021) → 14.4% (2023) → 22.8% (2025) → 24.0% (2026); go-square 4.3% → 16.0% → 17.8% → 24.5%. 2025→2026 = 1.05×/1.38×. Largest step is 2021→2023, pre-agents.
- Judged calibration of 391 overwrite pairs: defect-fix share flat-to-falling 2025→2026; implied defect repair java 5.0→5.8%, go-square 6.2→4.9%.

**Sources:**

- `~/Development/pr-evolution/reports/code-rework-report-section.md`, `reports/code-rework-followups.md`, `data/fix-vs-iteration.json`
- Methodology lineage: `~/Development/pr-failure-learnings/scripts/derive_pairs.py` (blame-provenance pairing)

**Caveats or counterpoints:**

- Churn is an independent indicator, not a strict bound on repairs: add-only fixes (new validation, error handling, tests) never overwrite the original's lines, so they're invisible to the blame measure.
- Calibration is first-follow-up-only (underestimates any-repair incidence) and n=50/cell (±11–13pp CIs).
- 2021→2026 secular framing matters: vs the only sampled pre-AI year, churn is up ~4.1–5.7× — the honest headline is "iteration style changed enormously over five years; the AI year-over-year step is modest."

## Cross-check against pr-failure-learnings

**Claim or question:** Is this consistent with the pr-failure-learnings analysis and its post-merge non-revert fixup labels?

**Finding:** Consistent after alignment — same instrument, different slices.

**Evidence:**

- Pair-level: of their blame-derived pairs catchable in our 2026 windows, we match 99.4% (java) / 100% (go-square) at N=1; every N=3 miss has exactly 1–2 blame-overlap lines (they apply no threshold).
- Rate-level: their 2.8% is fix-side (PRs that ARE fixups); ours is fixed-side (originals that GET fixed; one fix marks ~2 originals). Aligned to 7d fixed-side, our estimates (4.3%/3.9%) sit inside their lower/upper brackets (2.8%/1.5% blame-linked; 10.3%/4.9% file-overlap).
- Label quality: their title-keyword `IS_POST_MERGE_FIX` is ~83–85% precise against diff-based judgment — high precision, low coverage; compatible with only 20–24% of unconditioned overwrites being defect fixes.

**Sources:**

- `~/Development/pr-evolution/reports/consistency-with-pr-failure-learnings.md` (+ `data/consistency-check.json`)

**Caveats or counterpoints:**

- Their fixups are NOT non-revert by construction: 282/3,638 also carry `IS_REVERT` — filter explicitly when reusing.
- 49% of their pair gaps exceed the 7d labeling window (median 6.8d).

## What actually changed: velocity and scope

**Claim or question:** Did contributors get faster, and did they range wider?

**Finding:** Both — but concentrated in the tail, with a contributor-mix shift underneath.

**Evidence:** (per-author, fixed spring windows, bots excluded; see source note for full tables)

- Throughput: median PRs/active-week java 1.5→2.0; p90 +49% java (3.75→5.6), +31% go-square; p90 PRs/author ~14–15→24 in both repos. Commit-side: median commits/author-week java 2→5 (2023→2026), p90 7→28.
- Scope: distinct files/author java median 13→20, p90 71→127; new-territory share median 0.0 (2023/2025) → 0.20 java / 0.45 go-square (2026), breaking a settled territorial pattern.
- Mix: active authors −25% 2025→2026 in both repos; java volume +20%, go-square flat (same output, fewer authors); authors with no prior-24mo repo history doubled (7→14% java, 13→28% go-square).
- PRs got bigger, not smaller: median lines java 62→79, go-square 58→81; files/PR flat at ~3.
- Fix latency: code-based time-to-first-overwrite flat-to-faster (go-square median 93→55h monotone); prose-detector 2026 latency looks much faster but ~16% of its pairs are right-censored.

**Sources:**

- `~/Development/pr-evolution/data/contributor-scope.json`, `reports/code-rework-followups.md`
- `data-tables.md` source note (this directory)

**Caveats or counterpoints:**

- Cross-sectional percentiles over a shrinking author population, not a matched cohort — mix shift and merge centralization contribute alongside genuine acceleration. A matched-author cohort is the obvious refinement.
- Author = commit email; email switches and agent-attributed commits inflate "new territory". New-to-repo authors are 1.0 new-territory by construction.
- Two monorepos only (java, go-square), spring windows only; commit granularity norms changed (agents commit smaller/more).

## Source notes

- `data-tables.md` — the full per-year tables (reverts, prose rework, code churn, defect calibration, velocity/scope) with window definitions.
- Full reports, data, scripts, and judged-pair evidence: `~/Development/pr-evolution/` (local repo). Reviewed narrative version: `docs/design/verified-success-human-baseline.md` on squareup/agents PR #6171.

## Open questions

- Matched-author cohort: does the p90 acceleration hold for the same people year-over-year, or is it mix shift?
- Judge all follow-ups (not just the first) to get any-repair incidence; extend calibration n beyond 50/cell.
- Does the flat-defect result hold outside these two monorepos (e.g., cash-server, smaller service repos)?
- 2026 latency claims need a matured or censoring-corrected cohort before publication.
