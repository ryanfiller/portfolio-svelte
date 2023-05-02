---
title: A Short History of lensrentals.com
series: lensrentals.com
banner:
  src: '/images/imacs-banner.png'
  alt: 'two older versions of lensrentals.com on iMacs'
  # attribution: 'Space Invaders, Midway Games'
options:
  published: true
meta:
  date: 2023-04-20
  categories:
    - code
  tags:
    - research
  excerpt: >-
    A look at the current website and some notes about the future
---

## Looking Back

The current iteration of [lensrentals.com](lensrentals.com/) started development in September 2011 and was launched in May of 2012. It then underwent a major design overhaul in December of 2016. Depending on how you count it, that makes the site either 7, 11, or 12 years old - which is a _looong_ time in internet years.

The site was originally a [Ruby on Rails](https://rubyonrails.org/) application, but over time it has become a mashup of many technologies as more than a dozen different developers have added to it over time. The site project has, just to name some — Bach, Ruby, Node, JavaScript, jQuery, CoffeeScript, React, CSS, SCSS, CSS-Modules, RSPec, Cucumber, Jasmine, Jest...

## Looking Forward

Because the team wanted to overlap as much as possible with our internal tools we were locked into a few things — mainly [React](https://react.dev/) and [Relay](https://relay.dev/). Many of the other Lensrentals internal apps were scaffolded with [Create React App](https://create-react-app.dev/) but since this would be a brand new customer facing website a more opinionated tool, [Next.js](https://nextjs.org/), made more sense. Next comes with built in patterns for routing, data fetching, deploy strategies, and more.

### A Tentative Tech Stack

 - React
 - NextJS
 - CSS-Modules

 - Relay
 - REST API

 - React Test Renderer
 - Jest
 - Cypress

 - Docker
 - S3 Static Files

--- 

<!--
By the time I joined the Lensrentals team a lot had already changed on the technology side. Numerous internal apps were in the middle of being moved over to single page React applications, and actually one of my first projects after being hired was to build a component library that could be shared between all of ours app.
-->

Static Deploy (s3)

Relay