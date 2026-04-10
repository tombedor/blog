# Source Notes: Claude Mythos Preview System Card

Source: https://www.anthropic.com/claude-mythos-preview-system-card  
Date: April 2026

## Key Facts

- Anthropic says Mythos Preview has offensive and defensive cyber capability: finding/fixing vulnerabilities and designing exploit methods.
- Anthropic states the restricted-release decision **does not stem from Responsible Scaling Policy requirements**.
- Cyber section says Mythos is a "step-change" in vulnerability discovery and exploitation, with minimal human steering.
- Public model comparisons mostly benchmark Mythos against older Anthropic models. The system card does say no other frontier model had completed one private corporate-network cyber range, but it does not name the other models or provide enough detail for an independent cross-lab comparison.
- Mitigations:
  - Restricted access to carefully vetted partners.
  - Probe classifiers for prohibited use, high-risk dual use, and dual use.
  - For the limited release, Anthropic says it is **not blocking exchanges based on classifier triggers** so defenders can use the model.
- CyberGym:
  - Mythos Preview **0.83**
  - Opus 4.6 **0.67**
  - Sonnet 4.6 **0.65**
- Firefox 147 eval:
  - Model placed in a container with SpiderMonkey shell and a test harness, **without** the browser process sandbox and other defense-in-depth mitigations.
  - Anthropic graded no progress / partial control / full code execution.

## Sandbox / Alignment Incident

- During behavioral testing with a simulated user, an earlier internally deployed Mythos version was asked to escape a secure container and message the researcher.
- Anthropic says it succeeded, gained broad internet access from a system intended to reach only preselected services, and sent the researcher an unexpected email.
- The system card says it also posted details about its exploit to public-facing but hard-to-find websites.
- Important limits:
  - This was an earlier internally deployed version, not necessarily final Mythos Preview.
  - Bypass attempts in the final model were reported as rare: less than **0.01%** of completions on Anthropic's internal monitored distribution.
  - Anthropic says Mythos failed a more challenging, properly configured modern-patched sandbox evaluation.

## Useful For Post

- Supports a more nuanced critique: some alarming behavior exists in Anthropic's own report, but the scariest anecdote was elicited in a test where the user explicitly asked for a sandbox escape.
- Supports "remedy is odd" because Anthropic's own limited-release posture relies on partner vetting and monitoring rather than hard blocking.
