---
title: 2020, In Review
options:
  published: true
banner:
  src: '/images/futurama-frozen-fry-and-aliens.jpg'
  alt: 'Philip J Fry, frozen while aliens destroy the city'
  attribution: 'Futurama, 20th Century Fox'
meta:
  date: '2020-12-31'
  excerpt: Reflecting on 2020 and looking back on one year of blog posts.
  categories:
    - code
  tags:
    - blogging
---

![a dumpster, which is one fire'](/images/dumpster-fire.gif){data-align="right" data-small="true" data-caption="widely agreed upon to be the gif that best summarizes this year"}

I think anybody reading this would agree that saying "2020 didn't go as planned" is a massive understatement.

I also want to be upfront with the fact that personally, my 2020 could have gone a _lot_ worse. My heart really goes out to everyone who struggled more than I did this year. It was rough for a lot of people and I'm endlessly thankful for my relatively safe life.

<div style="clear:both" class="clearfix"></div>

## I spent the last year rebuilding my blog

I had a goal this year to start blogging. I wanted to write one blog post every month for the entire year. Mission accomplished. I _think_ I was only late once, and even then it was only by a day. I still am not a great writer, but I feel like I can now comfortably call myself a writer. Before this year I had only ever posted two blog posts on this site, counting this post I will have posted fourteen articles this year.
 
In January I [destroyed my current website and deployed a brand new Gatsby instance](/blog/starting-fresh-in-2020).
Taking time to slowly rebuild the site was a circular process — I wrote about features as I added them, and I also chose features to add based on what I thought would be interesting to include in a blog. It was often a _lot_ of work to get these out on time so I don't think I'll be holding myself the same deadline in the future, although I plan to keep a similar workflow of building and writing informing each other.

The biggest of all possible shoutouts to [my wife](https://gabbywindham.design/) who has proofread every post for me. She now knows more about CSS and JavaScript design patterns than she ever wanted to. Without her these posts would have gone live riddled with typos and full of incomprehensible grammatical mistakes.

### Two posts went kind of viral!

Of my dozen posts, I had two that really got some traction.

![almost one year worth of analytics'](/images/1-01-2020-to-12-23-2020-goatcounter.png){data-align="full"}

In June, in preparation for a big refactor of this site, I wrote a post [exploring some of the more esoteric features of Sapper](/blog/a-deep-dive-into-sapper). I think I was mostly just getting lucky with search keywords, but this post received a steady trickle of views totaling 738 visits at the time of writing this. Traffic to it kind of fell off in October after [Svelte Society Day 2020](https://sveltesociety.dev/), where Rich Harris announced the [soft-deprecation of Sapper as a platform](https://www.youtube.com/watch?v=qSfdtmcZ4d0). That's okay, because Svelte-Kit sounds awesome and I can't wait to move my site over to it, hopefully some time next year.

Last month, in November, I wrote a post about [how to use query search parameters and serverless functions to generate social share images](/automatic-social-share-images). This post got picked up by over a dozen weekly newsletters (some not even in English!), and traffic to it went absolutely bananas. At the time of writing this it has 5,214 page views! I'm most proud that it was featured on [CSS-Tricks](https://css-tricks.com/automatic-social-share-images/)! Thank you so much to everyone who shared this post, I hope it helped a lot of people out! 

In April I [started using RSS](/blog/getting-data-in-and-out-of-gatsby) to syndicate my posts to [dev.to](https://dev.to/ryanfiller/). I got a fair amount of attention there, almost getting to 1,000 views. My post about exploring Sapper broke 300 views on its own, which is not too shabby.

![eight months of dev.to analytics'](/images/2020-dev-to-views.png){data-align="center"}

### I finally made the jump from React to Svelte

I relaunched my personal site at the start of this year, like I mentioned, with a barebones Gatsby starter theme. At the time of the reboot I was already on the fence about doing my site in [React](https://reactjs.org/) again or trying out [Svelte](https://svelte.dev/). For whatever reason I went with Gatsby, but had regrets almost immediately. I did several explorations this year into Svelte, making sure it could do all the specific things I wanted my blog to do. 

In October I finally [made the refactor](https://github.com/ryanfiller/portfolio-svelte/pull/1/files), making 9,830 additions and 16,545 deletions to the overall codebase. That's a net of -6,715 changes, which some quick math after running `git ls-files | xargs wc -l` a few times tells me I was able to remove almost 6% of the overall code for my site. Pretty good, in my opinion.

The bigger win here was that I was able to reduce the JavaScript bundle that loads just my homepage from 325.4kb (with React) to 67.8kb (with Svelte). That's a much more impressive reduction of nearly 80%!

I'm still mainly a React dev at my day job, but I look forward to spending more time with Svelte in the future.

## I wrote a lot of code

![my 2020 github contribution graph; 1,353 contributions in the last year](/images/2020-github-contributions.png){data-align="full"}

I hope by now everyone knows that the GitHub contribution graph is kind of bogus. I happen to work somewhere that uses GitHub for storing our code, so naturally my chart looks higher than it did when I worked somewhere that used Bitbucket. We are also encouraged to heavily [rebase](https://git-scm.com/docs/git-rebase) our code at work (which I've also started doing for personal projects) which means there are days that look like I did nothing because those changes got squashed into a previous commit. The truth is somewhere in the middle, I guess.

![my 2020 github activity; 75% Commits, 17% Pull requests, 7% Code review, 1% Issues](/images/2020-github-activity.png){data-align="right" data-small="true"}

I am, however, proud of that 25% of things I did this year that _weren't_ commits, especially that 7% of code review.

<div style="clear:both" class="clearfix"></div>

### I wrapped up a HUGE project at work

![new lensrentals.com cart page'](/images/lensrentals-new-cart-2020.png){data-align="left"}

This year I started my second year on the internal development team at [Lensrentals](https://www.lensrentals.com/). Since October of 2019 I have been working very hard on rebuilding our entire checkout process, moving from an eight year old [Ruby on Rails](https://rubyonrails.org/) project with views built in [Backbone](https://backbonejs.org/) over to a more modern [React](https://reactjs.org/) frontend that consumes the existing Ruby APIs. 

This was a _massive_ undertaking for me since I barely know any Ruby and have never worked with Backbone before. Not to mention the inherent pressure that comes with the fact the cart page is the only page on the website that actually makes us any money.

I'm happy to say that at the end of October 2020, after literally an entire year of hard work, we launched this new feature with practically no bugs at all. This project was also used as a reason to start up our very own internal component library, which is something I'm super excited to grow as time goes on.

### I published an Open Source a11y tool

![colors.ryanfiller.com showing my college color palette'](/images/colors-dot-ryanfiller-dot-com.png){data-align="left"}

A few years ago I built a tool that would take an array of color and generate a chart in React showing the accessibility ratings of each possible background and text color combination. This year I tried to turn that project up to 11 (ha, get it?). 

As I knew I would be moving my own site away from React, I split the main functionality into [its own NPM package](https://www.npmjs.com/package/color-contrast-table), and then made three more packages to implement the tool in [React](https://www.npmjs.com/package/color-contrast-table-react), [Svelte](https://www.npmjs.com/package/color-contrast-table-svelte), and [Vue](https://www.npmjs.com/package/color-contrast-table-vue). I also wrote a [_looong_ blog post](/blog/building-a-component-in-three-frameworks) describing this experience.

I _also_ used building this tool as an excuse to mess around with serverless functions for the first time and made a [website](https://colors.ryanfiller.com/) where this tool would be publicly accessible. I wrote a [post](/blog/svelte-sanity-and-serverless-functions) about this too.

## I finished all 31 drawings for Inktober

Last year was the first time I even attempted the [Inktober Challenge](https://inktober.com/), but for personal reasons I didn't make it much past a third of the way through the month. This year though, I did it!

![grid of all my Inktober posts'](/images/inktober-2020-grid.png){data-align="full"}

Check out a bigger version of all of these drawings in [this post](/blog/inktober-2020), or on my [Instagram](https://www.instagram.com/ryanfiller_/).

## We adopted another dog!

![Rigby and Ollie, waking me up](/images/bedside-rigby-and-ollie.jpeg){data-align="full"}

Our dog Ollie (right) needed a friend and exercise buddy, so the weekend before the world shut down we did a trial run with Rigby (left). Everything went into lock down and we just held onto him until the official adoption a few weeks later. Now these two stare at me together every morning until I wake up and feed them.

## I ran, like a lot

![2020 running stats from Runkeeper](/images/2020-running-stats.jpg){data-align="right"}

Like writing, this is the year I would finally call myself "a runner." I've been running on and off for probably close to five years, but there just wasn't that much else to do this year. Running has been an excuse to get out of the house every-other-day-ish, and since we moved to a kind of wooded suburb it was also a nice way to spend some time near some nature.

If you average all those numbers together it seems like I'm a 58.17% better runner than I was last year. Who knows.

I also attribute all the running I did this year to [finally hitting level 40 in Pokemon Go](https://www.instagram.com/p/CHdhUG_lMK9/). I was going to stop playing once I hit max level, but they just raised the level cap and... Gotta Catch 'Em All, or something.

## Looking ahead to next year

### Goals for 2021

- I won't be sticking to the one article per month schedule, but I want to keep writing. I have some plans to do more concise articles, but as parts of an overall series rather than long one-off posts. 
- ![lighthouse scores for my current homepage - 77, 100, 93, 100](/images/2020-current-lighthouse-score.png){data-align="right"}
I really want to dig into the performance benefits of Svelte, especially around asset loading. I did some digging into [the best way to self host font files](/blog/science-with-science-gothic) earlier this year, and I think I can make some gains here. A 77/100 performance score isn't awful, but there's a lot of room to go up.
- I want to do more smart home stuff. Last year at midnight on New Year's Eve I was actually making commits to [this repository](https://github.com/ryanfiller/homebridge-gen), trying to help my brother manage his [Homebridge](https://homebridge.io/) setup. I finally have a decent amount of smart devices, I want to put my dev skills to use and start making smart, energy conscious automations.
- ![the eight cutting boards I made and gave as gifts this year](/images/christmas-cuttingboards.jpg){data-align="right"}
This year I made hardwood cutting boards for my family for Christmas. This was my first time doing anything with real hardwood (maple and walnut), and I couldn't be happier with how they came out. Working with wood is such a nice break from working on a computer, and I really want to do more of it in the coming year.
- This was the year I got into using Twitter, and I also spent a fair amount of time hanging out and asking questions in different Slack and Discord groups. People are so nice and always willing to answer my questions, I want to make an effort to be around to answer more questions next year.
- I need to finish my contribution to [stylestage.dev](https://stylestage.dev/styles/). I started [a theme](https://github.com/ryanfiller/style-stage) way back in August and just kind of fell off working on it. It was turning out kind of cool, I should finish it.
- ![RG 144 Zephyranthes model](/images/rg-zephyranthes-product-shot.png){data-align="right" data-small="true"}
I want to complete one Gundam model from start to finish, all the way through painting a building a diorama. I have some cool ideas that involve the 144 scale Zephyranthes and even some ways to work in some LEDs.
- I want to keep running. Even after all the work I put in this year, I still can't run a consistent 5k distance without having to stop and catch my breath and rest my legs. This year I got my mid-run stops down from two to just one, so maybe this year will be the year I can finally make the whole distance all in one go.
- And, of course, I want to get the COVID vaccine when it's available so I can hug my family and high-five my friends again.

<div style="clear:both" class="clearfix"></div>

### Everything in 2020 was terrible, but maybe it wasn't an anomaly?

2020 was hard, but there was nothing about this year that magically made it worse than any other year, and its also not going to magically get better just because this calendar changes over.

I've been thinking a lot about something Barack Obama said in [this episode of Pod Save America](https://crooked.com/podcast/barack-obama-on-2020/), about "symptom of it and an accelerant to it." 2020 brought a lot of big issues to the forefront, but they are _not_ new issues. Everything that happened this year is a consequence of decisions humans have been making for the past decades, and I think it's important to remember that. If we want to fix the future — avoid diseases, address systemic racism and inequality, have better political outcomes, more fair economic systems, hurt the environment less — we _all_ need to stay vigilant and do our best to work towards a better tomorrow. Volunteer your time and money where you can, and vote just as hard every year as you did this year.

But, at the same time, this was a hard year that seemed to drag on forever at times, and it okay to be proud and to recognize that we got through it.

I hope everyone stays safe and healthy, and Happy New Year. 🎆