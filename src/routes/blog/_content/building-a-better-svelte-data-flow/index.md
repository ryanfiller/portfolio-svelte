---
title: Building a Better Svelte Data Flow
options:
  published: true
banner:
  src: '/images/tom-and-jerry-mouse-trap.jpg'
  alt: 'Tom from Tom and Jerry designing a better mouse trap'
  attribution: 'Tom and Jerry, MGM Cartoons'
meta:
  date: '2021-03-28'
  excerpt: How I got Sapper parameter-based routing, mdsvex and unified markdown preprocessing, dynamic import statements, and server-sider rending all working together.
  categories:
    - code
  tags:
    - svelte
    - sapper
    - jamstack
    - blogging
---

<script>
  import Parts from './_components/parts.svg'
  import DataFlowChart from './_components/data-flow-chart.svelte'
  import { sapper, mdsvex, combined } from './_data.js'
</script>

<Parts /> <!-- put these in the document so they can be reused everywhere -->

This blog has been running as a [Svelte](https://svelte.dev/)-powered [Sapper](https://sapper.svelte.dev/) app since October 2020. Before changing frameworks from [Gatsby](https://www.gatsbyjs.com/) I put together a [test site](https://sapper-goals.netlify.app/) and wrote a [blog post](/blog/a-deep-dive-into-sapper) about what I learned about configuring Sapper. I found a set up that worked for me, so I [switched my site over](https://github.com/ryanfiller/portfolio-svelte/commit/12a1de926c681ca182be8fca1030b42c4c9ff3cf).

The data flow I explored on my test site worked perfectly enough until I ran into a snag — I wanted to compose a post with information from two different sources without having to load data client side and rerender. I built a solution that I think combines the best of Sapper’s native data flow with mdsvex’s powerful preprocessing.

This post is a somewhat deep dive, so if it's confusing checkout the [original Sapper/mdsvex post](/blog/a-deep-dive-into-sapper) and come back after that.

If you want to skip the technical explanations of Sapper and mdsvex and get right to how I solved the problem, [start here](#combining-the-best-of-both-worlds).

## How does Sapper work?

Sapper uses file based routing where files and folders are used to build out the page structure of the final site. The [Sapper documentation](https://sapper.svelte.dev/docs#Routing) has a section about how this works, but if you're new to the framework I think it's more informative to look at the `/routes` directory in the [`sapper-template` starter repo](https://github.com/sveltejs/sapper-template/tree/master/src/routes).

Each file in `/routes` corresponds to a url endpoint on the site. So `/routes/about` will produce `/about.html`, `/routes/about/me` produces `/about/me.html` and so on with no limit for how deep nesting goes. This post is mostly about routes that use dynamic parameters, examples of which can be found in the [`sapper-template`'s blog directory](https://github.com/sveltejs/sapper-template/tree/master/src/routes/blog).

The `sapper-template` skips over this step for brevity, but normally a site will contain a collection of markdown files containing the content for each post. In order for Sapper to use this content, two dynamic routes need to exist — `index.json.js` and `[slug].json.js`.

`index.json.js` will use the [`node` file system API](https://nodejs.org/api/fs.html) to look through the markdown files and build a list. `[slug].json.js` needs to use something like [`unified`](https://github.com/unifiedjs/unified) to turn the markdown into valid HTML.

<DataFlowChart data={sapper.generateJson} />

`.svelte` files inside the `/routes` directory get access to a special [`preload()` function](https://sapper.svelte.dev/docs#Preloading) that can be called from the [`<script context='module'>`](https://svelte.dev/docs#script_context_module) tag. Inside this function pages can access any `params` captured via the brackets in their file name. `[slug].svelte` can use `params.slug` and [`fetch()`](https://sapper.svelte.dev/docs#this_fetch) to make a call against the corresponding `/[slug].json` route and get data.

<DataFlowChart data={sapper.generateComponent} />

If the app is being run in [`sapper build ` mode](https://sapper.svelte.dev/docs#sapper_build), `[slug].svelte` will fetch data and generate a page whenever a user visits a url that corresponds to an existing markdown file. Building a site with [`sapper export`](https://sapper.svelte.dev/docs#Exporting) will crawl any links on a site and pre-build and statically export any pages it finds.

<DataFlowChart data={sapper.export} />

One final important Sapper concept is [layouts](https://sapper.svelte.dev/docs#Layouts). A file named `_layout.svelte` will automatically be rendered for any page within that route, with the component passed into the `_layout`'s default [`<slot />`](https://svelte.dev/docs#slot). This is helpful for any elements that will be repeated on every final page, like a header and footer or navigation. One very important consideration, however, is that because of how data flows from parent to child, a `_layout` does _not_ have access to the `$$props` object that its child receives.

<DataFlowChart data={sapper.layouts} />

## How does mdsvex work?

[mdsvex](https://mdsvex.com/) is a tool that lets you embed functional Svelte components right into Markdown files. In fact, this is how the charts on this page are working. It also hooks into Sapper's call to [`svelte.preprocess`](https://svelte.dev/docs#svelte_preprocess) to take away some of the manual work of creating pages. mdsvex is a preprocessor for Sapper, so all of the same rules for the Sapper `/routes` directory still apply.

Instead of having to deal with dynamically named `[slug].svelte` files, mdsvex will take any files with a [given extension](https://mdsvex.com/docs#extensions) and create Svelte components. Because these files live within the `/routes` directory Sapper will see them as pages and create routes for them.

<DataFlowChart data={mdsvex.preprocess} />

Under the hood, `mdsvex` fetches data similarly to Sapper, but [uses the markdown's frontmatter](https://mdsvex.com/docs#frontmatter-1) to create a data object and pass it into the component as [props](https://svelte.dev/docs#Attributes_and_props). This takes the place of manually running `fetch` inside of the `preload` function. mdsvex will parse markdown into HTML, and can be given a Svelte `layout` component that will function similar to a Sapper `_layout`. Unlike a `_layout`, an mdsvex `layout` _will_ be passed the `$$props` object.

<DataFlowChart data={mdsvex.compile} />

Once these Svelte pages are created, the same flow for Sapper applies. In order for mdsvex to work with Sapper, all scripts need to be run with the [`--ext` flag](https://mdsvex.com/docs#with-sapper). This flag will allow Sapper to treat non `.svelte` files as routes and pick them up during the `sapper export` process. This is an important distinction — instead of relying on Sapper to crawl and generate each page, mdsvex will always create a Svelte file and corresponding route. Another important caveat here is that mdsvex-generated components will not run a `preload` function. These genreated components are regular Svelte components and don't work the same as Sapper page routes.

<DataFlowChart data={mdsvex.export} />

## Shortcomings

Locking in to a workflow usually comes with a series of tradeoffs. By far the largest benefit of using mdsvex is the ability to put components directly into markdown files. I was able to write over a dozen posts this way before running into any complications. mdsvex is great at taking data from one `.md` file and transforming it into one `.svelte` file, but what if data needs to come from _two_ sources?

My real world example of this popped up when I was adding the post-as-a-series feature to my blog. Each series would have a `.json` file containing a `name` and short description. Each post in that series contains a frontmatter `series` field. The posts' `series` field would need to correspond to a series `name` in order to link to extra data. This would function similar to a [`primary key` and `foreign key` database relationship](https://www.w3schools.com/sql/sql_foreignkey.asp).

One way to link between this data would be to do the work in the `node` code that runs to generated each `post.json` file.

<DataFlowChart data={sapper.synthesizeJson} />

A different way to do this would be to run `fetch()` against multiple endpoints and return one final `data` object to the component.

<DataFlowChart data={sapper.multipleFetch} />

Because I'm set on using components in my markdown, I have to use mdsvex. It works a little differently as it's data sources are one-in, one-out. Getting extra data from the `blog/series.json` route would need to be done inside of an [`onMount() callback`](https://svelte.dev/docs#onMount). This would happen moments _after_ a user loads the page and wouldn't happen during server side prerendering at all. This would trigger a flash of content loading, which I really want to avoid. "Cumulative Layout Shift," or "CLS" is one of Google's new [Web Vitals](https://web.dev/cls/), so this would hurt my [Lighthouse](https://developers.google.com/web/tools/lighthouse) scores and SEO page rankings.

<DataFlowChart data={mdsvex.onMount} />

![data being loading in after render via `onMount`](/images/fetch-loading-on-mount-slow.mp4){data-caption="slowed to 25% speed"}

### Fetching data in other places

The other option is to run `fetch()` from a Sapper `_layout` file that wraps each page, but this presents an interesting problem. Because of the way that Svelte _"surgically updates the DOM,"_ the `_layout.svelte` file is actually mounted and rendered _once_ and its `<slot />` content is dynamically changed out when Sapper changes routes.

You can force a refetch of a data here using a [reactive statement](https://svelte.dev/docs#3_$_marks_a_statement_as_reactive) and pass it down, but because of the way Svelte's lifecycle works this will result in the same problem where data is loaded after initial render.

## Combining both page composition methods

<!-- ![orange and vanilla soft serve ice cream](/images/creamsicle-swirl-icecream.jpg){data-align='right' data-small='true' data-caption='Creamsicle swirl is truly greater than the sum of its parts.'} -->

Let's review what we know at this point —

- Sapper can use a dynamic component to take slug from a url, turn it into a file path, then fetch and preload data.
- `fs` can make a list of files, then `sapper export` can crawl it to produce HTML pages.
- mdsvex will generate a component from any file in a directory, even if the routes are not crawled by Sapper.
- In order to get data at the right time, it needs to be fetched from the `preload` method of a page.
- Anything done in a `preload()` from a route can be server rendered by `sapper export`.

So what would an ideal data flow look like?

A browser (or the Sapper crawl process) would visit a url and load a dynamic `[slug].svelte` route. This route would then be able to call a `preload` function and `fetch` any `json` data, as well as find the `.md` content that's been transformed by `mdsvex`.

<DataFlowChart data={combined.outline} />

### Getting data

This is pretty much the default Sapper workflow, but we need a way to loop in components generated by `mdsvex` _without_ letting it take over as the de facto route generator. There are three important features that can work together to do this —

- Sapper files and directories with a leading underscore [do not create routes](https://sapper.svelte.dev/docs#File_naming_rules).
- mdsvex can [import `{ metadata }` from any file's frontmatter](https://mdsvex.com/docs#frontmatter-1), but it _also_ exports the generated `default` transformed page body.
- mdsvex will generate these components even if a route is _not_ created.

If a `.md` file lives directly inside `routes/blog`, `mdsvex` is going to turn it into a page and Sapper will load it for a given url instead of the generic `[slug].svelte`. The first thing to do is avoid this by moving all of the posts into a `_content` directory.

```text
└─ blog/
  ├─ _content/
  │ ├─ post1/
  │ │ └─ index.md
  │ └─ post2/
  │   └─ index.md
  ├─ [slug].svelte
  └─ _series.json
```

The next step is to manually find these files from `[slug].svelte`'s `preload` function. For this we need to add the [`@rollup/plugin-dynamic-import-vars`](https://www.npmjs.com/package/@rollup/plugin-dynamic-import-vars) package so we can use the `slug` to find and load the component that `mdsvex` generates. `import` statements won't usually work with dynamic [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), but `@rollup/plugin-dynamic-import-vars` will let us import from a file path that includes a `slug` variable.

With the plugin installed, `[slug].svelte` can load this file, get the `default` export containing the `.md` content and the `metadata` export containing the frontmatter, _and_ still make a `fetch()` call to `/series.json` and sync up the data.

```javascript
<script context='module'>
  export async function preload(page) {

    const { slug } = page.params

    const component = await import(`./_content/${slug}/index.md`)

    const series = await this.fetch(`/blog/series.json`)
      .then(response => response.json())
      .then(series => logicToLinkUpPostToSeries(...))
    )

    return {
      page: component.default,
      metadata: component.metadata,
      series: series
    }
  }
</script>
```

Since all of this happens within an [`asynchronous`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) `preload` function the page will wait to render until the data is resolved and we can avoid components loading in after initial render.

### Rendering the page

There are two things to be aware of for rendering this data.

First, is `component.default`. If you `console.log()` the import it will show different two ydrthings depending on where it is logged.

```javascript
//  console.log(component.default) from <script context='module'> tag
{ render: [Function: render], '$$render': [Function: $$render] }

//  console.log(page) from regular <script> tag
class Post { constructor(options) }
```

What's going on here is best explained in the [Routing section of the Sapper docs](https://sapper.svelte.dev/docs#Routing):

> When a user first visits the application, they will be served a server-rendered version of the route in question, plus some JavaScript that 'hydrates' the page and initialises a client-side router. From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel.

In short, this means that the Sapper server will render the component using the `render()` function to return stringified HTML. Then the Svelte client will hydrate that HTML by instantiating the `class` at run time in the browser. Instead of sorting this out manually, the entire component can be passed into a special [`<svelte:component />` tag](https://svelte.dev/docs#svelte_component) that will automatically take care of running each at the appropriate time.

<DataFlowChart data={combined.svelteComponent} />

The second concern is getting data to the correct component. Since some of the work is done behind the scenes by compilers, we can't always imperatively pass `props` down from one component to its direct children. Svelte provides a way around this with the [`context` API ](https://svelte.dev/docs#setContext). Rather than having to send a prop directly down the chain from parent to child, `context` provides a way to skip links in the chain and get data from a parent to any deeply nested child.

```javascript
<App>
  <_layout>
    <mdsvexLayout>
      <[slug].svelte>
        <svelte:component this={Page} />
      </[slug].svelte>
    </mdsvexLayout>
  </_layout>
</App>
```

After getting the `series.json` data inside of `[slug].svelte` we can call `setContext` to store data inside of a context object. Since the `<Page />` component generated by `mdsvex` will be a child component we can call `getContext` and check if the current page has a value for `series` and the UI can act accordingly.

```javascript
 // [slug].svelte
<script context='module'>
  export async function preload(page) {
    ...
  }
</script>

<script>
  export let page
  export let series
  import { setContext } from 'svelte'
  setContext('series', series)
</script>

<svelte:component this={page} />

// page.svelte
<script>
  import { getContext } from 'svelte'
  const series = getContext('series')
<script/>

{#if series}  
  ...
{/if}
```

The final data flow works like this.

<DataFlowChart data={combined.final} />

## My `sapper-mdsvex-starter`

If this sounds cool or useful to you (and I hope it does!), I've put together a [starter template repo](https://github.com/ryanfiller/sapper-mdsvex-starter) that can be used to get a blog with this data flow up and running.

This data flow is _weird_. I couldn't find anything else online using a similar set up, or even a different tool chain to solve the same problem. This was able to solve my use case, but if there's a better way or just any feedback, feel free to let me know in the [GitHub issues](https://github.com/ryanfiller/sapper-mdsvex-starter/issues), on [Twitter](https://twitter.com/ryanfiller_), or on the [Svelte discord](https://discord.com/channels/457912077277855764/) where I'm `@ryfill`.

## Special thanks

Huge thank you to everyone in the Svelte discord for helping me rubber duck through this code, especially [Jacob Babich](https://twitter.com/babichjacob). Also thank you to [kev](https://twitter.com/kevmodrome) and [pngwn](https://twitter.com/evilpingwin) for fact checking this post.
