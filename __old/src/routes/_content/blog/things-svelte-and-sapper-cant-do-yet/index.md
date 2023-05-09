---
title: Things Svelte and Sapper Can't Do (Yet)
banner:
 src: '/images/manhattan-bridge-construction.jpg'
 alt: 'Manhattan Bridge under construction, 1909'
 attribution: 'Getty Images'
options:
  published: true
meta:
  date: [
    2020-07-26,
    2021-08-19
  ]
  excerpt: Three big limitations I've discovered while working with Svelte and Sapper
  categories:
    - code
  tags:
    - svelte
    - sapper
---

<script>
  import SapperWarning from '$components/misc/sapper-warning.svelte'
</script>

<SapperWarning />

[Last month](/blog/a-deep-dive-into-sapper) I wrote about testing Svelte and Sapper to learn about their intricacies and limitations before trying to change my blog framework. I decided I'd explored enough to attempt a refactor and I found a few features that couldn't easily be replicated or done at all.

## A .svelte file cannot export multiple components

The first problem I uncovered is a limitation within the Svelte framework. I found a workaround, but it was much, much more verbose.

On my Gatsby blog I use [MDX](https://mdxjs.com/) to replace markdown elements with React components. Sapper has an equivalent tool, [MDsveX](https://mdsvex.com/). The configuration for both is similar — they need to import components and create an object that maps them to HTML elements.

```react
import { H1, H2, H3, H4, H5, H6 } from "../markdown/headings/index.js"

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6
}

<MDXProvider components={components}>...</MDXProvider>
```

```svelte
<script context="module">
  import { h1, h2, h3, h4, h5, h6 } from './headings/index.js'
  export { h1, h2, h3, h4, h5, h6 }
</script>
```

My goal is to replace each heading tag with a page link component. The component is build by taking the text content of the title and transforming it into a hash link. The hash is added as an `id` to the heading and then wrapped in an `<a>` tag that links back to the hash. This basically replicates the functionality of [remark's autolink headers](https://github.com/remarkjs/remark-autolink-headings) plugin.

### MDX Headings in Gatsby

The React way to build this component pretty straightforward. Because I still need to generate 6 different headings I made a generic `<Heading />` component that could accept a prop telling it which `h` tag to render. I'll explain more about the `slugify` function further down.

```javascript
const Heading = (props) => {

  import { slugify } from 'helpers'
  
  const hashUrl = slugify(props.children)
  const Level = `h${props.h}`

  return (
    <Level 
      id={hashUrl}
      className='heading'
    >
      <a href={`#${hashUrl}`}>
        {props.children}
      </a>
    </Level>
  )
}
```

Then, in an index file, I was able to use the `<Heading />` component to compose six new components, one for each of the HTML headings.

```javascript
import Heading from './heading'

const H1 = props => <Heading h="1">{props.children}</Heading>
const H2 = props => <Heading h="2">{props.children}</Heading>
const H3 = props => <Heading h="3">{props.children}</Heading>
const H4 = props => <Heading h="4">{props.children}</Heading>
const H5 = props => <Heading h="5">{props.children}</Heading>
const H6 = props => <Heading h="6">{props.children}</Heading>

export { H1, H2, H3, H4, H5, H6 }
```

My directory structure looked like this.

```
└─ headings/
  ├─ heading.js // the generic component
  └─ index.js // export of composed h1-h6
```

I want to emphasize that React is creating and exporting six unique components in a single `index.js` file.

### MDsveX Headings in Sapper

There are a few big differences with building this component in Svelte. Ignore the `getText` function for now, I'll elaborate on that later.

```svelte
<script>
  export let h
  import { slugify } from 'helpers'
  
  let id
  let hashLink
  const getText = node => {
    id = slugify(node.text)
    hashLink = `#${id}`
  }
</script>

