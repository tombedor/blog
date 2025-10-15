---
layout: post
title:  "Advice for New Grands"
date:   2024-02-02 16:45:04 -0800
categories: career
---

This is a brief overview of my advice for new grads and junior software engineers. I'm been in the industry for about 8 years, and worked my way into engineering without a computer science degree. I've worked in both startups and medium-sized companies over the past 8 years.

As is the case with lots of tech writing, my advice will be skewed towards working in the San Francisco bay area, without needing visa sponsorship. Location and residency status are major factors to think about.

Other engineers with similar levels of experience as mine will disagree with some or all of it.

# The software jobs market
The intention of this post is to be evergreen. The tech[^1] jobs market is more volitile than the rest of the economy, with higher highs and lower lows. 

If the market is low, I have confidence it will come back. The tech industry remains an excellent one to build an interesting and lucrative career, despite {looming, much discussed threat}

If the market is currently hot, be aware that it will come back to earth. Things that don't make sense will make a *lot* of money, but many of them will fall apart.


# Getting your first job
The first job is often the most difficult one to get. Be persistent, don’t get discouraged. This remains a lucrative and interesting field.

In your resume and interviews, your goal is to convey enthusiasm, willingness to learn, and humility. Don’t try to compensate for the fact you don’t have any experience. That is fine, you have to start somewhere!

## Getting interviews
The first filtering step is a filter on resumes. This will often either be automated or done by someone non-technical.

Resume referrals can get you past this first filter. **Talk to people**. Find people in your LinkedIn network and try to get informational interviews. Response rate will be lower from a complete stranger, but some people might respond to you if you went to the same school. In informational interviews, ask if there are any other people they know that you should talk to, and ask for a referral if relevant.

In general, people are more willing to take these calls than many junior candidates assume. It’s flattering to talk about yourself and to be seen as someone a young person wants to emulate.

## Resume
My resume advice should come with the caveat that I only see resumes once they’ve made it to the interview stage. That said, my advice is:

Cut: Objective statements and non-technical jobs.
Add: Descriptions of projects, conveying why they were challenging or interesting.
Add: Github if you have one, personal website if you have one. Both are nice to haves but not critical. 
If you have a Github, add README’s to all projects. This is the only thing anyone will actually read.
Add: LinkedIn, which should be up to date and mirror content in your resume. 

A junior candidate resume should not exceed one page in length.

## Interviews
There are 4 basic formats that most companies use for SWE’s (software engineers) interviews. Some domain specific disciplines will have their own variations. Look at Glassdoor / Blind / Google to get examples of what interview formats companies do. 

In Q/A formats (ie non-coding screens), the key is to be responsive to questions. Demonstrate thoughtfulness and an ability to consider tradeoffs. Be transparent when you don’t know something. Avoid buzzwords / mentioning fancy technologies if you can’t dive into details about why they are useful.


The generic interview formats are:

### Initial recruiter call
This is typically an intro call with a non-technical recruiter. This is mostly to ensure that you are interested in the role, and to set expectations about what the interview process is like. Candidates are not typically filtered by this call.

### Coding screen
**The most important interview format for jr engineers[^2] is the coding screen**. Practice them! I use HackerRank when I interview, but there are many similar platforms. *Put more time into practicing these than the time practicing all other interview formats combined.*

When practicing, work on not only solving the problem, but communicating what you are thinking about. It is ok to stop and think, but when pausing talk about what you are puzzling through, e.g. I am wondering if a hash would make sense here.

Running into a bug is fine. When this happens, demonstrate a methodical debugging approach. Use print statements or a debugger. Don’t stare at the code for long periods.

Most companies will let you pick the programming language you interview in.

### Design challenge
This is a discussion based format, in which a basic hypothetical application is proposed and the candidate talks through how they would design it. E.g., design an application that runs a coffee shop. There are a variety of ways to approach this, but the easiest is to start by talking through how you would structure the database. In other words, what tables you would create and how they would relate to each other. Also consider what API’s you will need, and some basics about how web requests are routed.

### Past experience
In this interview, the candidate picks a project they have done and talks through their process for completing it. Since they have little or no experience, this is often less important for Junior candidates, but it is still worth practicing.

