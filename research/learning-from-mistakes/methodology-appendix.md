# Source note: methodology appendix

Verbatim from the `pr-failure-learnings` README appendix (bot-written section), copied 2026-08-20.

# Appendix (bot written content follows!)

## Methodology

### Associating non-revert fixup PR's to earlier PR's

We derive break→fix pairs ourselves. The warehouse flags a PR as a post-merge fix but does not record *which* earlier PR it fixes, and its LLM pairing labels cover about 1% of the fix population. So:

1. Take every merged PR flagged as a post-merge fix in a 12-month window (`squareup/java`, `cash-server`, `go-square`).
2. For each line the fix PR changed, `git blame` that line at the fix's parent commit. The PR that last touched those lines is the candidate "breaking" PR.
3. Keep pairs with enough blamed-line hits to be confident the fix substantially rewrote the earlier PR's work.

**Validation:** the derivation is never shown revert metadata, but recovers revert relationships on its own — 124 derived pairs independently carry the warehouse's `WAS_REVERTED` label, and revert commits blame their targets directly. Yield: 4,776 pairs from 2,823 fix PRs.

From each pair we extract a *lesson*: a model reads the break and the fix and writes the failure mechanism (from a closed vocabulary) and a `correct_rule` — the reusable statement of what to do instead. One standing rule from this step: **no model self-assessment is ever used as a filter** (asked whether failures were "knowledge-shaped" the model said yes 99.1% of the time, including on typos; its confidence ratings were inverted against outcomes).

### Test 1: do similar bugs recur?

Preventability ("would a lesson have stopped this?") is a counterfactual — reading the fix makes everything look preventable. Recurrence is observable, so we measure that instead.

- **Candidates:** pairs of failures with the same mechanism and similar `correct_rule` text (TF-IDF cosine ≥ 0.15), where the earlier failure was fixed before the later one broke. No location constraint — repeats are counted across teams and across repos.
- **Judge:** a strict model prompt asks whether the two failures are the same mistake. Budget is spread evenly across similarity bands and the result reweighted by band population, so the similarity score itself is not deciding the outcome.
- **Controls:**
  - *Random pairs:* the judge says "same mistake" on 1.5% of uniformly random failure pairs, so it is not a yes-sayer.
  - *Rule text withheld:* candidates are selected by rule similarity, so the judge was re-run without seeing the rule texts. The rate held (52.8% withheld vs 48.8% shown) — the result is not circular.

**Result (existing): 52.8% of later failures are judged repeats of an earlier one.** 35% of confirmed repeats are cross-repo, which is why the lesson store must be company-wide and never keyed by code location.

### Test 2: do lessons help reviewers catch issues they wouldn't otherwise?

*Complete — this supersedes our earlier constructed-review arms.* The bar is not "does a review with a lesson beat a review without one"; it is "does a lesson beat **the review system we already run**." So the baseline is `sq agents review` (Builderbot Code Review), not a review prompt we wrote ourselves.

