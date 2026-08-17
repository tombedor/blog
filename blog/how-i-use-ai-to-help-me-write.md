---
title: How I use AI to help me write
date: 2026-08-05
authors: [tom]
image: /social-cards/how-i-use-ai-to-help-me-write.png
draft: true
---

import SourceExcerpt from '@site/src/components/SourceExcerpt';

AI is a helpful writing[^1] tool for me. Without it, i probably wouldnt have gone through the trouble of setting up a blog.

However, there's a very thin line between delegating tasks that _support_ writing to AI and _letting AI think and write_ for me. Over time, the scope of tasks i give to it has narrowed, and the boundaries have gotten stricter.

[^1]: Here I'm primarily going to discuss writing as in this blog and work-related technical docs. I'm not a creative writer, and feel that AI has minimal utility for creative work {/* link to creativity post */}.

## What I do

### Firewall AI and Human content

I maintain strict separation for content written by AI vs what I write. Most agents default to writing content for you, so I have strict instructions in AGENTS.md to _not_ do that:

<SourceExcerpt
  label="AGENTS.md · Content Editing Policy"
  href="https://github.com/tombedor/blog/blob/a650fa204769274b83861a579f4aa6adaff89f46/AGENTS.md#L75-L88">
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

 I don't have principled moral objections to having AI write content for me. But writing content myself is the best way I have for reasoning through the topic (which makes the exercise valuable to me, regardless of whether anyone reads it).

I also just don't think AI writing is very good. It's editorial stance is watered down and overly cautious.

{/* example of transcript where it suggested something */}

### Create agent-generated research briefs

when my posts rely on factual claims, i have the agent prepare a dedicated reaearch brief on specific wuestions.

<SourceExcerpt
  label="AGENTS.md · Research briefs"
  href="https://github.com/tombedor/blog/blob/a650fa204769274b83861a579f4aa6adaff89f46/AGENTS.md#L94-L115">
{`## Research

Research for blog posts is stored in \`research/{post-name}/\`. The directory name matches the blog post slug (e.g., research for \`open-source-models.mdx\` goes in \`research/open-source-models/\`).

Each post's research directory contains:
- \`brief.md\` — the main research brief: fact-checks of post claims, source summaries, and counterarguments
- Individual source files (e.g., \`hn-thread.md\`, \`paper-notes.md\`) — detailed notes on specific sources
- \`../TEMPLATE.md\` — reusable research brief template

When asked to do research for a post:
- Update or create \`research/{post-name}/brief.md\` with findings
- Use \`research/TEMPLATE.md\` as the default structure for new briefs, adapting headings to the actual research question
- Add separate source files for substantial individual sources
- Maintain a sources section in \`brief.md\` linking to source files
- Do NOT edit the actual blog post file — research output goes only in \`research/\`

Research briefs should be ONE PAGE.
Research briefs should be information-dense and scan-friendly: prefer claim/evidence/source bullets over narrative prose.
Put nuance and extended caveats in source-note files, not in the brief.
Research briefs should be dry research memos, not post outlines: organize by research topic or by claim being supported/refuted.
In \`brief.md\`, put links directly under the relevant topic/claim heading instead of collecting advice about how to use the material in the post.
When sources contain especially useful wording, capture short pull quotes in the brief where possible for later reuse.`}
</SourceExcerpt>

without careful prompting, agents tend to pull in copy from my writing and suggest watered down prose. to counter, i specify a narrow template:

<SourceExcerpt
  label="research/TEMPLATE.md · Research brief structure"
  href="https://github.com/tombedor/blog/blob/a650fa204769274b83861a579f4aa6adaff89f46/research/TEMPLATE.md#L1-L29">
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

When I'm done with a post, I ask an AI to run a fact check. Here, AI's general editorial cautiousness is useful, and I can draft a post with my best impression of the facts knowing I can cleanup misstatements later.

For example, in my last post I originally had some inaccuracies about encryption litigation:

{/* link to fact check on ai litigation, edit suggested by AI */}

These prompts update my `BRIEF.md`, and I _sometimes_ accept proposed edits after discussion.

## What I used to do, but don't anymore

### Use AI to come up with titles

As an experiment, I built a [small tool](https://github.com/tombedor/hn_headlines) that generated embeddings on HN posts, and compared proposed titles to my posts to those that did well on HN.

This didn't really work, and I've come to view post titles as a core element of writing, not a quick label slapped on a post. The posts I've struggled to put titles on are also those that don't have a clear thesis - if I can't think of a good title, it's a strong signal that I don't have a well scoped topic to write about.


### Ask for general feedback

I dont get much mileage out of general "is this good" style prompts. when prompted this way, agemts tend to give you critiques sandwiched between compliments. This can be helpful, but it doesn't help me decide whether a post is worth publishing to my taste.

I do still ask AI for counterpoints against my posts, but I keep the questions very specific.

### Clean up phrasing or structure

(quote about first draft is typing, editing is wroting). its very tempting to write a draft and ask an agent to cleanup awkward phrasing. This is a poor substitute for rereading a draft and tightening up phrasing myself. A poorly phrased sentence isn't just a mechanical mistake, it's a smell that some portion of an argument might need more thought. AI phrasing suggestions ate a backdoor to injecting bland AI-isms into my posts.

i used to ask ai to evaluate post structure, and i find its analysis of writing strucutr to be quite insightful. but similar to titles, comingnup with a post structure is an integral piece of thenprocess, not a mechanical task o can delegate. if im struggling to come ip with a structure, is a smell that the argument im making is not ready to be wrotten yet.

## Don't let it think for me

The boundry I've landed on is to keep tasks for myself that present opportunties to _think_ through the writing. What's left to AI is mechanical presentation configuration and facts based research. That's still a major benefit!




---

## Cut content

### Refine presentation

One of the pleasures of writing a blog is having full control over appearance and presentation. I use [docusauraus](https://docusaurus.io/) to build my site, which is a nice framework that allows unbounded customizabaility.

But actually learning in depth how to configure widgets just so isn't super interesting to me,




and it made this edit:

{/* edit saying skills are similarly overengineered */}

Comments on the post (justifiably) jumped on that line - skills are just a markdown file, how could I call them overengineered?

[^1]: With caveat below
[^2]: I don't actually think this anymore. Skills strike quite a reasonable balance on adding just enough documentation for an agent to use a CLI, without incurring the process overhead of MCP.
