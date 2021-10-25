---
title: Coalescing Similar Fetch Requests
banner:
  src: '/images/death-star-2-firing.png'
  alt: 'the second Death Star from "Return of the Jedi" firing its super laser'
  attribution: 'Return of the Jedi, Lucasfilm Ltd.'
options:
  published: true
meta:
  date: 2021-10-31
  categories:
    - code
  tags:
    - javascript
    - service worker
    - performance
  excerpt: >-
    How to use a Service Worker to make similar network reqeusts more performant
---

We are undertaking a very exciting project at work — rewriting our entire customer facing web app for the first time since 2011. The current app is a big monolith with the backend written in [Ruby on Rails](https://rubyonrails.org/) and the frontend using a combination of [HAML](https://haml.info/) templates and [Backbone.js](https://backbonejs.org/) for some of the more interactive pages.

A decade is _forever_ in the constant churn of web technologies. When the site was new it was one of only a few apps that Lensrentals ran. Over the course of the last ten years the company, like many, has moved towards the direction of [microservices](https://en.wikipedia.org/wiki/Microservices) that handle one thing well over monolithic projects that try to handle everything.

At Lensrentals we're pretty entrenched in the React ecosystem across projects, and even have a component library of sharable UI elements. Becuase we needed to pick a compatable framework we settled on [NextJS](https://nextjs.org/). This is a post about using a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) to manipulate the network requests to make the site more performant.

## The Problem / The Background

The plan, for now anyways, is to deploy this app in [static mode](https://nextjs.org/docs/advanced-features/static-html-export). This means that all data can be put into one of two buckets — things we can know whenever the site builds (and I guess also things that need to trigger the site to rebuild), and things that need to be known when they are asked for. For things it needs to know in real time, such as item availability, the site can talk to the other apps client-side while a customer browses the site.

Becuase whether or not a product will be available on a certain day isn't something that is possible to know when the site is built, this is something we need to fetch from our inventory management app from a potential customer's browser. 

The current iteration of [lensrentals.com](https://www.lensrentals.com/) has a grid of eight "Featured Products" on the homepage. Since this project is less of a "redesign" and more of a "refactor", it'll be coming over to the new NextJS site functioning more or less exactly the same as it does on the current Ruby version.

![the grid of featured products on the current lensrentals.com homepage](/images/lensrentals-featured-products-grid.png){data-caption="Products with an abnormal Availability (the one in the top right) get a special banner."}

Determining product availability is an expensive calculation for us, and the goods news is that coworkers of mine have done a lot of existing work to optimize the way we request this data. We have a way ask for the results of multiple products at once instead of just one at at time, which is great because that presents a _huge_ opportunity to chop down the number of requests that happen every time a grid of product cards is rendered.

And this might seems like a lot of work for just eight requests on the homepage. However, some of the [deeper interior pages](https://www.lensrentals.com/rent/brands/nikon) can quickly get into the hundreds of products and the idea of minimizing the numbers of requests as much as possible starts to make more sense.

## What is a Service Worker?

> [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) essentially act as proxy servers that sit between web applications, the browser, and the network (when available). They are intended, among other things, to enable the creation of effective offline experiences, intercept network requests and take appropriate action based on whether the network is available, and update assets residing on the server. They will also allow access to push notifications and background sync APIs.



### How to Get Started With One

 - register one
 - compile one (workbox)
 - local dev tools

## The Solution

### Intercepting the `fetch`

### Making the request

### Parcelling data back out

make a not here about how this still has to work seamlessly for the frontend when there is now SW.

