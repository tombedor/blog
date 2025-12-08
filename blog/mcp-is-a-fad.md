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

    - tool calling
        - solving the one to many
        - handles triaging many tools
            - counterpoint: you don't actually want to have a large library of tooling. i don't want my coding agent to be able to order a pizza

    - NxM problem
    - the other stuff
        - there in theory, but almost zero adoption (github search of tool vs other types of annotations)

Given the disproporitionate focus of users on tool calling, it's worth digging deeper into what tool calling looks like with or without MCP.


### Tool Calling with MCP

    - with mcp ([MCP](https://modelcontextprotocol.io/) is an [open standard](https://www.anthropic.com/news/model-context-protocol) by Anthropic that provides "a standardized way to connect AI applications to external systems" including tools, data sources, and workflows)
        - ![function_calling_mcp](../static/diagrams/mcp/function_calling_mcp.png)
        - mechanics:
            - LLM receives user query + list of available functions
            - LLM returns tool call JSON (function name + arguments)
            - MCP layer parses the JSON and routes to appropriate function handler
            - MCP invokes the function (separate process/server)
            - Function result flows back through MCP to application logic
            - Application logic handles the agent loop (deciding whether to call LLM again, return to user, etc.)
            - key point: MCP acts as a router/marshaller between LLM output and function execution
                - translation layer that sits between application and tools
                - tools run in separate processes/servers
        - this abstracts several major concerns away:
            - the _runtime_ of the tools being invoked is abstracted away
            - the logic and instructions for each individual tool is abstracted away.

### Tool calling without MCP
It's a misconception that MCP is _necessary_ for function call support.

    - without mcp
        - ![function_calling_no_mcp](../static/diagrams/mcp/function_calling_no_mcp.png)
        - mechanics:
            - LLM receives user query + list of available functions
            - LLM returns either text response OR tool calls
            - Application logic directly parses LLM response
            - If tool calls: application directly invokes functions (same process)
            - If text response: application returns to user
            - Application handles the agent loop
        - key point: no intermediary layer - application logic directly manages function invocation
            - fewer moving parts
            - tools are just functions in your application code
        - This is quite generic but agent libraries come with functionality for parsing this. For example:
            - **Python**: [LangChain](https://python.langchain.com/docs/how_to/function_calling/) provides the `@tool` decorator and `bind_tools()` method to define and bind tools to models. [CrewAI](https://www.analyticsvidhya.com/blog/2025/03/agent-sdk-vs-crewai-vs-langchain/) offers role-based agent collaboration with native tool support.
            - **Node.js/TypeScript**: [Vercel AI SDK](https://ai-sdk.dev/docs/introduction) uses Zod schemas for tool definitions with a unified API across LLM providers. [LangChain.js](https://medium.com/himit-pens/building-ai-agent-workflows-with-python-typescript-d798c3435ec1) provides similar capabilities to its Python counterpart for Node.js environments.

## Problems

### the convenience gained is minimal
- comparing the two models, it's remarkable how little MCP is actually handling. MCP is, more or less, handling serializing function call schemas and responses. To

### major architectural drawback
- separating logic of tools from other application logic is bad
    - this is a major concession. the appropriateness of a tool does not exist in a vacuum. I want to pull a nail, are pliers the best tool to use? it depends on what else is in my toolbox - it might be, but if i have a hammer, probably not.
    - the trick is figuring out how tools fit together, not having a single omnipotent agent
    - MCP inhibits the pattern of embedding references to other tools within tool descriptions
- arbitrary runtimes of tool calls add complexity
- security complexities
    - the security model with llms should not really change! it's just a service to service call!
    - arbitrary runtimes means a much bigger vulnerability area

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





[^1]: Source: Github searches for [@mcp.tool](https://github.com/search?q=%40mcp.tool&type=code) (58.1K results), [@mcp.resource](https://github.com/search?q=%40mcp.resource&type=code) (9.1K), and [@mcp.prompt](https://github.com/search?q=%40mcp.prompt&type=code) (6.1K)