{#if h === '1'}
	<h1 id={id}><a use:getText href={hashLink}><slot/></a></h1>
{:else if h === '2'}
	<h2 id={id}><a use:getText href={hashLink}><slot/></a></h2>
{:else if h === '3'}
	<h3 id={id}><a use:getText href={hashLink}><slot/></a></h3>
{:else if h === '4'}
	<h4 id={id}><a use:getText href={hashLink}><slot/></a></h4>
{:else if h === '5'}
	<h5 id={id}><a use:getText href={hashLink}><slot/></a></h5>
{:else if h === '6'}
	<h6 id={id}><a use:getText href={hashLink}><slot/></a></h6>
{/if}
```

The first is that Svetle doesn't seem to have the ability to use strings to dynamically choose html tags. Maybe this is possible with [`<svelte:component>`](https://svelte.dev/docs#svelte_component), but I could only get this to work with other custom components and not html tags. The good news is that the Svelte community is aware of this, and at the time of writing this post there is an [open proposal](https://github.com/sveltejs/svelte/issues/2324) to implement a fix. For now I went with one of the easier fixes suggested in the GitHub issue and added a series of `if else` statements.

The second issue lies in trying to replicate the `index.js` file that exports six heading components.

```javascript
import h1 from './h1.svelte'
import h2 from './h2.svelte'
import h3 from './h3.svelte'
import h4 from './h4.svelte'
import h5 from './h5.svelte'
import h6 from './h6.svelte'

export { h1, h2, h3, h4, h5, h6 }
```

Svelte components can be imported and exported using ES6 syntax, but only one component can be created per `.svelte` file. Rather than naming a component and exporting it manually, Svelte will use the file name to automatically determine a component's named and how it is exported.

```svelte
<script>
  import Heading from './heading.svelte'
</script>

<Heading h='1'><slot/></Heading>
```

An index file that exports six headings is still possible, but the directory structure is a lot messier than with React.

```
└─ headings/
  ├─ h1.svelte // composed component
  ├─ h2.svelte
  ├─ h3.svelte
  ├─ h4.svelte
  ├─ h5.svelte
  ├─ h6.svelte
  ├─ heading.svelte // the generic component
  └─ index.js // export of imported h1-h6
```

## Sapper's router doesn't work with hash links

As with React, there is no officially supported Svelte router, only community favorites that most projects use. As far as I know Sapper doesn't use any one specific router package. Instead, it has a series of helper functions that handle internal navigation.

Sapper's routing strategy, however, does currently contain a pretty big bug. Clicking on `<a>` tags that point to hash links will trigger a navigation to a new page rather than scroll to an id on the same page. A link on the `www.site.com/example` page that looks like `<a href='#test'>test</a>` _should_ scroll the page to an element with `id='test'` and change the url to `www.site.com/example#test`. This link will mistakenly navigate the app to `www.site.com/#test`, and likely end up rendering a 404 page.

### This is a known bug

The Sapper team is aware of this bug with [one](https://github.com/sveltejs/sapper/issues/331) or [two](https://github.com/sveltejs/sapper/issues/904) issues already filed about it. I looked into the issue but couldn't figure out a fix since both the [`handle_click`](https://github.com/sveltejs/sapper/blob/ca3645768597035b08e9d0e025cabd062180184a/runtime/src/app/start/index.ts#L76) and [`navigate`](https://github.com/sveltejs/sapper/blob/9e5a140c9658c3c01d00f2fd8a20d25f6f752f42/runtime/src/app/app.ts#L163) functions seem to have short circuits for when the urls contain hashes. Sapper's [`goto`](https://github.com/sveltejs/sapper/blob/ca034d0857379491831fc78ba974c411f5173be3/runtime/src/app/goto/index.ts) function doesn't appear to have any way to know about a hash link, so maybe that's the issue?

### There IS a temporary fix

There is [a workaround](https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561) for this bug.

```svelte
<script>
  import { onMount } from 'svelte'

  onMount( () => {
    document.querySelectorAll('a').forEach(a => {
      if (!a.hash||!document.querySelectorAll(a.hash).length) {
        return
      }
      a.href = window.location + a.hash
    })
  })
</script>
```

I am a strong proponent that all sites should work without JavaScript, so I don't love that this fix relies on the clientside `onMount` lifecycle hook. On the other hand, if a user has all scripts blocked from running then Sapper won't be able to rehydrate in the first place. This means Sapper's router won't take over navigation and all links should keep their default browser behavior, so this is a non-issue. Still, this code takes a second to run after the component mounts and the links still momentarily don't work. Also depending on the CSS this could lead to some style flashes as `href` shuffle around.

## Components don't have programmatic access to their children

Time to circle back to the `slugify` and `getText` functions I mentioned earlier.

The HTML that MDX or MDsveX would replace looks like this:

```html
<h1>The sun is shining, but the ice is slippery.</h1>
```

The goal is to transform the markup into something that looks like this:

```html
<h1 id="the-sun-is-shining-but-the-ice-is-slippery">
  <a href="#the-sun-is-shining-but-the-ice-is-slippery">
    The sun is shining, but the ice is slippery.
  </a>
</h1>
```

In the React version of the Heading component the `id` and `href` attributes are derived by running the child text of the component through a function that will make them viable hash links.

```javascript
const Heading = (props) => {

  import { slugify } from 'helpers'
  const hashUrl = slugify(props.children)

  return (
    <h1 
      id={hashUrl}
      className='heading'
    >
      <a href={`#${hashUrl}`}>
        {props.children}
      </a>
    </h1>
  )
}
```

This works because `props.children` can be accessed and manipulated like any other React prop. Svelte's API works differently, providing the `<slot />` component as a way to render child content.

```svelte
<script>
  import { slugify } from 'helpers'
  let id
  let hashLink
  const getText = node => {
    id = slugify(node.text)
    hashLink = `#${id}`
  }
