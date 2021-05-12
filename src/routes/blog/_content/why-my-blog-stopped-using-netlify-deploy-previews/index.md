---
title: Why My Blog Stopped Using Netlify Deploy Previews
banner:
  src: '/images/ocean-plastic-bottle.jpg'
  alt: 'an empty plastic water bottle floating in the ocean'
  attribution: 'Brian Yurasits, unsplash.com'
options:
  published: true
meta:
  date: 2021-05-01
  excerpt: Calculating the cost of my immutable deploys.
  categories:
    - code
  tags:
    - greenweb
    - jamstack
    - devops
---

Here's the first draft of the first post for this iteration of this site. Probably riddled with typos.
Dec 31, 2019 at 7:42 AM
https://5e0b504fecfc7e00083838f7--2020-ryanfiller-gatsby.netlify.app/blog/starting-fresh-in-2020
Finished processing build request in 48

My first Gatsby post, going through their tutorial
Jan 23, 2018 at 10:02 PM
https://5a68053f0b79b754c796ddf1--2018-ryanfiller.netlify.app/page-2/
Finished processing build request in 2m10

My first ever deploy to Netlify, just called "refactor."
Sep 16, 2017 at 1:54 PM
https://59bd735c6f4c506c3503ed30--2016-ryanfiller.netlify.app/
Finished processing build request in 1m34


I can't find a source for the first person who said this, but it is a well known best practice to "commit small; commit often." And this is great!

[Immutable Deploys](https://www.netlify.com/blog/2021/02/23/terminology-explained-atomic-and-immutable-deploys/#immutable-deploys)

---

It takes me on average 10 commits to make a blog post, plus that number will make for easy math.

This number is WAY worse if you're using a git based CMS (link to post about NetlifyCMS).

https://github.com/ryanfiller/portfolio-gatsby-v2/pull/67

![some of my preview deploys while working on a blog post in April 2020](/images/netlify-deploy-previews-april-2020.png)

10 minutes, 43 seconds of processing time.


![disk size of a random sampling of those deploys](/images/random-sampling-of-preview-deploys.png)

14.6mb average.

https://million-devs.netlify.com/

---

Here is a tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">How much total CO2 does storing 1 GB of data in the Cloud for a year create?<br/><br/>Been doing lots of calculations and currently the figure is about 30 grams. Anyone else have an estimate.<br/><br/>Want to know how I got that figure.<br/><br/>22nd of April at 3pm-6pm UTC <a href="https://digital.worldcleanupday.org/webinars/">digital.worldcleanupday.org/webinars/</a></p>&mdash; Gerry McGovern (@gerrymcgovern) <a href="https://twitter.com/gerrymcgovern/status/1383017700218310659?ref_src=twsrc%5Etfw">April 16, 2021</a></blockquote>

Buy Gerry McGovern's book, [World Wide Waste](https://gerrymcgovern.com/books/world-wide-waste/).

![the default deploy settings for netlify: Any pull request against your production branch / branch deploy branches, Deploy only the production branch](netlify-deploy-settings-default.png)

- a dedicated staging branch
  - but you can never undeploy it

- surge.sh
  - https://surge.sh/

## surge.sh

[Brock Whitten](https://twitter.com/sintaxi)

To get the latest (at the time of writing) preview of the surge `CLI`.

```bash
npm install -g surge@edge
```

```bash
$ surge -h

  Surge.sh ⚡ Static Web Publishing 0.24.0-rc.6

  surge                             (opt --preview)  publish with prompts
  surge <path>   <domain>           (opt --preview)  publish without prompts (recommended)
  surge encrypt  <domain>                            provision SSL cert for project
  surge certs    <domain>                            view certs for project
  surge config   <domain>                            view/change project configuration
  surge list     <domain>                            list all project revisions
  surge rollfore <domain>                            change to next revision
  surge rollback <domain>                            change to previous revision
  surge cutover  <domain>                            change to latest revision
  surge discard  <revision>                          remove revision from system
  surge files    <domain>                            list all project files
  surge audit    <domain>                            audit edgenode state
  surge bust     <domain>                            busts cache on all edgenodes
  surge traffic  <domain>                            analytics showing project traffic
  surge network  <domain>                            analytics showing global distribution
  surge audience <domain>                            analytics showing audience device info
  surge usage    <domain>                            analytics showing bandwidth usage
  surge teardown <domain>                            tear down a published project
  surge ssl      <domain> <pempath>                  legacy command for uploding .pem file
  surge invite   <domain> <emails>                   invites user to be a contributor
  surge revoke   <domain> <emails>                   revokes contributor rights
  surge dns|zone <domain>                            view DNS records
  surge dns|zone <domain> add <type> <name> <value>  add DNS record
  surge dns|zone <domain> rem <id>                   remove DNS record
  surge whoami                                       show who you are logged in as
  surge login                                        only performs authentication step
  surge logout                                       expire local token
  surge token                                        create token for automation purposes
  surge plan                                         upgrade or downgrade account plan
  surge nuke                                         permanently removes account
  surge list                                         list all projects
  surge --version                                    outputs version
  surge --help                                       outputs this help message
```

```json
"scripts": {
    "export": "sapper export --ext '.svelte .md' --entry '/ /404 lab generate-image'",
    "surge": "npm run export && surge --project ./__sapper__/export --domain beta.ryanfiller.com"
  }
```

Netlify list
 - let me undeploy
 - change defaults
 - give me slightly more into in a the build hook
 - 