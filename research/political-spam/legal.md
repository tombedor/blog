# Source Note: Legality of AI Cold-Texting Without LLM Disclosure

**Not legal advice.** This note identifies legal hooks and uncertainty for reporting/editing.

## Useful Artifacts

- TCPA statute, 47 U.S.C. § 227: https://www.law.cornell.edu/uscode/text/47/227
- FCC rule, 47 CFR § 64.1200: https://www.law.cornell.edu/cfr/text/47/64.1200
- FCC AI robocall/robotext NPRM text, FCC 24-84A1: https://docs.fcc.gov/public/attachments/FCC-24-84A1.txt
- FCC press release on proposed AI-generated call/text rules: https://docs.fcc.gov/public/attachments/DOC-404567A1.pdf
- FCC AI voice declaratory ruling, FCC 24-17A1: https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf
- Supreme Court ATDS narrowing, `Facebook v. Duguid`: https://www.supremecourt.gov/opinions/20pdf/19-511_p86b.pdf
- California SB 1001 bot-disclosure law text: https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180SB1001
- California AG AI legal advisory: https://oag.ca.gov/system/files/attachments/press-docs/Legal%20Advisory%20-%20Application%20of%20Existing%20CA%20Laws%20to%20Artificial%20Intelligence.pdf
- FARA labeling statute, 22 U.S.C. § 614: https://www.law.cornell.edu/uscode/text/22/614

## Federal TCPA / FCC

- The TCPA bars calls to wireless numbers using an automatic telephone dialing system, artificial voice, or prerecorded voice without prior express consent, absent an emergency purpose or exemption.
- FCC rules implement the same restriction for wireless numbers and distinguish stricter written-consent rules for telemarketing/advertising.
- FCC and courts generally treat SMS texts as "calls" for TCPA purposes when covered technology is used.
- `Facebook v. Duguid` narrowed "automatic telephone dialing system" to equipment that stores or produces telephone numbers using a random or sequential number generator and dials them. That makes liability fact-dependent: list-based texting platforms may fall outside ATDS unless another covered technology is used.
- The FCC has confirmed AI voice cloning/artificial or prerecorded voice calls are covered by the TCPA. That voice ruling is less directly applicable to text-only LLM chat unless the text is autodialed or otherwise covered.
- In FCC 24-84, the FCC proposed rules requiring disclosure when obtaining consent for AI-generated calls/texts and disclosure on AI-generated voice calls. The proposal is strong evidence of regulatory direction, but by itself is not a final nationwide rule requiring every SMS chatbot to announce "I am an LLM."

## FARA

- FARA requires registered foreign agents transmitting informational materials in the United States for a foreign principal to include a conspicuous statement that the material is distributed by the agent on behalf of the foreign principal and that additional DOJ information is available.
- Allyvia pages checked include the Clock Tower X / State of Israel disclosure.
- The transcript itself identifies "Friends for Peace" and links to Allyvia, but the screenshots do not show the Clock Tower X / State of Israel disclosure in the SMS body.
- Open question: whether the SMS conversation itself is an "informational material" transmission requiring the FARA statement in-message, or whether linking to a disclosed site is sufficient. The conservative legal/compliance view is that the message should disclose the foreign-principal sponsorship directly.

## California Bot Disclosure

- California SB 1001 makes it unlawful to use a bot to communicate or interact with a person in California online with intent to mislead about artificial identity for the purpose of knowingly deceiving the person about communication content to incentivize a commercial transaction or influence a vote in an election.
- The law avoids liability if the bot is clearly and conspicuously disclosed.
- Fit issues for this transcript:
  - SMS may or may not qualify as "online" under the statute's definition of public-facing websites/apps/digital applications.
  - The transcript is foreign-policy advocacy, not obviously an attempt to influence a vote in a specific election.
  - Applicability depends on recipient location; user is estimated U.S., but not necessarily California.
- Even if California law does not squarely apply, it is a useful benchmark for the disclosure norm: if a bot is used to influence political beliefs, hiding its artificial identity is legally risky in some jurisdictions.

## Bottom Line Legal Read

- Cold political SMS is not per se illegal just because an LLM is involved.
- It can become unlawful if sent with covered automated dialing/artificial voice technology without required consent, if opt-out rules are not honored, if caller ID/sender identity is spoofed deceptively, if FARA-required sponsorship labeling is missing, or if a state bot-disclosure law applies.
- As of the sources checked, there is not a clean federal rule saying "all LLM text agents must disclose they are LLMs before chatting." The legal risk comes from the surrounding consent, automation, foreign-agent, consumer/deception, election, and state bot-disclosure regimes.