</script>

<h1 id={id}><a use:getText href={hashLink}><slot/></a></h1>
```

`props.children` and `<slot />` are similar but have one major difference. React has access to the child content and can transform it during run time before render. Svelte needs to know about child content at compile time, and can't know about children until after they are rendered.

The only way I found to get the child content to pass to the `slugify` function was to query it from the DOM _after_ render. Svelte does have [`use:action` binding](https://svelte.dev/docs#use_action), which makes it very easy to run a function as soon as an element is created. There are two big downsides to this. First, this leads to the flash of no-link styles I mentioned earlier. A component is created, then once the page is loaded enough to fire a DOM query the hash link is generated and appended. The second is that since this relies on direct DOM manipulation, this function won't fire if a user doesn't allow Javascript. This is a bummer since hash links navigation is something that browsers support natively and definitely shouldn't require Javascript.

### There is an open Pull Request that will fix this

Some good news about this missing feature is that there is currently an [open pull request](https://github.com/sveltejs/svelte/pull/4604) to add a `$$slots` prop. This will work similarly to the existing [`$$props`](https://svelte.dev/docs#Attributes_and_props) value. It is hard to say if this would solve my exact problem since it isn't implemented yet, but any programmatic access to the child content should work better than having to query text after it renders. The bad news is that this feature doesn't currently appear on [Svelte's roadmap](https://github.com/sveltejs/svelte/projects/1) so it's hard to say when exactly it might land.

## Dealbreakers?

So, do these handful of "missing" features mean I don't recommend trying Svelte?

No, Svelte is still a great framework that has enough features to do most things. Since it is a little younger than some other frameworks and doesn't have a massive corporation behind it, it may not have features for a handful of fairly specific scenarios, yet.

This does, unfortunately, mean that I won't currently be moving my blog from Gatsby to Sapper. I plan on giving this another shot when Sapper does a full 1.0 release. This should give Svelte time to release more features and give me time to refactor some of my React code to make it more portable. I'm also in the early planning stages of another web app and I'm still considering using Svelte and Sapper to build it. Like I said, Svelte is great, it just isn't not a great fit for my blog right now.

I've also only been working with Svelte for a few months, and it is entirely possible that these things _are_ doable and I just haven't discovered how. If that's the case I would absolutely love to be told I'm wrong, let me know [@ryanfiller_](https://twitter.com/ryanfiller_) on Twitter and I'll update this article with the fix.
