---
title: How I use AI to help me write
date: 2026-08-05
authors: [tom]
image: /social-cards/how-i-use-ai-to-help-me-write.png
draft: true
---

import SourceExcerpt from '@site/src/components/SourceExcerpt';
import EditDiff from '@site/src/components/EditDiff';

AI is a helpful writing tool for me. Without it, I probably wouldn't have gone through the trouble of setting up a blog.

However, there's a very thin line between delegating tasks that _support_ writing to AI and _letting AI think and write_ for me. Over time, the scope of tasks I give it has narrowed, and the boundaries have gotten stricter.

{/* truncate */}

## What I do

### Firewall AI and human content

I strictly separate content I write[^1] from what AI writes. Most agents default to writing content for me, so I have strict instructions in AGENTS.md to _not_ do that:

[^1]: Here I'm primarily going to discuss writing for this blog and work-related technical docs. I'm not a creative writer and feel that AI has minimal utility for [creative work](/creativity/).

<SourceExcerpt
  label="AGENTS.md"
  href="https://github.com/tombedor/blog/blob/a650fa204769274b83861a579f4aa6adaff89f46/AGENTS.md?plain=1#L75-L88">
{`## Content Editing Policy

**The writing must come from the author.** AI agents can help with suggestions but should not edit blog post files with content unless explicitly instructed.

When creating new blog posts:
- Create the file with frontmatter (title, date, draft: true)
- Leave the body empty or with minimal placeholders (section headers only)
- Do NOT write any actual content, paragraphs, or prose into the file

When asked for feedback or content suggestions:
- CAN write suggested content, paragraphs, or prose in the chat response
- CAN propose specific edits and revisions
- Do NOT edit the actual blog post file with content unless explicitly told to do so
- The author will review suggestions and incorporate them manually`}
</SourceExcerpt>

I don't have principled moral objections to having AI write content for me. But writing content myself is the best way I have to reason through the topic (which makes the exercise valuable to me, regardless of whether anyone reads it).

I also don't think AI writing is very good. Its editorial stance is generic[^2], watered down and overly cautious. For example:

[^2]: I think this impression is more about how much AI-generated writing I have to sift through than about the quality of any individual piece. If I went back in time and encountered just one piece of AI-generated writing, would it still annoy me? I don't think so.

