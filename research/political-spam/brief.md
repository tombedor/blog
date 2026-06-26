# Research Brief: Friends for Peace / Allyvia and AI Political Texting

**Scope:** Identify who "Friends for Peace" / Allyvia appears to be, and whether an LLM can legally cold-text people and converse without AI disclosure.

**Bottom line:**
- "Friends for Peace" appears to be a chat-facing identity pointing recipients to Allyvia; Allyvia publicly discloses that its material is distributed by Clock Tower X LLC on behalf of the State of Israel.
- DOJ/FARA filings for Clock Tower X describe a State of Israel-backed U.S. strategic communications/media campaign with audience targeting, Gen Z content, paid media, SEO, and "GPT framing" work.
- There is no simple federal rule that all SMS LLM agents must self-identify as LLMs, but the campaign has multiple legal risk hooks: TCPA consent/automation, FARA sponsorship labeling, opt-out compliance, deception, and state bot-disclosure laws.

---

## Who Is Behind Allyvia?

**Claim / question:** Is Allyvia an ordinary advocacy group, or a disclosed foreign-principal campaign artifact?

**Finding:** Allyvia is a pro-U.S.-Israel advocacy site whose pages disclose distribution by Clock Tower X LLC on behalf of the State of Israel.

**Evidence:**
- Allyvia's site frames itself as U.S.-Israel alliance advocacy: security, prosperity, shared values, Israel as democratic ally.
- Footer disclosure on pages checked: material distributed by Clock Tower X LLC on behalf of the State of Israel.
- FARA Exhibit A/B lists Clock Tower X LLC, registration no. 7649, with Havas Media Network/Germany as foreign principal and Havas supervised by the State of Israel.

