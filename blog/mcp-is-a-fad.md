---
title: "MCP is a fad"
date: 2025-12-12
draft: true
---

## Overview

MCP has taken off as the standardized platform for AI integrations—it's difficult to justify _not_ supporting it. However, this popularity will be short lived (if it's not already fading).

Some of this popularity stems from misconceptions about what MCP uniquely accomplishes, but the majority is due to the fact that it's _very easy_ to add an MCP server. For a brief period, it seemed like adding an MCP server was a nice avenue for getting attention to your project, which is why so many projects have added support.

There are misconceptions about what MCP actually accomplishes, aspirations that have been unmet, and major architectural problems.
<!-- feedback: Strong hook and thesis; consider tightening this to a single paragraph that previews the three pillars (misconceptions, unmet aspirations, architectural costs) to set a clearer roadmap for the reader. -->

## What is MCP?

MCP is meant to solve the "NxM problem" - with many toolsets and many agents, there's a potential for lots of bespoke connector implementations to arise:

MCP is not _just_ about tool calls - it also has primitives for prompt libraries and _resources_. But adoption of these other primitives is much lower than tools [^1]:

![code_references](/diagrams/mcp/code_references.png)

Given the disproportionate focus of users on tool calling, it's worth digging deeper into what tool calling looks like with or without MCP.
<!-- feedback: Good framing; add one sentence that explicitly names the three primitives (tools, resources, prompts) and says you’ll focus on tools because adoption skews there, so readers know why the rest of the piece zooms in. -->


### Tool calling without MCP
A common misconception is that MCP is _required_ for function calling. With tool calling models, a list of available tools is provided to the LLM with the chat completion request. If the LLM wants to call a tool, it returns JSON formatted tool parameters, alongside response intended to be user visible:

![function_calling_no_mcp](/diagrams/mcp/function_calling_no_mcp.png)

Actually providing the list of available tools and their schemas, parsing out tool call parameters, and executing tool calls are left to the application.

#### The NxM problem

A user who wishes to reuse a toolset with different agents has an annoying problem: configuring tool access is slightly different across different agents.

