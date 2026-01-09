---
title: "Your Platform Must Force Multiply"
date: 2025-12-23
draft: true
---

## Define platform

For our purposes, a platform is a piece of software for which the users are internal to your company.

## Why build a platform?

Platform builders have some big disadvantages!
- Impact on the end customer is indirect
    - My first job was data infrastructure. I used to joke that I might as well work at a balloon factory - the connection between my work and actual customer value was so distant and abstract
    - This means business leaders have less context and it's harder to justify platform investments
- They have high upfront cost: platforms represent _long term bets_. The payback period can be long
- It introduces abstractions all users need to understand
- The need to support many use cases tends to make platform software less agile
- Platforms increase the cost of alternative approaches
- Platforms are a shared resource for very different use cases, so improvement requests are difficult to prioritize

What is a platform’s value? There's a lot of bad definitions that are commonly used:


### Bad north star #1: Optimizing the architecture diagram

### Bad north star #1: Standardize



- you can standardize on the wrong thing, locking out other approaches.
- a platformed approach effectively _increases_ the cost of non-platformed approaches

but sometimes, standardizing can increase complexity by forcing users to fit their square peg use case into the round hole of a centralized interface.

### Bad north star #2: Centralize
Indirect customer impact means that you are less customized, and less nimble.

if users _must_ go through your platform, it's possible that there is more effort in using your platform than if they were to do it themselves.

### Bad north star #3: Optimizing the architecture diagram



### Good north star: Force Multiply

It force multiplies its users, by doing a repetitive task more efficiently than they can do themselves.
Productivity gains should be exponential. As the platform handles more work, proportionally less work should be required of maintainers

![exponential](/diagrams/force-multiplication/exponential.png)

Good platforms force multiply by:
- decreasing the time spent to do a repetitive task
- decreasing the cognitive overhead of doing a task
- increasing performance of a task

# A good platform: Application Database Team

In a microservices architecture, one of the first things that warrants a platform team is managing application databases.

<!-- ![database_platform](/diagrams/force-multiplication/database_platform.png) -->

Why does this force multiply?
- **Specialized knowledge**: Database operations require expertise in backups, replication, scaling, monitoring, security, and disaster recovery
- **Repetitive at scale**: In a microservices architecture, you might have dozens or hundreds of services, each needing a database
- **High cost of mistakes**: Data loss, security breaches, or performance issues have serious consequences
- **Enables self-service**: Once the platform is built, developers can provision and manage databases without waiting for the platform team

What developers would do without the platform:
- Research how to set up, secure, and operate a production database
- Implement backup and disaster recovery procedures
- Set up monitoring and alerting
- Handle scaling as their service grows
- Debug performance issues
- Ensure compliance and security best practices

What the database platform provides:
- Automated provisioning with sensible defaults
- Built-in backups and disaster recovery
- Monitoring and alerting out of the box
- Scaling strategies (read replicas, sharding)
- Security and compliance by default
- Self-service tools for common operations

Force multiplication calculation:
- Without platform: Each team spends weeks learning database operations, ongoing maintenance burden
- With platform: Developers provision a database in minutes, platform team maintains infrastructure for all teams
- The more teams using the platform, the better the ROI - one platform team can support hundreds of development teams

# A bad platform: Ice Cream Cone Delivery Platform


To keep morale high, we introduce sq-ice-cream!
User types sq ice-cream,and someone from the Oakland office flies to wherever they are and gives them ice cream!

![ice_cream_cone](/diagrams/force-multiplication/ice_cream_cone.png)

By metrics often used to measure platforms, the Enterprise Ice Cream Cone Platform looks pretty good:
- It standardizes: Now when employees want ice cream, they don’t have to think about how to go about it!
- It centralizes: Now we’re not paying engineers to implement their own ways of getting ice cream thousands of times!
- It has high adoption: Everyone’s using it!

Why would investing in such a platform be ridiculous? It lacks _force multiplication:
- The task it centralizes is very simple - a simple stipend to allow employees to buy their own ice cream.

## How to force multiply?

### Self service
Self service is a reliable route for force multiplication
Computers do the work of supporting customers
It makes prioritization easier
- Support wants onboarding support
- Lending wants onboarding support
We only have staffing to do 1
Self service lets the platform avoid this question!

