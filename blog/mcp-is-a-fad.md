---
title: "MCP is a fad"
date: 2025-11-26
draft: true
---

## Overview

MCP took off as a standardized platform for AI projects - it's difficult to justify _not_ supporting it. However, this popularity will be short lived (if it's not already fading).

Some of the popularity has been driven by misconception about what MCP actually uniquely accomplishes, but the majority is due to the fact that it's _very easy_ to add an MCP server. For a brief period, it seemed like adding an MCP server was a nice avenue for getting attention to your project, which is why so many projects have added support.

There are misconceptions about what MCP actually accomplishes, aspirations that have been unmet, and major architectural problems.

## What is MCP?

MCP is meant to solve the "NxM problem" - with many toolsets and many agents, there's a potential for lots of bespoke connector implementations to arise:

<!-- diagram: Connecting many toolsets to an agent, with hint: are you sure you want a big library? -->

MCP is not _just_ about tool calls - it also has primitives for prompt libraries and _resources_. But adoption of these other primitives is is much lower than tools [^1]:

![code_references](../static/diagrams/mcp/code_references.png)

Given the disproporitionate focus of users on tool calling, it's worth digging deeper into what tool calling looks like with or without MCP.


### Tool calling without MCP
It's a misconception that MCP is _necessary_ for function call support. With "tool calling models", a list of available tools is provided to the LLM with the chat completion request. If the LLM wants to call a tool, it returns JSON formatted tool parameters, alongside response intended to be user visible:"

![function_calling_no_mcp](../static/diagrams/mcp/function_calling_no_mcp.png)

Actually providing the list of available tools and their schemas, parsing out tool call parameters, and executing tool calls are left to the application.

#### The NxM problem

A user who wishes to reuse a toolset with different agents has an annoying problem: configuring tool access is slightly different across different agents.

For example, tools are exposed to [Gemini's API](https://ai.google.dev/gemini-api/docs/function-calling?example=meeting#rest_2) via a `functionDeclarations` parameter with a `tool` parameter:


```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "Schedule a meeting with Bob and Alice for 03/27/2025 at 10:00 AM about the Q3 planning."
          }
        ]
      }
    ],
    "tools": [
      {
        "functionDeclarations": [
          {
...
```

In OpenAI's API, tool schemas are provided via a `tools` parameter:

```bash
curl -X POST https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5",
    "input": [
      {"role": "user", "content": "What is the weather like in Paris today?"}
    ],
    "tools": [
      {
        "type": "function",
        "name": "get_weather",
        "description": "Get current temperature for a given location.",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
...
```

Ths is the "NxM" problem - where in theory, the number of connectors a user must build is N (the number of agents) x M (the number of toolsets).

Note, however, the logic here is largely the same. Schemas are generated in JSON, there's just slightly different API's for exposing the tool to the agent.

There are many frameworks for standardizing this. In Python, [LangChain](https://python.langchain.com/docs/how_to/function_calling/), [LiteLLM](https://docs.litellm.ai/docs/completion/function_call), [SmolAgents](https://huggingface.co/learn/cookbook/en/agents), and others all provide interfaces for exposing tools to different models. In contrast to MCP, all of these options _execute tool calls in the same runtime as the agent_.

### Tool Calling with MCP

MCP handles exposing and invoking tools for you:

![function_calling_mcp](../static/diagrams/mcp/function_calling_mcp.png)

Here, the function invocations are handled by a separate process altogether. Orchestrating the agnet loop and providing results to the end user remain the application's responsibility. A JSON configuration controls which functions are  functions to expose are

This abstracts several major concerns away. Since functions are invoked in a separate process, resource management is opaque to the application. The logic and instructions for each tool is also not controlled by the application.

### Who are the users?

There are a few different possible users who interact with MCP:

![users](../static/diagrams/mcp/users.png)

- _Technical end users_ want to create tools and share them between different agents they might want to use.

- _Non-technical end users_ want to use different tools while using agents. Note that this user group for MCP is, at present, largely theoretical. Exposing toolsets to MCP involves editing JSON, making it out of reach for non-technical users.

- _Internal app devs_ run production AI applications.

- _Agent devs_ create agents for external users. They wish to enable their end users to swap in whatever toolsets they like.

- _Tool authors_ create toolsets they wish to expose to users. MCP provides a way to easily share their work to users of differrent agents.


## Problems

The conveninece of MCP comes with a price, stemming from two architectural attributes of an MCP driven application:

![issues](../static/diagrams/mcp/issues.png)

Since tools are drawn from arbitrary sources, they are not aware of what other tools are available to the agent. Therefore their instructions can't take logic from other sources into account in their own instructions.

The second stems from different toolsets having their own runtimes. This introduces a variety of issues I'll discuss below.

### Incoherent toolbox

Tool selection depends not just on the job at hand, but also what tools are available. Are pliers the right tool to pull out a nail? It depends on the nail, how deeply the nail is driven into a surface. But it also depends on _what other tools are available_. If a hammer is available, it might be better, but if you don't have a hammer you should user pliers. In isolation, you cannot provide good instructions on when a tool can be useful.

A good handyman has a well organized toolbox, tailored to the types of jobs they might do. Is a hammer the right tool for a job?

Agents tend to be less effective at tool use as the number of tools grow. With well organized, coherent toolset, agents do well. With a larger, disorganized toolset, they struggle. For example, consider a workflow in which an agent should send a notification after doing work:

![confusion](../static/diagrams/mcp/confusion.png)

With a reused toolset, we're obliged to deal with this situation with prompting outside of the toolset.

If the toolset is controlled by the same authors as the application, they can add prompting to the toolsets to disambuate when to use which tool.

Best of all is to limit what tools are exposed to the agent only to those that make sense.

### Arbitrary runtime

### Expsensive abstraction


- separating logic of tools from other application logic is bad
    - this is a major concession. the appropriateness of a tool does not exist in a vacuum. I want to pull a nail, are pliers the best tool to use? it depends on what else is in my toolbox - it might be, but if i have a hammer, probably not.
    - the trick is figuring out how tools fit together, not having a single omnipotent agent
    - MCP inhibits the pattern of embedding references to other tools within tool descriptions
- arbitrary runtimes of tool calls add complexity
- security complexities
    - the security model with llms should not really change! it's just a service to service call!
    - arbitrary runtimes means a much bigger vulnerability area


### the convenience gained is minimal
- comparing the two models, it's remarkable how little MCP is actually handling. MCP is, more or less, handling serializing function call schemas and responses. To


## Value adds redux (diagram?)
- NxM problem: already solved by language specific frameworks
- Ease of tool calling
-


### Exposing a large library of tools to an agent is an antipattern
- why do i want my coding agent to maybe order a pizza?

### who are the users?
    - devs looking to customize their own workflow (roo code users) / roo code maintainers
        - arbitrary runtime support problem
    - production
        - no savings! you control the code, why delegate?
            - alternative pattern: functions that call API's
    - devs looking to share their work
        -
## why it took off
    - very easy to publish



## Alternatives
- local scripts
- 1st party tools




[^1]: Source: Github searches for [@mcp.tool](https://github.com/search?q=%40mcp.tool&type=code) (58.1K results), [@mcp.resource](https://github.com/search?q=%40mcp.resource&type=code) (9.1K), and [@mcp.prompt](https://github.com/search?q=%40mcp.prompt&type=code) (6.1K)
