# Source Note: Law, Political/Commercial Differences, and Foreign Influence

**Status date:** October 16, 2026. **Not legal advice.** Federal rules are summarized at a reporting level; state law can be stricter and changes quickly.

## Why Political and Commercial Messages Are Treated Differently

Three overlapping reasons:

1. **Statutory scope:** CAN-SPAM and the FTC Telemarketing Sales Rule are principally commercial-consumer laws. Pure political advocacy often falls outside the defined activity rather than receiving an express blanket immunity.
2. **Constitutional risk:** political speech receives the strongest First Amendment protection. Content-based political restrictions face more difficulty than content-neutral time/place/manner or privacy rules.
3. **Different regulatory goal:** campaign-finance law emphasizes sponsor attribution and spending; consumer law emphasizes consent, deception, and the right to stop solicitations. A political message may therefore require “paid for by” disclosure without requiring opt-in consent.

The result is a patchwork by **channel + technology + speaker + content + jurisdiction**, not one political-spam rule.

For the fuller hypothesis test—including postal subsidies, broadcast access/lowest-unit pricing, and counterexamples—see [preferential-treatment.md](./preferential-treatment.md).

## Email: CAN-SPAM vs. Campaign Disclaimer Law

### Commercial

- CAN-SPAM applies almost exclusively to “commercial electronic mail messages.” The FTC determines primary purpose by how a recipient would reasonably interpret the subject line and body.
- Covered messages need accurate routing/subject information, a physical postal address, clear opt-out, and prompt honoring of opt-outs.
- FTC rule and guide:
  - https://www.ftc.gov/legal-library/browse/rules/can-spam-rule
  - https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business

### Political

- A pure candidate, party, or issue-advocacy email is generally noncommercial and outside the core CAN-SPAM regime.
- Federal political committees must include a disclaimer on more than 500 substantially similar email communications. This identifies the payer/authorizer; it does not create a general consent requirement.
  - https://www.fec.gov/help-candidates-and-committees/advertising-and-disclaimers/
- Mixed-purpose email is fact-dependent. A political wrapper does not necessarily immunize a message whose primary purpose is selling a product or service.

## Calls and the National Do Not Call Registry

### Commercial

- The Telemarketing Sales Rule defines telemarketing around inducing purchases of goods/services or charitable contributions.
- The National Do Not Call Registry restricts covered sales calls and the TSR contains additional deception, time, caller-ID, and entity-specific opt-out rules.

### Political

- FTC: “Political solicitations are not covered by the TSR at all” because they are not within its definition of telemarketing.
  - https://www.ftc.gov/business-guidance/resources/qa-telemarketers-sellers-about-dnc-provisions-tsr-0
- Political calls are therefore outside the National Do Not Call Registry, but may remain subject to the TCPA, FCC rules, state robocall rules, sponsor-disclosure law, fraud, harassment, or voter-intimidation law.

## Robocalls and Robotexts: TCPA Technology Rules

### Cellphones

- 47 U.S.C. §227 and 47 CFR §64.1200 generally require prior express consent for calls to wireless numbers using an automatic telephone dialing system or artificial/prerecorded voice, subject to exemptions.
- When the message is telemarketing/advertising, prior express **written** consent is generally required; political/noncommercial calls ordinarily need prior express consent but not the heightened written form.
- AI-generated voices are “artificial” voices under the FCC’s 2024 declaratory ruling.
  - Rule: https://www.law.cornell.edu/cfr/text/47/64.1200
  - FCC 24-84 discussion: https://docs.fcc.gov/public/attachments/FCC-24-84A1_Rcd.pdf

### Residential landlines

- Noncommercial artificial/prerecorded calls may be made without prior consent, but current rules cap them at three calls in any consecutive 30-day period and require identification plus an automated opt-out.
- Telemarketing prerecorded calls face tighter consent requirements.

### Texts and the *Duguid* opening

- FCC treats covered robotexts as calls.
- In *Facebook v. Duguid* (2021), the Supreme Court held that an ATDS must use a random or sequential number generator to store or produce numbers. Systems dialing a preexisting list often do not qualify.
  - https://www.supremecourt.gov/opinions/20pdf/19-511_p86b.pdf
- “Peer-to-peer” systems also historically relied on a person clicking send for each message. That is not a freestanding political exemption; it is an argument that the chosen equipment/workflow does not trigger the ATDS provision.
- Artificial/prerecorded **voice** restrictions remain separate: avoiding ATDS status does not authorize an AI-voice call to a cellphone without consent.

### Live 2026 proceeding

- On Sept. 4, 2026, the FCC Consumer and Governmental Affairs Bureau sought comment on Club for Growth’s expedited request for a waiver/exemption permitting some noncommercial political artificial/prerecorded voice calls, including AI-generated voices, to wireless numbers without prior consent.
- As of Oct. 16, 2026, this is a pending petition, not law.
  - FCC Public Notice DA-26-940 mirror: https://www.publicnow.com/view/30DB9526FA4D29646D051E134C0A51434783B474
  - Petition docket/document: https://www.fcc.gov/ecfs/document/26110073991/1
  - AP report: https://apnews.com/article/b97fb6e8d06704dc043556dba25de548

