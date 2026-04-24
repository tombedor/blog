# Source Notes: OpenAI API Launch Sequence

**Research date:** 2026-04-24

## Core Links

- GPT-3.5 Turbo / Whisper API launch, March 1, 2023: https://openai.com/index/introducing-chatgpt-and-whisper-apis/
- GPT-4 API GA + Chat Completions push, July 6, 2023: https://openai.com/index/gpt-4-api-general-availability/
- Assistants API launch at DevDay, November 6, 2023: https://openai.com/index/new-models-and-developer-products-announced-at-devday/
- Responses API launch, March 11, 2025: https://openai.com/index/new-tools-for-building-agents/
- Responses API expansion, May 21, 2025: https://openai.com/index/new-tools-and-features-in-the-responses-api/
- Assistants migration guide / shutdown date: https://developers.openai.com/api/docs/assistants/migration

## Timeline

### March 1, 2023: Chat Completions arrives

- OpenAI launched GPT-3.5 Turbo and Whisper in the API.
- The post introduced a **new endpoint**: `https://api.openai.com/v1/chat/completions`.
- The new shape was **messages + roles**, replacing the old unstructured prompt style for many use cases.
- The launch post said early testers migrated from `text-davinci-003` to `gpt-3.5-turbo` with only a small amount of prompt adjustment.

### July 6, 2023: Completions becomes legacy

- OpenAI said Chat Completions already accounted for **97% of GPT API usage**.
- OpenAI recommended developers adopt Chat Completions.
- OpenAI said Completions would remain accessible but be labeled **legacy**.
- Most important line for your thesis: OpenAI said it did **not** plan to publicly release new models using the Completions API.

### November 6, 2023: Assistants API becomes the new abstraction

- OpenAI introduced the **Assistants API** as its "**first step towards helping developers build agent-like experiences**."
- It added:
  - Persistent / effectively unbounded threads
  - Code Interpreter
  - Retrieval
  - Function calling
- This moved more orchestration and state management onto OpenAI's platform.

### March 11, 2025: Responses API supersedes Assistants direction

- OpenAI launched the **Responses API** plus built-in tools and the Agents SDK.
- OpenAI described Responses as combining the simplicity of **Chat Completions** with the tool-use capabilities of **Assistants**.
- OpenAI recommended Responses for **new integrations**.
- OpenAI said it planned to deprecate Assistants after feature parity.

### May 21, 2025: Responses becomes the "core" primitive

- OpenAI called Responses its "**core API primitive for building agentic applications**."
- This is the clearest wording that the preferred abstraction had moved again.

### 2026 status

- OpenAI's migration guide says Assistants has been deprecated and will shut down on **August 26, 2026**.

## Best Quotes / Hooks

- July 6, 2023: Chat Completions already accounts for "**97% of our API GPT usage**."
- July 6, 2023: OpenAI has "**no plans to publicly release new models using the Completions API**."
- November 6, 2023: Assistants is OpenAI's "**first step**" toward agent-like experiences.
- March 11, 2025: Responses is a "**superset**" of Chat Completions.
- May 21, 2025: Responses is OpenAI's "**core API primitive**" for agentic apps.

## Best Evidence For "No Moat"

- The strongest pattern is not merely "new API launches happened"; it is that OpenAI repeatedly changed which layer it wanted developers to standardize on.
- The strongest anti-moat fact in the primary sources is in the March 11, 2025 post: the **Agents SDK works with models from other providers as long as they expose a Chat Completions-style API endpoint**.
- That suggests:
  - Chat-shaped interoperability became the real market standard.
  - OpenAI's higher-level abstractions did not eliminate the importance of cross-provider compatibility.

## Caveat

- The sources support a claim about **shifting preferred abstractions**.
- They do **not** prove that lock-in was the primary corporate motive; that part remains inference.