Have a project in mind. Have talking points about the challenges you solved, alternative approaches you thought about or tried, and how you collaborated with others. As you get more senior you will also want to be able to talk about why your project mattered to the business.

Demonstrate:
- Enthusiasm for problem solving
- Ability to dive into technical details in discussion
- Openness to considering different approaches

# Once you get your first job
**Talk to people**. Schedule 1x1’s with IC’s, managers, anyone who you might work with or has a role you’d like to learn about. Most people will be happy to chat with you, especially about themselves.

Ask for help when needed, but demonstrate attempts to solve problems independently. 

Volunteer for grunt work, e.g. taking notes in meetings. 

Be humble. You don’t know anything yet. Figure out how to track both large items and small (emails, doc comments, etc) such that you don’t need to be reminded to do things.

Reassess the job market ~1 per year or more, especially if you are at a startup. If you are at a bigger company, this might mean evaluating internal transfer opportunities.

# Things to think about when searching for jobs

## Willingness to relocate
Remote work is a new world. Geographic location perhaps matters less, but it might still matter. What is certainly still true is that you will get a better insight into how engineers think if you have an opportunity to work with them in person, at least some of the time. The catch-22 is that the experienced engineers you want to work alongside will be older and have families, and not want or need to come to the office very much. Ask questions about how companies think about this.

I moved to the bay area when I was getting started, and I can confidently say I would have nowhere near as dynamic, interesting, and lucrative a career I’ve had thus far without having done that. I think the bay’s dominance over tech is less than it was, but in my opinion alternative tech hubs are overrated.

## Working at a startup vs established (ie public) company
Startup:
  - Pro
    - More dynamic
    - More personal, more likely to make work friends
    - You’ll learn more about business as a whole. E.g. how does a customer success person think, how does a sales person think, etc
    - More independence in work
    - Less legacy systems to deal with, opportunity to try different things, wear different hats
  - Con
    - Pay is worse
    - Because of ^, in competency of general management and senior IC’s will be more inconsistent and less experience.
    - Because of ^, you’re less likely to get quality technical mentorship
    - “More dynamic” might mean more chaotic

Public company:
  - Pro
    - Pay is better
    - Because of ^, better senior IC’s and managers
    - Because of ^, better technical mentorship
    - Roles will be more narrowly scoped, meaning you’ll get more technical depth.
  - Con
    - Less personal, less socialization between coworkers
    - More narrow exposure in terms of types of people you work with. Likely just engineers and PM’s.
    - More legacy systems to deal with.

## Pay 
Advice differs here, but I would not care too much about pay so long as you can pay your expenses. In the long run, finding a role that you are good at and enjoy will maximize your earnings, and enjoyment. That said:

**The expected value of stock grants from startups[^3] is zero.** Recruiters etc will try to convince you otherwise. This doesn’t mean you shouldn’t work for startups, but the potential of cash-in from startup stock should not be a factor[^4].

# Things to read
[HackerNews](https://news.ycombinator.com) is the biggest forum of software engineers. Discussions can be dogmatic but are often pretty good. There are job postings once a month as well. As with any forum, there are plenty of posters who are loudly and confidently wrong.

[Joel on Software](https://www.joelonsoftware.com/) isn’t very active but has good tips on software careers.

[Patio11](https://twitter.com/patio11) is a good follow on Twitter and HackerNews. He goes into the weeds on fintech, but also has good content on software careers. 

[Money Stuff](https://www.bloomberg.com/opinion/authors/ARbTQlRLRjE/matthew-s-levine) is a great column about business, finance, and tech. You can get the email newsletter for free.

[^1]: There's an evergreen, tedious debate on what constitutes a "tech" company. My definition is "A company whose primary products are software or hardware, OR a company seeking to disrupt a traditional field with software." E.g. LegalZoom is a legal services company, but I consider them a tech company.
[^2]: This is possibly also the case for senior engineers.
[^3]: Specifically, non-public companies, whose stock does not trade on stock exchanges.
[^4]: The exception being giant “startups” that actually make money, e.g. Stripe as of Feb 1, 2023. But even then the timing of when you can sell your shares can be very uncertain.





