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
    - without mcp
        - ![function_calling_no_mcp](../static/diagrams/mcp/function_calling_no_mcp.excalidraw)

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
