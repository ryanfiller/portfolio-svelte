---
title: A Deep Dive into Sapper
banner:
  src: '/images/goblin-sapper-explosion.jpg'
  alt: 'a Warcraft Goblin sapper'
  attribution: 'Hearthstone, Blizzard Entertainment'
options:
  published: true
meta:
  date: [
    2020-06-29,
    2021-08-10
  ]
  excerpt: Exploring some of the more esoteric details about Svelte and Sapper
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

Svelte is a Javascript framework that has been interesting to me since seeing [Nate Clark](https://nateclark.io/) give a short talk on it at a [local meetup](https://memphiswebworkers.com/) last summer. I built a basic color app ([demo](https://rgb-color-values.netlify.app/), [code](https://github.com/ryanfiller/rgb-color-values)) to test some of the things he talked about, I and haven't touched Svelte since then. Both the Svelte framework and the world have changed a lot in the last year. [Svelte 3](https://svelte.dev/blog/svelte-3-rethinking-reactivity) was released a few months ago so I thought now was a good time to take another look at the Svelte ecosystem. 

## What is Svelte and what is Sapper?

[Svelte](https://svelte.dev/) is a young-ish framework that, in their words, takes a *"radical new approach to building user interfaces."* Svelte differs from other Javascript UI tools — like [React](https://reactjs.org/) or [Vue](https://vuejs.org/) — in that it does the work during compile time rather than during clientside runtime. This means that rather than bundle and ship the library, Svelte "boils itself away" and only vanilla Javascript is ever sent to the browser.

[This video](https://www.youtube.com/watch?v=AdNJ3fydeao) sums up the philosophy behind Svelte and I see it cited online as the best selling point for using it.

[Sapper](https://sapper.svelte.dev/) is Svelte's first party application framework, akin to [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) and [Next](https://nextjs.org/) for React, or [Nuxt](https://nuxtjs.org/) for Vue. Sapper is also able to export a static version of a site, putting it more in line with [Gatsby](https://www.gatsbyjs.org/) for React or [Gridsome](https://gridsome.org/) for Vue.

## Can Sapper do everything I want?

I've been working in the Gatsby-React ecosystem for a while, and I've formed pretty strong opinions about how I like to work — organizing files, which toolchains I use, plugins I can't live without, etc... Obviously Sapper could make *a* markdown blog, but could it make the one *I* wanted? I know that no two frameworks will ever be completely one-to-one, so I started this test by outlining a list of must-have features used on my current Gastby blog:

* Works With No Client JS
* Global Components
* JavaScript in Markdown
* Automatic Markdown Processing
* post/index File Structure
* Colocation of Images & Components
* Inline SVGs
* SCSS Imports
* Easy RSS Feed & Sitemap

I put together a [quick starter project](https://github.com/ryanfiller/sapper-test) and hosted it on [Netlify](https://sapper-goals.netlify.app/). I wanted to see if I could accomplish the things on this list, and figure out how difficult they would be to do in Sapper.

![Sapper test site homepage](/images/sapper-test-site-screenshot.png){data-align="full"}

(Spoilers: Sapper did everything I wanted, and was relatively easy.)

### Works With No Client JS

[See The Example »](https://sapper-goals.netlify.app/goals/works-with-no-js)

Sapper, like most other Javascript Static Site Generators, works by building a server side HTML bundle and then "rehydrating" it with clientside Javascript. Sapper's production script comes in two versions, `build` and `export`. `build` will generate a hostable Node app and `export` will generate a static version of the site.

> Static doesn't mean non-interactive — your Svelte components work exactly as they do normally, and you still get all the benefits of client-side routing and prefetching.

The great news is that this feature works by default. If, for whatever reason, a user has Javascript disabled in their browser they get the un-hydrated version of the Sapper app. Assuming everything was build in a smart way, the app will work as plain HTML. Sapper doesn't use special components in place of `<a>` tags, so even links will function like regular HTML links.

### Global Components

[See The Example »](https://sapper-goals.netlify.app/goals/global-components)

Most component-based frameworks offer this feature, but I wanted the ability to re-render only some parts of the page on route changes. Sapper boasts the ability to *"surgically update the DOM when the state of your app changes",* and the [`_layout.svelte`](https://sapper.svelte.dev/docs#Layouts) file allows for just that. `_layout.svelte` will accept the contents of any other page into the `<slot/>` tag. Anything outside that tag will persist between pages. Sapper will also automatically provide a `segment` prop that can be used to determine what the current page is or conditionally render nested subcomponents. 

For the header component I put together:

```svelte
// nav.svelte
<script>
  export let segment
</script>

<style>
  a {
    color: currentColor;
  }
  a.active {
    font-weight: bold;
    color: orange;
    border-bottom: 2px solid orange;
  }
</style>

<nav class='main-nav'>
  <ul>
    <li>
      <a href='/' class={!segment ? 'active' : ''}>
        about
      </a>
    </li>
    <li>
      <a href='goals' class={segment === 'goals' ? 'active' : ''}>
        goals
      </a>
    </li>
  </ul>
</nav>
```

### JavaScript in Markdown

[See The Example »](https://sapper-goals.netlify.app/goals/javascript-in-markdown)

This was the first feature that Sapper didn't provide natively. Analogous to [MDX,](https://mdxjs.com/) the Svelte ecosystem has its own Javascript-Markdown hybrid tool - [MDsveX](https://mdsvex.com/). MDsveX works by transforming markdown files into components so that `.md` content can be imported into `.svelte` components, and vice versa. MDsveX has to be configured as a plugin in the `rollup.config.js` file in the root of the project and can take a number of config options. The configuration obejct can do things like add plugins and change the default file extension. 

Most importantly, the build scripts in `package.json` need to be modified so that they correctly process whichever MDsveX file extension are configured.

```javascript
"dev": "sapper dev --ext '.svelte .md'",
"build": "sapper build --legacy --ext '.svelte .md'",
"export": "sapper export --legacy --ext '.svelte .md'"
```

With this preprocessing set up to happen during Svelte's compile time, components can be imported and used directly in markdown files. Data from the post's frontmatter is even automatically parsed and passed into the pages as props.

```markdown
---
title: a post
---

<script>
  import Component from './_component.svelte'
</script>

# Regular Markdown

<Component text={title} />
```

### Automatic Markdown Processing

[See The Example »](https://sapper-goals.netlify.app/goals/automatic-markdown-processing)

More so than using components in Markdown I use MDX to build extra-powered versions of regular HTML components. I have the strong opinion that my content should be renderable by a regular Markdown parser, but that on my site I should be able to use other tools to add more functionality. I usually use [data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) to do this.

```html
<img src="image.jpg" alt="title" data-align="right" />
```

MDsveX, by design, will only process Markdown content and not any inline HTML. This means that to add any attributes other than `src` and `alt` to images I needed to figure out a way to extend default Markdown syntax. Luckily, MDsveX recently added the ability to use [remark plugins](https://github.com/remarkjs/remark/blob/master/doc/plugins.md), and there happens to be [a plugin](https://github.com/arobase-che/remark-attr) to do exactly that. Once the [remark-attr](https://github.com/arobase-che/remark-attr) plugin is configured in the `remarkPlugins` array in `rollup.config.js` extra attributes can be added using curly brackets. These will be ignored by parsers that do not support this functionality.

```markdown
![title](image.jpg){align="right"}
```

MDsveX layouts can also be configured within their module script tag with an object containing a list of tags that will automatically be replaced when the corresponding HTML is rendered by that layout.

```svelte
<script context="module">
  import { h1, img } from './components.js';
  export { h1, img };
</script>
```

Huge thank you to [pngwn](https://twitter.com/evilpingwin), the creator of MDsveX, for helping me get this running correctly on my demo site.

### post/index File Structure

[See The Example »](https://sapper-goals.netlify.app/goals/post-index-pattern)

One thing I've learned to appreciate the more I work with component-based websites is flat file organization. I still tend to overly organize things into folders, but I do my best to group them by feature and not by file type. That means that I'm likely to put the component file and its styles next to each other, but I'll put the site header in one folder and a blog thumbnail in another. Usually this leads to shorter import paths, which also means less mental strain while trying to use relative links to navigate directory structures.

The place I find this most useful is for post content. I've started naming a directory with the title of the post and relying on the [ES6 module pattern](https://www.digitalocean.com/community/tutorials/react-index-js-public-interfaces) and keeping an `index.md` file inside. 

Sapper, and also MDsveX, automatically support this functionality. Any file inside the `routes/` directory will have a corresponding page created. To programmatically build a list of pages to construct navigation the traditional method of Sapper server routes can be used. An `index.json.js` file can use [Node's `fs.readdirSync` function](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options) to query the file system at build time and create a json endpoint that contains a list of pages in the route's index file.

```javascript
const posts = fs.readdirSync(route)
  .filter(file => isDir(`${route}/${file}`))
  .map(file => {
      const post = fs.readFileSync(path.resolve(route, `${file}/index.md`), 'utf-8')
      return {...post, slug: file}
  })
```

This endpoint can then be fetched against in a module script to get data that can be used to build page navigation.

```svelte
<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`/posts.json`)
    .then(r => r.json())
    .then(posts => {
      return { posts };
    });
  }
</script>

<ul>
  {#each posts as post}
    <li><a href='posts/{post.slug}'>{post.title}</a></li>
  {/each}
</ul>
```

### Colocation of Images & Components

[See The Example »](https://sapper-goals.netlify.app/goals/colocation-of-images)

Another added benefit of the module organization pattern is that images can be kept directly alongside Markdown content.

```
└─ blog/
  └─ post-name/
    ├─ index.md
      └─ images/
        └─ image.jpg
    └─ component.js
```

However, one of the hard rules of Sapper is that images **must** live in the `static` directory in the root of the project in order to be picked up by the compiler. The key is that they don't *always* have to be there, they just need to be there at the time the compiler runs.

To get around this constraint I was able to use [`rollup-plugin-copy`](https://www.npmjs.com/package/rollup-plugin-copy) to copy any files from a post's `/_images` directory into the main `static/images` directory at build time.

```javascript
import copy from 'rollup-plugin-copy'

export default {
  client: {
    ...
    plugins: [
      copy({
        targets: [
          { src: 'src/**/_images/*.*', dest: 'static/images' }
        ]
      }),
    ]
  }
}
```

To keep images from being uploaded twice by version control, I also added `/static/images/*` to the my `.gitignore` so only the original images would be tracked.

### Inline SVGs

[See The Example »](https://sapper-goals.netlify.app/goals/inline-svgs)

I have quite a bit of experience figuring out how to directly import .svg files in various environments with [Webpack](https://webpack.js.org/loaders/svg-inline-loader/). One major difference between Sapper and other frameworks I've used is that it favors [Rollup](https://rollupjs.org/guide/en/) for bundling. Sapper can be [configured to use Webpack,](https://github.com/sveltejs/sapper-template-webpack) but in the spirit of experimentation I wanted to give Rollup a try.

Rollup has a plugin, [`rollup-plugin-svelte-svg`](https://www.npmjs.com/package/rollup-plugin-svelte-svg), that allows for .svg files to be imported as if they were Svelte components. They can even be passed props.

```svelte
<script>
  import SVG from "./_svg.svg";
</script>

<SVG class='animate' />
```

### SCSS Imports

[See The Example »](https://sapper-goals.netlify.app/goals/scss-imports)

Svelte comes with the feature to use generated class names to scope any rule written in a component's `<style>` tag to that component. Despite the somewhat recent addition of [native css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) I still use scss on nearly every project for nesting, easy breakpoints, and reusable functions. 

Sapper already runs it compiler to make a stylesheet for the app, and the [`svelte-preprocess` plugin](https://www.npmjs.com/package/svelte-preprocess) offers an easy way to add steps to this compilation process. Among other things, this plugin can be used to run `node-sass` as part of the Sapper build script. After adding it to the plugin array in `rollup.config.js`, style tags can have the `type="text/scss"` attribute added and scss can be used within the body of the tag.

```svelte
<style type="text/scss">
  @import '../functions.scss';

  p {
    font-size: 12px;

    span {
      font-style: italic;
    }
  }

  @include small() {
    p {
      font-size: 16px;
    }
  }
</style>
```

## Easy RSS Feed & Sitemap

[See The Example »](https://sapper-goals.netlify.app/goals/easy-rss-and-sitemap)

I'm new to RSS, and I've had quite a bit of trouble getting it correctly set up in the past. 

Creating a route with a specific file extension can be done by prepending that extension to the `.js` portion of the file. To create an rss feed for my example site that would live at [`/goals/rss.xml`](https://sapper-goals.netlify.app/goals/rss.xml) all I needed to do was add a file named `rss.xml.js` inside of the `goals` directory.

In that file, similar to the strategy I used to build the page navigation, a fetch call could be made to the existing `/goals.json` endpoint and the response could be mapped through to construct an XML document.

```javascript
export function get(req, res) {
	res.writeHead(200, {
		'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
		'Content-Type': 'text/xml'
  })

	fetch('http://localhost:3000/goals.json')
		.then(r => r.json())
		.then(items => {
			res.end(`<?xml version="1.0" encoding="UTF-8" ?>
      <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
          <title>
            Sapper Test
          </title>
          <link>
            ${BASE_URL}
          </link>
          ${items.map(item => `
            <item>
              <title>${entities.encode(item.title)}</title>
              <link>${BASE_URL}/item/${item.id}</link>
              <content:encoded>${entities.encode(item.html)}</content:encoded>
            </item>
          `).join('\n')}
        </channel>
      </rss>`)
    })
}
```

Creating a sitemap that would live at [`/sitemap.xml`](https://sapper-goals.netlify.app/goals/sitemap.xml) was similar to building the RSS feed. Rather than query the endpoint containing the posts, I used [`fs.readdirSync`](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options) again to build an array of everything inside of the `src/routes`  directory. Because I was using the post/index organization and also didn't want my images included in the sitemap I excluded those files, as well as any files starting with `_`.

That array could then be looped through to build another XML tree.

```javascript
const BASE_URL = config.SITE_URL
const ROUTES = './src/routes'

const pages = ['']

const getRoutes = root => fs.readdirSync(root).forEach(file => {
  const excluded = ['index', 'rss', 'sitemap', 'images']
  file = file.split('.')[0]
  
  if (file.charAt(0) !== '_' && !excluded.includes(file)) {
    const directory = `${root}/${file}`

    if(fs.lstatSync(directory).isDirectory()) {

      pages.push(directory.replace(ROUTES, ''))
      getRoutes(directory)
      
    } else {
      pages.push(file)
    }
  }
})

getRoutes(ROUTES)

const render = (pages) => (`<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages.map(page => `<url><loc>${BASE_URL}${page}</loc></url>`).join("\n")}
</urlset>`)

export function get(req, res, next) {
  res.setHeader('Cache-Control', `max-age=0, s-max-age=${600}`) // 10 minutes
  res.setHeader('Content-Type', 'text/xml')

  const sitemap = render(pages)
  res.end(sitemap)
}
```

An important note here is that during the Sapper static export process, Sapper will crawl the site and generate any pages that can be linked from the `href` value of an `<a>` tag. For pages like the RSS feed and sitemap to be built they either need to be linked to from another page, or they can be added behind the [`--entry` flag](https://sapper.svelte.dev/docs#How_it_works) in any of the build commands in `package.json`.

## Final Thoughts

All in all, Sapper was cool and I enjoyed the Svelte platform. Some things felt very different than other tools, but I think the tradeoffs are worth it. By compiling away the framework this reduces the download size of the initial Javascript bundle anywhere from \~50k to \~100k. It also means that Svelte can be as feature-rich as it wants because a site will only ship the specific code it actually uses. 

Sapper comes with different tools than Gatsby. Gatsby has a built-in way to query internal data with GraphQL, but Sapper handles page creation and template inheritance with a lot more magic. Both have a rich plugin ecosystem and can be customize to accomplish pretty much anything. 

I enjoyed this experiment, and I will definitely be making more Svelte and Sapper projects in the future.