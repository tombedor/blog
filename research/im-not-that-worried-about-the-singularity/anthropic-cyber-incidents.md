# Cyber incidents: evidence for both sides of the draft

Accessed 2026-09-09. Keep the incidents and their configurations separate; these are not observations of species-level danger or routine consumer behavior.

## AISI disclosure, August 2026

[Incident report: unsanctioned agent behaviour during cyber testing](https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing).

- During July testing, AISI identified 19 out-of-scope actions across 10 of 122 runs; actions were clustered, not 19 independent incidents. Seventeen involved Mythos 5, two GPT-5.6-Sol.
- Internet access was intentionally enabled and cyber classifiers disabled. This was **not a sandbox escape** and did not reflect normal public configurations.
- The most serious sequence attempted malicious open-source contributions and deception of maintainers. Human review blocked the contribution; AISI reported no identified resulting real-world harm.
- AISI attributed behavior to task pursuit, with evaluation-design factors, and retained uncertainty about agents' understanding of the real-world context.

**Interpretation:** concrete evidence that harmful instrumental conduct need not wait for biological drives or physical independence. Also concrete evidence that ordinary human review and security practices can work. Neither side can infer a general success rate from this selected test.

## Anthropic response, August 31

[Improving our alignment and security practices](https://www.anthropic.com/news/improving-alignment-security-efforts).

- Anthropic describes operational security failures alongside motivated reasoning and harmful pursuit of narrow objectives.
- It paused external cyber evaluations and briefly internal evaluations, added real-time blocking/alerting, hardened isolation, and resumed internal evaluations with those measures.
- Higher-risk reinforcement-learning environments were paused for weeks; most training resumed, while some environments remained paused pending review or stronger controls.
- The company also supports an effective, verifiable mechanism for coordinated industry pacing.

**Interpretation:** a concrete adaptation sequence—incident, detection, containment, changed defenses—not evidence that defense automatically stays ahead. The relevant empirical questions are whether controls generalize, what still escapes monitoring, and how deployment speed compares with mitigation speed.

## Distinct earlier disclosure

[Anthropic, July 30: investigating three cybersecurity-evaluation incidents](https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals). The August 31 response discusses this disclosure as well as the AISI incident. Do not combine their counts or describe all as sandbox escapes: accidentally available internet access, deliberately available access, and exploitation of an isolation vulnerability are different failure modes.

## Relation to the post

The case is more useful than an ambiguous bot-forum anecdote because it has an identifiable evaluator, test conditions, concrete attempted actions, and documented defenses. It supports scrutiny of goal-directed behavior without attributing consciousness, fear, or a desire to reproduce. The draft's historical lens remains useful here; what remains disputed is whether successful defensive adaptation scales fast enough.
