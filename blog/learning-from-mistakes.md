---
title: learning from mistakes
date: 2026-08-23
authors: [tom]
draft: true
---

## Overview

We have thousands of PR's, and some of them have bugs. Later PR's fix the bugs. Can an agent learn from this and stop new bugs from happening?

![Buggy PRs are associated with the reverts or fixups that fixed them; lessons are extracted into a DB and recalled when new PRs are reviewed](/diagrams/learning-from-mistakes/prs.png)

As part of our PR success metrics, we have metrics on reverts, but that's only a subset of fixes. We can also associate subsequent PR's that updated similar code to earlier ones.

{/* truncate */}

## Scope

This analysis was done on squareup/java, cash-server, and go-square repos, and considered 132,072 PR's over a 12 month period.

Of these, 649 were labeled as WAS_REVERTED, and 3,638 were labeled post merge fixups.

## Prerequisite work

### Linking buggy PR's to fixes

Existing data has a flag labeling PR's as post merge fixups: `IS_POST_MERGE_FIX`. But it didn't contain the link to the earlier PR it was fixing.

For every merged PR flagged as a fix in a 12-month window (java, cash-server, go-square), we git blame each line the fix changed, at the commit just before the fix. Whichever earlier PR last touched those lines is the candidate "breaking" PR, and we keep the pair only when enough blamed lines point at it — meaning the fix substantially rewrote that PR's work.

Of 3,638 PR's labeled post merge fix, we found the earlier PR being fixed for 2,823 of them (78%)[^1].

[^1]: Interestingly, the relation to bugfix PR's to buggy PR's is one to many - that is, one fix PR can fix many buggy PR's at once.

### Extracting lessons

For each found bug \<-\> fixup match, we extract a _lesson_. A lesson includes a `mechanism` category, and a text `rule` for how to avoid the bug. We extracted 4,772 lessons from fixup PR's.[^2]. Some example lessons:

| mechanism | rule |
|---|---|
| incorrect_config_or_constant | Before adding a route to a team routing file, grep all other team files in the same environment directory for the same host+path combination; a path should be delegated to a backend from exactly one owning team file, so move or remove the existing entry rather than adding a duplicate. |
| incorrect_config_or_constant | When wiring alert recipients (Slack channels, pager targets) into new monitor or service config, verify the destination channel currently exists and is the owning team's active alert channel — send a test notification or confirm with the team — rather than copying the channel name from existing configs or docs, which may reference renamed or retired channels. |
| feature_flag_or_rollout | Gate a runtime migration or canary rollout behind an environment variable or feature flag that defaults to the old behavior; never hardcode the new path to `true` in a merged commit, even temporarily for a canary, because the constant applies to every environment the binary runs in. |
| internal_api_contract_misuse | Before disabling TrackTotalHits (or similar result-metadata options) on a search request, confirm nothing downstream depends on that metadata — in particular, paginated flows often need total-hit counts to generate cursors, so keep it enabled for any endpoint that returns a pagination cursor. |
| null_or_missing_value | When rewriting a query against a table where a role or type column alone does not guarantee a meaningful record, also filter on the payload column being non-null (e.g. `content IS NOT NULL`); verify count queries against fixture data that includes null-payload rows before relying on them in filters. |

[^2]: Number of lessons > number of fixup PR's because some fixup PR's address multiple buggy PR's.

## Evidence for feasibility

### 1) Similar classes of bugs recur

I looked through the lesson library, and judged how many were repeats of the same issue.

{/* diagram: linking similar bugs */}

53% of bugs were judged to be repeats of the past!

### 2) Lessons help AI reviewers catch issues

Using these matches, I backtested PR reviews using `sq agents review` against known buggy PR's.

![Experiment 1: a lesson extracted from a break→fix pair is given to a lesson-aware reviewer on a similar buggy PR; issue detection is compared against a lesson-naive reviewer](/diagrams/learning-from-mistakes/experiment-1.png)

When provided the correct lesson, reviewer bug detection increased nearly 4x:

**Reviews of buggy PR's:**

| arm | correct issue identified |
|---|---|
| reviewer, no lesson | 7.0% |
| reviewer, random lesson | 4.0% |
| reviewer, matched lesson | 26.0% |

### 3) Impact of mismatched lessons