<EditDiff
  label="Rejected Codex suggestion"
  beforeLabel="My version"
  afterLabel="AI suggestion"
  before={<>This is a more manual process than <mark>just spitballing about</mark> a project to an AI, but I prefer to <mark>have</mark> the AI's <mark>ground truth</mark> assumptions tightly controlled during coding.</>}
  after={<>This is a more manual process than <mark>casually describing</mark> a project to an AI, but I prefer to <mark>keep</mark> the AI’s <mark>ground-truth</mark> assumptions tightly controlled during coding.</>}
/>

### Create agent-generated research briefs

When my arguments rely on factual claims, I have the agent prepare a dedicated research brief to answer specific questions.

<SourceExcerpt
  label="AGENTS.md"
  href="https://github.com/tombedor/blog/blob/5523fb0d192f78af6c3db5b600a7fdf65ac2c4b8/AGENTS.md?plain=1#L107-L112">
{`- Research briefs should be ONE PAGE.
- Research briefs should be information-dense and scan-friendly: prefer claim/evidence/source bullets over narrative prose.
- Put nuance and extended caveats in source-note files, not in the brief.
- Research briefs should be dry research memos, not post outlines: organize by research topic or by claim being supported/refuted.
- Put links directly under the relevant topic/claim heading instead of collecting advice about how to use the material in the post.
- When sources contain especially useful wording or quotes from individuals, capture short pull quotes in the brief where possible for later reuse.`}
</SourceExcerpt>

Agents sometimes insist on pulling in copy from my writing and proposing edits. To counter, I also specify a narrow template:

<SourceExcerpt
  label="research/TEMPLATE.md"
  href="https://github.com/tombedor/blog/blob/a650fa204769274b83861a579f4aa6adaff89f46/research/TEMPLATE.md?plain=1#L1-L29">
{`# Research Brief: {Post Title or Research Question}

**Scope:** {One sentence on what this brief is trying to verify, explain, or compare.}

**Bottom line:** {1-3 bullets with the highest-confidence takeaway.}
- {Takeaway}
- {Takeaway}

---

## {Claim or Topic}

**Claim / question:** {The specific claim being checked or topic being researched.}

**Finding:** {Short answer. Prefer one sentence.}

**Evidence:**
- {Evidence point with relevant number/date/context.}

**Sources:**
- {URL or local source note link}

**Pull quotes:**
- "{Short useful quote}" ({Source name})

**Caveats / counterpoints:**
- {Nuance, uncertainty, conflicting evidence, or scope limitation.}`}
</SourceExcerpt>

### AI fact check

When I'm done with a post, I ask an AI to run a fact check. Here, AI's editorial cautiousness is useful: I can draft a post with my best impression of the facts, knowing I can clean up misstatements later.

For example, in my post on [open source models](/arguments-against-open-source-ai-are-very-bad/), I originally had some inaccuracies about encryption litigation. The agent proposed a useful edit:

<EditDiff
  label="arguments-against-open-source-ai-are-very-bad.md"
  href="https://github.com/tombedor/blog/commit/fd3021bfdc77b88df5f202c1b87812bb9a705dc3"
  beforeLabel="My version"
  afterLabel="AI suggestion"
  before={<>Eventually, <mark>Zimmermann's release of PGP was ruled to be</mark> protected speech, and the U.S. government relaxed encryption export controls.</>}
  after={<>Eventually, <mark>courts ruled that releasing encryption source code is</mark> protected speech, and the U.S. government relaxed encryption export controls.</>}
/>

Chasing down subtle factual mistakes like these is cumbersome and time-consuming. Having AI as a backstop lets me expand the scope of what I can confidently write about.

## What I used to do, but don't anymore

### Use AI to come up with titles

As an experiment, I built a [small tool](https://github.com/tombedor/hn_headlines) that generated embeddings for Hacker News posts and compared proposed titles with titles that did well there.

I've stopped doing this, because I've come to view post titles as a core element of writing[^3], not a quick label slapped on a post. The posts I've struggled to title are also the ones without a clear thesis. If I can't think of a good title, it's a signal that I don't have a well-scoped topic to write about.

[^3]: And more importantly, it didn't actually work in getting me any more precious internet points!

### Ask for general feedback

I don't get much mileage out of general "is this good?"-style prompts. When I prompt agents this way, they tend to give me critiques sandwiched between compliments. This can be helpful, but it doesn't help me decide whether a post is worth publishing to my taste.

I do still ask AI for counterpoints against my posts, but I keep the questions very specific.

### Clean up phrasing or structure

> “Rewriting is the essence of writing well: it’s where the game is won or lost.”
>
> — William Zinsser, [*On Writing Well*](https://books.google.com/books/about/On_Writing_Well_30th_Anniversary_Edition.html?id=mp16BDRDaYQC)

It's very tempting to write a draft, ask an agent to clean up awkward phrasing, and hit publish. But AI sentence cleanup is a poor substitute for rereading a draft and doing the editing myself[^4]. A poorly phrased sentence isn't just a mechanical mistake; it's a smell that some portion of an argument needs more thought. Agent phrasing suggestions are also a backdoor for injecting bland AI-isms into my writing.

[^4]: I do still ask the AI to do a pass for spelling, puncuation, and grammar. It's a subtle boundry.

I used to ask AI to evaluate post structure. But, as with titles, coming up with a writing structure is an integral part of the process, not a mechanical task I can delegate. If I'm struggling to structure a post, the argument I'm making may not be ready to be written yet.

## Doing the thinking myself

AI presents tempting shortcuts that require diligence to avoid. The boundary I strive for is to keep for myself the tasks that create opportunities to _think_ through the writing. What's left to AI is mechanical presentation work and fact-based research.

All that said, it's still a helpful tool, and I'm glad I get to use it.
