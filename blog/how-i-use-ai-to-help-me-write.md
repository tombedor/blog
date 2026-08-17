---
title: How I use AI to help me write
date: 2026-08-05
authors: [tom]
image: /social-cards/how-i-use-ai-to-help-me-write.png
draft: true
---

import SourceExcerpt from '@site/src/components/SourceExcerpt';
import EditDiff from '@site/src/components/EditDiff';

AI is a helpful writing[^1] tool for me. Without it, I probably wouldn't have gone through the trouble of setting up a blog.

However, there's a very thin line between delegating tasks that _support_ writing to AI and _letting AI think and write_ for me. Over time, the scope of tasks I give to it has narrowed, and the boundaries have gotten stricter.

[^1]: Here I'm primarily going to discuss writing as in this blog and work-related technical docs. I'm not a creative writer and feel that AI has minimal utility for [creative work](/creativity/).

## What I do

### Firewall AI and Human content

I maintain a strict separation between content written by AI and what I write. Most agents default to writing content for you, so I have strict instructions in AGENTS.md to _not_ do that:

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

I also just don't think AI writing is very good. Its editorial stance is watered down and overly cautious.

{/* example of transcript where it suggested something */}

### Create agent-generated research briefs

When my posts rely on factual claims, I have the agent prepare a dedicated research brief on specific questions.

<SourceExcerpt
  label="AGENTS.md"
  href="https://github.com/tombedor/blog/blob/a650fa204769274b83861a579f4aa6adaff89f46/AGENTS.md?plain=1#L110-L115">
{`Research briefs should be ONE PAGE.
Research briefs should be information-dense and scan-friendly: prefer claim/evidence/source bullets over narrative prose.
Put nuance and extended caveats in source-note files, not in the brief.
Research briefs should be dry research memos, not post outlines: organize by research topic or by claim being supported/refuted.
In \`brief.md\`, put links directly under the relevant topic/claim heading instead of collecting advice about how to use the material in the post.
When sources contain especially useful wording, capture short pull quotes in the brief where possible for later reuse.`}
</SourceExcerpt>

Without careful prompting, agents tend to pull in copy from my writing and suggest watered down prose. To counter, I specify a narrow template:

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

When I'm done with a post, I ask an AI to run a fact check. Here, AI's general editorial cautiousness is useful, and I can draft a post with my best impression of the facts knowing I can clean up misstatements later.

For example, in my last post I originally had some inaccuracies about encryption litigation, and proposed a useful edit:

<EditDiff
  label="arguments-against-open-source-ai-are-very-bad.md"
  href="https://github.com/tombedor/blog/commit/fd3021bfdc77b88df5f202c1b87812bb9a705dc3"
  before={<>Eventually, <mark>Zimmermann's release of PGP was ruled to be</mark> protected speech, and the U.S. government relaxed encryption export controls.</>}
  after={<>Eventually, <mark>courts ruled that releasing encryption source code is</mark> protected speech, and the U.S. government relaxed encryption export controls.</>}
/>

## What I used to do, but don't anymore

### Use AI to come up with titles

As an experiment, I built a [small tool](https://github.com/tombedor/hn_headlines) that generated embeddings on HN posts, and compared proposed titles to my posts to those that did well on HN.

This didn't really work, and I've come to view post titles as a core element of writing, not a quick label slapped on a post. The posts I've struggled to put titles on are also those that don't have a clear thesis - if I can't think of a good title, it's a strong signal that I don't have a well scoped topic to write about.


### Ask for general feedback

I dont get much mileage out of general "is this good" style prompts. when prompted this way, agemts tend to give you critiques sandwiched between compliments. This can be helpful, but it doesn't help me decide whether a post is worth publishing to my taste.

I do still ask AI for counterpoints against my posts, but I keep the questions very specific.

### Clean up phrasing or structure

> “Rewriting is the essence of writing well: it’s where the game is won or lost.”
>
> — William Zinsser, [*On Writing Well*](https://books.google.com/books/about/On_Writing_Well_30th_Anniversary_Edition.html?id=mp16BDRDaYQC)

Its very tempting to write a draft and ask an agent to cleanup awkward phrasing. This is a poor substitute for rereading a draft and tightening up phrasing myself. A poorly phrased sentence isn't just a mechanical mistake, it's a smell that some portion of an argument might need more thought. AI phrasing suggestions ate a backdoor to injecting bland AI-isms into my posts.

i used to ask ai to evaluate post structure, and i find its analysis of writing strucutr to be quite insightful. but similar to titles, comingnup with a post structure is an integral piece of thenprocess, not a mechanical task o can delegate. if im struggling to come ip with a structure, is a smell that the argument im making is not ready to be wrotten yet.

## Don't let it think for me

The boundry I've landed on is to keep tasks for myself that present opportunties to _think_ through the writing. What's left to AI is mechanical presentation configuration and facts based research. That's still a major benefit!
