


# RAW NOTES BELOW


- why add memory?
	- for me, my first interaction with MemGPT was almost as notable as when I first interacted with an llm. the sense of self, the sense of (myself)
	- more generally, memory looks to provide infinite context (the promise not met by long contexts)
	- An agent with memory also poses interesting philisophical questions: memory is fundamental to a sense of self, and interacting with an agent with memory (albeit without it's own goals) poses interesting questions ont he nature of AI
        - of course, a lot of unsavory use cases for creating a synthetic _self_. One of the earliest interactions with others interested in the topic was from someone looking to make blockchain AI girlfriends.
- why not memory
	- use cases where correctness is highly important
	- long context windows
	- isn't this just long context models:
		- data on how long context windows doesn't meet the need
- Is memory learning?
- tradeoffs:
	- amount of post processing:
		- little = fast response
		- more = better conversation integration
	- taxonomy of memories
		- more: easier to verify correctness
		- less: more flexible to user's actual input
			- the appropriate granularity depends on the user: someone who exclusively talks about a specific project probabyl needs granular details on said project. someone doing more of a life admin style will need more general info.
    - response time
    - context rot
    - Temporal issues
	    - claude example
- approaches
	- commonality
		- Retrieve -> inject -> emit
			- but much devil in details:
				- injection can be raw text of memories, or a processed chain of thought, getting the agent to reflect on how the memory should inform the response
					- systems that wait for memories to be ingested before responding also increase latency
				- retrieval can be more or less sophisticated, from raw semantic similarity (fast) to post processing or filtering steps
					- injection of irrelevant memories can throw off response -> *that's great news about foo, want to talk about a completely unrelated topic we've discussed previously?*
				- memories can be passively created, outside of the primary agent loop, or via tool calls. Similar with recall
			- storage approaches vary widely
				- can build a taxonomy of entities
				- or, can build a taxonomy of short term vs evergreen memories
					- ie, Tom is a blogger who lives in los angeles is probably always relevant
					- *the next time Tom sees {foo} remember to ask them about their kid* is more specific
				- can leverage filesystem, or a graph
					- Is a Filesystem All You Need? paper
			- updating is hard
				- claude example: memories can be captured with relative dates that instantly become inaccurate
					- taxonomy
    - zep
    - mem0
    - letta
    - openai
    - anthropic
    - elroy