- **Baseline arm — the production reviewer, point in time.** For each breaking PR: check out its head SHA in the local clone; pin the global checks to the state of `squareup/agents` at the PR's merge date (repo-local `.agents/checks/` pin for free with the checkout); disable the live repository knowledge base; bypass the shared review cache; run `sq agents review --local` and collect findings from the artifact without posting anything. The reviewer binary itself stays current — only the knowledge inputs (checks, knowledge base) are pinned, since the question is what the reviewer *knew*, not how good its harness was. Point-in-time matters because teams add checks by hand after getting burned (e.g. `java`'s LaunchDarkly check, added 2026-07 inside our failure window) — running today's checks against yesterday's bugs would leak the answer into the baseline. One further leak was found empirically and closed: the production reviewer resolves the PR from the checkout and reads its full discussion — including the *real* historical review comments — then drops findings already raised there, so a naive replay dedupes itself against the future. Each case is therefore rebuilt as fresh local commits with a byte-identical diff, the PR number stripped from the subject, and a no-PR-lookup/no-posting instruction (the same one the reviewer's own shadow-backfill mode injects). The reviewer's live-service channels (Datadog, LaunchDarkly, Glean, codesearch, meta-repo review context) are severed for the same reason: they serve current state, which can include the incident's own aftermath. Severing them slightly weakens the baseline versus true period behavior — the period reviewer had those services at period state, which cannot be reconstructed — and that bias is disclosed with the result.
- **Treatment arm — the same review plus the lesson.** The retrieved lesson is injected as a repo-local check file, the same format engineers hand-write today. This tests the real delivery mechanism, not a bespoke prompt.
- **Grading:** a fixed judge model with a fixed prompt grades whether each arm's findings name the defect that actually shipped. Judge and prompt are held constant across arms; the reported number is the delta.
- **Model note:** the production reviewer defaults to GPT‑5.5 via goose/codex, while our lessons were mined with Claude. We run the baseline both as-deployed and with the reviewer's Claude runner, so the lesson's contribution is not confounded with a model swap.
- **What the discarded results predicted:** in the constructed-review version, an unaided model identified ~19% of defects and ~47% with the right lesson (strict grading). We expected a smaller delta over the production baseline, since hand-written checks already cover some of what lessons carry.

**Result (100 breaking PRs × 3 arms, as-deployed codex runner, opus-graded blind):**

| arm | identified the actual defect | raised any finding |
|---|---|---|
| point-in-time production reviewer | 7.0% [3–14] | 62% |
| + mined lesson | **26.0%** [18–35] | 79% |
| + decoy lesson | 4.0% [2–10] | 62% |

Paired per-case flips (the design that matters, since every arm sees the same diffs): 24 missed→found against 5 found→missed — **+19.0 points net gain**. The decoy arm is indistinguishable from baseline, so the gain comes from the lesson's content, not from having an extra check installed. The point-in-time baseline raises findings on 62% of buggy diffs but names the actual defect in only 7% — consistent with the reviewer's deliberate restraint and with how thin the dated global check set was during the failure window. The Claude-runner replication of the baseline (to unconfound lesson content from model choice) has not been run yet.

### Test 3: do mismatched lessons degrade reviews?

Any retrieval system mismatches sometimes. Same harness as test 2, with the lesson drawn deliberately wrong.

- **Decoy arm on buggy PRs:** inject a lesson from a *different* failure mechanism and measure (a) whether the correct-issue rate drops below the no-lesson baseline, and (b) the aberrant-issue rate — findings asserting problems that are not there.
- **Clean-PR arms:** clean = merged PRs that appear in no derived pair as break or fix. Run the baseline reviewer, the decoy lesson, and the retrieved lesson over them and compare false positive rates. The production reviewer has its own noise floor on clean PRs; that floor is the control the lesson arms are measured against.
- **Known caveat: unfixed does not mean clean.** In earlier runs, most "false positives" on clean PRs quoted real questionable lines (a dead-letter queue missing its `.fifo` suffix; a module shipped with `minimum_core_approvals: 0`). So clean-PR false positive rates are an upper bound, not a measurement. Where a finding names a specific line, we follow that line forward in git history — a later correction in the direction the lesson warned confirms the finding; a line untouched a year later leans false positive.
- **Decoy-on-buggy result (100 PRs):** the decoy arm identified the defect in 4.0% of cases versus the 7.0% no-lesson baseline (overlapping intervals), and it raised findings at the same rate as baseline (62%, with perfectly symmetric per-case churn: 11 PRs flipped quiet→finding and 11 finding→quiet). A mismatched lesson wastes the slot; it does not poison the review or generate extra noise.
- **Clean-PR result (60 PRs × baseline/decoy):** the production reviewer's own noise floor on clean PRs is a 38.3% [27–51] false positive rate (0.42 findings/PR); with a decoy lesson injected, 48.3% [36–61] (0.52 findings/PR). Paired flips are 10 quiet→finding vs 4 finding→quiet — a tilt, but statistically consistent with the reviewer's symmetric run-to-run churn measured on the buggy set (sign test p≈0.18). So we cannot distinguish the decoy's clean-PR effect from reviewer nondeterminism; the honest statement is an upper bound of roughly +10 points of added false positive rate, with zero added defect-identifications anywhere it was measured. One measurement limitation: the reviewer labels every finding as coming from its `main` pass rather than a specific check (true even in the lesson arm, where the lesson demonstrably changed outcomes), so findings cannot be attributed to the injected check directly by label — only arm-vs-arm deltas are observable. Content attribution was judged post hoc instead: each clean-PR finding was graded against the decoy rule injected for that case (baseline findings graded against the same rule as the coincidence control). 1 of the decoy arm's 29 finding-PRs echoed the rule's topic; baseline 0 of 24. The added findings are reviewer churn, not the wrong lesson being parroted (`scripts/decoy_echo_test.py`, `data/39-decoy-echo.jsonl`). The dose curve confirms it: at 3, 5, and 10 decoy lessons on the same 60 clean PRs, any-finding rates are 48.3%, 48.3%, and 38.3% (vs 38.3% baseline — non-monotonic, within churn), and findings echoing *any* injected rule number 1, 0, and 2 of 60 respectively. Decoys are inert on clean PRs at every dose measured.
- **What the discarded results predicted:** a decoy lesson scored at or slightly below no lesson at all (37% vs 40%). With a lesson handed over at random, false positives on clean PRs were 0/120; under real retrieval, 18/150. 

### Retrieval methodology (the pipeline and the eight passes behind it)

The offline bench: every confirmed repeat supplies a (later PR, earlier lesson) pair — 165 measurable cases with a known-correct answer, no judge in the scoring loop. Retrieval for the replay arms is point-in-time: a lesson is only in the searchable corpus if its fix merged before the PR under review.

The deployed pipeline, in order:

1. **Config-path gate.** A path-pattern check on the diff decides whether retrieval runs at all. Passes 87% of cases whose gold lesson is a deployable (config-family) one.
2. **Query construction.** The query is the reviewer's risk statements about the PR plus a mechanical summary of config keys/values the diff changes. This step dominates: the same ranker scores ~1% recall from raw diff text and 12x more from the summaries. Diffs and lesson prose share almost no vocabulary; the summaries translate the PR into the register lessons are written in.
3. **TF-IDF over original rule texts.** Rare shared tokens (flag keys, paths, service nouns) carry the match. Canonicalizing or rewriting the rule texts *reduces* recall — normalization strips exactly those tokens.
4. **Protected rerank.** TF-IDF's top 5 are injected unconditionally; a haiku pass reorders the next band to fill slots 6–10. The protection exists because an unconstrained rerank demotes correct lessons as often as it promotes them; freezing the head confines rerank errors to slots that were near-ties.

Alternatives tested and beaten by the above, in eight passes: embedding retrieval (5 variants, `text-embedding-3-small`, prose-to-prose with disk cache — best variant ties TF-IDF at higher cost), TF-IDF/embedding rank fusion (RRF — the embedding list adds correlated noise, not coverage), corpus canonicalization, query fan-out (three separate queries lose to one merged query), corpus enrichment (5 variants), HyDE, a wide unprotected rerank, and learned field weighting. The miss autopsy explains the convergence: ~47% of gold pairs share no distinctive token with their repeat in any representation. Those cases are information-bounded — unfindable by lexical, semantic, or hybrid scoring alike — and every "smarter" method spends its gains on cases that were already found.

### Static matcher methodology

Each matcher is a small JSON spec — `{"mode": "any"|"all", "clauses": [{path regex, line regex}]}` — evaluated against a PR's changed paths and added lines. Authoring is blind: the model sees only the lesson's rule text, never the incident diff and never any repeat. Acceptance is mechanical, with no model judgment anywhere: the compiled matcher must fire on its own incident's diff and fire on ≤5% of ~890 random PRs. A miss on the incident earns one revision pass that may see the incident's added lines, guarded by a literal-lint: any revised regex containing an identifier-like token copied from the incident diff is rejected as overfit.

Results across all 335 repeat-confirmed lessons: 200 accepted (60%; rejections: 82 literal-overfit, 45 too hot, 4 regex errors, 3 declined, 1 incident miss). Because repeat PRs are never shown to the author, trigger recall on them is out-of-sample by construction: accepted matchers fired on 103/276 repeat diffs (37%), flat across config vs. non-config mechanism families. Accepted matchers run well under the acceptance cap in practice: mean background rate 1.45%, median 0.84%.

**Negative result — repeat examples do not improve authoring.** A leave-one-out test on the 76 lessons with ≥2 confirmed repeats held out the most recent repeat and let the author see the incident diff plus all earlier repeat diffs. Informed authoring scored 53% held-out recall vs. blind's 46% on the same lessons — but on the 28 lessons where both approaches produced an accepted matcher, the paired score is exactly even (12 both, 4 informed-only, 4 blind-only). The unpaired gap is set composition, not skill. The broad multi-idiom lessons this was supposed to rescue were not rescued (1 of 9 accepted): forcing one regex to fire on several diverse positives produces complex, fragile specs. Blind authoring at extraction time captures the tier's value; a re-author-on-repeat upgrade path is not worth building as tested.

### Hybrid arm construction

Per-case injection list = the point-in-time retrieved top-10 plus every lesson whose accepted matcher fires on the case diff, deduplicated, with the fired set capped at 15 per case ordered by background rate (11 of 100 cases hit the cap). Point-in-time discipline applies to matchers too: a matcher is only in the pool if its lesson's fix merged before the case's merge date. Mean dose 14.1 rules per case, max 25. The gold lesson entered the injected set on 46/100 cases: 33 via retrieval, 29 via a fired matcher, 16 via both.

Conversion by provenance: gold via matcher only, 4/13 identified (31%); via both channels, 5/16 (31%); via retrieval only, 2/17 (12%); gold absent, 8/54 (15% — organic finds, near the baseline churn floor). Findings volume 1.36/review, in line with every other injection arm — the double dose buried nothing.

Two disclosures. First, the deployed matcher pool here covers only the 200 matchers authored for repeat-confirmed lessons; a full deployment would author for all ~1,395 deployable lessons (~52% of a random sample accepted in a separate eligibility test), so 46% surfacing on this bench understates fleet-width coverage — the offline union estimate is ~58% — while also understating fleet-width firing volume. Second, the 15-matcher cap truncated 11 cases silently in the surfacing count above; untruncated union coverage would be at most 2 cases higher.

**Negative result — selection cannot replace budget.** Before paying the double dose, every scheme for fitting matcher fires into the existing 10-slot budget was tested: protected slots ordered by matcher background rate (36–42% surfaced vs. 37% for retrieval alone), a haiku rerank of the fired set (36%), and an opus rerank (36%), against a 55% ceiling if the fired set were ranked perfectly. On config-heavy buggy PRs a mean of 10.8 matchers fire and each fired lesson is category-plausible by construction; identifying which one the diff violates from a diff excerpt is the reviewer's verification task, and no pre-pass approximated it. The hybrid therefore spends volume instead of selection; the dose curve prices that volume as cheap and shallow (matched-lesson detection falls 26→19→18→16% across +2/+4/+9 extra lessons), and the added coverage bought +5 points net.

### Replay-handicap note

Reproduction of a *known-found* defect on replay is bounded well below 100%: for defects the original review's own comment thread shows were raised and then fixed before merge, the defect is absent from the replayed merged head and mechanically unfindable (addressed findings reproduce at 2.6%; not-addressed at 27.8%). The usable signal says the reviewer re-finds a still-present defect at roughly the same ~26% rate the oracle arm measures — the 26% conversion ceiling is a property of the reviewer and harness, not evidence that lessons lose information in delivery.
