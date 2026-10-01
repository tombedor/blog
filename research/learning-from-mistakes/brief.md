# Research Brief: learning from mistakes

**Scope:** Verify every number in the post: pair derivation yield, recurrence rate, replay-arm detection rates, decoy effects, matcher/retrieval surfacing rates, and the projected annual impact. All experiments live in the `pr-failure-learnings` repo (README appendix, `EXPERIMENT_LOG.md`, `scripts/`, `data/`).

**Bottom line:**

- On 100 replayed real buggy PRs, the production reviewer (`sq agents review`, point-in-time, codex runner, opus-graded blind) catches 7%; with the oracle lesson 26%; with the deployed hybrid retrieval (TF-IDF top-10 + fired regex matchers) 19%.
- 52.8% of later failures are judged repeats of an earlier one (held at 52.8% with rule text withheld from the judge; 1.5% yes-rate on random pairs).
- Mismatched lessons are inert: decoys on buggy PRs match baseline (4% vs 7%, overlapping intervals) and add no measurable false positives on clean PRs at 1x–10x dose.

## Key claims and evidence

**Pair derivation (78%).** 3,638 warehouse-flagged post-merge-fix PRs; blame-based derivation found the broken PR for 2,823 (78%), yielding 4,776 pairs (one fix can fix many breaks) and 4,772 extracted lessons (4 extraction failures). Validation: 124 derived pairs independently carry `WAS_REVERTED`.

**Recurrence (53%).** Judged on an 800-pair sample stratified by rule-text similarity band and reweighted by band population. 35% of confirmed repeats are cross-repo. 335 lessons had ≥1 confirmed repeat.

**Replay arms (n=100 each, same PRs, same grader).** baseline 7%, oracle lesson 26%, decoy 4%, static-10 8%, TF-IDF retrieved 14%, hybrid 19%, matched+2/+4/+9 decoys 19/18/16%, decoy10 10%. Paired flips baseline→oracle: 24 missed→found vs 5 found→missed. Data: `data/22-sq-review-baseline.jsonl`, `data/23-sq-review-grades.jsonl`.

**Surfacing (same 100 PRs).** static 0%, embeddings 23%, matchers alone 29%, TF-IDF 33%, hybrid 46% (33 via retrieval, 29 via matcher, 16 both), oracle 100%. Matcher-only-surfaced golds converted at 31% — same as oracle-adjacent — so matcher fires lose nothing in delivery.

**Matcher fleet.** 200/335 repeat-confirmed lessons got an accepted matcher (60%); out-of-sample repeat recall 103/276 (37%); mean background rate 1.45%, median 0.84%; ≥1 of 200 fires on 58% of random PRs (mean 4.5 when any).

**Impact projection.** ~3,600 post-merge-fixed bugs/year in covered repos × ~53% repeats × 12-point detection gain ≈ 230 additional bugs caught/year.

**Caveats (disclosed in the appendix source note):**

- Replay handicap: defects fixed pre-merge after being raised in the real review are mechanically unfindable on replay; the 26% oracle conversion is a reviewer/harness property, not retrieval loss.
- Clean-PR false-positive rates are upper bounds ("unfixed ≠ clean"); decoy clean-PR tilt (+10pts any-finding) is statistically indistinguishable from reviewer churn (p≈0.18) and rule-echo grading attributes it to churn, not lesson parroting.
- Hybrid surfacing understates fleet-width coverage (matchers authored only for the 335 repeat-confirmed lessons; offline union estimate ~58%); the 15-matcher cap truncated 11/100 cases.
- Claude-runner replication of the baseline (model-swap unconfounding) not yet run.

## Source notes

- `methodology-appendix.md` — full methodology appendix from the repo README (pair derivation, recurrence judging with controls, replay harness leak-closures, decoy/dose analysis, retrieval pipeline and the eight beaten alternatives, matcher acceptance rules, leave-one-out and selection-vs-budget negative results, replay-handicap note).

## Sources

- `~/Development/pr-failure-learnings` — README (post copy source), `EXPERIMENT_LOG.md`, `scripts/`, `data/`.
- Productionization draft PR: https://github.com/squareup/agents/pull/6168 (end-to-end v0 behind `sq-agents-review-lessons` flag).
- `~/Development/pr-failure-learnings/IMPLEMENTATION_PLAN.md` — rollout milestones and curation loops.

## Open questions

- Post title ("learning from mistakes" frontmatter) vs README title ("Learning from bugs").
- The `{/* diagram: linking similar bugs */}` placeholder in the post still needs its diagram.
- Whether to cite the agents draft PR in the post's conclusion once it merges.
