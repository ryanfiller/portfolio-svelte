---
name: uses
title: /uses
---

## desk

![DIY desk in standing configuration](/images/desk-2019.jpg){data-align="full"}

I have a pretty unorthodox, DIY sitting/standing desktop combo that I made with a friend a few years ago. It was originally made to work with a different set of monitors, but it still works okay with my current setup. I have plans to rebuild it in the near-ish future.

The idea is that a mouse and keyboard can sit on the original desktop with the monitor pushed all the way down and the desk can work as a sitting desk. The mouse and keyboard can also be placed on top of the pull out shelf and the monitor raised and it functions as a decent standing desk.

The light is an [Ikea Terital work lamp](https://www.ikea.com/us/en/p/tertial-work-lamp-with-led-bulb-blue-30448032/) with a Philips Hue Color bulb.

## hardware

* I have a 2014 16" Macbook Pro, 2.5GHz i7 processor, 16 GB or ram, and 512 GB of storage. I stupidly spilled a drink on it a few years ago but it still works mostly fine. I regularly run 2-4 simultaneous Docker containers and handful of Node apps for work and rarely run into issues if I'm diligent about rebooting once and a while.
* I have a have a [Samsung 34" Curved Widescreen Monitor](https://www.samsung.com/us/computing/monitors/curved/34--cf791-wqhd-monitor-lc34f791wqnxza/). I really like the usb passthrough on this monitor, it lets me run a mouse, keyboard, webcam, and stero through one usb hub in, and one single wire out and into my laptop.
* I have a [Keycool 84](https://drop.com/buy/keycool-84-2s-mechanical-keyboard) mechancical keyboard with Cherry MX brown switches. They're tacticle enough and not *super* loud, and I use as set of rubber gaskets to make them even more quiet. It's technically a Windows keyboard, but I swapped the keycaps and used [Karabiner](https://karabiner-elements.pqrs.org/) to switch the `command` and `option` key functionality and can't tell the difference on my Mac.
* I have a [Logitech M500 Corded Mouse](https://www.logitech.com/en-us/product/corded-mouse-m500), becuase I don't like to mess with batteries at home. I'm big fan of Apple's [spaces](https://support.apple.com/guide/mac-help/work-in-multiple-spaces-mh14112/mac) for window management, so I have the side buttons bound to `ctrl + ←` and `ctrl + →` for quick switching. Plus the on/off fast scroll wheel is nice for reading long error logs.
* I have a [Logitech Carl Zeiss Tessar 1080p webcam](https://www.logitech.com/en-us/product/hd-pro-webcam-c920) that I don't really know anything about and hardly use. I'm pretty sure I got it out of a free-to-a-good-home box at work one time.

<!-- waccom board - Bamboo capture, so old its not even on their website anymore but I like it a lot. -->

## software

* I pretty exclusively use [VSCode](https://code.visualstudio.com/) for text editing.

  * I switch up my theme fairly regularly; current theme is [Shades of Purple](https://marketplace.visualstudio.com/items?itemName=ahmadawais.shades-of-purple) by [Ahmad Awais](https://ahmadawais.com/). I get a lot of positive comments on it from the backend devs on my team whenever we screenshare.
* I've been using [iTerm2](https://www.iterm2.com/) for a long time now, and while I wouldn't say I absolutely love it, it is the best terminal I've come across so far. It does everything a terminal needs to do, and has nice extras for running multiple terminal instances at the same time.

  * I am a huge fan of [zsh](https://ohmyz.sh/). It's very hard to go back to regular bash once you've been using all the extras this shell adds.
* I use [FireFox](https://www.mozilla.org/en-US/firefox/new/) as my internet browser because they have killer frontend devtool and I believe in their [mission to make a better internet](https://www.mozilla.org/en-US/mission/). I also really like the [container approach to keep Facebook from follwoing you around the web](https://support.mozilla.org/en-US/kb/facebook-container-prevent-facebook-tracking).

## builtwith

This particular site is made with:

* [Sapper](https://sapper.svelte.dev/) as a framework
* [remark](https://github.com/remarkjs) & [rehype](https://github.com/rehypejs) to augment my markdown content
* [Netlify](https://www.netlify.com/) for CDN hosting, automatic CI/CD, and SSL
* [GitHub](https://github.com/ryanfiller/portfolio-gatsby-v2) for version control
* [Netlify Large Media](https://www.netlify.com/products/large-media/) for image handling and manipulation
* [SCSS](https://sass-lang.com/) component imports and [BEM](http://getbem.com/) methodoly to scope styles
* [Cypress](https://www.cypress.io/) as an end-to-end testing framework
* [GoatCounter](https://www.goatcounter.com/) for anonymous traffic and browser usage analytics
* [RSS](https://en.wikipedia.org/wiki/RSS) as a [public endpoint](/blog/rss.xml) for anyone looking to grab my code-related blog posts

<!-- ## smarthome?

nas

plex

hue

orbi -->

<!-- ## skillz

javascript

react

css

scss

photoshop

illustrator -->

<!-- ## EDC?

notebook

favorite pen

knife!

key thing!

phone! phone case! -->

## doesn't use

A list of things I try to avoid using:

### Embedded Tweets

The ability to [quote tweets directly on a website](https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview) is useful, but including Twitter's javascript on the page gives Twitter the ability to add tracking scripts to a site. I like Twitter, I [use it](https://twitter.com/ryanfiller_), but I don't personally think it needs to follow people around the web all of the time. In fact, Firefox actually now [blocks these tracking cookies by default](https://blog.mozilla.org/blog/2019/09/03/todays-firefox-blocks-third-party-tracking-cookies-and-cryptomining-by-default/), so users of my site will have to live with a styled `<blockquote />` whenever I need to quote a tweet, even my own, directly on my site.

<!-- amazon

facebook -->