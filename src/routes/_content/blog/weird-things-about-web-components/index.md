---
title: Weird Things About We Components
options:
  published: true
banner:
  src: '/images/futurama-frozen-fry-and-aliens.jpg'
  alt: 'Philip J Fry, frozen while aliens destroy the city'
  attribution: 'Futurama, 20th Century Fox'
meta:
  date: '2022-09-31'
  excerpt: Some oddities I came across while working with Web Components for the first time, and how I solved them
  categories:
    - code
  tags:
    - web-components
    - design systems
---

::part selector

svg filter not working because of encapsulation

when composing several components you have have to pass styles a specific way

the setTimeout 0 event loop thing

collisions with the svelte :global selector

how to register things

focus trap situation was HARD

can't use stores, had to refactor tabs to work a different way

how do fallbacks work when there's no JS running

passing through a slot in a composed component

global utility classes don't work
