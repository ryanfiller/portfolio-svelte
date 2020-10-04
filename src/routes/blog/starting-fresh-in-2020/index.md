---
title: Starting Fresh in 2020
options:
  published: true
meta:
  date: '2019-12-31'
  excerpt: A short history of my previous Gatsby site, and why I'm choosing to start over from scratch in the new decade.
  categories:
    - code
  tags:
    - gatsby
    - blogging
---
## New Year, New Decade, New Website

![Kylo Ren saying 'Its time to let old things die.'](/images/kylo-ren-tlj-old-things-die.gif){data-caption="The Last Jedi, Star Wars" data-align="full"}

At the time of writing I have made 576 commits over the past two years to my Gatsby blog. That doesn't count the changes I've consolidated with a rebase or made on an abandoned branch that was never merged. It has been a great time. 

I started development after deciding to move away from Jekyll and had narrowed my new framework to either Gastby and Hugo. Ultimately I went with Gatsby as a way to get more comfortable with React since we used that at the agency I was currently at. Over the past two years I've held a number of javascript-based jobs. Many, if not most, of the skills I used to get those jobs I can directly attribute to things I experimented with on my blog.  That blog and I went through a lot - a migration from v1 to v2 of Gatsby, a refactor to use Hooks, a refactor to use the Context API, more than one complete retooling of my css workflow, a refactor to use css variables, several methods of image hosting, more than one cms, and multiple explorations into testing strategies...

![Dr Manhattan saying 'Nothing ever ends.'](/images/watchmen_nothing-ever-ends.jpg){data-caption="Watchmen #12, DC Comics" data-align="right" data-small="false"}

I enjoy hacking on my blog and refactoring things based on new technology and patterns I've learned. The downside to this, however, is as long as I keep learning I keep trying to hit this moving target. Several people like to heckle me about how I'm *always* working on my website, and they're completely right. It's been going on in some form or another for almost a decade now. 

The downside to years of active development is that there's quite a few half-baked features floating around my code. Big refactors and complex new features are already complicated, and eventually things become so interconnected it can be hard to make changes. I once set out to add Jest coverage to my site, but that couldn't be done without refactoring my component hierarchy, and I wasn't happy doing that until I'd reworked how all of my styled-components worked, and digging into that made me want to do a big refactor using some more modern css features. Repeat, forever.

## So, what's different this time?

![Pokémon Start Screen](/images/pokemon_new-game.jpg){data-caption="Pokémon Red & Blue, Nintendo" data-gn="center"}

Starting over is liberating in a lot of ways, daunting in a lot of others.

One thing I know I don't want to do is build a monolithic code base and that I feel like needs to be perfect before I can deploy and show it to anyone. This might be a leftover feeling from being primarily a designer for so long, but I've always felt like I need a polished web presence to "feel relevant." Going into 2020 I'm very happy with my current job and don't plan on sending out portfolio links to anyone so I want to try something different. I'm going to rip the band aid off my old site and push this one as it is right now - the Gatsby starter with minimal configuration and no extra styles. I want this site (and hopefully its audience!) to grow organically over time.

Going forward, I have a plan and I'm going to do my best to adhere to it. Well, its less of a *plan* and more of a set of guiding principles.

### Make small, feature-complete changes. Push them frequently.

This is a direct extension of trying to move away from the "this has to be perfect and complete before I deploy it" mindset I mentioned earlier. I tend to put things off for reasons like "wait until you've written all the content for your portfolio section, you don't want to the site to look bare." This thought process tends to keep me from deploying completely unrelated changes, like a new logo or an updated look for the about page. My first goal is to make the site easier to work on by encapsulating changes and getting them live as soon as possible instead of building interdependent features.

### Track my changes and my thought process.

Back to what I said about having close to 600 commits, that averages out to almost one commit per day for two years. That is way too much, especially when some of the commit messages look like this:

```git
9ff2fce fix bad quotes
a1e80cb cms is dumb sometimes
5c2fb4d fix block quote
8e06962 adding to blog draft
672d88e getting tests to pass to deploy
dfb88c7 npm audit fix
bfa6926 comment out broken test
5e2f968 tests
4c903ef greatly simplifies logo
a9e858b more logo
```

I 
wrote these only two months ago, and yet I have no idea what *any* of this is talking about. I came across [Tatiana Mac's excellent release notes page
]
(https://tatianamac.com/release-notes/) a while back and it inspired me. I plan to heavily use `git rebase` going forward to make sure all my nonsense commit messages get wrangled into so
me meaningful bullet points, and I also plan to use my [/changes
]
(/changes) page to keep my thought process attached to each deploy. 

### Write tests for things as I go.

2019 was the year I got into testing, mostly because of work. Every time we make a feature or component we're expected to have an accompanying test, and that makes good sense. What made less sense was me to thinking I was going to read through code I'd written months ago and understand how it works well enough to test it. That, in my opinion, is one of the most un
derrated benefits of testing - you are writing code that documents your other code. I'm not quite getting on the [TDD
]
(https://en.wikipedia.org/wiki/Test-driven_development) train (yet, anyways), but I am going to make an effort not to push any code that isn't tested. I also want to incorporate automated accessibility tests, which leads into my next guideline...

### A renewed focus on accessibility, and a new focus on sustainability and privacy.

Accessibility is important. Having worked on client facing websites for a while now I know that. But do I *really* know that? I am cognizant of things like font sizes and color contrast, but what happens to my site when a user has javascript turned off? What happens if someone on a slow 3g connection tries to go to one of my pages that contains a giant .gif? These are all things I plan to keep in mind with an effort to make my site more inclusive. 

Accessibility, inclusive, privacy, and ecology are all inherently tied related. Collectively these things can be boiled down to "do less" - make payloads smaller, run less tracking scripts, use less energy by doing less work client side. I can't find quote, but I read a tweet earlier this year that said something along the lines of - 

> The web is already accessible and performant, its your job not to mess that up.

I plan to devote a lot of time and energy exploring how I can love javascript in a more responsible way.

### Focus on writing content, not displaying work.

And lastly, I am going to write more. I have said this in the past, I think most people with a website have, but I *want* to mean it this time. I plan to write one blog post a month, and I'm hoping to make it easier on myself by not limiting this strictly web dev topics. My goal is to summarize one thing I made progress on each month -  whether that be my job, a personal project, home automation, woodworking, cooking, fixing my house, painting tiny plastic model kits... who knows what I'll want to share. The important part is that I share it.

That's not to say I won't be writing about code. I actually think this is the year I shift from showing my work with portfolio pieces and start writing about concepts and problems I tackle at my day job. I do eventually want to bring back a portfolio section of my site, but I won't be launching with it and it isn't even slated to be one of the next dozen or so things I work on. I have a pretty cool article planned for next month to talk about some of the tips and pitfalls I've run into having scaffolded half a dozen new Gatsby sites this past ye
ar. If that sounds cool to you, follow me [on Twitter @ryanfiller_
]
(https://twitter.com/ryanfiller_) because I haven't built an RSS feed yet...

![Super Mario Bros NES Fireworks](/images/super-mario-bros-fireworks.gif){data-caption="Super Mario Bros., Nintendo" data-align="left"}

Anyways, Happy New Year.
