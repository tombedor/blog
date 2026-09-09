# Anthropic risk reports: relevance to the singularity draft

Accessed 2026-09-09. Targeted review of executive summaries, relevant threat models, conclusions, and limitations; not a line-by-line audit of every evaluation. These are developer assessments, supplemented below by an external review and a primary experiment. Section numbers are preferable to page links because reports can be amended.

## Current report: August 2026

[Risk Report](https://anthropic.com/aug-2026-risk-report) · [publication/version index](https://www.anthropic.com/responsible-scaling-policy). Published August 14; coverage date July 15, with subsequent incident discussion. The public PDF is redacted.

- **§2, especially §2.19:** high-stakes misalignment; current assessed risk raised from very low to low because cyber incidents increased uncertainty. This is not a numerical probability of human extinction over the next decade.
- **§3.4–3.5:** researcher substitution and acceleration are separately assessed. The substitution criterion includes competitive cost; Anthropic does not assess full substitution as achieved.
- **§4:** chemical/biological misuse, capabilities, safeguards, and uncertainty about real-world uplift. §4.4.2.1 discusses the Hong trial below.
- **§6.1:** prioritization explicitly considers historical analogies and AI's incremental contribution. The report is selective; other research covers issues such as social harms and labor impacts.
- **Interpretation:** its framework already includes mitigations and adaptation. Challenge their adequacy or evidential support, not their absence. “Catastrophic” also covers destabilization, not only extinction.

## Baseline: February 2026, amended May 26

[Risk Report](https://anthropic.com/feb-2026-risk-report). Original publication February 24; later editorial changes July 8.

- **§2.6, eight sabotage pathways:** diffuse or targeted interference with safety research; code backdoors; training-data poisoning; self-exfiltration; persistent rogue internal deployment; sabotage at other labs; manipulation of government decisions.
- **§3:** automated R&D; **§4–5:** chemical/biological threat categories. The report considers capabilities together with mitigations, including internal use—not just public releases.
- The amendment corrects survey interpretation after external criticism. This is a baseline for changes, not the latest assessment.

**Relevance (analysis):** several pathways exploit an AI's role *within* human organizations. They require neither robots replacing every human maintainer nor the AI outperforming the entire human-plus-AI world. A model could remain useful on balance while occasionally corrupting a critical process. This is the strongest challenge to treating full independence as the boundary before which AI risks are unexceptional.

## Earlier, narrower report: Claude Opus 4.6 sabotage

[Sabotage Risk Report](https://anthropic.com/claude-opus-4-6-risk-report), especially §§6.5–6.8.

- “Autonomous operation” includes obtaining compute and running outside monitoring on existing infrastructure; it does not mean fabricating chips or running the electrical grid independently.
- The report distinguishes self-exfiltration from persistent unmonitored deployment *inside* a lab.
- It treats weak long-running reliability, monitoring, lack of observed consistent hostile goals, and limited stakes as mitigating factors. Its very-low-risk assessment is model-specific, not a claim about all future AI.

**Implication (analysis):** “does not need a cooperating owner” and “does not depend on human civilization” are very different thresholds. The draft should not slide between them.

## External check: METR's May 8 review

[Review of the February report's automated-R&D section](https://metr.org/blog/2026-05-08-rd-section-anthropic-risk-report-feb-2026-review/).

- METR found the report's evidence inadequate to establish its conclusion, criticizing survey design, interpretation, and a missing answer counted as negative.
- It specifically identified substantial acceleration **before full automation** as a missing possibility.
- Using additional evidence, METR nevertheless agreed with the narrow bottom line: very low catastrophe risk from Opus 4.6 or weaker Anthropic models automating R&D.

**Implication (analysis):** agreement on a conclusion does not establish that the reasoning was sound. Likewise, lack of full human replacement does not establish lack of consequential acceleration. This external criticism cuts against both an overconfident safety case and an overly binary singularity threshold.

## Physical-world counterevidence: Hong et al. (2026)

[Measuring Mid-2025 LLM-Assistance on Novice Performance in Biology](https://arxiv.org/abs/2602.16703), published February 18. The abstract reports a preregistered, investigator-blinded randomized trial of 153 participants conducted June–August 2025.

- No significant improvement in the primary laboratory-workflow completion endpoint: 5.2% with LLM access versus 6.6% with Internet access; P = 0.759.
- A post-hoc model estimated approximately 1.4× benefit for a typical task, with a 95% credible interval of 0.74–2.62. Intermediate-step performance showed some benefit.
- **Limit:** tested mid-2025 models and novice participants; a nonsignificant endpoint is not proof of zero uplift, nor a bound on future models or expert users.

**Relevance (analysis):** stronger support for demanding end-to-end evidence than either benchmark alarm or blanket reassurance. It tests part of the gap between knowing more and successfully acting in the physical world. It does not estimate extinction risk or resolve the long-run attack–defense balance.

## What is still not established

- A calibrated numerical chain from observed misbehavior to species extinction.
- The future net balance between broadly deployed defenses and increasingly capable attackers.
- The validity of a single threshold separating ordinary disruption from existential danger.

These are conclusions about the limits of the reviewed evidence, not proof that no such analysis exists elsewhere. For a fair response to the broader position, pair the reports with [Amodei's essay](amodei-adolescence.md). For observed conduct and defensive adaptation, see [the incident notes](anthropic-cyber-incidents.md).
