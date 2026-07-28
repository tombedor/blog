---
title: "Your Platform Must Force Multiply"
date: 2025-12-23
draft: true
---

## Define platform

{/* need some setup for what we're talking about */}

When a company first starts out, every engineer works on features that directly serve the end customer. As the company scales, it becomes worthwhile to invest in abstracting certain repetitive and/or complex internal development and maintenance tasks away. Thus _internal platform teams_ are born

## Why build a platform?

Platform engineers have some big disadvantages!

- Indirect customer impact: Platform builders help the end customer only via helping teammates, so it becomes more difficult to understand how the work ultimately benefits the customer. [^1] This makes it difficult for business leaders to reason about investment in these teams.

[^1]: My first job was data infrastructure. I used to joke that I might as well work at a balloon factory - the connection between my work and actual customer value was so distant and abstract.


- High upfront costs: In the long run, saving teammates from repetitive work makes the company more efficient. But there's often quite a bit of upfront work to get there, so the "break even" point can be months or even years in the future

{/* long term bets framing */}

- Platforms can introduce abstractions that internal customers need to understand. Whereas before teammates can reference external or open source documentation, now they must rely on internally generated documentation.
- The need to support many use cases tends to make platform software less agile. One platform often supports many different use cases, so platform feature requests can be hard to prioritize.
{/* Platforms increase the cost of alternative approaches. maybe we speak to this later */}

With all these disadvantages, what is a platform's value? How do you know you're building the right thing?

### Setting a good north star for your platform

When evaluating platform strategies, teams often pursue three different types of goals. Two are valid strategies but insufficient as goals on their own. The third is the actual goal worth pursuing:

#### Bad north star #1: Standardization

Standardization can be a valid platform _strategy_, but it is often misused as the _measure of success_

The benefits of standardization depend on how good the standard is - it's very easy pick a bad standard that reduces user efficiency.

#### Bad star #2: Centralization

Centralization is similarly a valid strategy, but a poor goal in and of itself. Centralizing a workflow may or may not increase overall efficiency - the team or system absorbing the work could be slower or worse at the task than federated systems/teams
{/* Add 1-2 paragraph definition of centralization as a strategy */}

#### Good star #3: Force Multiplication

Force multiplication is the real ultimate goal of a platform. Framing a platfrom in this way is user centric - the goal is to enable user to accomplish something faster or better than they could without the platform.

{/* Add 1-2 paragraph definition of force multiplication */}

{/* maybe add: Productivity gains should be exponential. As the platform handles more work, proportionally less work should be required of maintainers */}

{/* maybe add exponential diagram here: ![exponential](/diagrams/force-multiplication/exponential.png) */}

### Example: The database platform team

To see what these north stars look like in practice, let's examine a database platform team. Creating a team to manage databases is often an early platform team, especially in a company employing microservice architecture. Running a production database is technically demanding, and experts are usually better at handling the gotchas and maintenance overhead of running databases than more product-oriented teams.

What might this database team optimize for?

#### Bad approach #1: Standardization without force multiplication

Standardization can be a good platform strategy. Left to their own devices, product engineers can use different approaches. These can be marginally better for their specific use case, but the fragmentation imposes a cost.

For our database team, if some product teams are using MySQL and others are using PostgreSQL, different product teams will encounter similar challenges that are just different enough that they cannot share learnings with each other. It also makes it more difficult for product engineers to work on each other's services.

But standardization as a goal in and of itself is not a good goal. You could standardize on the wrong thing, creating a bad outcome overall. For example, let's say our database team standardizes on an internally developed database of their own creation. This is probably not as good as more vanilla alternatives!

Standardization can also increase complexity for internal users by locking out non-platformed approaches, forcing them to fit a square peg use case into a round hole. For example, our database team could mandate that the only approved database is MySQL, and ban key/value alternatives like Redis. This _standardizes_ - we can argue that our platform team is reducing cognitive overhead by having everyone use the same DB. But teams needing a high QPS store for transient data will be poorly served.

#### Bad approach #2: Centralization without force multiplication

_Centralizing work to a central team_ can also be a valid platform strategy. For example, by having one central team handle all repetitive tasks, we can free product engineers to work on more directly customer-impacting problems.

This too can backfire if not correctly applied. The database team could declare that _all queries against the database must be run by the database team_. This _centralizes_ - product engineers no longer need to think about running SQL queries. But there's obvious downsides - the database team might have difficulty keeping up with demand, and actually _slow down_ development by becoming a bottleneck for the repetitive work.

#### Good approach: Force multiplication through self-service

In a microservices architecture, one of the first things that warrants a platform team is managing application databases.

{/* ![database_platform](/diagrams/force-multiplication/database_platform.png) */}

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

### Making it obvious: The ice cream cone delivery platform

To see why force multiplication matters, imagine a platform that standardizes and centralizes but doesn't force multiply.

Our company is running into a morale problem, and leadership has come to the natural conclusion that the solution is free ice cream, delivered to your door by a teammate.

The _Acme Ice Cream Cone Platform_ provides a button to every employee, which when pushed results in a platform team member being dispatched to wherever the teammate is.

![ice_cream_cone](/diagrams/force-multiplication/ice_cream_cone.png)

By metrics often used to measure platforms, the Enterprise Ice Cream Cone Platform looks pretty good:
- It standardizes: Now when employees want ice cream, they don't have to think about how to go about it!
- It centralizes: Now we're not paying engineers to implement their own ways of getting ice cream thousands of times!
- It has high adoption: Everyone's using it!

Why would investing in such a platform be ridiculous? It lacks force multiplication - the platform team scales linearly with usage rather than enabling exponential productivity gains.

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
