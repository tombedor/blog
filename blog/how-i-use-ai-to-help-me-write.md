---
title: How I use AI to help me write
date: 2026-08-05
authors: [tom]
image: /social-cards/how-i-use-ai-to-help-me-write.png
draft: true
---

AI is a helpful writing[^1] tool for me. Without it, i probably wouldnt have gone through the trouble of setting up a blog.

However, there's a very thin line between delegating tasks that _support_ writing to AI and _letting AI think and write_ for me. Over time, the scope of tasks i give to it has narrowed, and the boundaries have gotten stricter.

[^1]: Here I'm primarily going to discuss writing as in this blog and work-related technical docs. I'm not a creative writer, and feel that AI has minimal utility for creative work {/* link to creativity post */}.

## What I do

### Firewall AI and Human content

I maintain strict separation for content written by AI vs what I write. Most agents default to writing content for you, so I have strict instructions in AGENTS.md to _not_ do that:

{/* link to agents.md, render text of relevant section */}

 I don't have principled moral objections to having AI write content for me. But writing content myself is the best way I have for reasoning through the topic (which makes the exercise valuable to me, regardless of whether anyone reads it).

I also just don't think AI writing is very good. It's editorial stance is watered down and overly cautious.

{/* example of transcript where it suggested something */}

### Create agent-generated research briefs

when my posts rely on factual claims, i have the agent prepare a dedicated reaearch brief on specific wuestions.

{/* rendered prompt around BRIEF.md */}

without careful prompting, agents tend to pull in copy from my writing and suggest watered down prose. to counter, i specify a narrow template:

{/* embed template */}

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
