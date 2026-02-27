---
title: Reflecting on 9 years at Block
date: 2026-02-27
draft: true
---


Thesis: there's a big difference between entreprenuers and operators. Jack is a good entrepreneuer, but a poor operator. In this he displays interesting parallels with Elon Musk.

Jack Dorsey:
- 9 years of working under Block has taught me the difference between _operators_ and _entrepreneuers_. While entreprenuers are needed to get a company off the ground, _operators_ are needed to grow it and make it thrive. Jack's failures are a result of an entrpreneur mindset, which has led him to misdiagnose problems and poor leadership..

- Big companies vs small companies.
    - small companies
        - A small company needs _entreprenuers. entreprenuers are risk takers, taking a contrarian view (starting a business vs working at one is a major contrarian view)
        - The product is probably something new, with few existing users. Users are willing to cope with shortcomings in features, either because their needs aren't complex, or because they believe the prouduct will improve.
        - These properties serve them well, they have a vision, and they stubbornly cling to it years, even in the face of evidence
            - Cash was an example of a brilliant entrepreneuer maneuver. The product was bleeding money, and rumor has it the board wanted it shut down. It only exists because Jack continued to believe in it.
        - SErvices: small number, engineers understand most of it, can change most of it. User facing improvements can be done by relatively small number of workers.
    - big companies
        - big companies have an existing customer base, and fierce competition. The battle is won at the margin, small specific features that are specific to given users.
        - The architecure of the company changes. Services and teams get more specialized. User facing improvements require coordinated improvements to more services, which each given engineer understands less well.
        - This requires adherence to a central strategy. Improvements to one vertical needs coordination with centralized teams. The bets need to be more disciplined.
        - Here, entrepreneuerial instincts can backfire. An entrepreneur in a large company context might not believe in the single over-arching strategy or vision. They have their _own_ vision, and they hoard resources.
            - At the same time the entrepreneurial instincts begin to show drawbacks, the _quality_ of entreprenurial minded talent declines. The outsize rewards of joining the company decline, the best entreprenurial talent either joins upstart competitors or start their own companies.


- Jack's strategy
    - need to give him credit: Twitter, Square, and Cash App
    - Jack has always been an entrepreneur. Similar to Musk, he is focused on the shiny new thing. Also similar to Musk, his strategy is to cultivate strong leaders to tend to the day to day while he focuses on moonshots and new ventures.
    - The Cash App experience appears to have taught him that starting new ventures _within_ existing ones is best
        - "ecosystem of startups" sought to execute on this
        <!-- diagram: many startups, benefitting from a strong foundation that makes them easier to start internally than externall -->
        - this is the primary divergence with Musk. Rather than start new ventures outside of Block, he started them _within_ Block.
    - It hasn't gone well
        - This is where Jack's leadership falters. He has been hesitant to exercise a strong hand, weighing in on what the different business lines are doing. This enabled empire builders.
        - Cash leadership had ambitions to spin out of Cash and become it's own company. This resulted in active hostility to efforts to consolidate infrastructure that could have benefitted new ventures
        - The lack of presence on the ongoing "boring" business lines lessened employee passion for the user. If the CEO doesn't seem focused, why will any reports? Employees in moonshot divisions, or divisions that happened to be working on Jack's fascination of the moment received outsize attention and rewards.


- the cuts
    - Here there's another parallel to Musk: A violent course correction via deep cuts.
        - the reasonable strategy: clean up unfocused, non impactful bets, focus on core business.
            - At Twitter's core was a healthy, meaningful business. It never threated the giants of Instagram, TikTok, or Facebook, but it had (and has) an enduring cultural relevance that competitors couldn't match.
            - Square and Cash similarly are strong businesses
    - The problem is that implementation requires operator skills that both leaders lack.
        - Focus on "coasters". In these men's view, these coaster are those who _lack the entreprenurial spirit_, just showing up for a paycheck, not having a shared passion. Jack often idealized "early Square", when eng acted with more agency and velocity.
        - musk's twitter strategy failed. His premise that people would pay for an ad free Twitter, long a favorite idea of monied tech. The common counter of this is that the user experiene of X has continued to function, even improving in in some people's view.
        - His cuts were chaotic and unprincipled. He demanded engineers produce code samples. This is, of course, a terrible way to evaluate performance.
            - At the most obvious, a central reviewer will not understand code samples of hundreds of engineers.
            - Some code changes, especially at a large company are small optimizations or fixes that require weeks of investigation. This work shows up as small code line counts, but make or break performance. Features are less broad, buzzy releases, and more targeted improvements aimed at the company's most important customers.
        - It doesn't diagnose _why_ code changes come slowly. Far, far more often than someone simply failing to churn out enough code, low velocity comes from a lack of coherent direction and priorities. There are many services in play, a new feature depends on many small changes
    - I have doubts about Block's ability to thrive under the new cuts. They are starting from a big company architecture. The eng left will have to contend with consolidating this into a more manageable collection of services. These can't simply be turned off. They are user facing, and require long, careful migrations to wind down. It's near impossible to do this while supporting the features users have come to expect.

