---
title: "MCP is a fad"
date: 2025-12-12
---

## Overview

MCP has taken off as the standardized platform for AI integrations, and it's difficult to justify _not_ supporting it. However, this popularity will be short-lived.

Some of this popularity stems from misconceptions about what MCP uniquely accomplishes, but the majority is due to the fact that it's _very easy_ to add an MCP server. For a brief period, it seemed like adding an MCP server was a nice avenue for getting attention to your project, which is why so many projects have added support.

<!-- truncate -->

## What is MCP?

MCP claims to solve the "NxM problem": with N agents and M toolsets, users would otherwise need many bespoke connectors.

### The NxM problem

A common misconception is that MCP is _required_ for function calling. It's not. With tool-calling models, a list of available tools is provided to the LLM with each request. If the LLM wants to call a tool, it returns JSON-formatted parameters:

![function_calling_no_mcp](/diagrams/mcp/function_calling_no_mcp.png)

The application is responsible for providing tool schemas, parsing parameters, and executing calls. The problem arises when users want to reuse toolsets across different agents, since each has slightly different APIs.

For example, tools are exposed to [Gemini's API](https://ai.google.dev/gemini-api/docs/function-calling?example=meeting#rest_2) via `functionDeclarations` nested inside a `tools` array:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \
  -d '{
    "contents": [...],
    "tools": [
      {
        "functionDeclarations": [
          {
            "name": "set_meeting",
            "description": "...",
...
```

In [OpenAI's API](https://platform.openai.com/docs/guides/text?lang=curl), tool schemas use a flat `tools` array with `type: "function"`:

```bash
curl -X POST https://api.openai.com/v1/responses \
  -d '{
    "model": "gpt-4o",
    "input": [...],
    "tools": [
      {
        "type": "function",
        "name": "get_weather",
...
```

This is the "NxM" problem. In theory, users must build N × M connectors. In practice, the differences are minor (same semantics, slightly different JSON shape), and frameworks like [LangChain](https://python.langchain.com/docs/how_to/function_calling/), [LiteLLM](https://docs.litellm.ai/docs/completion/function_call), and [SmolAgents](https://huggingface.co/learn/cookbook/en/agents) already abstract them away. Crucially, these options _execute tool calls in the same runtime as the agent_.

### How MCP addresses it

MCP handles exposing and invoking tools via separate processes:

![function_calling_mcp](/diagrams/mcp/function_calling_mcp.png)

A JSON configuration controls which MCP servers to start. Each server runs in its own long-lived process, handling tool invocations independently. The application still orchestrates the agent loop and presents results to users.

This abstracts away schema generation and invocation, but at a cost. Tool logic runs in a separate process, making resource management opaque. The application loses control over tool instructions, logging, and error handling. And every tool call crosses a process boundary.

### Scope: tools dominate

MCP also defines primitives for prompts and resources, but adoption of these is much smaller than tools[^1]:

![code_references](/diagrams/mcp/code_references.png)

Given this, the rest of this post focuses on tool calling, which is MCP's primary use case in practice.

## Problems

The convenience of MCP comes with a price, stemming from two architectural attributes of an MCP-driven application:

![issues](/diagrams/mcp/issues.png)

Since tools are drawn from arbitrary sources, they are not aware of what other tools are available to the agent. Their instructions can't account for the rest of the toolbox.

The second issue stems from different toolsets having their own runtimes. This introduces a variety of problems I'll discuss below.

### Incoherent toolbox

[Agents tend to be less effective at tool use as the number of tools grows](https://www.microsoft.com/en-us/research/video/tool-space-interference-an-emerging-problem-for-llm-agents/). With a well-organized, coherent toolset, agents do well. With a larger, disorganized toolset, they struggle. [OpenAI recommends keeping tools well below 20](https://platform.openai.com/docs/guides/function-calling), yet many MCP servers exceed this threshold.

Why does this happen? Consider a workflow in which an agent should send a notification after doing work:

![confusion](/diagrams/mcp/confusion.png)

A tool's fit for a task depends not just on the job at hand, but also on what else is in the toolbox. Pliers can pull a nail, but if a hammer is available it's probably the better choice. When tools ship in isolation, their instructions can't say "use me only when you don't have a hammer," so agents don't get cohesive guidance.

If the toolset is controlled by the same authors as the application, they can add prompting to the toolsets to disambiguate when to use which tool. If not, the problem must be solved by system prompts or user guidance.

Looking through #mcp channels of open source coding agents, you'll invariably find users who struggle to get the agent to use the tools in the way they want[^2]:

![trouble](/diagrams/mcp/trouble.png)

Or, users complaining of how many tokens are burned by tool instructions:

![inefficient](/diagrams/mcp/inefficient.png)

### Arbitrary, separate runtimes

Each MCP server [starts a separate process](https://modelcontextprotocol.io/specification/2025-03-26/basic/lifecycle) that survives for the length of the agent session.

Even in the healthy state, this introduces a collection of processes that remain mostly idle, aside from serving occasional requests from an agent. In an error state, we get all the usual headaches: dangling subprocesses, memory leaks, resource contention.

Users have these issues, if they are able to get the servers running at all: in support channels, the most common complaint is difficulty getting the servers to run:

![connection_problems](/diagrams/mcp/connection_problem.png)

MCP offers no way for servers to declare their runtime/dependency needs. Some authors work around it by baking installation into the launch command (e.g., `uv run some_tool mcp`), which only succeeds if the user already has the right tooling installed.

Even if the relevant package is there, the MCP server might not start it successfully. MCP servers only inherit [a subset of parent ENV variables](https://modelcontextprotocol.io/legacy/tools/debugging#environment-variables) (`USER`, `HOME`, and `PATH`). This is particularly problematic for `nvm` or users leveraging virtual environments.

Python or Node developers might be comfortable debugging environment issues, (although MCP's subprocess orchestration makes this more difficult), but are likely less comfortable debugging Node issues _and_ Python _and_ other runtimes. MCP seems to assert that I as the user should not really care which of these are used, or how many.

Even if toolsets are in one given runtime, MCP potentially spins up many instances of it, obviating efficiencies from caching, connection pooling, and shared in-memory state. MCP's HTTP transport mode doesn't help; it's just another HTTP API, but with MCP's protocol overhead instead of battle-tested REST/OpenAPI patterns.

### Security

MCP pushes users to install servers from npm, pip, or GitHub. This inherits the usual supply-chain risk, but without even the minimal guardrails those ecosystems provide. There's no central publisher or signing; anyone can ship a daemon that runs on your machine and MCP offers no provenance check.

MCP's specification [doesn't mandate authentication](https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/mcp-security-network-exposed-servers-are-backdoors-to-your-private-data), leaving security decisions to individual server authors. The result: [one scan found 492 MCP servers](https://www.darkreading.com/vulnerabilities-threats/2000-mcp-servers-security) running without any client authentication or traffic encryption. Even Anthropic's own Filesystem MCP Server had a sandbox escape via directory traversal ([CVE-2025-53110](https://strobes.co/blog/mcp-model-context-protocol-and-its-critical-vulnerabilities/)).

#### MCP-related security incidents

| Issue | CVSS / Impact |
| --- | --- |
| **[CVE-2025-6514](https://jfrog.com/blog/2025-6514-critical-mcp-remote-rce-vulnerability/)** | 9.6 (RCE in mcp-remote; 437,000+ downloads) |
| **[CVE-2025-49596](https://thehackernews.com/2025/07/critical-vulnerability-in-anthropics.html)** | 9.4 (RCE in Anthropic's MCP Inspector) |
| **[CVE-2025-53967](https://www.imperva.com/blog/another-critical-rce-discovered-in-a-popular-mcp-server/)** | RCE in Figma MCP Server; 600,000+ downloads |
| **[Asana data exposure](https://www.bleepingcomputer.com/news/security/asana-warns-mcp-ai-feature-exposed-customer-data-to-other-orgs/)** | Tenant isolation flaw exposed ~1,000 customers' data |


Unlike a human carefully clicking through an API, agents can be manipulated via prompt injection to call tools in unintended ways. The [Supabase MCP leak](https://www.generalanalysis.com/blog/supabase-mcp-blog) demonstrated this "lethal trifecta": prompt injection → tool call → data exfiltration, extracting entire SQL databases including OAuth tokens. Again, this risk isn't unique to MCP. But the best mitigations are existing security infrastructure: scoped OAuth tokens, service identities with minimal permissions, and audit logging. MCP sidesteps this infrastructure rather than building on it.


A common defense is that MCP isolates credentials—the agent talks to a socket, never seeing your API tokens. But this threat model is narrow: an agent that can invoke `mcp.github.delete_repo()` doesn't need your token to cause damage. You're not eliminating trust; you're redirecting it to third-party code that, as the CVEs demonstrate, is often unaudited and vulnerable.

### The cost-benefit doesn't add up

These problems could be worth the cost, if we were to gain significantly. But comparing tool calling with MCP to tool calling without it, MCP handles remarkably little. MCP is, more or less, handling serializing function call schemas and responses.

The tools developers are saving themselves from having to write are, overwhelmingly, [relatively thin wrappers around API clients](https://mcp.alphavantage.co/?utm_source=mcp.so&utm_medium=referral&utm_campaign=202508&utm_id=000001&utm_term=web_project&utm_content=v2), or [utility scripts](https://mcp.so/server/time/modelcontextprotocol). In the former case, users must still obtain API keys, billing accounts, and so on.

This code _was_ a hassle to write, prior to the advent of coding agents. But these small utility scripts are the precise thing that coding agents excel most at! A technical user of MCP tools will be hard-pressed to find a tool an agent could not one-shot in the programming language they are most comfortable in.

## Why it took off

With these issues, it's fair to wonder why MCP has gained the popularity it has. It has had lots of support from Anthropic, and no trouble gaining traction with toolset publishers, agent providers, and enterprises. Why? It helps narratives:

### Tool authors: A low overhead marketing channel

It's quite easy to publish an MCP server. The lack of startup requirements means you don't even need to publish to `npm` or `pip`: you can drop an `@mcp.server` annotation in your repo and host a small manifest JSON that points to your entry command (e.g., `node server.js`) and lists the tools.

This provides a nice narrative to gain attention to AI projects: A user can, in theory, easily add some MCP tools from a project, gain value, and follow interest in learning more about the project. Support overhead will, in the main, fall to agent maintainers.

Once publishers started appearing, it became difficult to justify _not_ supporting MCP. Your project could be perceived as being against open standards.

### Enterprise: AI credibility

Over the last few years, anyone watching San Francisco billboards has witnessed enterprise tools rebranding toward AI. MCP support provided an easy way to make your e.g. project management tool be AI. The branding of MCP as an "open standard" increased pressure to adopt - lack of MCP support could signal a lack of willingness to adopt open standards.

### Anthropic: Open source credibility

MCP's status as _the_ open standard for AI and the enterprise adoption greatly benefited Anthropic. The big fear of investors is that enterprise adoption doesn't persist - adoption of Anthropic's open standard helped this.


## Alternatives

### Who benefits from MCP?

There are a few different possible users who interact with MCP:

![users](/diagrams/mcp/users.png)

- _Technical end users_ want to create tools and share them between different agents they might want to use.

- _Non-technical end users_ want to use different tools while using agents. Note that this user group for MCP is, at present, largely theoretical. Exposing toolsets to MCP involves editing JSON, making it out of reach for non-technical users.

- _Internal app devs_ run production AI applications.

- _Agent devs_ create agents for external users. They wish to enable their end users to swap in whatever toolsets they like.

- _Tool authors_ create toolsets they wish to expose to users. MCP provides a way to easily share their work to users of different agents.

Notice that the supposed beneficiaries are overwhelmingly technical. The "app store for AI" vision that would serve non-technical users remains unfulfilled.

For each user type, there's a simpler approach that avoids MCP's overhead:

| User Type | MCP Promise | Better Alternative | Why |
|-----------|-------------|-------------------|-----|
| **Technical end users** | Share tools between agents | Local scripts + command runner | AI can one-shot these scripts; works with any agent via shell; exposes tools to humans too |
| **Non-technical end users** | Easy tool installation | *(MCP doesn't deliver)* | MCP requires JSON editing—this group remains underserved regardless |
| **Internal app devs** | Standard tool interface | 1st party tools | Same codebase, existing auth/logging/tracing, no process overhead, coherent toolbox |
| **Agent devs** | Let users swap toolsets | SDK abstraction (LangChain, LiteLLM) | Handles model API differences without separate processes |
| **Tool authors** | Distribute to all agents | OpenAPI specs or libraries | Existing distribution (npm, pip), decades of tooling, no new protocol |

### Local scripts with command runner

For a technical user, letting an agent invoke scripts directly is very difficult to beat. Useful 50-100 line scripts are _extremely_ easy to write with AI coding agents. Care needs to be taken to filter output - raw build scripts can stream verbose logs into agent context, eating up tokens.

![just](/diagrams/mcp/just.png)

Robust security against agent actions going haywire can be achieved via command runners like [just](https://github.com/casey/just) or [make](https://en.wikipedia.org/wiki/Make_(software)). These tools provide everything that MCP does - command specifications, descriptions, arguments. Agents allow you to specify what command prefixes can be invoked without approval - put your agent commands in a `justfile`, and only auto-allow shell commands prefixed with `just`.

This approach also exposes tools to humans, and is a nice approach for improving dev environments for humans and AI agents at the same time. (See [Make It Easy for Humans First, Then AI](./make-it-easy-for-humans.md) for more on this).

### 1st party tools

For a self contained application, there is little reason to separate tool codebases from the codebase for the rest of the application. Tools can be dynamically exposed to the agent based on application context.

In a first party context, any code that devs wish to reuse can be exposed as libraries, just like any other code they wish to share. An AI tool is really nothing more than a function, and the fact that it's invoked by AI does not warrant special handling.

An enterprise context should have robust infrastructure for authenticating, authorizing, provisioning service identities, and tracing call chains for service to service calls. That some of these calls are now _AI_ service to service calls does not warrant a rebuilt security posture.

### OpenAPI / REST

OpenAPI specs are already self-describing enough for agents—they include operation descriptions, parameter schemas, examples, and enums. LLMs understand them well; GPT Actions are literally OpenAPI specs. The glue needed between an OpenAPI endpoint and an agent (output filtering, context, auth) is the same glue MCP requires. MCP doesn't provide meaningfully better tool descriptions; it just reinvents a schema format that already exists, without the decades of tooling, validation, and battle-testing.

[^1]: Source: Github searches for [@mcp.tool](https://github.com/search?q=%40mcp.tool&type=code) (58.1K results), [@mcp.resource](https://github.com/search?q=%40mcp.resource&type=code) (9.1K), and [@mcp.prompt](https://github.com/search?q=%40mcp.prompt&type=code) (6.1K), searched 2025-12-08.
[^2]: Support request snippets are pulled from Discord.

## A prediction

MCP's popularity will be relatively short-lived. The cost benefit does not add up, and there are readily available alternatives. The introduction of [Claude Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) and [OpenAI's quick adoption](https://simonwillison.net/2025/Dec/12/openai-skills/) signal that even model providers agree.

Claude Skills is an incremental improvement over MCP, but is similarly overengineered. Longstanding tools and techniques for collaboration amongst human devs remain compelling, and these options will chip away at more AI-centric techniques which reinvent the wheel.
