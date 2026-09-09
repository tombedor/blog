# Chrome: the draft's bug-fixing reference

[Chrome Security Team, “Stronger with every update: How we're making Chrome and the web safer in the AI Era,” 30 July 2026](https://blog.google/security/chrome-stronger-with-every-update/). Checked 2026-09-09; first-party operational report, not an independent evaluation.

- **Reported result:** 1,072 security bugs fixed across Chrome 149 and 150, more than the preceding 23 milestones combined. Locate “Fixing vulnerabilities.”
- **AI contribution:** models generate candidate fixes for most vulnerabilities, with fixing, critic, and test-writing workflows before developer review. Do not describe every fix as independently discovered and shipped by AI.
- **Scope:** the metric counts fixed security bugs, not reduced compromises, avoided harm, or attacker success rates.
- **Deployment matters:** “Releasing fixes” and “Applying updates” distinguish code changes from protection reaching users. Published fixes can help attackers target still-unpatched installations.
- **Inference:** strong evidence for increased defensive throughput; insufficient by itself to establish the net offense–defense balance or generalize Google's capabilities to small maintainers.
