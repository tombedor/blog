---
title: Reflecting on 9 years at Block
date: 2026-02-27
draft: true
---

Much ink has been spilled of late on Jack Dorsey's leadership of Block. I've recently wrapped up a 9 year stint at Block, here's what I've learned.

The primary takeaway I come away with is that there are critical, core differences between _entrepreneurs_ and _operators_. Entreprenuers are risk takers, either starting or working at new, unproven ventures. They are contrarian, sticking to a product vision that can only be realized far into the future. They stick to this vision, even in the face of headwinds or even solid evidence against it.

Operators are mercenaries. They are "coin operated," and pride themselves on their professionalism and depth of skill. They are _optimizers_, enthusiastic about diving into the arcane to implement a fix or improvement.

Like Elon Musk, Jack Dorsey is an _entrepreuner_ at heart. Dorsey's success in this arena is indisputable. He's built Twitter, Square, and Cash App from nothing. Like Musk, however, Dorsey is a poor _operator_. Once his ventures get off the ground and mature, his attention wonders to new ideas. His skillset, which serve the small comapnies he has run so well, fail the large ones they matured into.


## Startups vs big companies.

### Startups

A small company _needs_ entreprenuers. Working at a startup is a somewhat irrational risk: the equity one accrues working at them is most rationally valued at _zero_, and the best of them can easily find work at bigger, better paying firms.

In a startup, engineers are working on a relatively small set of servivces, whose code they understand a large part of. User facing improvements can thus be built with a small number of enterprising employees:

The customer needs are relatively simple. The product either hasn't existed before, or is serving a customer base not being covered by incumbents. Thus customer acquisition is driven by broad, buzzy features:

<!-- small number of services -->

Product shortcomings are ok - the customer either doesn't have alternatives to turn to, has relatively simple needs anyway, or believes the product will improve over time. This gives the startup leeway in obliging users to deal with small annoyances or gaps.

### Big companies

As a company matures, it's needs change. The users have grown in sophistication, and the complaints about those small annoyances or gaps grow in urgency. At the same time, competition springs up. The startup has proven out a market. Incumbents look to extend their offerings to it, and startups look to pick off more specific customer segments.

In the face of these headewinds, execution gets more difficult. The number of services grow. Now, engineers work on more bespoke slices of functionality, understanding less of the company overall.

The company has more resources, and employees have their own ideas. Disciplined focus on a central stategy is needed:

<!-- bigger companies -->

These companies need _operators_. They are less passionate, but less passion is warranted when one is working on an arcnae plumbing rather than broad, buzzy features.

Some instincts of _entrepreneurs_ begin to backfire. They have their own ideas, not necessarily aligned with the overall company strategy. They respond to this misalignment by becoming "empire builders" - that is, acquiring control over the largest possible number of employees, to execute _their_ vision. Their contrarian instincts chafe at roadmaps driven by small optimizations.

At the same time these entreprenuerial instincts begin to backfire for a big company, the quality of entreprenuerial talent declines. The risk/rewards are no longer attractive, and the best talent either starts their own companies or joins upstarts.

## From Square to Block

Early Square was an innovative company. The company built a financial services company with a software engineering mindset. Taking payments from a mobile phone was not common, and Square innovated.

Along the way, Cash App was born out of a hackweek project. As it grew, it bled cash, and didn't have a clear path to profitability. Rumor has it that Square's board pressured Dorsey to shut it down.

To his credit, he clung to the idea. Monetization came with the idea to charge 1% for instant withdrawl, which users were willing to pay for. This model of "incentivize in, monetize out" was quickly adopted by competitors.

Jack become occupied by different fascinations. The first one I experienced was machine learning. He espoused the view that _everyone_ at the company could become a practitioner. Bitcoin came next, and offering the ability to buy it within CashApp propelled the stock.

Cash App was effectively a startup spun up within Square. It had distinct branding, a distinct eng stack, and distinct culture. Cash employees were bought into this independence from Square - much to the annoyance of Square side platform engineers whose services they built on top of.

Dorsey appears to believe this success in creating a startup within a big company was repeatable. Here his strategy diverged from Musk: rather than starting new companies, he was going to spin up new companies _within_ his existing ones. This drove the "ecosystem of startups" vision: Square was going to be a collection of independent ventures, relying on a set of platform services. This would make it easier to create startups _within_ Block than outside it:

<!-- ecosystem of startups -->


