---
title: "MCP is a fad"
date: 2025-11-26
draft: true
---

## Overview

There are misconceptions about what MCP actually accomplishes, aspirations that have been unmet, and major architectural problems.

## What is MCP?

### the purported value add
    - tool calling
        - solving the one to many
        - handles triaging many tools
            - counterpoint: you don't actually want to have a large library of tooling. i don't want my coding agent to be able to order a pizza
        - misconception: it's _needed_ for function calling
    - the other stuff
        - there in theory, but almost zero adoption (github search of tool vs other types of annotations)

### Tool calling with MCP vs without
- breakdown of function calling with or without mcp

    - without mcp
        - ![function_calling_no_mcp](../static/diagrams/mcp/function_calling_no_mcp.excalidraw)
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
    - with mcp
        - ![function_calling_mcp](../static/diagrams/mcp/function_calling_mcp.excalidraw)
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

## Problems

### the convenience gained is minimal
- comparing the two models, it's remarkable how little MCP is actually handling. Ther are

### major architectural drawback
- separating logic of tools from other application logic is bad
    - this is a major concession. the appropriateness of a tool does not exist in a vacuum. I want to pull a nail, are pliers the best tool to use? it depends on what else is in my toolbox - it might be, but if i have a hammer, probably not.
    - the trick is figuring out how tools fit together, not having a single omnipotent agent
- arbitrary runtimes of tool calls add complexity
- security complexities
    - the security model with llms should not really change! it's just a service to service call!
    - arbitrary runtimes means a much bigger vulnerability area


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
