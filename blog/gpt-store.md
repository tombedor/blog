---
title: "The Questionable Value of the OpenAI GPT Store"
date: 2024-01-13
---

# The Questionable Value of the OpenAI GPT Store

OpenAI launched its [GPT Store](https://openai.com/blog/introducing-the-gpt-store) this week. Brands and developers can create custom GPT's, either for sale or for free. Both have eagerly launched many GPT's, probably due to the relatively low overhead of creating them.

I am skeptical of the value. For brands, this feels like the AI equivalent of a service that sends postcards in response to an email. The access pattern and interface are more or less exactly the same as traditional apps or sites, only via a GPT. It's a neat trick, but I think users will quickly lose interest.

<!-- truncate -->

### Branded GPT's

Take as an example the [AllTrails GPT](https://www.yahoo.com/lifestyle/alltrails-launches-ai-assistant-help-165944784.html#%253A~%253Atext%253DAllTrails%2520GPT%2520is%2520available%2520through%252Ctrails%2520based%2520on%2520your%2520prompts.). The announcement post assures us that it will work more or less exactly the same as AllTrails:

> Don't worry, it doesn't make up new routes – instead it gives recommendations from AllTrails' collection of over 420,000 trails based on your prompts. For example, you could ask it to "find me an easy five-mile loop that's dog-friendly within 10 miles of Birmingham", saving you the effort of searching and filtering results to pinpoint what you want.

In other words, the GPT saves you the hassle of using the AllTrails app, only probably worse.

This doesn't leverage AI's crucial advantage: the ability to retain context over the course of a conversation.

### Indie GPT's

For more obscure developers, the store appears to already be flooded with Ai's version of the [chumbox](https://en.wikipedia.org/wiki/Chumbox), [AI Girlfriends](https://qz.com/ai-girlfriend-bots-are-already-flooding-openai-s-gpt-st-1851159131). These are apparently against OpenAI's terms of use, but enforcement seems likely to be an indefinite cat and mouse game. Whether or not you cringed at [Her](https://en.wikipedia.org/wiki/Her_%2528film%2529), there's little to differentiate AI girlfriend offerings from each other.

### Questionable roadmap

**The root of the problem is scarce context window space.** At present there's simply not enough space to put much customization.

While the context window will grow (current values feel similar to the [640K memory](https://www.computerworld.com/article/2534312/the--640k--quote-won-t-go-away----but-did-gates-really-say-it-.html) of early computers), it seems unlikely that these custom GPT's will achieve or maintain much of a lead over the vanilla model. The interface for brands is already well defined - there's already an app!

In addition, it's doubtful users are eager to navigate yet another app store - the problem with using the AllTrails app isn't that it's a hassle to use, it's that it's cumbersome to remember that you downlaoded it, that you logged in, and how to find it on your phone. Custom GPT's do not mitigate this problem.

The real differentiation of GPT's is in projects that get the most out of the limited context window in clever ways, via compression or [RAG](https://research.ibm.com/blog/retrieval-augmented-generation-RAG).

### A more promising development: long term memory

A more promising update this week was the rumor of ChatGPT rolling out long term memory capabilities. The ability to lengthen memory capacity indefinitely is why I think [MemGPT](https://memgpt.ai/) is one of the more interesting AI open source initiatives. As opposed to custom GPT's in the OpenAI store today, a memory-enhanced GPT can learn your preferences and develop a longer term relationship with you, which is the prospect that make GPT's exciting and scary at the same time.