**Sources / artifacts:**
- [Allyvia home page](https://allyvia.org/)
- [Allyvia alliance page](https://allyvia.org/allyvia/alliance)
- [DOJ/FARA Clock Tower X Exhibit A/B](https://efile.fara.gov/docs/7649-Exhibit-AB-20250918-1.pdf)
- [source note: Allyvia / Clock Tower](allyvia-clock-tower.md)

**Pull quotes:**
- "This material is distributed by Clock Tower X LLC on behalf of the State of Israel." (Allyvia footer)
- "Registrant shall provide strategic communications, planning, and media services..." (FARA Exhibit B)

**Caveats / counterpoints:**
- I found no separate public artifact proving "Friends for Peace" is a distinct incorporated/legal entity; the transcript ties it to Allyvia.

---

## What Is the Campaign?

**Claim / question:** What does the FARA filing say the campaign is doing?

**Finding:** The filing describes a nationwide U.S. influence/media campaign, not merely a static information website.

**Evidence:**
- Contract/SOW says the work supports the State of Israel's U.S. campaign to combat antisemitism.
- Scope includes cultural/audience/sentiment research, polling, digital listening, audience segmentation, influence mapping, narrative framework, and messaging.
- Distribution targets include 100 root creative assets/month, 5,000 variants/month, 80% Gen Z-tailored content, Salem Media Network integration, and at least 50 million paid impressions/month.
- Search/language work includes MarketBrew AI SEO and "deployment of websites and content to deliver GPT framing results on GPT conversations."

**Sources / artifacts:**
- [DOJ/FARA Clock Tower X Exhibit A/B](https://efile.fara.gov/docs/7649-Exhibit-AB-20250918-1.pdf)
- [source note: Allyvia / Clock Tower](allyvia-clock-tower.md)

**Caveats / counterpoints:**
- The filing does not, by itself, prove the SMS transcript was sent under the same SOW. The shared Allyvia destination and disclosure make it highly relevant context.

---

## What the Texts Disclosed

**Claim / question:** Did the chat disclose sponsorship and AI identity?

**Finding:** The chat disclosed "Friends for Peace" and Allyvia, but the screenshots show no direct AI/LLM disclosure and no in-message Clock Tower X / State of Israel disclosure.

**Evidence:**
- Sender: "Hi, I'm Emma..."
- Sender later: "I'm with Friends for Peace..."
- Sender links to `https://allyvia.org`.
- Transcript includes "Stop2End" opt-out language.
- No screenshot shows "AI," "LLM," "bot," "automated," "Clock Tower X," or "State of Israel."

**Sources / artifacts:**
- [chat screenshot 01](../../static/diagrams/political-spam/political-spam-chat-01.png)
- [chat screenshot 02](../../static/diagrams/political-spam/political-spam-chat-02.png)
- [chat screenshot 03](../../static/diagrams/political-spam/political-spam-chat-03.png)
- [chat screenshot 04](../../static/diagrams/political-spam/political-spam-chat-04.png)
- [chat screenshot 05](../../static/diagrams/political-spam/political-spam-chat-05.png)
- [chat screenshot 06](../../static/diagrams/political-spam/political-spam-chat-06.png)
- [chat screenshot 07](../../static/diagrams/political-spam/political-spam-chat-07.png)
- [source note: transcript OCR](transcript-ocr.md)

**Caveats / counterpoints:**
- Bot/LLM use is inferred from behavior unless another technical artifact confirms it.

---

## Legality of Cold LLM Texts

**Claim / question:** Is it legal to cold-text people with an LLM and converse without saying it is an LLM?

**Finding:** Not categorically illegal federally, but legally risky and fact-dependent; TCPA turns on consent and covered technology, FARA turns on sponsorship labeling, and some state laws require bot disclosure in political/election contexts.

**Evidence:**
- TCPA prohibits covered autodialed/artificial/prerecorded calls to wireless numbers without prior express consent; FCC treats SMS as covered where the TCPA applies.
- `Facebook v. Duguid` narrowed ATDS, so a list-based texting platform is not automatically an ATDS unless it uses a random/sequential number generator.
- FCC has proposed AI-generated call/text disclosure rules, including disclosure when obtaining consent for AI-generated texts, but that proposal is not the same as an already-final blanket LLM disclosure rule.
- FARA requires registered foreign agents' informational materials to carry a conspicuous foreign-principal distribution statement.
- California's bot law requires disclosure for bots used online with intent to mislead about artificial identity to influence a vote in an election; fit to SMS foreign-policy advocacy is uncertain.

**Sources / artifacts:**
- [47 U.S.C. § 227](https://www.law.cornell.edu/uscode/text/47/227)
- [47 CFR § 64.1200](https://www.law.cornell.edu/cfr/text/47/64.1200)
- [FCC AI robocall/robotext NPRM text](https://docs.fcc.gov/public/attachments/FCC-24-84A1.txt)
- [FCC AI-generated calls/texts proposal press release](https://docs.fcc.gov/public/attachments/DOC-404567A1.pdf)
- [`Facebook v. Duguid`](https://www.supremecourt.gov/opinions/20pdf/19-511_p86b.pdf)
- [22 U.S.C. § 614 FARA labeling](https://www.law.cornell.edu/uscode/text/22/614)
- [California SB 1001 bot disclosure](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180SB1001)
- [source note: legal analysis](legal.md)

**Caveats / counterpoints:**
- Legality depends on facts not visible in the screenshots: recipient consent/source of number, texting vendor, dialing architecture, recipient state, opt-out handling, sender registration/disclaimer practice, and whether the SMS itself is treated as FARA informational material.

---

## Source Notes

- `transcript-ocr.md` — OCR from local chat screenshots and automation signals.
- `allyvia-clock-tower.md` — Allyvia page observations, FARA filing details, and campaign artifacts.
- `legal.md` — TCPA/FCC/FARA/state-law legal hooks and caveats.

## Open Questions

- What texting vendor/platform sent the messages, and did it use ATDS-covered technology?
- How did the sender obtain the recipient's phone number and consent, if any?
- Are the SMS scripts filed as FARA informational materials, and do they include the required sponsorship disclosure elsewhere?
- Is "Friends for Peace" registered or documented anywhere outside the chat script?
