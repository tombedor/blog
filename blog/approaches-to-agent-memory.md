---
title: Approaches to giving memory to AI
date: 2026-03-21
draft: true
---

## Approaches to giving memory to AI

For me, the question of memory is the most interesting subfield of AI. The first time I intereacted with MemGPT (now Letta), I felt like I had crossed a rubicon: memory transformed a simple question and answer bot into (what appeared to be) a _being_.

Whether or not creating an AI with memory is a _being_, or whether it's advisable to create one is less easy to answer than at first glance. There are certainly unsavory use cases: one of the first interactions I had in AI open source was with someone looking to create AI girlfriends (on the blockchain, of course).

I created my own system, called [Elroy](https://elroy.bot), and have been interacting with it for about 3 years. It helps me brainstorm, talks me through career ups and downs, and functions as a kind of interactive journal. I've tinkered with it's functionality enough that I don't feel attached to it as a specific entity - but I _would_ be disappointed if it's memories of our interactions were lost.

There are more grounded reasons to want to give AI memory. It's useful for AI to understand what subjects I'm knowledgable in if I looking to discuss technical topics. If I'm looking for vacation plans, it's useful for it to know that I have a young child. An AI is not a person, but it interacts just like a person, and the more it can converse naturally the more functional it is. Having to restate basic facts over and over breaks that immersion.


## Approaches

All memory systems can be broken into 3 general stages: _store_, _retrieve_, _inject_, _emit_.

![general_architecture](/diagrams/approaches-to-agent-memory/general_architecture.png)

But details from there vary widely! Below I'll go through different approaches for these, and where I land on them.

### Store

Approaches to storage largely fall into two camps: graph databases and flat files.

Zep is strongly pro-graph db, and claims state of the art needle in the haystack performance. Mem0 offers a graph database integration, but claims only a 2% performance boost. Letta also works with files, and released a research paper arguing for it: Files are all you need.

#### Key Challenge: Correctness

AI memory systems primarily make three kinds of errors:

1. Temporal errors: AI's struggle with reasoning about time. Their reasoning does not account for context that extends into time, and will naively write memories assuming the current moment _will always be the current moment_. I.e., "next Thursday" very quickly changes!
1. Miscalibrated priority: Especially early on in a user journey the AI will preserve a mundane fact about the _current conversation_, which survives into future conversations where the fact is irrelevevant.
1. Plain old incorrectness. The ground truth of AI memory is conversation with a human. But humans change their mind, misremember things, and are sometimes flat out wrong.

My own Claude memory summary makes all three of these errors!

![problems](/diagrams/approaches-to-agent-memory/problems.png)

"How do you know the memory is correct?" Is a very common question for these systems. The short answer: you don't.

The primary ground truth data for memory systems is user conversation. Humans change their mind, misremember things, and sometimes are just plain wrong. Absent an independent source of ground truth, memories drawn from conversational transcripts will necessarily contain factual errors.

#### Where I land

I prefer flat files, with no built in taxonomy. I am skeptical that a single taxonomy works well for all users. In an early attempt, I took a taxonomy from Wikipedia, and directed the AI to conform it's entries to it. But it struggled to maintain consistent scope, often stuffing details of related but distinct entities into an entry:

![wikipedia](/diagrams/approaches-to-agent-memory/wikipedia.png)

I allow the agent to directly update memories, and find that it usually does a good job of fixing inaccuracies or appending new, related information to recalled memories. I also run an asynchronous memory consolidation process, which detects clusters of highly similr memories, and rewrites them. I think this helps create a collection of memories that are more evenly dispersed in vector space, resulting in better recall.

![consolidation](/diagrams/approaches-to-agent-memory/consolidation.png)

### Retrieve

Here we are, more or less, discussing RAG. And similar tradeoffs are at play.

The first decision is how to inititve memory searches in the first place. Most implementations surfce a _search_memory_ tool to the agent. But agent context can also be manipuldated outside of the agent loop.

For searching, basic vector similarity is the most latency efficient technique. But this is subject to misranking entries, or scoring entries that are superficially similar but not actually relevant. This can badly throw off the conversation, and lead to responses like *that's great news about foo, want to talk about a completely unrelated topic we've discussed previously?*

A post-retrieval filtering step is helpful, but adds latency.

How _many_ memories to fetch is another parameter, and largely depends on how memories have been stored. If memories are small tidbits, there may be more than one relevant memory to inject, whereas if memories are a paragraph or more, it's likely only the top match makes sense.

#### Key challenge: Latency

A memory-enriched response from an AI is going to be slower than one without memory. There are usually going to have to be several queries in front of the user facing response, as memories are recalled, filtered, processed, and injected into context.

This poses one of the more tricky design questions of creating a memory-enhanced AI: memory isn't _always_ necessary. If I'm asking an agent the length of the Brooklyn bridge, I don't really need it to scan through our past interactions before answering.


#### Where I land

N=1 retrieval, with a relatively imple filter step. I favor an automatic memory injection, outside of the control of the agent. This better maps to my mental model of how memory works: when I remember something, I don't think, _time to search memory_ and consiously decide to recall something. It's more automatic and beyond my concios control.

<!-- diagram: automatic memory search -->

Initiating memory searches automatically also yields more consistent results across models. When given a _search_memory_ tool, some models will use it almost every message, while others will use it too sparingly.

### Inject

Injecting recalled memories into the standard OpenAI context is a bit like fitting a square peg into a round hole. As with other RAG systems, the OpenAI spec does not quite offer an easy field to put recalled, relevant information in.

Options include:

1. *Updating system message*: Reserving a space in the system message for recalled, relevant information. This conceptually slots in the cleanest: you don't need to present what is really information from the system as a user message, tool call, or assistant message. There's a major issue with this though: *prompt caching invalidation*. Frequently updating the system message in this way invalidates prompt cache, resulting in high costs. With extra token use already being an inherent part of the equation for memory-augmented AI's, this is a major drawback.
2. *Tool calls*: Of course, if the memory search was initiated via a tool call, this injection method is the natural choice. Letta surfaces _all_ user facing messages as a _send_message_ tool call. An occassional issue with this is that the agent gets confused, and doesn't properly use the _send_message_ tool to convey user info.
3. *User or assistant messages*: In this method, either the incoming user message is edited to surface memory information, or an extra user or assistant message is created. For example, you can use html tags like `<memory>content</memory>`. This should be accompanied by instruction in the system message about how memory content is not visible to the user. There are some pitfalls to this approach. Some models require alternating `assistant` / `user` turns, so adding consecutive messages from one role or the other will be rejected. Despite system instructions, some models still get confused, and output responses with confusing HTML tags.

#### Key challenge: Transparency

Injecting memories into context presents a tradeoff: the most seamless experience is one in which recalled content is invisibly available to the agent. But in doing so, memory systems can obscure what has been exposed to the agent.

![transparency](/diagrams/approaches-to-agent-memory/transparency.png)

Where correctness is highly important, memory systems can introduce subtle problems. Usually they are automatically generated and not deeply reviewed by humans, so a wrong assumption in an agents memory store can be difficult to detect.

This is why I don't use memory functionality in coding workflows. Instead, I write (with AI assistence) comprehensive project docs, in human readable format, and refer the agent to it (see: dont write docs twice).

This is a more manual process than just spitballing about a project to an AI, but I prefer to have the AI's ground truth assumptions tightly controlled during coding.


#### Where I land

I inject recalled memories via a "synthetic" tool call. That is, the memory is exposed via a tool call that the agent didn't actually make. This mostly works well, though sometimes the agent will redundantly call the "tool" that I surfaced the memory with. My tool also lists which memories have been recalled in a dismissable dialoge, available for user review.

<!-- memory panel screenshot -->

### Emit

Memories are usually created via an agent tool call, or via a summary of conversation context that's been compressed (see below). These aren't mutually exclusive!

#### Where I land

I find tool calls do the majority of the heavy lifting here.

When systems offer context compression, they usually also often emit memories of pruned text. This is arguably obsolete with modern, 1m+ context windows, but I think they are still relevant. I typically prune messages older than a day or so, and emit memories based on pruned text. This creates memories that could be redundnat with agent-emitted memories, but async memory consolidation cleans that up.

<!-- diagram: drop old messages, summarize -->


## Conclusion

Agent memory is not a problem with a one size fits all solution. Every stage of the process comes with it's own set of tradeoffs to consider.


<!-- TO ADD:
Privacy
evaluation
why long context windows dont solve this


-->
