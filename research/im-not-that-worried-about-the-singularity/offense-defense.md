# Attackers and defenders: reading notes

Researched 2026-09-09. Ordered by relevance to the draft, with foundational theory and escalation following the cyber sources.

## Garfinkel and Dafoe: abundance can change the balance

Ben Garfinkel and Allan Dafoe, [“Artificial Intelligence, Foresight, and the Offense-Defense Balance” (19 December 2019)](https://warontherocks.com/artificial-intelligence-foresight-and-the-offense-defense-balance/), especially “How Numbers Matter.” This is the authors' accessible account of their linked journal paper, *How does the offense-defense balance scale?*

- They separate novel capabilities from quantitative expansion of existing capabilities. Their model shows how expansion on both sides can favor offense first, defense later.
- In the software example, more discovery initially helps attackers find gaps defenders missed. At sufficiently exhaustive coverage, defenders could remove the available vulnerabilities.
- Fit: directly develops the draft's “intelligence abundant” mechanism, including tools shared by both sides.
- Caveat: the favorable endpoint is a model result. Continuously changing software, newly introduced vulnerabilities, and deployment delays can prevent practical saturation. Equal tool access alone does not locate us on the curve.

## Shevlane and Dafoe: the strongest match for “one patch defeats many attackers”

Toby Shevlane and Allan Dafoe, [“The Offense-Defense Balance of Scientific Knowledge: Does Publishing AI Research Reduce Misuse?” (AIES 2020)](https://www.aies-conference.com/2020/wp-content/papers/117.pdf), §§4–6, especially printed pp. 3–5.

- The authors distinguish whether a defense exists, whether it is practical to deploy, and whether attackers would obtain the capability anyway.
- Software is a favorable case: a fix may fully close a particular vulnerability and propagate widely; a centrally operated website can apply it immediately.
- Their warning is highly relevant to the draft's broader scenarios: physical and social vulnerabilities can be much harder to remedy. Voice impersonation exploits a useful human trust practice, not simply a bad line of code.
- Consequently, the draft's patching argument is strong for deployed fixes to specific software flaws, but cannot automatically cover fraud, persuasion, or every AI misuse.

## Schneier: an explicit ally for defensive optimism

Bruce Schneier, [“Artificial Intelligence and the Attack/Defense Balance” (*IEEE Security & Privacy*, March/April 2018)](https://www.schneier.com/essays/archives/2018/03/artificial_intellige.html).

- He argues that AI could relieve human limitations in security and combine reasoning with machine speed and scale. Both sides benefit, but defenders could benefit disproportionately.
- Useful as a clearly attributed expert argument, not a measured result or guarantee.
- His own caveat is that AI may introduce unforeseen asymmetries. The essay does not establish that defensive resources automatically track asset value.

## Andrew Lohn: a modern counterweight to a single cyber verdict

Andrew J. Lohn, [“The Impact of AI on the Cyber Offense-Defense Balance and the Character of Cyber Conflict” (2025)](https://arxiv.org/abs/2504.13371); [full text](https://arxiv.org/html/2504.13371v1), particularly §§8–9.

- Reviews nine proposed offensive advantages, nine defensive advantages, and broader characteristics of cyber conflict, deriving 44 possible AI effects.
- His conclusion is that the domain is too varied for a single verdict. This is a structured analysis, not an observed net attack/defense score.
- Useful distinctions include tactical speed versus campaign organization, changes to the digital environment, and common failures shared by many systems.

## Jervis: two different dimensions

Robert Jervis, [“Cooperation Under the Security Dilemma” (*World Politics* 30(2), January 1978, pp. 167–214)](https://www.sfu.ca/~kawasaki/Jervis%20Cooperation.pdf), especially pp. 186–214 and “Four Worlds.”

- Dimension one: relative advantage of taking territory versus holding it. Dimension two: whether actors can distinguish defensive preparations from offensive ones.
- Even states seeking security can threaten each other. Defense advantage and recognizable defensive postures make cooperation easier; offense advantage and ambiguity make it harder.
- Application to the draft is an analogy: sharing software tools does not resolve how intentions are perceived. A vulnerability-research capability can look threatening even when described as defensive.
- Attacking a target is not synonymous with strategic offense: a defending army also conducts strikes. Cheap destruction of an expensive platform does not by itself establish an advantage in conquest.

## SIPRI: escalation can change without a hacked launch button

Vladislav Chernavskikh and Jules Palayer, [*Impact of Military Artificial Intelligence on Nuclear Escalation Risk* (June 2025)](https://www.sipri.org/publications/2025/sipri-insights-peace-and-security/impact-military-artificial-intelligence-nuclear-escalation-risk).

- Identifies compressed decision timelines, opaque decision support, and threats to surviving retaliatory forces as possible escalation channels—even from AI outside nuclear weapon systems.
- Direct challenge to the draft's inference that existing cyber conflict makes AI-assisted conflict strategically equivalent. Changes in scale, confidence, and time for correction can matter without a new category of attack.
- This identifies mechanisms, not a numerical estimate of additional war risk.

## Claims the literature does not settle

The following are research inferences and questions, rather than established conclusions of any single source:

- **“Valuable asset → adequate defense budget.”** Owner incentives need not cover harm to users, dependent organizations, or society. Software libraries and small suppliers can matter greatly without receiving proportional security funding.
- **“Patch → every attacker defeated.”** A deployed fix can block exploitation of that flaw in that deployment. It does not undo stolen credentials, remove other entry points, or repair unupdated copies elsewhere.
- **“Same model → same capability.”** Context, access, integration, compute allocation, and operating practices can differ.
- **The relevant empirical test:** compare successful compromise and loss rates, exposure duration, remediation coverage, and changing attack volume. More bugs found or more attacks attempted alone cannot determine the balance.

The draft's contemplated asset-value graph is therefore a hypothesis about incentives. It is not yet an evidence-backed curve.
