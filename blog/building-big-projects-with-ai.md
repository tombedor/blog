---
title: Building Big Projects with AI
date: 2026-09-29
authors: [tom]
draft: true
---

- core problem: managing context. Bots in a coding session have info on the immediate task, but can guess at details which create problems down the road.


- 1. Design and implementation plan docs
  - I'm a big adopter of doc-driven development, but I narrow to writing the least amount of documentation that fully capture every big technical decision. Fully fleshed out user stories etc are overkill, and where docs are required to be written that don't actually need to be, it gives the bots an opportunity to add fluff and unneeded features.
  - That said, the docs I generate for implementation are far more detailed than anything I would write myself. 
  - I describe the project to an strong-model AI, then do a q and a on any open questions. The bots are good at finding sticky details here. All decisions are recorded in a decision log, with rationale.
  - I also write an implementation plan, with concrete milestones to check against, and file tickets against them.
  - I then write a human facing design doc from scratch. This is digestible to human reviewers, and helps me work through the design. This is a good step for pressure checking assumptions the bot made, and leads to revisions of the bot design. If i can't write a design of the project myself, it's a good sign i don't understand the project well enough
- 2. Implementation. 
  - driving bot sessions myself