Of course, no recall system is perfect, and sometimes we'll surface noisey lessons to reviewers. To test impact of mismatched lessons, I surfaced deliberately wrong (decoy) lessons at several doses, alongside the correct lesson and alone:

**Reviews of buggy PR's**

| arm | correct issue identified | decoy issue identified |
|---|---|---|
| no lesson (baseline) | 7% | 1%[^3] |
| correct lesson + 2 decoy lessons | 19% | 10% |
| correct lesson + 4 decoy lessons | 18% | 18% |
| correct lesson + 9 decoy lessons | 16% | 6% |
| 1 decoy lesson | 4% | 4% |
| 10 decoy lessons | 10% | 12% |

[^3]: coincidence floor: baseline findings judged against the same decoy rules — topical overlap without any lesson injected. The floor scales with how many rules are judged against: 1% vs a single rule, 5% vs a 10-rule set. So the "decoy issue identified" column overstates decoy influence at higher doses; the decoy rules cover the same common defect categories (config, provisioning) as organic findings, and on the matched+2 arm 6 of the 10 "echoes" are cases where the review found the *real* issue and it category-matched a decoy.

## Which lessons are relevant?

The lessons determined to be relevant are overwhelming config driven: externally constrainted values that cannot be validated from the code itself. This is demonstrated by lessons that are repeatedly relevant:

| confirmed repeats | lesson origin | artifact | rule |
|---|---|---|---|
| 8 | cash-server #50701 | url/endpoint | Put only environment-neutral fields in a layered config's shared layer; define anything environment-specific per environment |
| 6 | cash-server #49692 | monitoring/alerting | When alerting config keys off resource names (queues, topics, metric tags), copy the exact identifier from the source of truth |
| 6 | java #429793 | feature flag | When adding a temporary rollout flag defaulting to old behavior, record the removal step (ticket/TODO tied to the flag constant) at flag-add time |
| 5 | cash-server #69392 | monitoring/alerting | Backtest a paging alert's threshold and evaluation window against real history before enabling it |
| 5 | java #446052 | feature flag | Copy a feature flag's string key from the flag management system (or verify it exists there) rather than typing it from memory |
| 4 | java #459078 | queue/topic | A constant that must match an identifier owned by another service (workflow, queue, topic, action name) must be copied from that service's registration |
| 4 | cash-server #61517 | feature flag | Constants naming entities owned by an external system (flag keys, metric names, emoji, CSS classes) must be copied exactly from the owning system |
| 4 | java #437001 | feature flag | Flag-gated rollouts need a stable per-entity identifier (unit/account/user token) as the flag's evaluation key |
| 4 | java #465494 | queue/topic | A code constant or config key matching an externally provisioned resource (Kafka consumer group, SQS queue, IAM role, topic) must be copied exactly |
| 3 | cash-server #51835 | secrets | Before enabling config that references a provisioned secret path, confirm the secret exists in that environment |
| 3 | cash-server #50439 | null handling | Treat request-parameter deserialization helpers as nullable by contract: safe-call chains and a defined default, never `!!` |
| 3 | cash-server #55873 | monitoring/alerting | Record expected, handled fallback paths at debug/info level; reserve error-level tracking for conditions needing action |
| 3 | cash-server #76774 | url/endpoint | Server-built deep-link or client-route URLs must copy the exact path and parameter names from the client's registered route table |
| 3 | cash-server #58813 | build config | Do not apply the `.published` Gradle plugin variant to a new module unless it must be consumed outside the repo |
| 3 | java #447402 | build config | An architecture switch is a coordinated change across the CI executor image, build tool version, and container base image |

Repeat counts are hits within the 800-pair judged sample, so they are floors; 335 lessons had at least one confirmed repeat (248 with one hit, 87 with two or more).

## Retrieval

This section describes various mechanisms for finding the correct lesson to inject into PR reviews.

TLDR: keyword retrieval plus per-lesson regex matchers wins.

Surfacing is measured on the same 100 buggy PRs in every row; detection is a point-in-time replay of those PRs where shown.

| approach | correct lesson surfaced | bugs detected |
|---|---|---|
| no lessons (baseline) | 0% | 7% |
| static guidance (same 10 distilled rules on every PR) | 0% | 8% |
| embedding retrieval (top 10 injected) | 23% | not run |
| per-lesson regex matchers alone | 29% | not run |
| keyword retrieval (TF-IDF, top 10 injected) | 33% | 14% |
| **keyword retrieval + regex matchers (hybrid)** | **46%** | **19%** |
| correct lesson always provided (oracle ceiling) | 100% | 26% |

