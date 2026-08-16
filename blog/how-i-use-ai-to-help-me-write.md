---
title: How I use AI to help me write
date: 2026-08-05
authors: [tom]
image: /social-cards/how-i-use-ai-to-help-me-write.png
draft: true
---

AI is a tremendously helpful writing tool for me. without it, i probably wouldnt have gone through the trouble of setting up a blog. 

however, theres a very thin line between using ai to generate slop and using it to get facts right and refine presentation. over time, the scope of writing tasks i give to ai has narrowed, and the boundaries have gotten stricter.



<--move to footnote --> Here I'm primarily going to discuss _writing for other humans_, which for me is this blog and technical work documentation. I'm not a creative writer, and feel that AI has minimal utility for creative work <!-- link to creativity post -->.

AI is a helpful writing tool when used to expand or augment my thinking, but it's very easy to slide into letting it _do the thinking for me_. Without careful boundries, a quick check for grammar or awkward phrasing can quickly turn into taking over authoring, degrading the work.


To illustrate my process, I'll go through some history on my last post on [open source models]<!-- link to post -->


## What I do

### Firewall AI and Human content

I maintain strict separation for content written by AI vs what I write. Most agents default to writing content for you, so I have strict instructions in AGENTS.md to _not_ do that:

<!-- link to agents.md, render text of relevant section -->

even with these instructions, i meed to have the agent revert changes to copy.

 I don't have principled moral objections to having AI write content for me. But writing content myself is the best way I have for reasoning through the topic (which makes the exercise valuable to me, regardless of whether anyone reads it).

I also just don't think AI writing is very good. It's editorial stance is watered down and overly cautious.

<!-- example of transcript where it suggested something -->

### Create agent-generated research briefs

when my posts rely on factual claims, i have the agent prepare a dedicated reaearch brief on specific wuestions .

without careful prompting, agents tend to pull in copy from the main post and suggest watered down prose. to counter, i specify a narrow template:

<!-- embed template -->



<!-- rendered prompt around BRIEF.md -->

### refine presentation




and it made this edit:

<!-- edit saying skills are similarly overengineered -->

Comments on the post (justifiably) jumped on that line - skills are just a markdown file, how could I call them overengineered?

[^1]: With caveat below
[^2]: I don't actually think this anymore. Skills strike quite a reasonable balance on adding just enough documentation for an agent to use a CLI, without incurring the process overhead of MCP.
### AI fact check

When I'm done with a post, I ask an AI to run a fact check. Here, AI's general editorial cautiousness is useful, and I can draft a post with my best impression of the facts knowing I can cleanup misstatements later.

For example, in my last post I originally had some inaccuracies about encryption litigation:

<!-- link to fact check on ai litigation, edit suggested by AI -->

These prompts update my `BRIEF.md`, and I _sometimes_ accept proposed edits after discussion.

## What I used to do, but don't anymore

### Use AI to come up with titles

As an experiment, I built a [small tool](https://github.com/tombedor/hn_headlines) that generated embeddings on HN posts, and compared proposed titles to my posts to those that did well on HN.

This didn't really work, and I've come to view post titles as a core element of writing, not a quick label slapped on a post. The posts I've struggled to put titles on are also those that don't have a clear thesis or theme - if I can't think of a good title, it's a strong signal that I don't have a well scoped topic to write about.


### ask ffor general feedback

I dont get much mileage out of general "is this good" style prompts. when prompted thos way, agemts tend to give you critiques sandwiched between compliments, which doesnt help me decide whether a post is worth publishing to my taste.

### cleanup phrasing

(quote about first draft is typing, editing is wroting). its very tempting to wrote a draft and ask an agent to cleanup awkward phrasing. but this is a poor substitute for rereading a draft and tightening up phrasong , and these edit suggestions ate a backdoor to injecting bland AI-isms into my posts