## Election and Sponsor Disclosures

- Federal political committees must carry disclaimers on public communications, mass mailings (>500 substantially similar pieces within 30 days), phone banks (>500 substantially similar calls within 30 days), websites, and bulk email (>500 substantially similar emails).
- Rules also reach paid/promoted communications on another person’s website, device, app, or advertising platform. Application to particular conversational messages depends on payer, speaker, content, and medium.
  - https://www.fec.gov/help-candidates-and-committees/advertising-and-disclaimers/
- State campaign-finance laws may separately require sponsor/top-funder disclosures in texts and prerecorded calls.
  - NCSL overview: https://www.ncsl.org/elections-and-campaigns/political-advertisement-disclaimers

## AI and Bot Disclosure

### Federal

- No generally applicable federal law requires every text-only LLM to announce “I am an AI.”
- The FCC’s AI ruling concerns generated **voice** under the TCPA. Its 2024 proposal contemplated further AI disclosures but a proposal is not itself a final nationwide chatbot rule.
- General fraud, impersonation, voter intimidation/suppression, campaign disclaimer, and platform rules may apply regardless of whether AI was used.

### States

- NCSL reported 31 states with political synthetic-media/deepfake laws as of Oct. 13, 2026. Most use disclosure; some prohibit defined deceptive media in an election window. Scope, exceptions, enforcement, and constitutional status differ.
  - https://www.ncsl.org/elections-and-campaigns/artificial-intelligence-ai-in-elections-and-campaigns
- California Business & Professions Code §§17940–17943 (SB 1001) targets a person using a bot online with intent to mislead about artificial identity in order to knowingly deceive someone about the communication’s content to incentivize a commercial transaction or influence a vote in an election; clear disclosure avoids the prohibition.
  - Bill text: https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180SB1001
- Important limits for issue-advocacy chatbots: “influence a vote in an election” is narrower than influence opinion about public policy, and whether one-to-one SMS is “online” under the statute is not cleanly resolved in the statutory text.

## Foreign Actors

### Election spending and decision-making: FECA

- Foreign nationals—including foreign governments, parties, corporations, and most nonresident individuals—may not make contributions, expenditures, independent expenditures, or disbursements in connection with federal, state, or local elections.
- They may not direct or participate in another entity’s election-related decision-making; knowingly providing substantial assistance is also prohibited.
- The FEC distinguishes issue advocacy: foreign nationals may speak and spend on issues when the activity is not tied to electing/defeating candidates.
  - https://www.fec.gov/updates/foreign-nationals/

### Foreign-principal transparency: FARA

- FARA can require an agent acting under a foreign principal’s direction/control to register when engaging in U.S. political activities or acting as a publicity agent, information-service employee, or political consultant.
- “Informational materials” disseminated for a foreign principal must carry a conspicuous statement identifying registrant and principal; materials generally must be filed with DOJ.
- FARA regulates transparency, not message content.
  - FAQ: https://www.justice.gov/nsd-fara/frequently-asked-questions
  - Statutory index: https://www.justice.gov/nsd-fara/fara-index-and-act
- Issue advocacy can therefore be lawful under FECA but still require FARA registration/labeling when agency and statutory conditions are met.

### Historical development

- 1793: French minister Citizen Genêt appealed to American public support against Washington’s neutrality policy—an early foreign bypass of official channels, not literal mass spam.
  - https://history.state.gov/milestones/1784-1800/citizen-genet
- World War I: German-backed speakers, publications, and information services tried to shape U.S. neutrality debates.
  - https://history.state.gov/historicaldocuments/frus1915Supp/d1314
- 1938: Congress enacted FARA amid Nazi and other foreign propaganda; DOJ says the pre-1966 statute focused on propagandists.
  - https://www.justice.gov/archives/usam/criminal-resource-manual-2062-foreign-agents-registration-act-enforcement
- 2016: Russia’s IRA used fake American identities, social accounts, paid ads, and events; defendants allegedly failed to register under FARA and report expenditures to the FEC.
  - https://www.justice.gov/archives/sco/file/1035477/dl
- 2024: ODNI observed Russia and Iran using generative AI to accelerate influence production but did not assess it had revolutionized operations.
  - https://www.dni.gov/files/FMIC/documents/ODNI-Election-Security-Update-20240923.pdf

## A Clean Way to State the Legal Difference

> Commercial spam law usually asks whether a seller may intrude on a consumer and how the consumer can stop it. Political communication law more often asks who paid, whether the delivery technology invades protected privacy, whether the content deceives or suppresses voters, and whether a foreign principal is hidden.

That distinction explains why a political email may legally arrive without an unsubscribe right under CAN-SPAM, while an AI-voice political call to the same person’s cellphone can still violate the TCPA.

## Reporting Caveats

- Do not infer legality from delivery. Carriers and platforms impose contractual/industry rules beyond federal law, and unlawful messages are frequently delivered.
- Do not describe P2P texting as categorically “manual” or legal. Actual system design and operator conduct matter.
- Do not collapse issue advocacy into election advocacy. FECA, FARA, California’s bot law, and state campaign rules draw different boundaries.
- State law is a fast-moving patchwork and several AI-election laws face First Amendment challenges. Recheck before publication.
