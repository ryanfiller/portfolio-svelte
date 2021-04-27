---
title: 'Transforming Markdown with Remark & Rehype'
banner:
  src: '/images/optimus-prime-2.jpg'
  alt: 'Optimus Prime, leader of the Autobots'
  attribution: 'The Transformers: The Movie, Hasbro'
options:
  published: true
meta:
  categories:
    - code
  date: 2020-10-31
  excerpt: >-
    Writing custom plugins to give extra powers to Markdown syntax using the Unified ecosystem.
  tags:
    - markdown
    - blogging
---

<script>
  import { Tabs, Tab } from '../../../../components/misc/tabs/index.js'
</script>
 
My blog, like a lot of [JAMstack](https://jamstack.org/) content, is written in [Markdown](https://en.wikipedia.org/wiki/Markdown). I've [written](/blog/tips-and-tricks-ive-learned-about-gatsby-with-netlifycms#gatsby-plugin-mdx) about how I've used [`MDX`](https://mdxjs.com/) as a parser to give my Markdown extra power. I've also written a bit about some of the [shortcomings](/blog/things-svelte-and-sapper-cant-do-yet#mdsvex-headings-in-sapper) I've had trying to replicate the same `MDX` functionality in [`MDsveX`](https://mdsvex.com/). One thing that `MDX` and `MDsveX` have in common is that they are both built on top of the [`remark`](https://unifiedjs.com/explore/package/remark/) and [`rehype`](https://unifiedjs.com/explore/package/rehype/) packages from the [unified](https://unifiedjs.com/) ecosystem. Both parsers use these dependencies and they each have the ability to use any plugin that would work with the raw `remark` or `rehype` processors. To make my workflow less coupled to a specific technology, I decided to move the transformations up a level of abstraction. Instead of using `MDX` I wrote a series of plugins to transform my markdown.

## How do Markdown Parsers Work?

Markdown parsers work by taking a file, running it through a series of transformers, and then producing HTML for the browser. The transformation steps involve turning documents into a common shape that different tools can read and interpret, called an [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree). Put shortly —

> Abstract syntax trees are data structures widely used in compilers to represent the structure of program code. An AST is usually the result of the syntax analysis phase of a compiler. It often serves as an intermediate representation of the program through several stages that the compiler requires, and has a strong impact on the final output of the compiler.
> ***
> [Wikipedia](https://en.wikipedia.org/wiki/Abstract_syntax_tree#Application_in_compilers)

<Tabs name='transform examples'>
  <Tab title='Markdown'>

  ```markdown
  # Luminous beings are we, not this crude matter.
  ```

  </Tab>
  <Tab title="AST">

  ```json
  {
    type: "heading",
    depth: 1,
    children: [
      {
        type: "text",
        value: "Luminous beings are we, not this crude matter."
      }
    ]
  }
  ```

  </Tab>
  <Tab title="HTML">

  ```html
  <h1>Luminous beings are we, not this crude matter.</h1>
  ```

  </Tab>
</Tabs>

It isn't necessary to understand the computer science behind an abstract syntax tree (AST) to work with plugins. All you need to know is that an AST is an intermediary step that a compiler takes between taking in a `.md` and outputting an `.html` file. To paraphrase heavily from the [`mdsvex` docs](https://mdsvex.com/docs#remarkplugins--rehypeplugins), the source file is first parsed into a Markdown AST ([MDAST](https://github.com/syntax-tree/mdast)), where `remark` plugins run. Then the data is converted into an HTML AST ([HAST](https://github.com/syntax-tree/hast)), where `rehype` plugins run. Finally the data is converted (stringified) into valid markup for the browser.

### What is Remark?

<!-- ewww... -->

<dl>
  <dt>
    <dfn><strong>remark</strong></dfn> is a <a href='https://unifiedjs.com/explore/package/unified/' rel='nofollow noopener noreferrer'><strong>unified</strong></a> processor to parse and serialize Markdown.
  </dt>
  <dd>
    API by <a href='https://unifiedjs.com/explore/package/unified/' rel='nofollow noopener noreferrer'><strong>unified</strong></a>
  </dd>
  <dd>
    Parses Markdown to a syntax tree with <a href='https://unifiedjs.com/explore/package/remark-parse/' rel='nofollow noopener noreferrer'><code>remark-parse</code></a
  ></dd>
  <dd>
    <a href='https://github.com/syntax-tree/mdast' rel='nofollow noopener noreferrer'><strong>mdast</strong></a> syntax tree
  </dd>
  <dd>
    <a href='https://github.com/remarkjs/remark/blob/main/doc/plugins.md' rel='nofollow noopener noreferrer'>Plugins</a> transform the tree
  </dd>
  <dd>
    Serializes syntax trees to Markdown with <a href='https://unifiedjs.com/explore/package/remark-stringify/' rel='nofollow noopener noreferrer'><code>remark-stringify</code></a>
  </dd>
</dl>

### What is Rehype?

<dl>
  <dt>
    <dfn><strong>rehype</strong></dfn> is a <a href='https://unifiedjs.com/explore/package/unified/' rel='nofollow noopener noreferrer'><strong>unified</strong></a> processor to parse and serialize HTML
  </dt>
  <dd>
    API by <a href='https://unifiedjs.com/explore/package/unified/' rel='nofollow noopener noreferrer'><strong>unified</strong></a>
  </dd>
  <dd>
    Parses HTML to the tree with <a href='https://unifiedjs.com/explore/package/rehype-parse/' rel='nofollow noopener noreferrer'><code>rehype-parse</code></a>
  </dd>
  <dd>
    <a href='https://github.com/syntax-tree/hast' rel='nofollow noopener noreferrer'><strong>hast</strong></a> syntax tree
  </dd>
  <dd>
    <a href='https://github.com/rehypejs/rehype/blob/master/doc/plugins.md' rel='nofollow noopener noreferrer'>Plugins</a> transform the tree
  </dd>
  <dd>
    Serializes the tree to HTML with <a href='https://unifiedjs.com/explore/package/rehype-stringify/' rel='nofollow noopener noreferrer'><code>rehype-stringify</code></a>
  </dd>
</dl>

### When to use Each?

I couldn’t find a hard and fast rule for when to use `remark` and when to use `rehype`. There are ways  to get the same end result with either tool. My rule of thumb for  this project had to do with the original format of the content I was  manipulating. If the plugin would run on markdown syntax I used `remark`. If the plugin was running on any HTML used directly in the document, I used `rehype`. In either scenario the transformation is done by manipulating values in the syntax tree, so the process isn’t too different.

## Manipulating the AST

[This CSS-Tricks article](https://css-tricks.com/how-to-modify-nodes-in-an-abstract-syntax-tree/) by [Jason Lengstorf](https://twitter.com/jlengstorf) goes into deep detail about how ASTs work and best practices for editing them. Here are a few key points I wanted to highlight.

 - ASTs are the best way to make programmatic changes to HTML. HTML is hard (maybe even impossible) to parse with [RegEx](https://en.wikipedia.org/wiki/Regular_expression), so trying to change it without using an AST is often error prone.
 - Contrary to usual best practices, ASTs should be treated as [mutable](https://developer.mozilla.org/en-US/docs/Glossary/Mutable). Because AST documents can be very large, making copies of the data and making changes to those copies can be detrimental to performance. Manipulations are best made directly to the original AST.
 - AST transformations work [recursively](https://developer.mozilla.org/en-US/docs/Glossary/Recursion), so if new nodes are added the transformer will find them and try to transform them too. This is important to be aware of to avoid accidental infinitely deep loops.

### Basic Plugin Structure

A plugin works by creating a JavaScript function that returns a `transformer` method. That transformer will be run on each `node` that is found by the [`unist-util-visit` package's](https://www.npmjs.com/package/unist-util-visit) `visit` method. The plugin will be called by the `unified` process and will be passed the AST tree. There are many ways to directly mutate the tree, but I found the easiest was to use [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to overwrite the existing tree nodes with new values.

```javascript
import visit from 'unist-util-visit'

function transformer(ast) {
  visit(ast, 'TYPE', visitor)

  function visitor(node) {
    newNode = 'do work here'
    return Object.assign(node, newNode)
  }
}

function plugin() {
  return transformer
}

export default plugin
```

The second argument for the `visit` method is a node `type` that the transformation will be applied to. The `unist` ecosystem comes with a predefined list of [literal types](https://github.com/syntax-tree/unist#literal), but plugins can define their own custom ones. I found that copy / pasting HTML into this [AST Explorer tool](https://astexplorer.net/) was a super helpful way to find the exact string that each node type matched against. For HTML elements that don't have an explicit `type`, `visit` can find `raw` nodes and then match them with RegEx. If, like me, you're not that great at RegEx, I found a [RegeEx testing tool](https://regex101.com/) to be invaluable while I was working.

### Reworking Attributes on an Existing Element

It is a [controversial opinion](https://css-tricks.com/use-target_blank/), but I prefer to use `target='_blank'` on links external to my site. I cite a lot of sources via links, and I don't want readers to lose their place on my page after clicking on an external resource. There are two things this plugin needs to do — apply the correct `target` attribute, but more importantly it needs to add some other attributes to fix [a security concern](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/). One nice thing about adding these with a plugin is that I do not have to write these extra attributes manually on every link. Also if I ever change my opinion on where links should open I can remove them all at once by editing the plugin.

The original AST tree for a `link` node looks roughly like this:

```javascript
{
  type: 'link',
  title: 'string,
  url: 'string',
  children: [
    {
      type: 'text',
      value: 'string',
    }
  ],
}
```

In short, this plugin visits `link` nodes and uses RegEx to determine if they linked to external sites, then if it does, assign some extra [`hProperties`](https://github.com/syntax-tree/mdast-util-to-hast#hproperties) to the node. Nodes of different types come with different default `data` values (for instance, a `link` node has a `data.url` value), and `hProperties` are sort of a catchall for all other attributes.

```javascript
function transformer(ast) {
  visit(ast, 'link', visitor)

  function visitor(node) {
    const data = node.data || (node.data = {})
    const props = data.hProperties || (data.hProperties = {})
    const url = node.url


    if(url.includes(siteUrl)) {
      return
    } else {
      props.target = '_blank'
      props.rel = 'noopener'
      return
    }
  }
}

function links() {
  return transformer
}

export default links
```

The `transformer` function will look at all `links`, determine if their `data.url` contains the url of the current site, and assign `data.hProperties` of `target = '_blank'` and  `rel = 'noopener'` to links that do not. Again, these values need to mutate the tree directly, so that's why the new values are set on the original `node` rather than creating a copy.

<Tabs name='link examples'>
  <Tab title='Markdown'>

  ```markdown
  [an intneral link](https://www.ryanfiller.com/about)
  [an external link](https://developer.mozilla.org)
  ```

  </Tab>
  <Tab title="HTML">

  ```html
  <a href="https://www.ryanfiller.com/about">
    an intneral link
  </a>
  <a target="_blank" rel="noopener" href="https://developer.mozilla.org">
    an external link
  </a>
  ```

  </Tab>
  <Tab title="Rendered">

  [an intneral link](https://www.ryanfiller.com/about)

  [an external link](https://developer.mozilla.org)

  </Tab>
</Tabs>

See the full code for the plugin on [GitHub](https://github.com/ryanfiller/portfolio-svelte/blob/main/plugins/remark/links.js).

### Inserting New Child Elements

This plugin reads any [heading element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) and automatically converts it to a linkable hash. It also creates an `<a>` tag that a user can click to easily copy the hash out of the url bar.

The original AST tree for a `heading` node looks roughly like this:

```javascript
{
  type: 'heading',
  depth: number,
  children: [
    {
      type: 'text',
      value: 'string'
    }
  ]
}
```

This plugin needs to take the original `text` children of the element and convert it into a url hash. Then it replaces the original child elements with a new  anchor tag that contains both the original text and the hashed text. To handle some edge cases this plugin uses another plugin,  [remark-stringify](https://www.npmjs.com/package/remark-stringify), to convert the entire element into one string. This will catch scenarios where headings contain bold or italic text without accidentally stringifying a `<strong>` or `<em>` tag.

```javascript
function transformer(ast) {
  visit(ast, 'heading', visitor)

  function visitor(node) {
    const data = node.data || (node.data = {})
    const props = data.hProperties || (data.hProperties = {})
    const slugId = slugify(toString(node))

    data.id = slugId
    props.id = slugId

    const originalChildren = [...node.children]

    node.children = [{
      type: 'link',
      url: `#${slugId}`,
      children: originalChildren
    }]
  }
}

function headings() {
  return transformer
}

export default headings
```

In order to wrap the original text element, the [...spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) can be used to create a new array filled with the data from the original `heading`. Then a new `children` array that contains a single `link` type node can be assigned to the `heading`. The new `link` node will have all the elements of the original heading.

<Tabs name='heading examples'>
  <Tab title='Markdown'>

  ```markdown
  ### It was a dark and stormy night.
  ```

  </Tab>
  <Tab title="HTML">

  ```html
  <h3 id="it-was-a-dark-and-stormy-night">
    <a href="#it-was-a-dark-and-stormy-night">
      It was a dark and stormy night.
    </a>
  </h3>
  ```

  </Tab>
  <Tab title="Rendered">
    <h3 role='none' id="it-was-a-dark-and-stormy-night">
      <a href="#it-was-a-dark-and-stormy-night">
        It was a dark and stormy night.
      </a>
    </h3>
  </Tab>
</Tabs>

See the full code for the plugin on [GitHub](https://github.com/ryanfiller/portfolio-svelte/blob/main/plugins/remark/headings.js).

### Wrapping an Element with a New Element

In a [previous post](/blog/fighting-with-git-lfs#why-use-lfs) I explained how I was using [Netlify LFS](https://www.netlify.com/products/large-media/) to host and resize images using url parameters. This is something I wanted to automate using `remark`. I also wanted to augment the native Markdown image syntax using the [`remark-attr` plugin](https://www.npmjs.com/package/remark-attr) to pass a `data-caption` attribute. If this attribute exists I want to take that element and wrap it in a `<figure>` tag with the caption inside of a `<figcaption>`.

The original AST tree for a `image` node looks roughly like this:

```javascript
{
  type: 'image',
  url: 'string',
  alt: 'string',
  data: {
    hProperties: {
      data-caption: 'string'
    }
  }
}
```

The most important part of this transformation is to mutate the `children` array in a way that doesn't cause an infinite loop. Since the `visit` function will work recursively, if the number of children changes then the new nodes will also be visited. If a transformer creates a node that can itself be transformed, this will go on forever and crash the build process.

```javascript
function transformer(ast) {
  visit(ast, 'image', visitor)

  function visitor(node) {
    const data = node.data || (node.data = {})
    const props = data.hProperties || (data.hProperties = {})
    let src = node.url
    const alt = node.alt
    const caption = props['data-caption']

    const skipSrcSet = ['.gif', '.svg'].some(ext => src.includes(ext))

    if (!skipSrcSet) {
      src = `srcset="${src}?nf_resize=fit&w=500 500w, ${src}?nf_resize=fit&w=800 800w"
        sizes="100vw"
        src="${src}?nf_resize=fit&w=1000"
      `
    }

    let newNode = null
    if (caption) {
      newNode = {
        type: 'html',
        value: `<figure>
          <img src=${src} alt="${alt}" />
          <figcaption>${caption}</figcaption>
        </figure>`
      }
    } else {
      newNode = {
        type: 'html',
        value: `<img src=${src} alt="${alt}" />`
      }
    }
  
    Object.assign(node, newNode)
  }
}

function images() {
  return transformer
}

export default images
```

Since Netlify Large media will only offer transforms for certain types of images I created an array of extensions that I wanted my function to ignore. If the file type wasn't a `.gif` or a `.svg`, I would apply a series of query parameters to get back resized images. To decide between creating a `<figure>` or an `<img>` an `if()` statement checks whether the node contains `hProperties['data-caption]`. In either scenario, a new node is created with type `html` and a `value` is passed with a string literal for what will be rendered in the DOM.

In order to keep this plugin from infinitely creating and visiting new `image` type nodes is to used `Object.assign` to overwrite the current node and never create new ones. By doing this we preserve the original index in the AST tree and the transformer will understand that it's already seen this node and not visit it again.

<Tabs name='image examples'>
  <Tab title='Markdown'>

  ```markdown
  ![alt text](/images/picture.jpg)
  ![alt text](/images/picture.jpg){data-caption='a caption'}
  ```

  </Tab>
  <Tab title="HTML">

  ```html
  <img
    alt="alt text"
    src="/images/picture.jpg?nf_resize=fit&w=1000"
    srcset="/images/picture.jpg?nf_resize=fit&w=500 500w,
      /images/picture.jpg?nf_resize=fit&w=800 800w"
    sizes="100vw"
  />
  <figure>
    <img
      alt="alt text"
      src="/images/picture.jpg?nf_resize=fit&w=1000"
      srcset="/images/picture.jpg?nf_resize=fit&w=500 500w,
        /images/picture.jpg?nf_resize=fit&w=800 800w"
      sizes="100vw"
    />
    <figcaption>
      a caption
    </figcaption>
  </figure>
  ```

  </Tab>
  <Tab title="Rendered">
  <section style='display: flex; justify-content: space-evenly;'>

  !['placekittens'](https://placekitten.com/500/750){data-small='true'}

  !['placekittens'](https://placekitten.com/500/750){data-caption='a caption' data-small='true'}
  
  </section>
  </Tab>
</Tabs>

See the full code for the plugin on [GitHub](https://github.com/ryanfiller/portfolio-svelte/blob/main/plugins/remark/images.js).

### Hijacking Existing Syntax to Create New Markup

Markdown supports shorthand for a limited number of elements, and to the best of my knowledge no more are being added. For elements with no shorthand you can always use HTML directly in a `.md` file. For some elements this can be very verbose. Wouldn't it be nice to steal some of the concise syntax for, say, an image but use it instead for a video file?

```markdown
![a video]('./video.mp4)
```

![a broken img tag with an .mp4 src attribute](/images/video-src-broken-image.png){data-small='true' data-align='right'}

Since linking to a video with the image syntax doesn't create a working element, `remark` can change the markup to work for video. Be very careful with this idea and make sure you're not overwriting any valid usecases. I _think_ I'm fine in this scenario since pointing an `<img>` tag to a video file will always result in a broken image. Inside the `image` transformer, the function can check the file type of the `src` attribute and return a new `Object.assign` with completely different markup depending on the extension.

```javascript
function transformer(ast) {
  visit(ast, 'image', visitor)

  function visitor(node) {
    const data = node.data || (node.data = {})
    let src = node.url
    const alt = node.alt

    // escape hatch into video component
    if(node.url.includes('.mp4')) {
      const video = {
        type: 'html',
        value: `
        <video title="${alt}" controls loop autoplay>
          <source src="${src}" type="video/mp4" muted />
          Sorry, your browser doesn't support embedded videos.
          <track kind="descriptions" label="${alt}" />
        </video>`
      }
      return Object.assign(node, video)
    }

    // else, original image transformation
    ...
  }
}

function images() {
  return transformer
}

export default images
```

<Tabs name='video examples'>
  <Tab title='Markdown'>

  ```markdown
  ![alt text](/videos/video.mp4)
  ```

  </Tab>
  <Tab title="HTML">

  ```html
  <video title="alt text" controls loop autoplay>
    <source src="/videos/video.mp4" type="video/mp4" muted />
    Sorry, your browser doesn't support embedded videos.
    <track kind="descriptions" label="alt text" />
  </video>
  ```

  </Tab>

  <Tab title="Rendered">

  ![alt text](https://media3.giphy.com/media/GnwgrKkFALUHESX9U7/giphy.mp4)

  </Tab>
</Tabs>


See the full code for the plugin on [GitHub](https://github.com/ryanfiller/portfolio-svelte/blob/main/plugins/remark/video.js).

### Transforming HTML

So far all of the examples I’ve covered have taken in markdown content and looked at the MDAST tree to make changes. `rehype` plugins will look at HTML content in the HAST tree and work almost exactly the same as `remark` MDAST plugins. Nodes can have different types than the MDAST tree, but all of the same rules apply.

Even though rendering an `<iframe>` in Markdown requires using the full HTML syntax, I still want to be as terse as possible and add extra values like [`loading='lazy'`](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading#Images_and_iframes) programmatically. Also, until the CSS [`aspect-ratio` property](https://caniuse.com/mdn-css_properties_aspect-ratio) officially lands, I still need to wrap `<iframes>` in a `<div>` and use the [padded box trick](https://css-tricks.com/aspect-ratio-boxes/) to maintain a responsive aspect ratio.

Like `remark`, `rehype` only recognizes a handful of default `types`. Also like `remark`, custom `types` can be created, but I found it was still easier to visit the default HTML `raw` nodes and use RegEx to filter out the ones I wanted.

The RegEx matcher I used looks like this:

```javascript
new RegExp(/<iframe(.*)<\/iframe>/g)
```

And the matching AST node looks roughly like this:

```javascript
{
  type: 'raw',
  value: '<iframe>...</iframe>'
}
```

A downside to working directly with the `raw` node type is there is no concept similar to `hProperties`. The only information the node has is its string literal `value`, so any HTML attributes will need to be filtered out of that string with RegEx. I made a [helper function](https://github.com/ryanfiller/portfolio-svelte/blob/main/src/helpers/index.js#L13) that would take a source string and attribute name and fish them out.

```javascript
function transformer(tree) {
  visit(tree, 'raw', visitor)
  function visitor(node) {
    const iframeRegex = new RegExp(/<iframe(.*)<\/iframe>/g)

    if (node.value && node.value.match(iframeRegex)) {
      const value = node.value.match(iframeRegex)[0]
      const title = fishAttr(value, 'title')
      const src = fishAttr(value, 'src')
      const aspectRatio = fishAttr(value, 'data-aspect-ratio')

      const newValue = `<div class="embed" data-aspect-ratio="${aspectRatio}">
        <iframe src="${src}" title="${title}" loading="lazy"></iframe>
      </div>`

      node.value = node.value.replace(iframeRegex, newValue)
    }
  }
}

function embed() {
  return transformer
}

export default embed
```

Another difference between `rehype` and `remark` is that only the node's `value` property matters, so we can actually use [`String.replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) instead of `Object.assign`. This does as little modification as possible to the HAST tree and can prevent unintentionally assigning over important values, like whitespace, that the RegEx matcher may have accidentally grabbed.

<Tabs name='embed examples'>
  <Tab title='Markdown'>

  ```markdown
  <iframe
    src='https://ryan-responsive-iframe.netlify.com/'
    title='wide screen'
    data-aspect-ratio="16/9"
  ></iframe>
  ```

  </Tab>
  <Tab title="HTML">

  ```html
  <div class="embed" data-aspect-ratio="16/9">
    <iframe
      src="https://ryan-responsive-iframe.netlify.com/"
      title="wide screen"
      loading="lazy"
    ></iframe>
  </div>
  ```

  </Tab>
  <Tab title='Rendered'>

  <div class="embed" data-aspect-ratio="16/9">
    <iframe
      src="https://www.youtube.com/embed/-w-58hQ9dLk/"
      title="wide screen"
      loading="lazy"
    ></iframe>
  </div>

  </Tab>
</Tabs>

See the full code for the plugin on [GitHub](https://github.com/ryanfiller/portfolio-svelte/blob/main/plugins/rehype/embed.js).

### Doing Work Asynchronously

Since these plugins are just node functions, they have the ability to [`fetch`](https://www.npmjs.com/package/node-fetch) out to other sources and get dynamic data at build time. An issue with this workflow is that the `visit` method provided by `unist-util-visit` is not an `async` function and cannot be used with the `await` keyword.

For this particular plugin, I wanted to take the [Twitter provided HTML embed code](https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Fryanfiller_%2Fstatus%2F1259280535421140998&widget=Tweet), strip off the `<script>` tag that would load the JavaScript from Twitter, and instead use `rehype` to format the HTML in a way I could style myself. I used the same strategy as matching `<iframe>` elements, but looked for `<blockquote>`s that had a class of `"twitter-tweet"`.

```javascript
new RegExp(/<blockquote class="twitter-tweet">(.*)<\/blockquote>/)
```

And the matching AST node looks roughly like this:

```javascript
{
  type: 'raw',
  value: '<blockquote class="twitter-tweet">...</iframe>'
}
```

To build my own Twitter component, I needed the url of a user's avatar from the Twitter website. If `fetch` visits Twitter's regular homepage and cannot load client side JavaScript Libraries it will triggers the "you need to load React" warning screen. The only way (that I could think of, anyways) to get a parsable page that contains an avatar url is to `fetch` against `mobile.twitter.com`.

![screenshots of mobile and desktop twitter pages](/images/mobile-vs-desktop-twitter.png){data-caption='What a fetch call sees on mobile.twitter.com vs regular twitter.com'}

Transforming the HTML from the Twitter blockquote works almost exactly the same as the `embed` plugin. I used my `fishAttr` function to get values from the original markup and then plug them into a string literal template. The difference is that instead of using `String.replace()` to create new markup, I created a `render()` function that could be called inside of a `Promise` and passed the returned url for the avatar.

```javascript
const twitter = () => async (tree) => {
  const createTweet = node => {
    const tweetRegex = new RegExp(/<blockquote class="twitter-tweet">(.*)<\/blockquote>/)
  
    if (node.value && node.value.match(tweetRegex)) {
      const value = node.value.match(tweetRegex)[0]

      const render = avatarUrl => (`
        <div class="twitter-tweet">
          // new markup here
        </div>
      `)
    }
  }

  visit(tree, 'raw', createTweet)
}

export default twitter
```

As I previously mentioned, `visit` can’t be used directly with `async`/`await`. Instead, the `createTweet` method passed to `visit` needs to `await` the result of the `fetch` `Promise`. This can be done by storing that `Promise` inside of a variable and pushing it to an array of pending `Promise`s. Then, using `Promise.all`, we can make sure everything pushed to that array is done before the final return from the plugin happens.

```javascript
const twitter = () => async (tree) => {
  
  const promises = []

  const createTweet = node => {
    const tweetRegex = new RegExp(/<blockquote class="twitter-tweet">(.*)<\/blockquote>/)
  
    if (node.value && node.value.match(tweetRegex)) {
      const value = node.value.match(tweetRegex)[0]
      const user = value.match(/&mdash(.*)\)/)[0]
      const handle = user.match(/\((.*)\)/)[1]
      const name = user.match(/&mdash; (.*) \(/)[1]

      const render = avatarUrl => { ... }

      const promise = fetch(`https://mobile.twitter.com/${handle}`)
        .then(response => response.text())
        .then(html => {
          const imageUrlRegex = new RegExp(`<img alt="${name}" src="(.*)" \/>`)
          const imageUrlMatch = html.match(imageUrlRegex)
          return imageUrlMatch[1]
        })
        .then(avatarUrl => {
          const newNodeValue = render(avatarUrl)
          return node.value = node.value.replace(tweetRegex, newNodeValue)
        })
        .catch(() => {})
  
      promises.push(promise)
    }
  }

  visit(tree, 'raw', createTweet)
  await Promise.all(promises)

  return
}

export default twitter
```

A nice thing about `rehype` plugins is that if they return an error, they do not transform the node and move on. If, for whatever reason, the plugin gets into the `.catch()` block of the `fetch` `Promise`, the original blockquote will still exist as it originally was in the AST tree.

<Tabs name='twitter examples'>
  <Tab title='Markdown'>

  ```markdown
  <blockquote class="twitter-tweet">
    <p lang="en" dir="ltr">
      I need to make a tweet embed component for my blog.
    </p>
    &mdash; Ryan Filler (@ryanfiller_)
    <a href="https://twitter.com/ryanfiller_/status/1259280535421140998?ref_src=twsrc%5Etfw">
      May 10, 2020
    </a>
  </blockquote>
  ```

  </Tab>
  <Tab title="HTML">

  ```html
  <div class="twitter-tweet">
    <div >
      <a href="https://twitter.com/ryanfiller_" title="RyanFiller" >
        <img
          alt="Ryan Filler"
          src="https://pbs.twimg.com/profile_images/1038060989147766784/8P25vCc6_normal.jpg"
        >
      </a>
      <div>
        <a href="https://twitter.com/ryanfiller_">
          Ryan Filler
        </a>
        <a href="https://twitter.com/ryanfiller_">
          @ryanfiller_
        </a>
      </div>
      <a
        href="https://twitter.com/ryanfiller_/status/1259280535421140998?ref_src=twsrc%5Etfw"
        title="View on Twitter"
      >
        <svg>...</svg>
      </a>
    </div>
    <div >
      I need to make a tweet embed component for my blog.
    </div>
    <div >
      <span >
        May 10, 2020
      </span>
      <a href="/uses/#embedded-tweets">
        <svg>...</svg>
      </a>
    </div>
  </div>
  ```

  </Tab>
  <Tab title='Rendered'>

  <div class="twitter-tweet"><div class="account"><a class="account__avatar" href="https://twitter.com/ryanfiller_" title="Ryan Filler" target="_blank" rel="noopener noreferrer"><img src="https://pbs.twimg.com/profile_images/1038060989147766784/8P25vCc6_normal.jpg" alt="Ryan Filler"></a> <div class="account__text"><a href="https://twitter.com/ryanfiller_" target="_blank" rel="noopener noreferrer" class="account__name">Ryan Filler</a> <a href="https://twitter.com/ryanfiller_" target="_blank" rel="noopener noreferrer" class="account__handle">@ryanfiller_</a></div> <a class="twitter-logo" href="https://twitter.com/ryanfiller_/status/1259280535421140998?ref_src=twsrc%5Etfw" title="View on Twitter" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></svg></a></div> <div class="tweet">I need to make a tweet embed component for my blog.</div> <div class="meta"><span class="meta__date">May 10, 2020</span> <a class="meta__info" title="View Twitter Embed Policy" href="/uses/#embedded-tweets"><svg viewBox="0 0 24 24"><g><path d="M12 18.042c-.553 0-1-.447-1-1v-5.5c0-.553.447-1 1-1s1 .447 1 1v5.5c0 .553-.447 1-1 1z"></path><circle cx="12" cy="8.042" r="1.25"></circle><path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path></g></svg></a></div></div>

  </Tab>
</Tabs>

See the full code for the plugin on [GitHub](https://github.com/ryanfiller/portfolio-svelte/blob/main/plugins/rehype/twitter.js).

Huge thank you to [Chris Biscardi](https://twitter.com/chrisbiscardi) for being available in the [Party Corgi Discord group](https://www.partycorgi.com/) and pointing me to this `async` example, again by [Jason Lengstorf](https://twitter.com/jlengstorf).

## Using the Plugins

I've found two situations to use these plugins on my own site — to pass to a build tool to create pages, or to call from the `unified` method directly for RSS.

For compiling pages, an array of plugins can be passed as part of the configuration object to both [MDX](https://mdxjs.com/advanced/plugins) (and its [Gatsby implementation](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#remark-plugins)) and [MDsveX](https://mdsvex.com/docs#remarkplugins--rehypeplugins).

<Tabs name='configuration objects'>
  <Tab title='gatsby-config.js'>

  ```javascript

  plugins = [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md'],
        remarkPlugins: [
          require(`remark-attr`),
          require(`${__dirname}/plugins/remark/blockquote`),
          require(`${__dirname}/plugins/remark/headings`),
          require(`${__dirname}/plugins/remark/images`),
          require(`${__dirname}/plugins/remark/links`),
        ],
        rehypePlugins: [
          require(`${__dirname}/plugins/rehype/embed`),
          require(`${__dirname}/plugins/rehype/twitter`)
        ],
      }
    }
  ]
  ```

  </Tab>
  <Tab title="rollup.config.js">

  ```javascript

  svelte({
    mdsvex({
      extension: '.md',
      remarkPlugins: [
        [attr, { scope: 'every' }],
        blockquote,
        headings,
        images,
        links,
      ],
      rehypePlugins: [
        embed,
        twitter
      ]
    })
  })
  ```

  </Tab>
</Tabs>

The entire purpose of this refactor was to make my content more  portable. The best part of this is that these plugins can be run outside of a framework. Like any other `remark` or `rehype` plugins, they can also be called as chained methods from the parent `unified` function. I use this in a [helper method](https://github.com/ryanfiller/portfolio-svelte/blob/main/src/helpers/get-pages.js) to create `json` and `rss` endpoints of my content.

```javascript
  unified()
    .use(remarkParse)
    // use remark plugins here
    .use(remarkStringify)
    .use(remarkToRehype)
    // use rehype plugins here
    .use(rehypeStringify)
    .process(file, (err, file) => {
      // ...
    })
```

Plugins will need to run at certain points during the transformation life cycle, and going from a markdown file to a final HTML document requires a particular set of `parse` and `stringify` functions depending on the data.

For now, these plugins only live in a [directory](https://github.com/ryanfiller/portfolio-svelte/tree/main/plugins) in my project. If your project could benefit from similar transformations, feel free to copy and paste them into your own project or reach out [on Twitter](https://twitter.com/ryanfiller_) and let me know — I can look into abstracting these and open sourcing them on NPM.
