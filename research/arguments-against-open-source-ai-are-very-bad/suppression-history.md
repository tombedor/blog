# Suppression History: Open Software Analogies

**Purpose:** Notes for the "open source software is difficult to suppress" section of `blog/arguments-against-open-source-ai-are-very-bad.md`.

## Takeaway

- Historical suppression attempts mostly work against **centralized actors**: companies, hosted services, app stores, domains, cloud providers, payment rails, trackers, and official-device use.
- They work poorly against **already-public artifacts**: source code, cryptographic keys, protocols, model weights, mirrors, forks, hashes, magnet links, and local execution.
- The right post analogy is not "regulation cannot matter"; it is "regulation usually migrates from banning the artifact to controlling chokepoints around it."

## Encryption Export Controls / PGP / Bernstein / Junger

**Why it matters:** Closest precedent for treating software publication as speech and for the practical difficulty of controlling dual-use code once it is publishable.

**Evidence:**
- U.S. export controls treated strong encryption software as controlled technology. Phil Zimmermann faced a criminal investigation after PGP spread internationally; MIT Press published `PGP Source Code and Internals` in book form, making the code available as printed speech.
- Bernstein v. DOJ challenged export rules applied to publishing encryption source code. EFF summarizes the case as affirming the right to publish encryption source code and striking down the challenged rules.
- Junger v. Daley added another appellate source-code-as-speech precedent in the Sixth Circuit.
- Current export-control practice still treats encryption specially, but published encryption source code is not subject to the same prior-approval structure.

