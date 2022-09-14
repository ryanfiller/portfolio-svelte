---
title: Weird Things About Web Components
options:
  published: true
banner:
  src: 'https://www.explainxkcd.com/wiki/images/0/01/red_spiders_cometh.jpg'
  alt: 'TODO'
  attribution: 'TODO'
meta:
  date: '2022-09-30'
  excerpt: Some oddities I came across while working with Web Components for the first time, and how I worked around them
  categories:
    - code
  tags:
    - web-components
    - design systems
---

<script>
  import { Tabs, Tab } from '$components/misc/tabs/index.js'
</script>

## What are Web Components?

Web components are a part of the web standard. They feel new, but have been around since 2011.

https://developer.mozilla.org/en-US/docs/Web/Web_Components

> Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

The bit about "encapsulation" is especially important.

Three concepts, each one introduces some weird quirks.

- Custom elements
- Shadow DOM
- HTML templates


### Why use Web Components?

Web components take some of what people love about JavaScript frameworks - reusable components, style scoping, overall modularity - and bring it natively to the browser. This means that web components can be included on a page _without_ having to include a build step.

That said, writing one from scratch is still kind of a pain, so there are a few frameworks to help make the process a little easier - 
https://stenciljs.com/
https://lit.dev/

I wrote mine with Svelte - https://svelte.dev/docs#run-time-custom-element-api

The good news is that each of these runs a compile step - meaning that once the code is "baked," that code be reused like...

https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define

```
import MyElement from './MyElement.svelte';

customElements.define('my-element', MyElement);
```

... without having to rebuild it!

This makes this code super portable between and frees a project from being tied to any one framework. The compiled code from a Lit site should be able to be included in a Svelte project with no extra work.

## Why I'm Using Web Components

Like a lot of things, I'm making this more complicated than most people will need to. I'm writing components that will work _both_ as a regular `.svelte` components as well as a custom element. I'm in the middle of a big refactor for my blog, and one of my goals was to make things simpler. That means taking large chunks out of my transpilation toolchain, and the easiest way to do that while still being able to include dynamic components in otherwise static blog posts was to refactor mdsvex out and web-components in. I didn't want to limit myself to _only_ being able to use these components in markdown content, so I made them work as traditional Svelte components as well.

---

## Weird Stuff

### Custom elements

#### What happens where there is no JavaScript?

One of the biggest drawbacks of using custom elements is that there isn't (as far as I know right now, anyways) a great way to handle them during server side rendering.

<Tabs name='tabs with and without javascript'>
  <Tab title='with javascript'>


  </Tab>
  <Tab title='without javascript'>


  </Tab>
</Tabs>

<!-- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement -->

#### Runtime vs Buildtime

things that are build time, things that can be run time

#### The Event loop

the setTimeout 0 event loop thing

https://javascript.info/custom-elements#rendering-order

### Shadow DOM

global utility classes don't work

svg filter not working because of encapsulation

when composing several components you have have to pass styles a specific way

### HTML templates

focus trap situation was HARD

::part selector

passing through a slot in a composed component

### Svelte

If you're not planning on making these components do double duty, this section might be worth skipping.

#### how to register things

https://github.com/ryanfiller/portfolio-svelte/blob/mk-ii-release-candidate/src/web-components/vite.config.js

https://github.com/ryanfiller/portfolio-svelte/blob/mk-ii-release-candidate/src/web-components/index.js

https://github.com/ryanfiller/portfolio-svelte/blob/mk-ii-release-candidate/package.json#L10-L14


#### The `:global` modifier can cause invalid CSS

Svelte comes with [scoped styles by default](https://svelte.dev/docs#component-format-style), but one of the big drawbacks of this is that it makes styling elements rendered via a `<slot>` tag difficult. You have to be careful not to do _too_ much with this, but you can escape that scoping with the `:global` modifier and target any children that match a CSS selector.

My first instinct was to use this in conjunction with with the [`:is` pseudo class](https://developer.mozilla.org/en-US/docs/Web/CSS/:is) (which works in a similar way for WC child content), but I ran into an infrequently cited rule from the CSS spec —

> Invalidity is caused by a parsing error, e.g. an unrecognized token or a token which is not allowed at the current parsing point. ... In the case of CSS, the entire rule in which the selector is used is dropped.

https://www.w3.org/TR/selectors-3/#Conformance

That means that this CSS, without Svelte's compile step which the browser's native components won't have, won't be understood by the browser and won't style anything.

```css
:is(button),
:global(button) {
  color: white;
  background-color: red;
}
```

It's verbose, but the only workaround I could find was to just put the styles twice.

```css
:is(button) {
  ...
}

:global(button) {
  ...
}
```

This is a situation where a the `@apply` rule would have really shined had it not be abandoned.

https://caniuse.com/sr_css-apply

#### Quite a Few Svelte APIs Don't Work

Svelte is the "compiled away" framework, but it actually does ship a small runtime — this is how things like the context API or reactive stores work.

https://github.com/sveltejs/svelte/tree/master/src/runtime

So without that runtime, things won't work.

https://svelte.dev/repl/cf05bd4a4ca14fb8ace8b6cdebbb58da?version=3.17.0

can't use stores, had to refactor tabs to work a different way

context, stores, etc

emit / catch custom events instead

https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events

https://svelte.dev/tutorial/component-events

```svelte
<Tabs on:tabSelected={...}>
  <Tab on:click={dispatchEvent(new CustomEvent('tabSelected', { ... }))}>
    ...
  </Tab>
</Tabs>
```

I ended up just making everything one component

https://github.com/ryanfiller/portfolio-svelte/blob/mk-ii-release-candidate/src/web-components/tabs.svelte

## the end