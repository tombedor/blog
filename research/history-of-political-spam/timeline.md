# Source Note: Direct Political Contact from Telephone to AI SMS

## Scope Test

Count a communication when:

1. the sender selects a telephone number, email address, or comparable private endpoint;
2. the message is delivered to that endpoint rather than placed in shared media; and
3. substantially similar outreach is attempted at bulk scale without a recipient requesting that particular message.

This includes calls, robocalls, bulk email, P2P texts, and chatbot texts. It excludes TV/radio spots, newspaper ads, public social posts, and promoted feed ads. A social-media DM can qualify; a public bot post does not.

**Why “directed” is not the same as “targeted”:** a TV spot can target a demographic or media market, but it is still broadcast. Direct contact uses a record representing an individual or household and creates an attempted delivery to that record.

## Prehistory: Addressed Mail

Addressed political mail is genuinely direct-to-voter and supplies much of the later business model. It is treated as prehistory here only to keep the main story about electronic private-channel intrusion.

- The National Postal Museum has campaign-mail examples at least as early as an 1864 Lincoln envelope.
  - https://postalmuseum.si.edu/what-is-election-mail-and-its-history-in-the-us
- Presidential direct mail expanded in the 1950s–1970s. Dennis Johnson identifies Eisenhower, Goldwater, and McGovern and the work of Richard Viguerie, Morris Dees, and Roger Craver.
  - https://academic.oup.com/book/27768/chapter-abstract/198005508
- Nadine Moriyama shows how computerized lists and millions of unsolicited letters created a political movement’s infrastructure, not merely campaign advertising.
  - https://www.jstor.org/stable/j.ctv2n4w5r7

**Inherited by digital channels:** list ownership/rental, segmentation, urgent emotional copy, measurable donations, iterative testing, and the permanent campaign.

Pamphlets, partisan newspapers, and subsidized newspaper postage remain useful evidence for political communication’s privileged civic status, but they are mass publishing rather than individual direct contact.

## 1. Live Telephone Banks

- Live calls combined a voter record with synchronous access inside the home. Operators could identify support, answer questions, update voter files, recruit volunteers, solicit donations, or turn out a supporter.
- Computerized voter files made phone work increasingly selective. A 1984 Republican effort used a national computer-assisted program to locate and register likely supporters.
  - https://www.washingtonpost.com/archive/politics/1984/04/22/high-tech-impersonal-computer-net-is-snaring-prospective-republicans/8e57155c-4224-4661-97d5-25cef8c582b9/
- In 1986, a Republican program planned approximately 11 million targeted calls. Paid operators earned $5–$6 per hour and were instructed to keep calls around a minute.
  - https://www.washingtonpost.com/archive/politics/1986/10/21/hired-hands-are-busy-dialing-as-gop-calls-for-big-turnout/5db45c13-debb-4fbe-85c2-d11de931d454/

**New affordance:** individualized, immediate, two-way contact—but every active conversation still consumed a person’s time.

## 2. Robocalls

- Prerecorded calls detached the political voice from the caller. The 1986 Republican program included roughly two million automated messages recorded by President Reagan.
- By the 2006 election, Pew found 64% of voters had received recorded political calls; 71% received direct mail. In surveyed 2008 primary states, 44% reported a campaign robocall.
  - https://www.pewresearch.org/internet/2006/12/20/robo-calls-in-the-2006-campaign/
  - https://www.pewresearch.org/politics/2008/03/27/section-3-voters-targeted-by-robo-calls/
- CRS reported vendors charging approximately one to two cents per automated call in 2008, while warning that public spending data were weak.
  - https://www.everycrsreport.com/reports/RL34361.html

**New affordance:** the sender retained the interruptive intimacy of a ringing telephone while removing marginal speaking labor. The price was loss of dialogue: the recording could persuade or instruct but not listen.

## 3. Bulk Political Email

- Seth Grossman dates the first widespread U.S. election use of unsolicited political bulk email to 1998.
  - https://btlj.org/data/articles2015/vol19/19_4/19-berkeley-tech-l-j-FM-1157-1575.pdf
