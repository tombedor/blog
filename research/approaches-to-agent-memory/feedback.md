# Feedback: `approaches-to-agent-memory.md`

## Overall direction

The post has a strong spine already:

- memory matters
- long context is not a substitute
- the problem can be broken into `store / retrieve / inject / emit`
- UX and transparency matter more than squeezing out benchmark wins

The main issue is that the post currently reads as halfway between:

1. a builder's guide to designing memory systems
2. a personal opinion piece about what kinds of memory systems feel good to use

If the intended audience is builders, the post should lean harder into concrete design decisions and make the "where I land" sections more explicitly about **how Elroy is built** and **why**.

## Recommended reframing

Recast each `Where I land` section as a more explicit Elroy case study.

Instead of:

- generic landscape
- brief personal preference

Use:

- what the landscape looks like
- what Elroy does
- why I made that tradeoff
- what I think that tradeoff buys or costs

That would make the piece more coherent and would stop it from bouncing between research summary, product philosophy, and abstraction.

Possible framing line early in the post:

> I'll walk through the main design choices memory systems have to make, and use Elroy as a concrete example of where I've landed so far.

That would give the rest of the piece permission to be opinionated and implementation-oriented.

## Highest-priority content gaps

### 1. `Emit` is too thin

You define the full memory lifecycle as `store / retrieve / inject / emit`, but `Emit` is much less developed than the other three sections.

For a builder audience, this is probably the most important missing material.

Questions worth addressing:

- When should a system write a memory?
- Should writing happen synchronously during the turn, or asynchronously afterward?
- Should the agent decide what to remember, or should the system extract memories automatically?
- How do you decide between appending new information, updating an existing memory, or doing nothing?
- What confidence threshold justifies a write?
- Should users be able to review or veto writes?
- How do you handle redundant writes?

This section is also the natural place to talk about **forgetting and deletion**, which is currently missing.

### 2. Add a section on forgetting / deletion / invalidation

Right now the post is mostly about how memories are created and retrieved. For builders, the equally important question is how memories stop being active.

This likely deserves its own subsection, either under `Emit` or as a separate section after it.

Topics to cover:

- explicit user deletion
- agent-initiated correction
- invalidation of superseded facts
- archival vs deletion
- decay of stale "top of mind" memories
- whether raw conversation history is preserved even when derived memories are rewritten

This is especially important because one of your best arguments is that memory systems are fundamentally imperfect and often wrong. If that is true, then the ability to correct, invalidate, and remove memories is a first-class design requirement, not an implementation detail.

### 3. Define memory types earlier

The post currently uses "memory" to cover several different things:

- stable biographical facts
- user preferences
- recent situational context
- compressed summaries of prior conversation
- project or task knowledge

These should be separated earlier, even if only lightly.

A short taxonomy would help:

- `profile memory`: stable facts and preferences
- `episodic memory`: things that happened in prior interactions
- `working memory`: context currently active in the conversation
- `compressed-context memory`: summaries of pruned history
- `task/project memory`: durable external knowledge relevant to longer workflows

This would make several later claims easier to follow, especially your point that you do **not** want the same memory strategy in coding workflows.

## How Elroy can be used more effectively throughout

The strongest material in the post is where it reflects lived experience with Elroy. That should be made more explicit.

Specific improvements:

- In `Store`, say clearly what Elroy stores as files, what metadata lives elsewhere, and why you prefer that split.
- In `Retrieve`, describe Elroy's retrieval trigger in more operational terms: what gets skipped, what gets searched, and what the relevance filter is protecting against.
- In `Inject`, explain why the synthetic tool-call approach was preferable to system-message or user-message injection in practice.
- In `Emit`, describe exactly how Elroy creates memories today, when consolidation runs, and what kinds of mistakes you still see.

The more the piece says "here is the choice I made in Elroy, here is the failure mode it prevents, and here is the tradeoff it introduces," the more useful it becomes for builders.

