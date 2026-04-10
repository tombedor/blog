# Source Notes: Anthropic Red-Team Writeup

Source: https://red.anthropic.com/2026/mythos-preview/  
Date: April 7, 2026

## Key Claims

- Anthropic says Mythos Preview can identify and exploit zero-day vulnerabilities in every major operating system and browser when directed by a user.
- Anthropic says **over 99%** of vulnerabilities it found were not yet patched, limiting public disclosure.
- Mythos vs Opus 4.6 on Firefox 147 exploit task:
  - Opus 4.6: working JavaScript shell exploits **2 times out of several hundred attempts**.
  - Mythos Preview: **181** working exploits and **29** additional register-control cases.
- Internal OSS-Fuzz-style corpus:
  - Sonnet 4.6 and Opus 4.6: 150-175 tier-1 crashes, about 100 tier-2 crashes, and one tier-3 crash each.
  - Mythos: **595** tier-1/tier-2 crashes, some tier-3/tier-4 crashes, and **10 tier-5** full control-flow hijacks on fully patched targets.
- Public examples include:
  - OpenBSD 27-year-old bug, now patched.
  - FreeBSD NFS unauthenticated root RCE, CVE-2026-4747.
  - Browser exploit chains and JIT heap sprays, mostly withheld.
  - Linux kernel N-day privilege-escalation exploits.
  - Logic bugs, cryptography-library weaknesses, and web application auth bypasses, mostly withheld.

## Caveats

- Many flagship examples are not independently checkable yet due to coordinated disclosure.
- The writeup mixes real-world zero-day claims with safer N-day demonstrations; post should distinguish them.
- "Bug" vs "exploit" skepticism needs precision: Anthropic explicitly claims both vulnerability discovery and working PoC exploit generation, but some named zero-day findings are better described as bugs / potential vulnerabilities. Example: Anthropic says the FFmpeg H.264 bug was a heap out-of-bounds write and that turning it into a functioning exploit would be challenging.

## Pull Quotes

- "watershed moment for security"
- "over 99% of the vulnerabilities we've found have not yet been patched"
- "we do not plan to make Claude Mythos Preview generally available"