- In 2003, 74% of email users told Pew that unsolicited political or advocacy email was spam.
  - https://www.pewresearch.org/internet/2005/03/07/the-politics-of-spam/
- By 2010, 31% of registered voters reported receiving political email, compared with 14% in 2006.
  - https://www.pewresearch.org/politics/2010/11/11/section-4-campaign-outreach/
- ProPublica’s 2012 “Message Machine” captured how campaigns sent many tested and targeted variants.
  - https://projects.propublica.org/emails/

**New affordance:** national delivery at nearly zero marginal cost, continuous fundraising, rapid testing, personalization, forwarding, and asynchronous replies.

**Limitation:** filtering and inbox saturation made the channel cheap but increasingly ignorable. Sender reputation and platform enforcement became private regulation.

## 4. P2P Political SMS

- SMS moved political outreach into a less saturated, notification-driven, and socially intimate channel.
- By 2018, TIME observed roughly a dozen volunteers send 10,000 messages in under an hour.
  - https://time.com/5432309/politician-campaigns-midterm-election-text-messages/
- One major progressive vendor reported 475 million texts in 2020. Treat industry-wide billion-message estimates cautiously because methodologies are rarely auditable.
  - https://www.techforcampaigns.org/impact/2020-texting-analysis
- Published 2026 campaign-vendor rates range around 1.5–3.5 cents per SMS segment depending on volume.
  - https://gotv.com/texting

**New affordance:** email-like scale in a channel that still felt like person-to-person communication. A nominal human click and volunteer reply workflow helped campaigns claim P2P systems were not traditional autodialers.

**Legal hinge:** *Facebook v. Duguid* held that a TCPA autodialer must use a random or sequential number generator. Campaign systems usually dial known voter/contact lists. This is an equipment-definition issue, not blanket permission for political texts.
  - https://www.supremecourt.gov/opinions/20pdf/19-511_p86b.pdf

## 5. AI-Powered SMS

An LLM can occupy the reply side of a P2P workflow:

- interpret free-form replies rather than route keywords;
- personalize arguments using conversation history or voter data;
- translate and change register;
- answer objections and ask follow-up questions;
- maintain many concurrent conversations; and
- delay or selectively frame disclosure of the actual sponsor or foreign principal.

ODNI reported Russian and Iranian use of generative AI in 2024 influence operations but assessed that it accelerated existing work rather than revolutionized it. OpenAI reported model use for drafting, translation, account biographies, research, and code debugging without meaningful audience expansion in the operations it disrupted.

- https://www.dni.gov/files/FMIC/documents/ODNI-Election-Security-Update-20240923.pdf
- https://openai.com/index/disrupting-deceptive-uses-of-ai-by-covert-influence-operations/

**Evidence caution:** these sources do not establish mass foreign LLM-to-voter SMS deployment. The local “Emma” transcript exhibits adaptive chatbot-like behavior but cannot by itself establish the underlying model, degree of human supervision, sponsor, or scale.

**New affordance:** robocall economics with live-caller adaptability. The transition is from automating the *delivery of a message* to automating the *conversation*.

## Excluded but Relevant Comparison Cases

- **TV/radio advertising:** expensive mass reach, but no individually addressed delivery and no reply loop. Lowest-unit-rate rules remain evidence of political preference, not part of the direct-spam lineage.
- **Public social bots and paid social ads:** targeted and potentially deceptive, but distributed through a public/shared feed. Include only when the operation sends direct messages to selected recipients.
- **AI voice:** technologically adjacent and legally important because the FCC treats generated voices as artificial voices. It belongs with robocalls, not the SMS-centered endpoint of this post.

## Recurring Cycle

1. Campaigns obtain a better list of private endpoints.
2. A channel’s relative novelty produces attention and trust.
3. Software lowers the labor required per attempted contact.
4. Volume rises until recipients filter, ignore, block, or demand regulation.
5. Law regulates a defined technology or commercial purpose.
6. Campaigns adopt a workflow outside that definition or migrate to a more intimate channel.
