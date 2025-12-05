---
title: "MCP is a fad"
date: 2025-11-26
draft: true
---

## the purported value add
    - solving the one to many
    - handles triaging many tools
        - counterpoint: you don't actually want to have a large library of tooling. i don't want my coding agent to be able to order a pizza
    - misconception: it's _needed_ for function calling


## MCP is not technically necessary, any value add would be convenience
- breakdown of function calling with or without mcp
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

## the convenience gained is minimal
- actual logic of tool calling is trivial to write with AI

## major architectural drawback
- separating logic of tools from other application logic is bad
- the trick is figuring out how tools fit together, not having a single omnipotent agent

## who are the users?
    - devs looking to customize their own workflow
    - devs looking to enable others to customize their tools
        - support problem
    - production
    - devs looking to share their work
- why it took off
    - very easy to publish