## Suggested structural changes

One strong version of the structure would be:

1. Why memory matters
2. Why long context is not enough
3. A useful decomposition: `store / retrieve / inject / emit`
4. A note on memory types
5. `Store`
6. `Retrieve`
7. `Inject`
8. `Emit`
9. `Forget / delete / invalidate`
10. What Elroy does, end to end
11. Conclusion: UX and transparency over benchmark maximalism

You may not need all of these as separate H2s, but the missing conceptual move is that builders want an **end-to-end system picture**, not just a menu of isolated choices.

## Diagram feedback

The diagrams are generally helpful, especially:

- `general_architecture`
- `problems`
- `transparency`
- `memory_panel_screenshot`

The weaker ones are the cats/dogs examples:

- `wikipedia.png`
- `consolidation.png`

These explain the concept, but they do not feel very connected to the actual problem space. For this post, a more realistic example from Elroy would carry more weight.

Possible replacements:

- a bad memory entry before consolidation
- the resulting corrected or merged memory after consolidation
- an example of a stale "top of mind" memory being archived or invalidated

That would make the diagrams feel less like illustrations of abstract ideas and more like evidence from an actual system.

## Places where the argument could be sharpened

### Long context vs memory

This section is good, but for builders it may help to be slightly more explicit that the issue is not just model accuracy, but also:

- latency
- token cost
- reduced controllability
- difficulty auditing what information actually mattered

### Privacy and transparency

This section is currently short relative to how central it is to your conclusion.

If the core thesis is that memory is a UX problem more than a benchmark problem, then privacy and user control should be made more operational.

Useful concrete questions:

- Can the user inspect their memories?
- Can they delete or edit them?
- Can they see why a memory was recalled?
- Can they disable categories of memory?
- Can they opt into session-only behavior?

These are builder questions, not just philosophical ones.

### Coding workflows

Your point about not using memory in coding workflows is interesting and worth expanding slightly.

Right now it reads more as a personal preference. For builders, it would help to state the principle more explicitly:

- when correctness and provenance matter, hidden automatically generated memory is dangerous
- in those cases, human-readable project docs are a better ground truth than opaque inferred memory

That is a useful design distinction and could become one of the post's memorable ideas.

## Material to treat more carefully

The Claude Code references are interesting, but the current writeup leans on speculative reasoning and a leaked source.

That creates two problems:

- readers cannot easily verify the claims
- the argument is weaker when it depends on guessing motivations

Safer approach:

- either remove the speculative explanation
- or reduce it to a brief aside
- or replace it with examples from public docs / public product behavior

The post is stronger when it argues from:

- published research
- observable system behavior
- Elroy's real design choices

## Concrete revision checklist

- Reframe `Where I land` sections as explicit Elroy case studies.
- Add a short memory taxonomy early in the piece.
- Expand `Emit` substantially.
- Add explicit treatment of forgetting, deletion, invalidation, and decay.
- Make privacy/transparency more operational and product-oriented.
- Replace or supplement toy diagrams with one realistic Elroy memory lifecycle example.
- Sharpen the coding-workflow argument as a general design principle.
- Reduce speculative Claude Code discussion.
- Tighten the conclusion into a reusable builder takeaway, not just a preference statement.

## Copy-edit notes

A few obvious typos / rough spots worth fixing:

- `conciousness` -> `consciousness`
- `philisophical` -> `philosophical`
- `Philosphy` -> `Philosophy`
- `This is why I also an asynchronous memory consolidation process` -> missing verb

## Candidate closing move

The conclusion would likely land harder if it ended with a builder-oriented heuristic. For example, the post seems to support something like:

> The right memory system is not the one with the fanciest datastore. It's the one that writes sparingly, retrieves narrowly, exposes enough of its reasoning to the user, and gives both the system and the user a way to forget.

That would pull together the post's strongest ideas into a more memorable final note.