**Sources:**
- [EFF: Bernstein v. U.S. Department of Justice](https://www.eff.org/cases/bernstein-v-us-dept-justice)
- [EFF: U.S. Export Controls and Published Encryption Source Code Explained](https://www.eff.org/deeplinks/2019/08/us-export-controls-and-published-encryption-source-code-explained)
- [Phil Zimmermann: PGP Source Code and Internals preface](https://philzimmermann.com/EN/essays/BookPreface.html)
- [ACLU Ohio: Junger v. Daley](https://www.acluohio.org/cases/junger-v-daley-209-f3d-481-6th-cir-2000/)

**Use in post:** "If you want to suppress AI weights, the crypto wars are the obvious precedent: the government can make publication legally painful, but it also runs directly into code-as-speech arguments and publication workarounds."

## DeCSS / DVD Circumvention Code

**Why it matters:** Legal suppression targeted not just infringing copies, but the code and links that enabled playback/circumvention.

**Evidence:**
- Movie studios sued 2600 Magazine under the DMCA to stop publication of DeCSS, software that bypassed DVD CSS encryption.
- After a preliminary injunction, 2600 removed DeCSS from its own site but kept linking to other sites hosting the code; court records describe a list approaching 500 linked sites by July 2000.
- The case is a clean example of legal pressure moving from artifacts to links, mirrors, and publishers.

**Sources:**
- [EFF: Unintended Consequences, 15 years under the DMCA](https://www.eff.org/pages/unintended-consequences-fifteen-years-under-dmca)
- [Harvard Cyberlaw: Universal v. Reimerdes district opinion](https://cyber.harvard.edu/openlaw/dvd/ny/trial/op.html)
- [Reporters Committee: court upholds prohibition against hyperlinks to decryption code](https://www.rcfp.org/court-upholds-prohibition-against-hyperlinks-decryption-code/)

**Use in post:** "The state can make hosting the thing risky; that is not the same as making the thing go away."

## AACS / HD-DVD Processing Key

**Why it matters:** The artifact being suppressed was not a program, but a short hexadecimal key. Suppression produced mass reposting and creative encodings.

**Evidence:**
- In 2007, AACS LA and media companies sent DMCA takedown demands to sites publishing an HD-DVD/Blu-ray processing key.
- Digg removed posts and accounts containing the key, then reversed course after users flooded the site with reposts.
- The key spread through blogs, images, poems, songs, merchandise, and other encodings, turning the takedown into a durable Streisand-effect example.

**Sources:**
- [EFF: 09 F9 legal primer](https://www.eff.org/deeplinks/2007/05/09-f9-legal-primer)
- [Princeton CITP: Digg Users Revolt Over AACS Key](https://blog.citp.princeton.edu/2007/05/02/digg-users-revolt-over-aacs-key/)
- [Stanford CS181 notes: HD-DVD key impact](https://cs.stanford.edu/people/eroberts/courses/cs181/projects/2006-07/anonymity-and-plurality/hddvd-impact.html)

**Use in post:** "If a 128-bit number can become a protest symbol, the chance of cleanly suppressing multi-gigabyte model weights after release is not great."

## Felten / SDMI and ElcomSoft / Sklyarov

**Why it matters:** DMCA anti-circumvention pressure reached researchers and toolmakers, not just pirates.

**Evidence:**
- Princeton professor Edward Felten's team accepted SDMI's challenge to analyze music watermarking/security systems, then received threats from SDMI/RIAA before publishing their findings.
- EFF sued so the researchers could publish without fear of DMCA liability.
- Dmitry Sklyarov was arrested in Las Vegas in 2001 after presenting on weaknesses in Adobe eBook encryption; EFF says he was charged for trafficking in software that could circumvent technological protections.
- ElcomSoft was acquitted in 2002, but the arrest itself became a major example of the DMCA's chilling effect.

**Sources:**
- [EFF: Felten et al. v. RIAA et al.](https://www.eff.org/cases/felten-et-al-v-riaa-et-al)
- [EFF: Princeton scientists sue over squelched research](https://www.eff.org/press/releases/princeton-scientists-sue-over-squelched-research)
- [EFF: U.S. v. ElcomSoft / Sklyarov](https://www.eff.org/cases/us-v-elcomsoft-sklyarov)

**Use in post:** "Suppression can chill legitimate research even when it fails to erase the underlying technique."

## Napster / Grokster / LimeWire / BitTorrent

**Why it matters:** This is the clearest "software/service suppression can work, protocol suppression fails" family.

**Evidence:**
- Napster was vulnerable because it had a company and centralized index. The Ninth Circuit allowed contributory/vicarious liability theories to proceed and the service was effectively forced to change or shut down.
- Grokster created an inducement-liability rule: distributing a dual-use tool can create liability when the provider actively promotes infringement.
- LimeWire was shut down by injunction in 2010 after a long music-industry lawsuit.
- BitTorrent enforcement shifted toward trackers, search sites, domains, and hosts. The Pirate Bay faced raids, convictions, ISP blocks, and domain seizures, but the broader BitTorrent ecosystem adapted through replacement sites, proxies, magnet links, and DHT.

**Sources:**
- [Justia: A&M Records v. Napster](https://law.justia.com/cases/federal/appellate-courts/F3/239/1004/636120/)
- [Justia: MGM Studios v. Grokster](https://supreme.justia.com/cases/federal/us/545/913/)
- [Guardian: LimeWire shut down by federal court](https://www.theguardian.com/technology/2010/oct/27/limewire-shut-down)
- [Guardian: Swedish police raid sinks The Pirate Bay](https://www.theguardian.com/technology/2014/dec/10/swedish-police-raid-pirate-bay)
- [TorrentFreak: The Pirate Bay remains resilient](https://torrentfreak.com/the-pirate-bay-remains-resilient-20-years-after-the-raid/)

**Use in post:** "Regulators can kill Napster. They cannot kill file sharing."

## Tor / VPNs / Circumvention Tools

**Why it matters:** Censorship circumvention is a live example of governments trying to suppress open tools through network controls rather than by erasing code.

**Evidence:**
- Tor explicitly documents that ISPs or governments may block direct Tor access; Tor Browser includes circumvention tools called pluggable transports.
- Censors block public relays, domains, app stores, and traffic signatures; circumvention systems respond with bridges, obfs4/WebTunnel-style transports, and out-of-band distribution.
- This is a better analogy for post-release open weights than a product ban: enforcement moves to distribution, hosting, network access, and user risk.

**Sources:**
- [Tor Support: Unblocking Tor](https://support.torproject.org/tor-browser/circumvention/unblocking-tor/)
- [Tor Project: WebTunnel announcement](https://blog.torproject.org/introducing-webtunnel-evading-censorship-by-hiding-in-plain-sight/)
- [Georgetown Law Technology Review: Censorship-Circumvention Tools and Pluggable Transports](https://georgetownlawtechreview.org/wp-content/uploads/2022/02/Bateyko_Censorship-Circumvention-Tools_Formatted.pdf)

**Use in post:** "Once a tool is open and useful, governments do not usually suppress it by deleting the code. They fight an endless distribution and detection game."

## Suggested Examples To Mention Briefly

- **Strongest analogies:** encryption export controls; DeCSS/AACS; Napster-to-BitTorrent evolution.
- **Good caveat examples:** Felten and Sklyarov show chilling effects; Tor shows that censorship can raise the cost of access even without eliminating the tool.
- **Avoid overclaiming:** not all examples are "open source" in the strict licensing sense. Some are open protocols, public code, public keys, or widely distributed binaries. The common property is replicability.