A key sign of a suboptimal platform is direct prioritization of specicic customers
- delivery is slower, product team roadmap changes more often
- often times deliver project, then need evaporates


## Antipatterns

### Use one feature, use them all

Requiring teams to adopt the entire platform just to use one feature removes their agency and often forces them into complexity they don't need. This artificially inflates adoption metrics while reducing actual value delivered.

Example: Requiring teams to use your deployment platform, monitoring platform, AND service mesh just to get automated database backups.

Why this fails force multiplication: Teams spend more time learning and maintaining your platform than they would solving the original problem themselves.

### Code changes as onboarding

If every new team or use case requires the platform team to write custom code, the platform doesn't scale. Code changes scale linearly with number of users - the opposite of force multiplication.

Example: Each new service requires a platform engineer to write a custom Terraform module, integration tests, and deployment configuration.

Why this fails force multiplication: The platform team becomes a bottleneck, and the work required grows linearly instead of trending toward zero.


### Solve a real problem, not an abstract one

Platform teams often fail when they build greenfield solutions that don't account for messy existing use cases. Make platform teams responsible for solving a specific problem, not for "building a service."

Example: Instead of "build an authentication platform," frame it as "reduce the time it takes teams to add secure authentication from 2 weeks to 1 day."

Why this matters:
- Forces focus on actual user problems and force multiplication
- Prevents the "rewrite everything" trap (see [Joel on Software](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/))
- Makes success measurable

### Design for organizational change

Platform abstractions need to survive reorgs and changing priorities. If your platform encodes current team structures or project names, it will become technical debt as the organization evolves.

Example: Avoid modeling resources around team names ("payments-team-db") in favor of stable concepts ("payments-service-db").

## Measuring platforms is hard

Platforms are long-term bets, but you still need to demonstrate value along the way.

What doesn't work well:
- **Adoption metrics**: High adoption doesn't mean high value - are we even adopting the right thing?
- **User surveys**: Hard to get responses, and users may not be aware of alternatives to compare against
- **Feature delivery velocity**: Shipping features doesn't mean solving problems

What works better:
- **Time saved**: How much faster can teams accomplish X with the platform vs without?
- **Cognitive load reduction**: Can teams accomplish tasks without needing to understand the underlying complexity?
- **Performance improvements**: Measurable improvements in speed, reliability, or efficiency
- **SLOs / SLAs**: Commitments that demonstrate the platform's reliability and value
- **Self-service ratio**: What percentage of use cases require platform team involvement vs self-service?

Good platform metrics should demonstrate:
- Progress toward force multiplication
- Performance improvements for users
- Alignment with company goals


## How to recognize force multiplication in practice

Here are concrete indicators of whether a platform is achieving force multiplication:

**Good signs:**
- Platform maintainers are barely aware of new use cases - the platform just works for them
- Feature requests are applicable to many customers, not unique to each use case
- New teams can onboard themselves without platform team involvement
- The platform team's workload stays flat or decreases as usage grows
- Users report spending significantly less time on tasks the platform handles
- Most platform usage happens through self-service tools, not tickets or custom code

**Warning signs:**
- Platform maintainers need to build extensive new features to support each new use case
- Feature requests are highly specific and only benefit one team
- Every new user requires custom onboarding or configuration by the platform team
- The platform team's backlog grows faster than they can clear it
- Users report the platform is "hard to use" or "not flexible enough"
- Most interactions with the platform require opening a ticket or asking for help

The ultimate test: If the platform disappeared tomorrow, would teams spend more time solving the problem themselves, or less time avoiding the platform's complexity?






# (To cut)


## Why build software?

Before digging into the question of how to build a good platform, why do we build software at all?

> "Managing complexity is the most important technical topic in software development. In my view, it's so important that Software's Primary Technical Imperative has to be managing complexity. Complexity is not a new feature of software development.”
― Steve McConnell, Code Complete

> “Reduce complexity. The single most important reason to create a routine is to reduce a program's complexity. Create a routine to hide information so that you won't need to think about it.”
― Steve McConnell, Code Complete

What I like about this, is that if I’m unsure about a change, I can ask, “does this reduce complexity”. If the answer is yes, then we’re probably on the right track