### Static review updates

Given repeat bugs are overwhelmingly config related, the first natural test would be updates to the static guidance issued across all PR's. The static guidance covered the known good lesson 79/100 cases.

An example fragment of what I tested:

```
When registering a new component, module, or resource, complete every required declaration in the same change (e.g. build/publish config, ownership/routing/registry entries, generated-code targets) rather than relying on defaults or copying a similar file without checking its obligations. Verify by comparing the new registration against the full checklist other equivalent components satisfy…
```

This didn't work well:

| arm | bugs identified (n=100) |
|---|---|
| baseline (production reviewer) | 7% |
| + 10 static distilled checks on every PR | 8% |

The generalized guidance that would fit in a reasonable sized static prompt don't appear to be specific enough to catch the subtle config bugs that actually make it to main.

### Per-rule regex triggers

Most of the caught bugs were specific to certain kinds of config errors. For each rule, I had the agent author relatively specific regex matcher that would fire if the changeset matched. For example:

| PR | bug | lesson | regex matcher |
|---|---|---|---|
| cash-server #52559 | app-token authentication in `InitiateSession` was gated behind a LaunchDarkly flag, so client-supplied tokens passed unauthenticated wherever the flag was off | When you gate a new security or validation check behind a feature flag, treat the flag as short-lived: record the rollout owner and removal date, and once fully enabled delete the flag so the check becomes unconditional | fires when added lines match **both** `FeatureFlag<\|Feature\("\|bindBooleanFlag\|ContextFeatureFlags` **and** `\b(valid\|verif\|authoriz\|authenticat\|permission\|signature\|checksum\|sanitiz\|allowlist\|denylist\|tamper\|forg)\w*` — a flag gate touching security vocabulary (background rate 2.1%; caught its 1 known repeat) |

The downside of this approach is that it isn't globally applicable: certain kinds of bugs don't map to well defined code signatures, so the agent couldn't author a regex. We _could_ author one for 60% of lessons, however, and those matchers fired on 37% of repeat mistakes.

This fires broadly: on random PRs, at least one of the 200 matchers fired 58% of the time, and when any fired, a mean of 4.5 did. A fire is not a false finding, though — it only surfaces a lesson to the reviewer, and irrelevant injected lessons were measured to produce no false findings on clean PRs — so the cost of broad firing is lesson budget per PR, not review noise.

### Keyword retrieval

In this approach, PR's are gated on whether they contain config changes. If so, an LLM authored a risk statement and a summary of config changes. These statements are then keyword matched with [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) against lessons. Top 5 hits are injected automatically, and a small model adds 5 more candidates.

The correct lesson landed in the top 10 in 33% of cases, converting to 14% detection.

### Embeddings based retrieval

I used embeddings models to encode both rule summaries and risk statements.

Surprisingly, this topped out slightly below keyword matching: the correct lesson landed in the top 10 on 23% of the same 100 cases, versus keyword matching's 33% (on the offline retrieval bench, recall@3 was 17%).

The cause seems to be in the specificity of tokens which indicate a match for a lesson. Embeddings generate a fuzzy match, but targeting specific tokens seems to be high fidelity.

### Keyword matching + regex hybrid

Here, the top 10 keyword matching rules and up to 15 regex matching rules were surfaced to the reviewer. The hits from the two turned out to complement each other: together the correct lesson was surfaced on 46% of cases and 19% of recurrent bugs were detected.

Notably, when only a regex matcher put the correct lesson in the injected set, the reviewer caught the bug 31% of the time — the same rate as when the correct lesson was handed over directly. Nothing is lost between a matcher fire and the review outcome.

## Conclusion

The winning retrieval approach increased detection rate of recurrent bugs 2.7x, from 7% to 19%. The ceiling is well below perfect for two separate reasons: surfacing tops out around half of repeats — some bugs leave no recognizable signature, lexical or structural, for any retrieval method to find — and even a correctly surfaced lesson converts to a catch only 26% of the time.

Out of ~3,600 bugs fixed post-merge per year in the covered repos, ~53% are repeats of an earlier mistake; a 12-point detection gain on that class translates to roughly 230 additional bugs caught per year. The system should be relatively simple to integrate into our review system.