### The failure of ecosystem of startups

It didn't work. Jack had a vision of a strong set of core platform services powering startups, but didn't have a vision for what the core platform services _should be_ - his attention was on the startups themselves. Employees working on those startup ideas received outsize rewards and resources.

As with Dorsey's Twitter, the result was an incoherent strategy. Square went from a company that provided financial services for small businesses to a payments, lending, shopping, music streaming (?) company.

Platform services were responsible for fostering these bets, while also keeping up with the needs of Square and Cash. There was not strong direction on how to prioritize startup bets vs Square vs  Cash[^1].

[^1]: Product engineers from both Square and Cash both products expressed the opinion that platform teams perpetually ignored their needs in favor of the other.

Empire building left its mark. Leadership within Cash aspired to spin it out of Block, and actively undermined efforts to consolidate work with Square. The small feature gaps that require focused execution went unfilled: For example, Square has only recently offered the ability to leave a card on file at a bar, a now-table stakes feature for restaurant payment systems.

_Operators_ became disollutioned. There seemed to be very little value placed on the minute fixes and optimizations they contributed to the business.


## The cuts

Like Musk, Dorsey has turned to drastic, transformative cuts to redirect the business. I don't think it worked for Twitter, and I don't think it's going to work for Block. The reason is that executing this strategy requires _operator_ mentality, but are being done by leaders with _entreprenuer_ mentality.

### The Twitter cuts

At it's core, Twitter had a healthy ad-based social media business. It did not threaten behemouths like Facebook, Instagram, or TikTok, but it had (and has) a valuable, enduring cultural relevance.

Executing on this deep cuts requires a careful roadmap pruning, refocusing attention on functionality core to the business. It also requires a careful evaluation of talent. You need to keep the best people, but especially the _best people who actually still want to be there_:

<!-- good eng and people who want to be there venn diagra -->

That was not what he did. The product strategy was a dramatic switch away from ads towards paid subscriptions, and product improvements focused on his personal pet peeves as a user.

Choosing who to cut was not done any better. Bemoaning "coasters", he subjected his staff to a frantic, arbitrary evaluation process, famously requiring engineers to bring leadership printed out code samples.

This is, of course, a ridiculous way to evaluate talent. The most obvious reason is that leadership cannot understand the significance or complexity of code samples. But I think it gets back to the difference between operators and entrepreneuers.

An _operator_ might spend weeks of work to get to the bottom of some edge case or performance bottleneck, and produce only a few lines of code to show for it. These improvements can make or break a product relative to competition, but they are very difficult to explain to a company leader.

The end result was a destruction of the ad business. The company only avoided going out of business by virtue of a repeat of Musk's Solar City maneuver: Merging it with another, more successful business.

### Block

Dorsey similarly bemoaned "coasters," and pined for the early, more entreprenuerial days of Square. The jury is out on whether these cuts will work, but it's an enourmously difficult task.

There is a _massive_ difference between the set of services and products of a 6 thousand employee company that has _grown_ to that number over time and a 6 thousand employee company that has just been cut down from 10 thousand. Those that remain will contend with a sprawl of services and products, now without subject matter experts. These can't simply be turned off without disrupting service to end customers.

If Dorsey's messaging was about cutting down offerings to the core, most important ones, I'd be more confident. But that is not the message. Instead, he has expressed confidence that the smaller workforce will be able to out-produce the previous, bloated headcount.

Morale, despite generous retention bonuses to those that are staying, will be low. The remaining employees have said goodbye to 4 out of 10 friends and coworkers, and are left with a tall task of keeping things running. This is not a social media company - abprutly turning off services like Twitter did will have immediate financial reprecussions, losing customer trust that will be very difficult to win back.

At the same time, I do not see evidence of the stronger product focus that the company needs. Contrary to leadership impressions, the bottleneck at Block is a lack of coordinated execution, not engineers failing to leverage AI to churn out code. In a vacuum, individuals at 6 thousand person company have broader understanding and more agency than individuals at a 10 thousand person company. Those who remain at Block, however, will have the worst of both worlds: a vast codebase that needs maintaining, without the detailed understanding and product vision needed to win.


### notes

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
            - At the same time the entrepreneurial instincts begin to show drawbacks, the _quality_ of eJntreprenurial minded talent declines. The outsize rewards of joining the company decline, the best entreprenurial talent either joins upstart competitors or start their own companies.


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

