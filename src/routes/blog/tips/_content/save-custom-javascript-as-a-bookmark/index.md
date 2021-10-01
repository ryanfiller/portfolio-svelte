---
title: How to Save a JavaScript Function as a Bookmark
options:
  published: true
meta:
  date: 2021-09-30
  excerpt: Using JavaScript to automate a repetitive part of my life
  categories:
    - code
  tags:
    - javascript
    - automation
---

## What?

[GoatCounter](https://www.goatcounter.com/) is "an open source web analytics platform available as a hosted service or self-hosted app. It aims to offer easy to use and meaningful privacy-friendly web analytics as an alternative to Google Analytics." It's free for non-commercial use, but since I use it every day I [contribute](https://ryanfiller.goatcounter.com/contribute) a few dollars every month to help its creator keep it going as long as possible.

One thing it doesn't have is a url I can bookmark to quickly go to the current day's stats. In JavaScript, you could use [`Dates`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to make this URL, and (most) browsers even have a way to save this one-off JavaScript function as a bookmark.

## Why?

The "day" view shows page views and referrers that fall on the current date. GoatCounter has a button to load the current day view, but what this button does is use JavaScript to set the [url query parameters](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#parameters) to include a `period-start` and `period-end` of the current date.

This means that on any given day, if you were to bookmark the page you wouldn't be saving "view the current day," but instead only bookmarking the current query parameters. What I _really_ want is a button that automatically takes me to the current day view url.

## How?

As far as I can tell, inserting a short JavaScript snippet into a bookmark seems like functionality that is supported in all major browsers, and has been for quite some time. I found [an article](https://www.computerworld.com/article/2904437/how-to-create-nifty-browser-features-using-javascript-bookmarks.html) that walks through scripting bookmarks in depth, but they only need two things — the URL needs to be [URI encoded](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) and prefaced with a string of `javascript:`. URI encoding can be a little more nuanced than it seems, but I wrote [another post](/blog/automatic-social-share-images#passing-data-with-url-search-parameters) that has more details on string encoding in general.

JavaScript native `Dates` usually aren't a fun datatype to work with, so people often reach for a library like [`momentjs`](https://momentjs.com/) or [`date-fns`](https://date-fns.org/). Since this one-line function can't install dependencies we'll have to do it the long way.

```javascript
(function go() {
  function formatDate(date) {
    var d = new Date(date);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-')
  }
  var today = formatDate(Date.now())
  return window.location.replace(`https://ryanfiller.goatcounter.com/?hl-period=day&period-start=${today}&period-end=${today}&filter=&as-text=off&daily=off`)
})()
```

If I were to call `go()` on the day of posting this article it would return `https://ryanfiller.goatcounter.com/?hl-period=day&period-start=2021-09-30&period-end=2021-09-30&filter=&as-text=off&daily=off`. In order to make sure this code is invoked when the bookmark icon is clicked, the function is also formatted as an `IIFE`, or [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

There are a million tools that will encode a string, but I'm partial to [this one](https://meyerweb.com/eric/tools/dencoder/) by [Eric Meyer](https://twitter.com/meyerweb). After running my function through and prefacing it with the `javascript:` label, the final string should look like this:

```text
javascript:(function()%20%7B%0A%20%20function%20formatDate(date)%20%7B%0A%20%20%20%20var%20d%20%3D%20new%20Date(date)%3B%0A%20%20%20%20var%20month%20%3D%20%27%27%20%2B%20(d.getMonth()%20%2B%201)%3B%0A%20%20%20%20var%20day%20%3D%20%27%27%20%2B%20d.getDate()%3B%0A%20%20%20%20var%20year%20%3D%20d.getFullYear()%3B%0A%20%20%20%20if%20(month.length%20%3C%202)%20%7B%20month%20%3D%20%270%27%20%2B%20month%3B%20%7D%0A%20%20%20%20if%20(day.length%20%3C%202)%20%7B%20day%20%3D%20%270%27%20%2B%20day%3B%20%7D%0A%20%20%20%20return%20%5Byear%2C%20month%2C%20day%5D.join(%27-%27)%0A%20%20%7D%0A%20%20var%20today%20%3D%20formatDate(Date.now())%0A%20%20return%20window.location.replace(%60https%3A%2F%2Fryanfiller.goatcounter.com%2F%3Fhl-period%3Dday%26period-start%3D%24%7Btoday%7D%26period-end%3D%24%7Btoday%7D%26filter%3D%26as-text%3Doff%26daily%3Doff%60)%0A%7D)()
```

Done! With the ability to quickly script anything, the sky really is the limit. I could make a bookmark that forwards the current site to [builtwith.com](https://builtwith.com/), fire-off a [webhook](https://en.wikipedia.org/wiki/Webhook) and catch it with some other service, or write a version of the [`cloud-to-butt` extension](https://github.com/panicsteve/cloud-to-butt).

## Bonus Points: How to Style the Icon

It bothered me that the bookmark icon saved as the FireFox default globe, so I wanted to style it. Other browsers probably have ways to do similar things.

![FireFox default globe favicon](/images/default-favicon.svg){data-small="true" data-align="right"}

FireFox populates the icons in the bookmarks bar with the [favicon](https://developer.mozilla.org/en-US/docs/Glossary/Favicon) of the url and JavaScript won't have one.

FireFox makes it possible to write CSS to customize their [browser chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), although it is a little complicated. [David Walsh](https://twitter.com/davidwalshblog) has a [really good article](https://davidwalsh.name/firefox-user-stylesheet) that walks through how to find the relevant CSS file, set it up to persist between application updates, and change the settings to apply the custom styles.

Whatever text is used in the `label` attribute selector needs to match the `Name` field of the bookmark. You'll have to search around for a 16x16 px `.png` or `.svg` file to use as the `background-image` for your bookmark. I was able to link to the canonical GoatCounter favicon. The final CSS that needs to go into `userChrome.css` looks like this:

```css
.bookmark-item[label="GoatCounterToday"] > .toolbarbutton-icon {
	width: 0px !important;
	height: 0px !important;
	padding: 0 0 16px 16px !important;
	background-image: url("https://static.zgo.at/favicon/favicon-16x16.png") !important;
	background-size: cover !important;
	margin-right: 0 !important;
}
```

![bookmark bar with custom favicon on the far right](/images/custom-bookmark-favicon.png){data-align="center"}

Some of my other bookmarks have blank `Name` fields and only show as icons. I hid bookmark's `<label>` so that it would match.

```css
.bookmark-item[label="GoatCounterToday"] > .toolbarbutton-text {
	display: none !important;
}
```

If you're interested in learning more about which elements and classes FireFox uses to build and style the browser, Mozilla has an [in-depth article](https://developer.mozilla.org/en-US/docs/Tools/Browser_Toolbox) on how to use the web inspector on the browser outside the viewport window. There's an [entire subreddit](https://www.reddit.com/r/FirefoxCSS/) devoted to "Pushing the limits of the Firefox Browser through the use of CSS" that has a lot of great resources about much more complicated customization.

I also committed these styles to my [`dotfiles` repo](https://github.com/ryanfiller/dotfiles/blob/master/userChrome.css) so I can move them between devices more conveniently.
