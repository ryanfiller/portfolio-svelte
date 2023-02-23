---
title: Why My Blog Stopped Using Deploy Previews
banner:
  src: '/images/shipping-containers-at-sea.jpg'
  alt: 'shipping containers, lost at sea'
  attribution: 'Dutch Coastguard, via bbc.com'
options:
  published: true
meta:
  date: 2021-05-31
  excerpt: Calculating the cost of my immutable deploys previews.
  categories:
    - code
  tags:
    - greenweb
    - jamstack
    - devops
---

I love Netlify. I think it's a wonderful service that provides _tremendous_ value to many developers and teams. But, like so many things in the modern world, I think it’s easy to overlook some of the behind-the-scenes consequences of convenience. This post examines the cost of what some of those conveniences, how to change some default settings to lessen their impact, and what some situational alternatives can be.

## What are Deploy Previews?

One of the core tenants of [JAMstack](https://jamstack.org/) is that a site builds, then it deploys. Netlify, like any other host for [statically built sites](https://jamstack.org/glossary/ssg/), makes use of "[immutable deploys](https://jamstack.org/glossary/immutable/)."

> While a "mutable" item can change (be mutated) over time, an "immutable" item cannot. Once created, an immutable deploy of a website becomes an artifact which will not change. Instead, deploys result in new versions or instances of the site, and traffic is routed to them accordingly.
>
> When paired with [atomic deploys](https://jamstack.org/glossary/atomic/), immutable builds make it possible for sites to enjoy abilities such as instant rollbacks and versioning, and help to ensure that the code and assets of a website can be maintained in a known state.
> ***
>[jamstack.org](https://jamstack.org/glossary/immutable/)

A [Preview Deploy](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) is something special that Netlify adds to atomic deployment.

> Deploy Previews work by deploying every pull request from your Git repository to a unique URL; completely different from the one your main site uses. You and your team can see how those changes look before they’re merged into the main branch and deployed to production.

Preview Deploys are useful because they let you test a new feature in a production-like environment, share a url to get feedback before a release, or easily cross-browser check a site.

The Deploy Preview settings for a site live at `Settings > Deploys > Deploy Contexts`, and the defaults look like this:

![the default deploy settings for netlify - Deploy Previews: Any pull request against your production branch / Branch deploys: Deploy only the production branch](/images/netlify-deploy-settings-default.png)

The different options for each setting look like this:

<dl>
  <dt>Deploy previews</dt>
  <dd>
    <strong>Any pull request against your production branch / branch deploy branches</strong>
    <br/>
    Netlify will generate a deploy preview with a unique URL for each built pull request.
  </dd>

  <dd>
    <strong>None</strong>
    <br/>
    Netlify won’t build deploy previews for any pull requests.
  </dd>
</dl>

<dl>
  <dt>Branch deploys</dt>
  <dd>
    <strong>All</strong>
    <br/>
    Deploy all the branches pushed to the repository.
  </dd>

  <dd>
    <strong>None</strong>
    <br/>
    Deploy only the production branch.
  </dd>

  <dd>
    <strong>Let me add individual branches</strong>
    <br/>
    Deploy only the production branch and the following additional branches.
  </dd>
</dl>

One interesting thing is that the `Any pull request against your production branch` option will still build a preview even for a [draft pull request](https://github.blog/2019-02-14-introducing-draft-pull-requests/). 

## With Great Power... Comes Great Responsibility

I can’t find a source for the first person who said this, but it is a  well known best practice to “commit small; commit often.” While this is  generally the best way to use version control, this could cause _a lot_ of builds using Netlify’s default settings.

This is a habit I picked up at my day job where I work on a team, but I usually open a pull request fairly soon  after I create a new branch. I know most people probably don’t work  this way, but I make heavy use of git’s [`rebase`](https://git-scm.com/docs/git-rebase) functionality and keeping an open PR is a good safety net when changing the commit history.

![screenshot of a rebased and merged pr, https://github.com/ryanfiller/portfolio-svelte/pull/30](/images/github-merged-rebased-pr.png) 

Any pull request regardless of open, closed, or merged status, keeps a  history of commits that have been force pushed to it. This PR, merged months ago, still lets me access code from the commits [23555ed](https://github.com/ryanfiller/portfolio-svelte/commit/23555ed3194c60a85e8959c1b38354c0ac2ccefa), [d58c989](https://github.com/ryanfiller/portfolio-svelte/commit/d58c98986d5e031309cc1498bca8ff0f93696ae6), and [9022382](https://github.com/ryanfiller/portfolio-svelte/commit/902238287edb73fb975d68ffb76c5b8b71676d07). If you mess up during a rebase and push something you didn't mean to, having an open PR can be a _much_ easier way of recovering code than trying to fish it out of the [local `reflog`](https://git-scm.com/docs/git-reflog).

Though once this PR is open, Netlify's pipeline will become aware of it and will start building a preview deploy any time you push code.

Also, some tools, like [dependabot](https://dependabot.com/), might automatically come with a starter project and [keep making PRs](https://github.com/ryanfiller/bearded-robots-gatsby/pulls) after you've forgotten about a project.

Even Netlify's own [CMS](https://www.netlifycms.org/) might be creating deploys without you realizing it. NetlifyCMS is a [git-based CMS](https://bejamas.io/blog/git-based-cms-vs-api-first-cms/), so of course it will be making commits as content is added or changed. But, even with the [`editorial_workflow`](https://www.netlifycms.org/docs/configuration-options/#publish-mode) option enabled, the CMS will open a draft PR and still create a deploy.

![netlify cms editoral workflow draft post, github draft pr, and netlify preview build screenshots](/images/editorial_workflow_draft_pr_build.png)

None of this is meant to knock these tools at all! I've [written in the past](/blog/tips-and-tricks-ive-learned-about-gatsby-with-netlifycms) about how much I enjoy NetlifyCMS and I still use it for small freelance sites that need to be editable by clients. That point I'm trying to make is that it is important to know how a tool works when you use it. In this case creating a post will create a pull request, and then every subsequent save of that page will create a commit, and thus a deploy.

This is not something I always knew I needed to be careful about. [One of my posts](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/67) alone generated almost 40 separate deploys.

## Some Downsides to "Single Use Deploys"

One thing that might make someone start paying attention to how many deploys they are creating is [Build Minute](https://www.netlify.com/pricing/faq/) usage. Netlify's plans only offer so many minutes per month before the next tier of billing kicks in. I'm sure everyone wants to avoid incurring any unexpected costs for a site, but I wanted to look at the other cost - the deploys themselves.

Because of the nature of how Netlify's roll backs work, deploys **never go away**.

> When paired with [atomic deploys](https://jamstack.org/glossary/atomic/), immutable builds make it possible for sites to enjoy abilities such as instant rollbacks and versioning, and help to ensure that the code and assets of a website can be maintained in a known state.
> ***
>[jamstack.org](https://jamstack.org/glossary/immutable/)

I reached out to Netlify about how exactly their deploy process works. Their customer service rep told me this was getting close to "technical secrets territory," but was able to link me to this helpful blog post by [Cassidy Williams](https://twitter.com/cassidoo). The section about [what happens when you deploy a JAMstack project](https://www.netlify.com/blog/2021/03/08/incremental-static-regeneration-its-benefits-and-its-flaws/#what-happens-when-you-deploy-a-jamstack-project) demonstrates (with gifs!) how the deploy process happens.

Netlify's deploys work a little bit like git commits — each one builds on previous ones, which is why you're able to easily "roll back" to a previous atomic state. In order to maintain the ability to always and instantly revert to a previous deploy, Netlify doesn't let you remove them.

And this isn't just production deploys, this applies to preview deploys as well. To be honest, I'm not sure why this is and I couldn't find a definitive answer anywhere. It could be that these deploys are cached or reused in some way to support production builds, or it could just be that there is no meaningful technical distinction between build types in Netlify's system. 

As far as I _can_ tell, unless you delete a site from Netlify altogether, once you create a deploy it exists forever. [Here](https://5e0b504fecfc7e00083838f7--2020-ryanfiller-gatsby.netlify.app/blog/starting-fresh-in-2020) is the first draft of the first post for this blog from December 31, 2019 at 7:42am. It's probably riddled with typos. [Here](https://5a68053f0b79b754c796ddf1--2018-ryanfiller.netlify.app/page-2/) is my first commit to my first Gatsby project while I was working through their tutorial, deployed January 23, 2018 at 10:02pm. [Here](https://59bd735c6f4c506c3503ed30--2016-ryanfiller.netlify.app/) is my _very first_ deploy ever to Netlify, from September 16, 2017 at 1:54pm, just called "refactor."

It might seem cool that these sites exist forever, but ask yourself how often you _really_ need to go back and look at the state of a site from over a year ago? Or even a few months ago? Also, consider this tweet from [Gerry McGovern](https://twitter.com/gerrymcgovern) - 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">How much total CO2 does storing 1 GB of data in the Cloud for a year create?<br/><br/>Been doing lots of calculations and currently the figure is about 30 grams. Anyone else have an estimate.<br/><br/>Want to know how I got that figure.<br/><br/>22nd of April at 3pm-6pm UTC <a href="https://digital.worldcleanupday.org/webinars/">digital.worldcleanupday.org/webinars/</a></p>&mdash; Gerry McGovern (@gerrymcgovern) <a href="https://twitter.com/gerrymcgovern/status/1383017700218310659?ref_src=twsrc%5Etfw">April 16, 2021</a></blockquote>

![the book cover of 'World Wide Waste'](/images/world_wide_waste_book_cover.jpg){data-align="right" data-small="true"}

Last year I read Gerry's book, [_World Wide Waste_](https://gerrymcgovern.com/books/world-wide-waste/). The gist of the book is to try and get everyone to consider the physical world ramifications of their digital world choices. One series of facts really stood out to me - 

> - Around 90% of data is never accessed three months after it is first stored.
> - 80% of all digital data is never accessed or used again after it is stored.
> - Businesses typically only analyze around 10% of the data they collect.
> - 90% of unstructured data is never analyzed.
> - 90% of all sensor data collected from Internet of Things devices is never used.
> ***
> [from Gerry McGovern's website](https://gerrymcgovern.com/books/world-wide-waste/)

For a lot of people, myself sometimes included, these Deploy Previews are artifacts that are never even looked at.

## Estimating the Cost of This Site

After seeing [Gerry's tweet](https://twitter.com/gerrymcgovern/status/1383017700218310659) I wanted to try to calculate a number for the amount of CO<sub>2</sub> my blog has generated via hosting my deploys. I _really_ want to stress that this is a ballpark number. I'm not an expert on things like compression and bandwidth and I'm working with a lot of assumptions and averages. Hopefully I'll get fairly close.

The first thing I did is determine how big each deploy is. This is kind of a tough number to get for a few reasons. First, the site gets bigger as I add more content and features to it, so I know I'll be looking at some kind of average. Second, roughly halfway between [relaunching in 2020](/blog/starting-fresh-in-2020) and now I changed frameworks from [Gatsby](https://www.gatsbyjs.com/) to [Sapper](https://sapper.svelte.dev/) which definitely changed the overall bundle size of my site.

<!-- Around this time I also removed NetlifyCMS from my workflow. To come up with a kind of "weighted average" for all of this, here's the data I used.

|                  | Overall        | Gatsby        | Sapper        |
| ---------------- | -------------- | ------------- | ------------- |
| **Start**        | January 2020   | January 2020  | October 2020  |
| **End**          | May 2021       | October 2020  | May 2021      |
| **Total Months** | 16 months      | 9 months      | 7 months      |
| **Percentage**   |                | 56.25%        | 43.75%        | -->

I looked around in Netlify to see if they had any info on storage size but the closest metric I could find was bandwidth used per month. Again, I'm not an expert in this, so the best way I could figure out the size of a site was to use [SiteSucker](https://ricks-apps.com/osx/sitesucker/index.html) to download it and check its size on my local disk. After getting a rough estimate for month and averaging them, these are the numbers I got.

|                     | Gatsby                | Sapper                |
| ------------------- | --------------------- | --------------------- |
| **Average Size**    | 79759.73 kb (0.08 gb) | 33000.00 kb (0.03 gb) |

<!-- | **Average Size (images removed)** | 15531.90kb (0.02gb) | 2462.50kb (0.01gb)  | -->

I use [Netlify Large Media](https://www.netlify.com/products/large-media/) to handle hosting media assets and those _should_ be versioned outside of site deploys and then only pulled in by url reference. However, for the demonstration here I'm going to leave them in the calculation.

Now that I knew about how big each deploy is, the next step was to figure out how many times the site has deployed. This number was pretty easy to get. For each project I went to the `Project > Deploys` tab, counted the number of deploys per page then multiplied by the number of pages. I did this both for my Production and Preview deploys since neither can be removed.

|                     | Gatsby | Sapper |
| ------------------- | ------ | ------ |
| **Preview Deploys** | 73     | 205    |
| **Total Deploys**   | 319    | 261    |

The extremely large number of Sapper deploys vs Gatsby deploys seems to be because I was working with a feature I needed to test against a bot crawler, and this wouldn't work running the site locally.

To get a final number for each, I multiplied these totals by the average size of each deploy.

|                                    | Gatsby   | Sapper  | Total    |
| ---------------------------------- | -------- | ------- | -------- |
| **Average Size * Preview Deploys** | 5.84 gb  | 6.15 gb | 11.99 gb |
| **Average Size * Total Deploys**   | 25.52 gb | 7.83 gb | 33.35 gb |

If I were to hypothetically stop working on my site and leave it with its current number of deploys for an entire year, that means I can take this total number and multiply it by Gerry's calculation of 30 grams per 1gb of stored data. That comes out to 910.5 grams, or just over two pounds. Based on this [random nasa.gov link](https://climatekids.nasa.gov/review/carbon/gasoline.html) I found, that's about one 10th of a gallon of burned gasoline.

About a third of that overall number comes from Deploy Previews, and I want to reference two of the numbers from _World Wide Waste_ again - 

> - Around 90% of data is never accessed three months after it is first stored.
> - 80% of all digital data is never accessed or used again after it is stored.

These are deploys I simply do not need to keep forever. And because these deploys are out there and can't be removed, they'll compound this storage cost every year that they continue to exist. There is an argument to be made that a lot of those Production Deploys aren't needed either, but theoretically Netlify should keep them around in case I ever need to roll back to one of them.

This might seem insignificant, but keep in mind this is only one project of mine. Granted I don't actively work on them nearly as much as I do my blog, but I currently have _two dozen_ sites hosted on Netlify. Multiply this across Netlify's [over 1,000,000 devs](https://million-devs.netlify.com/) and the scope is anything but insignificant.

If every Netlify user has only one site that they have deployed as much as this blog, that means the equivalent 100,000 gallons of gasoline burned just for one year of storage alone. According to [epa.gov](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator), that's the same as driving 2,233,479 miles in a car in the same amount of time. To offset this amount of C0<sub>2</sub> you would need to plant 14,695 trees and let them grow for _ten years_!

## What Can You Do?

I'm certainly not suggesting that anybody _not_ use Netlify. On the other hand, I have made some changes to how and why I use Netlify by tweaking my Deploy Settings.

First, I have `Deploy Previews` set to `Don’t deploy pull requests`. This makes sure that my "make a PR as a rebase safety net" workflow doesn't create deploys, and neither do things like `dependabot`. Second, instead of `Branch Deploys` set to `Deploy only the production branch` I use `Let me add individual branches` where I set up a dedicated `staging` branch that I can merge into any time I want to manually generate a preview.

![my deploy settings for netlify - Deploy Previews: Don't deploy pull requests / Branch deploys: staging](/images/netlify-deploy-settings-custom.png)

I've also made a conscious effort to only use my `staging` branch when I'm trying out a new feature that needs to be tested in as close to the actual production environment as possible. For things like getting a blog post proofread or trying to do a quick check of some styles on a mobile device I've switched over to using [surge.sh](https://surge.sh/).

### surge.sh

![surge.sh logo, its a walrus](/images/surge-sh-logo.svg){data-small="true" data-align="right" data-caption="the surge.sh logo"}

surge.sh is not a new tool. It, along with [CodeShip](https://codeship.com), is what I used to use to host and deploy my site before I moved to using Netlify. surge.sh and Netlify are similar in some ways, with surge.sh being a more stripped down version of the same type of static hosting service. After [installing the `surge cli`](https://surge.sh/help/getting-started-with-surge), any directory can be instantly deployed to a surge.sh url. 

The CLI accepts a number of configuration flags for options such as which directory to publish and which url to publish use. To make this all a little more automatic, I added a `surge` script to the `scripts` section of my `package.json` file.

```json
"surge": "npm run export && surge --project ./__sapper__/export --domain beta.ryanfiller.com"
```

This lets me run `npm run surge` which will export the static version of my site and push it to the subdomain [`beta.ryanfiller.com`](http://beta.ryanfiller.com/).

One nice thing about this is that by pushing to the same url over and over again, I can overwrite the version of the site that was previously hosted there. I like this because it means that when I link someone to a preview of a blog post they don't have to sift through different versions of hashed urls. They can visit the `beta` subdomain and see the draft that I most recently pushed.

I reached out about how surge.sh works behind the scenes, and they were actually nice enough to let me in on a semi-secret upcoming version of the CLI. This version was described as "unreleased but actually quite stable", and I've had no issues using it. A preview of it can be found (at the time of me writing this, anyways) by bumping your version up to the current release candidate.

```bash
npm install -g surge@edge
```

After this version of `surge` is installed you can run `surge --help` and see a list of all the new available commands. There's a _ton_ of good stuff here, but I wanted to highlight a few that are relevant to the topic of website size.


```bash
```bash
$ surge -h

  Surge.sh ⚡ Static Web Publishing 0.24.0-rc.6

  surge list     <domain>                            list all project revisions
  surge discard  <revision>                          remove revision from system
  surge audit    <domain>                            audit edgenode state
  surge teardown <domain>                            tear down a published project
```

To be honest, until seeing this new list of commands and running some of them, I had a pretty big misconception about how surge.sh actually works. I was under the impression that when you push to an existing url the old site was gone and replaced with the new one. Running `surge list` against some of my old deploys actually showed me that every version of them was still around, similar to Netlify. The big win here, to me, is being able to run `surge discard` against a particular deploy and remove it once you're done with it. And of course, if you want to remove a project entirely you can run `surge teardown`. `surge audit` was also super cool, it shows a list of deploys with their unique `id`, total file count, and how many megabytes of space they're taking up on the surge.sh servers.

```bash
$ surge audit beta.ryanfiller.com

   sfo-15    1619787001755    255 files    55.35 MB
   sjc-00    1619787001755    255 files    55.35 MB
   jfk-01    1619787001755    255 files    55.35 MB
```

This makes surge.sh an awesome tool, and one that puts more power back in your hands as far as managing what artifacts from your site persist forever. Netlify is a pretty big ecosystem at this point, with [SSL](https://en.wikipedia.org/wiki/Transport_Layer_Security), Large Media, Functions, Auth, Analytics, and so much else, but for some simple projects in the future I think I'm going to look at hosting them solely on surge.sh

## My Netlify Wish List

This isn't meant to be a list of _demands_, only a list of things I'd do if I had some magic wishes and could make changes. I'm sure that some of these are a _lot_ more technically challenging than they seem on the surface. In no particular order:

### Don't Automatically Deploy Draft PRs

[GitHub added draft pull requests](https://github.blog/2019-02-14-introducing-draft-pull-requests/) pretty recently, but it does seem like this data is available in their [REST API](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-for-draft-pull-requests). It looks like GitLab also already supports [draft merge requests](https://docs.gitlab.com/ee/user/project/merge_requests/drafts.html) and Bitbucket [is working on a similar feature](https://jira.atlassian.com/browse/BCLOUD-12503). 

Maybe in the future Netlify could add an additional configuration knob to decide whether or not a draft should create a build?

This would also solve the issue where NetlifyCMS accidentally creates a deploy on every save of the page.

### Add More Information to Outgoing Webhooks

I didn't even touch on this in this post, but it would be nice to customize [Deploy Notifications](https://docs.netlify.com/site-deploys/notifications/) and [Build Hooks](https://docs.netlify.com/configure-builds/build-hooks/) a little more. My main blog uses these to [syndicate posts](/blog/getting-data-in-and-out-of-gatsby) to [another domain](https://ryan.beardedrobots.com/), and builds of the secondary site are currently triggered by both Production and Previews Deploys of the main site.

There are already a lot of options around Deploy Preview in `Settings > Deploys > Deploy Notifications`, maybe somehow loop these into the `Outgoing Webhook` option?

### Change The Default Settings

I know that within the last few weeks Netlify has announced a [cool, new feature for Deploy Previews](https://www.netlify.com/products/deploy-previews/). Honestly, I'm kind of jealous that such an integrated tool didn't exist when I worked at an agency and needed to gather client feedback. But, especially since, as of now, every deploy is forever, is an automatic deploy for every PR something that every site needs turned on by default? 

Previews are a useful feature for a lot of people, but I'd love to know if the number of deploys created that were never even looked at would go down if this was an opt-in rather than opt-out setting.

### Let Me Remove Deploy Previews

I know this one is a stretch, but I would _love_ to be able to remove all of the one-off previews of my sites that I either didn't mean to make or don't need anymore. I have a feeling that of all my list this is the most technically complex — I understand that granting users this power makes the stack of deploys a bit like a [game of Jenga](https://en.wikipedia.org/wiki/Jenga) where you hope you're not removing a deploy you might need to roll back to later.

## Some Final Thoughts on Netlify

[Incremental Static Regeneration](https://www.netlify.com/tags/incremental-static-regeneration/) is an up-and-coming Netlify feature, and is the actual topic of [Cassidy's article](https://www.netlify.com/blog/2021/03/08/incremental-static-regeneration-its-benefits-and-its-flaws/#what-happens-when-you-deploy-a-jamstack-project) that I linked to earlier. [Jason Lengstorf](https://twitter.com/jlengstorf) and [Phil Hawksworth](https://twitter.com/philhawksworth) were recently guests on two podcasts that I listen to ([ShopTalk Show #464](https://shoptalkshow.com/464/) and [Toolsday #130](https://spec.fm/podcasts/toolsday/wKcuYe6l)) to talk about this feature. ISR is mostly unrelated to the topic of this post, but in both podcast episodes the phrase "burn the electricity to build a bunch of rarely visited pages" was used and it caught my attention both times. This post isn't meant to disparage Deploy Previews in any way. It sounds like Netlify already has put some thought into servers doing needless work during the build process, I would love to see them adopt a similar train of thought about "burning electricity" with hosting as well.

## Acknowledgments and Disclaimers

Thank you to [Gerry McGovern](https://twitter.com/gerrymcgovern) for writing both the book and the tweet that inspired this post. _World Wide Waste_ really has changed how I approach most everything I do online. Also, thank you to [Scott Parker](https://mobile.twitter.com/scottpieparker) and [Brock Whitten](https://twitter.com/sintaxi) from Netlify and surge.sh respectively for doing their best to answer my cryptic "hey, but how does your product _really_ work?" emails. The resources they provided me with helped to fill in a lot of details I was missing about how these technologies work.

I'm wouldn't be surprised there's holes in my math or overall logic. There's probably some type of server-side compression or way to use [gzip](https://www.gzip.org/) I'm not accounting for. Or I didn't factor in how Large Media works correctly. I also didn't account for redundancy with Netlify's [CDN](https://jamstack.org/glossary/cdn/) or the fact that [some of these servers are powered by renewable energy](https://www.netlify.com/sustainability/). This wasn't meant to be a hard breakdown of the numbers, just some quick math to show how much things we tend to not think about can add up at scale.

If you have questions, comments, or concerns about the numbers I showed and how I came up with them, please let me know! Math is not always my strong suit and I'd love to update this post with more correct information.

If this post was meaningful to you in any way, share it! I really want to emphasize that my goal isn't to shame anyone for the tools they use, but instead to get more people to think through the long-term consequences of their short-term actions, especially online in digital spaces.