For example, tools are exposed to [Gemini's API](https://ai.google.dev/gemini-api/docs/function-calling?example=meeting#rest_2) via a `functionDeclarations` parameter with a `tool` parameter:


```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \
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

In [OpenAI's API](https://platform.openai.com/docs/guides/text?lang=curl), tool schemas are provided via a `tools` parameter:

```bash
curl -X POST https://api.openai.com/v1/responses \
  -d '{
    "model": "gpt-4o",
    "input": [
      {"role": "user", "content": "What is the weather like in Paris today?"}
    ],
    "tools": [
      {
        "type": "function",
        "name": "get_weather",
...
```

This is the "NxM" problem - where in theory, the number of connectors a user must build is N (the number of agents) x M (the number of toolsets).

The underlying logic, however, is largely the same. Schemas are generated in JSON, there's just slightly different API's for exposing the tool to the agent.

There are many frameworks for standardizing this. In Python, [LangChain](https://python.langchain.com/docs/how_to/function_calling/), [LiteLLM](https://docs.litellm.ai/docs/completion/function_call), [SmolAgents](https://huggingface.co/learn/cookbook/en/agents), and others all provide interfaces for exposing tools to different models. In contrast to MCP, all of these options _execute tool calls in the same runtime as the agent_.
<!-- feedback: Clear explanation; consider trimming the long API excerpts and instead summarize the differences (parameter names, JSON shape) to keep the section snappy, since the point is “minor API divergence, same semantics.” -->

### Tool Calling with MCP

MCP handles exposing and invoking tools for you:

![function_calling_mcp](/diagrams/mcp/function_calling_mcp.png)

Here, the function invocations are handled by a separate process altogether. Orchestrating the agent loop and providing results to the end user remains the application's responsibility. A JSON configuration controls which functions to expose.

This abstracts away several major concerns. Since functions are invoked in a separate process, resource management is opaque to the application. The logic and instructions for each tool is also not controlled by the application.
<!-- feedback: Spell out the deltas vs “without MCP” (who owns schema generation, transport, invocation, logging/auth). Also note the cost (extra hop/process boundary) so the reader sees both trade-offs before the Problems section. -->

### Who are the users?

There are a few different possible users who interact with MCP:

![users](/diagrams/mcp/users.png)

- _Technical end users_ want to create tools and share them between different agents they might want to use.

- _Non-technical end users_ want to use different tools while using agents. Note that this user group for MCP is, at present, largely theoretical. Exposing toolsets to MCP involves editing JSON, making it out of reach for non-technical users.

- _Internal app devs_ run production AI applications.

- _Agent devs_ create agents for external users. They wish to enable their end users to swap in whatever toolsets they like.

- _Tool authors_ create toolsets they wish to expose to users. MCP provides a way to easily share their work to users of different agents.
<!-- feedback: Helpful segmentation; add a one-liner tying this back to the thesis (e.g., most beneficiaries are technical, so the touted “non-technical” audience is still underserved). -->


## Problems

The convenience of MCP comes with a price, stemming from two architectural attributes of an MCP driven application:

![issues](/diagrams/mcp/issues.png)

Since tools are drawn from arbitrary sources, they are not aware of what other tools are available to the agent. Therefore their instructions can't take logic from other toolsets into account in their own instructions.

The second stems from different toolsets having their own runtimes. This introduces a variety of issues I'll discuss below.

### Incoherent toolbox

[Agents tend to be less effective at tool use as the number of tools grow](https://www.microsoft.com/en-us/research/video/tool-space-interference-an-emerging-problem-for-llm-agents/). With a well organized, coherent toolset, agents do well. With a larger, disorganized toolset, they struggle—[OpenAI recommends keeping tools well below 20](https://platform.openai.com/docs/guides/function-calling), yet many MCP servers exceed this threshold. For example, consider a workflow in which an agent should send a notification after doing work:

![confusion](/diagrams/mcp/confusion.png)

Tool selection depends not just on the job at hand, but also what tools are available. Are pliers the right tool to pull out a nail? It depends on the nail, how deeply the nail is driven into a surface. But it also depends on _what other tools are available_. If a hammer is available, it might be better, but if you don't have a hammer you should use pliers. In isolation, you cannot provide good instructions on when a tool can be useful.

If the toolset is controlled by the same authors as the application, they can add prompting to the toolsets to disambiguate when to use which tool. If not, the problem must be solved by _more prompting_.

Looking through #mcp channels of open source coding agents, you'll invariably find users who struggle to get the agent to use the tools in the way they want:

![trouble](/diagrams/mcp/trouble.png)

Or, users complaining of how many tokens are burned by tool instructions:

![inefficient](/diagrams/mcp/inefficient.png)

### Arbitrary, separate runtimes

Each MCP server [starts a separate process](https://modelcontextprotocol.io/specification/2025-03-26/basic/lifecycle) that survives for the length of the agent session.

Even in the healthy state, this introduces a collection of processes that remain mostly idle, aside from serving occasional requests from an agent. In an error state, we get all the usual headaches: dangling subprocesses, memory leaks, resource contention.

Users have these issues, if they are able to get the servers running at all: in support channels, the most common complaint is difficulty getting the servers to run:

![connection_problems](/diagrams/mcp/connection_problem.png)

MCP does not provide any way to provide the host with runtime requirements. Some servers solve this by cramming install into the server instantiation command, e.g. `uv run some_tool mcp`. This works great, if for example, the user has `uv` installed.

Even if the relevant package is there, the MCP server might not start it successfully. MCP servers only inherit [a subset of parent ENV variables](https://modelcontextprotocol.io/legacy/tools/debugging#environment-variables) (`USER`, `HOME`, and `PATH`). This is particularly problematic for `nvm` or users leveraging virtual environments.



I'm personally comfortable debugging Python env issues (although MCP's subprocess orchestration makes this more difficult), but much less comfortable debugging Node. MCP seems to assert that I as the user should not really care which runtime I'm using.

Even if all of my MCP runtimes are Python, MCP potentially spins up many instances of it, obviating any cache, connection pooling, etc.

### Security

Agent executing code is a scary proposition. MCP makes this worse, by potentially pulling in arbitrary code, driven by a manipulable agent. MCP's specification [doesn't mandate authentication](https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/mcp-security-network-exposed-servers-are-backdoors-to-your-private-data), which has left [hundreds of servers completely exposed](https://www.darkreading.com/vulnerabilities-threats/2000-mcp-servers-security) online—one scan found 492 MCP servers running without any client authentication or traffic encryption.

The risk isn't theoretical: MCP has already been associated with several serious breaches:

- **[CVE-2025-6514](https://jfrog.com/blog/2025-6514-critical-mcp-remote-rce-vulnerability/)** (CVSS 9.6): Critical RCE in mcp-remote allowed arbitrary command execution when connecting to untrusted servers; 437,000+ downloads affected.
- **[CVE-2025-49596](https://thehackernews.com/2025/07/critical-vulnerability-in-anthropics.html)** (CVSS 9.4): RCE in Anthropic's MCP Inspector via browser-based CSRF attack chain.
- **[CVE-2025-53967](https://www.imperva.com/blog/another-critical-rce-discovered-in-a-popular-mcp-server/)**: Critical RCE in Framelink Figma MCP Server; 600,000+ downloads, 10,000+ GitHub stars.
- **[CVE-2025-53110](https://strobes.co/blog/mcp-model-context-protocol-and-its-critical-vulnerabilities/)** (CVSS 7.3): Sandbox escape in Anthropic's Filesystem MCP Server via directory traversal.
- **[Asana data exposure](https://www.bleepingcomputer.com/news/security/asana-warns-mcp-ai-feature-exposed-customer-data-to-other-orgs/)** (June 2025): Logic flaw in tenant isolation exposed ~1,000 customers' project data across organizations for over a month.
- **[Supabase MCP database leak](https://www.generalanalysis.com/blog/supabase-mcp-blog)**: Prompt injection attack could exfiltrate entire SQL databases including OAuth tokens via the "lethal trifecta" pattern.
- **[postmark-mcp supply chain attack](https://wiiwrite.medium.com/model-context-protocol-security-october25-update-69b7ef8b537d)** (September 2025): First confirmed malicious MCP server; masqueraded as legitimate package and BCC'd all emails to attacker; 1,643 downloads before detection.


## The convenience gained is minimal

These problems could be worth the cost, if we were to gain significantly. But comparing tool calling with MCP to tool calling without it, MCP handles remarkably little. MCP is, more or less, handling serializing function call schemas and responses.

The tools developers are saving themselves from having to write are, overwhelmingly, [relatively thin wrappers around API clients](https://mcp.alphavantage.co/?utm_source=mcp.so&utm_medium=referral&utm_campaign=202508&utm_id=000001&utm_term=web_project&utm_content=v2), or [utility scripts](https://mcp.so/server/time/modelcontextprotocol). In the former case, users must still obtain API keys, billing accounts, and so on.

This code _was_ a hassle to write, prior to the advent of coding agents. But these small utility scripts are the precise thing that coding agents excel most at! A technical user of MCP tools will be hard pressed to find a tool an agent could not one-shot in the programming language they are most comfortable in.

## Why it took off

With these issues, it's fair to wonder why MCP has gained the popularity it has. It has had lots of support from Anthropic, and no trouble gaining traction with toolset publishers, agent providers, and enterprises. Why? It helps narratives.

MCP is often described as an ["app store"](https://medium.com/@t.sankar85/the-mcp-registry-an-app-store-for-ai-tools-4c5b9ab3e657). But it's not an app store. It's not even a package manager. It's an overengineered orchestration protocol.

### Tool authors: A low overhead marketing channel

It's quite easy to publish an MCP server. The lack of startup requirements means you don't even need to publish to `npm` or `pip`: you can simply add an annotation, and publish a json blob.

This provides a nice narrative to gain attention to AI projects: A user can, in theory, easily add some MCP tools from a project, gain value, and follow interest in learning more about the project. Support overhead will, in the main, fall to agent maintainers.

Once publishers started appearing, it became difficult to justify _not_ supporting MCP. Your project could be perceived as being against open standards.

### Enterprise: AI credibility

Over the last few years, anyone watching San Francisco billboards has witnessed enterprise tools rebranding toward AI. MCP support provided an easy way to make your e.g. project management tool be AI. The branding of MCP as an "open standard" increased pressure to adopt - lack of MCP support could signal a lack of willingness to adopt open standards.

### Anthropic: Open source credibility

MCP's status as _the_ open standard for AI and the enterprise adoption greatly benefited Anthropic. The big fear of investors is that enterprise adoption doesn't persist - adoption of Anthropic's open standard helped this.


## Alternatives

### Local scripts with command runner

<!-- TODO: diagram with agents sharing with human -->

For a technical user, letting an agent invoke scripts directly is very difficult to beat. Useful 50-100 line scripts are _extremely_ easy to write with AI coding agents. Care needs to be taken to filter output - raw build scripts can stream verbose logs into agent context, eating up tokens.

Robust security against agent actions going haywire can be achieved via command runners like `just` or `make`. Agents allow you to specify what command prefixes can be invoked without approval - put your agent commands in a `justfile`, and only auto-allow shell commands prefixed with `just`.

This approach also exposes tools to humans, and is a nice approach for improving dev environments for humans and AI agents at the same time (TODO: link to make-it-easy-for-humans post)

### 1st Party Tools

For a self contained application, there is little reason to separate tool codebases from the codebase for the rest of the application. Tools can be dynamically exposed to the agent based on application context.

### Generic API Wrappers: OpenAPI / REST

Generic API wrappers like OpenAPI and REST offer all of the self-describing capabilities offered by MCP, with decades of battle testing.

Similar to scripts, some glue is necessary between a raw API and an agent, to manage output verbosity and add context. But tools need descriptions and ideas for how they should be used in relation with each other.

Security is already accounted for. Tokens, service identities already work very well. OAuth already enables automated actions taken on behalf of a user, service identities, etc.

### SDK's / Libraries

Language specific SDK's provide robust options for bridging the annoying differences in the API's of different model providers.

[^1]: Source: Github searches for [@mcp.tool](https://github.com/search?q=%40mcp.tool&type=code) (58.1K results), [@mcp.resource](https://github.com/search?q=%40mcp.resource&type=code) (9.1K), and [@mcp.prompt](https://github.com/search?q=%40mcp.prompt&type=code) (6.1K), searched 2025-12-08.


<!--
notes from HN:

• You’ve covered the core structure and tooling sections in your inline comments. The HN thread surfaces a few angles not yet addressed:

  - Pro-MCP end-user value: “app store”/consumer use case (Jira/Linear, Alibaba servers) and discoverability vs hand-wired REST/OpenAPI; clarify if/why that’s still overkill or when it’s legit.
  - Security/auth isolation: “socket without handing over tokens” as a claimed benefit; decide whether to rebut or scope it.
  - API spec comparison: why “just OpenAPI/text files/CLI” isn’t equivalent (or is); note the “self-describing enough for agents” bar.
  - Ops/reliability: comments about verbosity helping models, and reliability math for multi-agent chains; address determinism/retries vs non-determinism.
  - “Why replace it?”: if you argue “don’t use it,” offer the counter-pattern (SDKs, codegen/skills, CLI) explicitly.
-->
