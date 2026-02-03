---
title: "How to Write Good (Short) Docs"
date: 2026-02-02
draft: true
---

> _"I would have written a shorter letter, but I did not have the time."_
>
> — Mark Twain[^1]

[^1]: It [wasn't actually him](https://quoteinvestigator.com/2012/04/28/shorter-letter/) but you get the point

## Overview
This describes how to write a short document for your teammates. The documents under discussion are commonly referred to as "one-pagers", and are distinct from eng designs or other more formal engineering docs.

A one pager might be written to:
- Surface an org pain point
- Propose a project
- Lay out a roadmap
- Explain the current state of a system or systems
- Announce or document a decision

This is also distinct from user facing documentation. Some but not all of what we're talking about applies to those styles or writing[^2].

[^2]: Namely, while AI is a poor writer of one pagers, their ability to understand code and follow writing structure makes them quite good at writing user facing documentation

### The one-pager is not a new invention

Prior to computers, short memos were a primary tool for intra-office communication, in addition to in person interactions:

They often needed to be re-typed and/or printed, so they needed to be short!

![prehistory](/diagrams/how-to-write-good-short-docs/prehistory.png)


Fast forward to the introduction of Slack and similar tools. Now, writing messages to your teammates no longer costs money. The new constraint is _attention bandwidth_:

![slack](/diagrams/how-to-write-good-short-docs/slack.png)

Memo style writing is even more impactful in a remote work environment, where casual face to face interactions are much more scarce:

![remote-work](/diagrams/how-to-write-good-short-docs/remote-work.png)

## Why writing is a worthwhile skill to develop in the age of AI

You have a major advantage against AI in writing for teammates:

![you-vs-bots](/diagrams/how-to-write-good-short-docs/you-vs-bots.png)

You know your teammates personally, and you have undocumented business context (if what you are writing about is already documented, there probably doesn't need to be a doc!)

This allows you to synthesize and describe with more precision and nuance than AI can.

This isn't a skill that AI has (yet), and if it does develop it, it'll develop them later than other skills like writing code.


## How to write a good, short doc

So, how do we do it?

### Optimize for short attention spans.

The most important concern is to keep the limited attention budget of your teammates in mind.

Different types of stakeholders will give a different amount of attention to your doc:

![stakeholders](/diagrams/how-to-write-good-short-docs/stakeholders.png)

So, in laying out your doc, consider:
- If someone reads this for 5 seconds, do they get the right 5 seconds of context?
- What about 5 minutes?
- If they want to delve into some of the details while ignoring others, can they?

#### Tactics:
- Clear, accurate, descriptive titles
- A concise summary at the top of what the doc covers, and what it *does not* cover
- Formatting: Headings and subheadings that help the reader navigate
- Tabs in Google Docs can be helpful, but are controversial. They can prevent doc sprawl (e.g. working group meeting notes as a tab of the working group charter, rather than a separate doc), but often times are shared with direct links to the wrong tab, which can be confusing for readers.

### Diagrams
A visual representation is an excellent way to quickly convey context. Here too, optimize for attention spans. For example, in a system diagram, sometimes it's helpful to omit some systems that aren't relevant to the discussion.

Excalidraw is a really excellent tool for this. It's open source (you can make them in your code editor), and has just the right amount of knobs and shapes. The hand drawn look means that it's not as distracting when shapes aren't perfectly aligned.

### Align with reader interest

It's very hard to persuade people to care about something that they don't already care about. Much easier is to convince people that something _aligns with the thing they care about_.

Ie, don't write "we should do more of XYZ", write "doing XYZ helps us `{thing people already care about}`"

If your doc can be summarized by, "everyone should care more about XYZ", it's probably not a very good doc!

Linking related docs at the top is an easy step that is often missed. This helps in a couple ways:
  - It implies alignment with whatever the linked doc is discussing
  - It helps elevate teammates who might be advocating something similar to what you're writing about
  - It makes your doc a useful vehicle for discovery of other docs: 

![doc_graph](/diagrams/how-to-write-good-short-docs/doc_graph.png)

### Build consensus offline

> _"Every doc is approved or rejected before it is written."_
>
> — Sun Tzu

If the goal of your document is to build consensus around a decision or initiative, the work should begin before you start writing. It is much easier to _document_ consensus than to _build consensus through a document_.

Talking to stakeholders in advance lets you better anticipate questions or concerns, and helps you learn the language they use to describe their problems.


### Use AI thoughtfully

Use AI as your editor, not your ghostwriter.

It's worth reiterating: if an AI could do a good job of writing your document, it's probably not something you need to write.

People give very little attention to text or imagery that other people have generated[^3]. If I'm interested in what AI has to say about something, I can have it generate it myself. This will be interactive and more tailored to my understanding.

[^3]: Full disclosure: my sources for this claim are _vibes_.

While AI isn't a good writer, it's an _excellent_ editor. It is very good at evaluating your doc and giving useful feedback on it. Typical prompts I use:
> _Evaluate the structure of my document, and suggest improvements_

> _Identify typos or awkward phrasing, and suggest alternatives_

This very easily bleeds into having an AI write the doc for you, and in fact most models will do so unless instructed not to. I add this to agent instructions:

> Do NOT write any actual content, paragraphs, or prose into the file


### Thoughtful, timely sharing

> _"If a doc is written in a forest, and no one has the link, does it create business value?"_
>
> — George Berkeley

Your doc doesn't do any good if no one reads it. That's why being thoughtful about how, where, and when your share your doc is important.

If you've already talked to stakeholders, you have a great advantage! They already know your doc is coming, and that it's about something they care about. They will be able to tell you what the best channels to share for their teammates (and might even do it for you!).

Timing is also important. Attention to an issue can have a short life. Sometimes it's better to write a less comprehensive doc quickly than a more comprehensive doc that takes longer to write. In these situations, you can acknowlege unknowns, and fill in details later.


## Antipatterns

Most antipatterns I observe come from a lack of confidence in the writing or decision. While it's important to solicit feedback, the fact that you are writing a doc on a topic probably means you are well qualified to speak to it.

### Designating a doc as a "Living Doc" or overusing "WIP"

In the age of Google docs, every doc can be changed at any time, so every doc is a living doc. Similarly, once a doc has been shared, it's time to remove the WIP label.

Adding WIP says to the reader: "You should probably wait to read this". But you can and should improve your doc at any time.

### Hesitance to express a POV

Sometimes, in a decision doc, writers will give even treatment to all available options, in order to avoid looking biased. But this doesn't really serve the reader well. It's more helpful to know the decision being favored, and if they disagree they can always comment to that effect.
