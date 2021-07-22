---
name: 'changes'
title: 'Change Log'
banner:
  src: '/images/gundam-gp01-repair.png'
  alt: 'gundam gp-01 being upgraded'
  attribution: 'Mobile Suit Gundam 0083: Stardust Memory, Sunrise / Bandai'
---

<script>
  import Change from './_change.svelte'
</script>

<Change>

## RF-05-05.2 - "Chobam"

Improve tooling and testing

[feature/linting](https://github.com/ryanfiller/portfolio-svelte/pull/45) - Add `eslint` and `stylelint`

[[details | Version Details]]
| - Features
|   - `eslint`
|   - `stylelint`
|
| - Config
|   - ≈ `.eslintrc.js` => `.eslintrc.cjs`
|   - \+ `.stylelintrc.json`
|   - \+ `.eslintrc.json `
|
| - Packages
|   - \+ eslint
|   - \+ eslint-plugin-cypress
|   - \+ eslint-plugin-svelte3
|   - \+ stylelint
|   - \+ stylelint-config-standard

</Change>

<Change>

## RF-05-05.1 - "Core Block"

Change some internals

[refactor/code-highlighting](https://github.com/ryanfiller/portfolio-svelte/pull/36) - Replace `Prism` with a `remark` plugin.

[feature/lab-pop-up](https://github.com/ryanfiller/portfolio-svelte/pull/40) - Rename some components, add a warning to `/lab` pages

[refactor/sveltekit](https://github.com/ryanfiller/portfolio-svelte/pull/41) - Sapper -> SvelteKit

[refactor/post-css](https://github.com/ryanfiller/portfolio-svelte/pull/43) - SCSS -> PostCSS
<!-- TODO styles and config got moved into styles -->

[[details | Version Details]]
| - Features
|   - lose `mdsvex` `Prism` highlighting in favor of using `remark` to highlight specific lines
|   - rename `<Alert>` -> `<Note>`, add new `<Alert>`
|   - add `<Alert>` to `/lab` routes
|   - add `focusTrap` action
|   - add `user` store
|   - move `#index` wrapper from `_layout.svelte` to `layouts/page.svelte`
|   - fix `npm audit` warnings
|   - _finally_ refactor to SvelteKit at `1.0.0-next.113`, temporarily use @adpater-static to deploy
|   - _finally_ refactor to PostCSS (`autoprefixer`, `nesting`, `customMedia`), remove all instances of `<style global>`
|
| - Content
|   - ≈ README.md
|
| - Layouts
|   - ≈ `<Page />`
|
| - Components
|   - Layout
|     - ≈ `<Header />`
|     - ≈ `<Footer />`
|     - ≈ `<Banner />`
|     - ≈ `<Markdown />`
|     - ≈ `<Nav />`
|     - ≈ `<ColorSchemeToggle />`
|     - ≈ `<Footer />`
|     - ≈ `<SEO />`
|     - ≈ `<SocialLinks />`
|     - \- `<Styles />`
|   - Blog
|     - ≈ `<PostPreview />`
|     - ≈ `<SeriesNavigator />`
|     - ≈ `<SeriesPreview />`
|   - Content
|     - ≈ `<Date />`
|     - ≈ `<List />`
|     - ≈ `<TagList />`
|     - ≈ `<Form />` => `<Form />`
|   - Inputs
|     - ≈ `<Toggle />`
|   - Misc
|     - ≈ `<Alert />`=> `<Note />`
|     - \+ `<Alert />`
|     - ≈ `<ColorChart />`
|     - ≈ `<ColorStepper />`
|     - ≈ `<Tabs />`
|   - Styles
|     - \+ `<Styles />`
|     - \+ `config.js`
|     - \+ `custom-media.css`
|     - \+ `functions.scss`
|
| - Routes
|   - ≈ `/`
|   - ≈ `/lab`
|   - ≈ `/lab/[slug]`
|   - ≈ `/404` (`__error` and temporary page)
|   - ≈ `/blog/[slug]`
|   - ≈ `/blog`
|   - ≈ `/blog/rss.xml`
|   - ≈ `/blog/series/[slug]`
|   - ≈ `/blog/series`
|   - ≈ `/changes`
|   - ≈ `/generate-image`
|   - ≈ `/sitemap` (temporary disabled)
|
| - Endpoints
|   - ≈ `/lab.json`
|   - ≈ `/blog.json`
|   - ≈ `blog/series.json`
|   - \- `blog/series/[slug].json`
|
| - Plugins
|   - remark
|     - ≈ `blockquote`
|     - \+ `code`
|     - ≈ `headings`
|     - ≈ `image`
|     - ≈ `link`
|     - ≈ `twitter`
|   - rehype
|     - ≈ `embed`
|     - ≈ `video`
|
| - Helpers
|   - ≈ `getPages()`
|   - \+ `xmlEncode()`
|
| - Actions
|   - \+ `focusTrap`
|
| - Stores
|   - \+ `user`
|   - \+ `themes`
|
| - Tests
|   - Components
|     - Layout
|       - ≈ `<Banners />`
|       - ≈ `<ColorSchemeToggle />`
|       - ≈ `<SEO />`
|     - Content
|       - ≈ `<Date />`
|       - ≈ `<Form />` => `<Form />`
|     - Blog
|       - ≈ `<SeriesNavigator />`
|       - ≈ `<PostPreview />`
|       - ≈ `<SeriesPreview />`
|   - Misc
|     - ≈ `<Alert />`=> `<Note />`
|     - \+ `<Alert />`
|     - ≈ `<ColorStepper />`
|     - ≈ `<PhotoGrid />`
|     - ≈ `<VariableFont />`
|   - Markdown
|     - \+ `code`
|     - ≈ `blockquote`
|     - ≈ `headings`
|     - ≈ `image`
|     - ≈ `twitter`
|     - ≈ `video`
|   - Routes
|     - \+ `/lab/[page]`
|     - ≈ `/404`
|     - ≈ `/generate-image`
|     - ≈ `/rss`
|   - Commands
|     - \+ `tab()`
|     - \+ `closeAlert()`
|
| - Config
|   - \- `rollup.config.js`
|   - \+ `svelte.config.js`
|   - ≈ `netlify.toml`
|   - ≈ `.gitignore`
|
| - Styles
|   - functions
|     - \- animate
|     - \- arrow
|     - \- visuallyHide
|     - \- highlight
|   - utility classes
|     - \+ .screenreader
|
| - Packages
|   - \+ cypress-plugin-tab
|   - \- compression
|   - \- polka
|   - \- sirv
|   - \- date-fns
|   - \- html-entities
|   - \- rollup-plugin-svelte-svg
|   - \- sapper
|   - \+ @sveltejs/adapter-netlify
|   - \+ @sveltejs/adapter-static
|   - \+ @sveltejs/kit
|   - \+ encoding
|   - \+ vite
|   - \+ autoprefixer
|   - \+ postcss-custom-media
|   - \+ postcss-load-config
|   - \+ postcss-nesting

</Change>

<Change>

## RF-05-05 - "Hazel"

Performance Updates and Refactors

[refactor/data-flow](https://github.com/ryanfiller/portfolio-svelte/pull/18) - Refactor to move away from `$stores` for better SSR support

[refactor/lighthouse-scores-01](https://github.com/ryanfiller/portfolio-svelte/pull/21) - Address Lighthouse scores, mostly around preloading and Large Media images

[feature/series](https://github.com/ryanfiller/portfolio-svelte/pull/22) - Add structure of posts to be part of a series

[refactor/fix-rss](https://github.com/ryanfiller/portfolio-svelte/pull/24) - Rework RSS filter, add new missing data and make sure the feed validates

[feature/alert](https://github.com/ryanfiller/portfolio-svelte/pull/25) - Create an alert/aside component

[refactor/remove-babel](https://github.com/ryanfiller/portfolio-svelte/pull/29) - remove Babel

[design/series-layout](https://github.com/ryanfiller/portfolio-svelte/pull/23) - Add pages for series, way for posts within a series to navigate between each other

[feature/last-updated](https://github.com/ryanfiller/portfolio-svelte/pull/32) - Edited posts can now have an array of publish dates

[feature/surge](https://github.com/ryanfiller/portfolio-svelte/pull/33) - add script to use [surge.sh](https://surge.sh/) to deploy to [beta.ryanfiller.com](http://beta.ryanfiller.com/)

[[details | Version Details]]
| - Features
|   - Remove `$markdown` store and rework how `mdsvex` layout flow works
|   - Refactor `<Banner />` and add images for blogs
|   - Add a route and serverless function that will take query params and return an image
|   - Add webmentions via Add email to log into webmention.io
|   - Brand colors, theme styles and toggle
|   - Added `no-js` top level class
|   - Make sure RSS feed passes W3C validation, change endpoint url
|   - Stop building with the `--legacy` flag, remove `babel` and IE11 support
|   - Create relationship between posts in the same series
|   - Add 'updated on' functionality to edited posts
|   - Stop having to rely on Netlify preview builds, use surge.sh instead
|
| - Routes
|   - ≈ `/layout`
|   - ≈ `/error`
|   - ≈ `index.svelte`
|   - \+ `/blog/series.json`
|   - \+ `/blog/series[slug].json`
|   - \+ `/blog/series[slug].svelte`
|   - \- `/blog/[category]/rss.xml`
|   - \+ `/blog/rss.xml`
|   - `/blog/[slug]/index.md` -> `/blog/_content/[slug]/index.md`
|
| - Layouts
|   - \+ `page`
|   - \+ `markdown`
|   - \+ `blog`
|   - \+ `lab`
|
| - Components
|   - \- `<Posts />`
|   - Layout
|     - ≈ `<SEO />`
|     - ≈ `<Styles />`
|     - ≈ `<Header />`
|     - \- `<Mdsvex />`
|     - ≈ `<Banners />`
|     - ≈ `<SocialLinks />`
|   - Content
|     - \- `<PostPreview />`
|     - \+ `<List />`
|     - ≈  `<Date />`
|   - Misc
|     - \+ `<Alert />`
|   - Blog
|     - \+ `<PostPreview />`
|     - \+ `<SeriesPreview />`
|     - \+ `<SeriesNavigator />`
|
| - Plugins
|   - remark
|     - ≈ `image`
|
| - Tests
|   - Routes
|     - \+ `/error`
|     - \+ `/generate-image`
|     - \+ `/blog/series.json`
|     - \+ `/blog/rss.xml`
|   - Layouts
|     - \+ `layout`
|     - \+ `page`
|   - Components
|     - Layout
|       - ≈`<SEO />`
|       - ≈`<Banners />`
|     - Misc
|       - \+ `<Alert />`
|     - Content
|       - \- `<PostPreview />`
|       - \+ `<List />`
|       - ≈  `<Date />`
|     - Blog
|       - \+ `<PostPreview />`
|       - \+ `<SeriesPreview />`
|       - \+ `<SeriesNavigator />`
|   - Functions
|     - \- `/rss`
|   - Commands
|     - \+ `snapshot()`
|
| - Config
|   - ≈ `config.js`
|   - ≈ `rollup.config.js`
|
| - Packages
|   - \+ @cypress/snapshot
|   - \- @babel/core
|   - \- @babel/plugin-syntax-dynamic-import
|   - \- @babel/plugin-transform-runtime
|   - \- @babel/preset-env
|   - \- @babel/runtime
|   - \- @rollup/plugin-babel
|   - \+ @rollup/plugin-dynamic-import-vars

</Change>

<Change>

## RF-05-04 - "Ez8"

A new header and footer, new styles, and some internal updates.

[design/tabs](https://github.com/ryanfiller/portfolio-svelte/pull/2) - Build a `<Tabs />` component

[design/banner-images](https://github.com/ryanfiller/portfolio-svelte/pull/6) - Refactor `<Banner />`, add images for every blog post and then some.

[design/post-images](https://github.com/ryanfiller/portfolio-svelte/pull/7) - Add a cloud function to automatically generate social images.

[feature/webmentions](https://github.com/ryanfiller/portfolio-svelte/pull/10) - Add email to log into [webmention.io](https://webmention.io/)

[design/colors](https://github.com/ryanfiller/portfolio-svelte/pull/11) - Add brand colors and light/dark theme toggle

[design/fonts](https://github.com/ryanfiller/portfolio-svelte/pull/12) - Add some variable fonts to the site

[design/design/four-oh-four-page](https://github.com/ryanfiller/portfolio-svelte/pull/13) - Design the error page

[refactor/photo-grid-component](https://github.com/ryanfiller/portfolio-svelte/pull/15) - Make `<PhotoGrid>` a real component

[design/footer](https://github.com/ryanfiller/portfolio-svelte/pull/16) - Create `<SocialLinks>` component and add it to footer

[feature/webmonetization](https://github.com/ryanfiller/portfolio-svelte/pull/17) - Add [Coil](https://coil.com/) integration

[[details | Version Details]]
| - Features
|   - `<Tabs />`, `<Tab />` for use in content
|   - Refactor `<Banner />` and add images for blogs
|   - Add a route and serverless function that will take query params and return an image
|   - Add webmentions via Add email to log into webmention.io
|   - Brand colors, theme styles and toggle
|   - Added `no-js` top level class
|   - Fix LFS images
|   - Remove manual `rel='preload'` of fonts
|
| - Routes
|   - ≈ `/layout`
|   - ≈ `/error`
|   - \+ `/generate-image`
|
| - Components
|   - Layout
|     - ≈ `<Header />`
|     - ≈ `<Nav />`
|     - ≈ `<Footer />`
|     - \+ `<SocialLinks />`
|     - \+ `<Styles />`
|     - ≈ `<SEO />`
|     - \+ `<ColorSchemeToggle />`
|     - ≈ `<Mdsvex />`
|     - ≈ `<Banners />`
|       - \- `<DefaultBanner />`
|       - \- `<BlogBanner />`
|       - \- `<LabBanner />`
|   - Content
|     - \- `<Meta />`
|     - \+ `<Date />`
|     - \+ `<TagList />`
|   - Misc
|     - \+ `<Tabs />`, `<Tab />`
|     - ≈ `<ColorChart />`
|     - \+ `<PhotoGrid />`
|     - ≈ `<VariableFont />`
|
| - Functions
|   - Serverless
|     - \+ `generate-image`
|
| - Helpers
|   - \+ `objectToParams`
|   - \+ `paramsToObject`
|   - \+ `getCustomProperty`
|   - \+ `setCustomProperty`
|
| - Styles
|   - globals
|     - \+ `--pixelBorder`
|     - \+ `--pixelGrid`
|     - \+ `--steppedGradient`
|   - layouts
|     - \+ `.columns` (scaffold)
|
| - Plugins
|   - remark
|     - ≈ `twitter`
|
| - Tests
|   - Routes
|     - \+ `/error`
|     - \+ `/generate-image`
|   - Components
|     - Layout
|       - ≈ `<Header />`
|       - ≈ `<Nav />`
|       - ≈ `<Footer />`
|       - \+ `<SocialLinks />`
|       - \+ `<Styles />`
|       - \+ `<ColorSchemeToggle />`
|       - ≈`<Banners />`
|         \\- `<DefaultBanner />`
|         - \- `<BlogBanner />`
|         - \- `<LabBanner />`
|     - Content
|       - \- `<Meta />`
|       - \+ `<Date />`
|       - \+ `<TagList />`
|     - Misc
|       - \+ `<Tabs />`, `<Tab />`
|       - ≈ `<ColorChart />`
|       - \+ `<PhotoGrid />`
|       - ≈ `<VariableFont />`
|   - Helpers
|     - \+ `objectToParams`
|     - \+ `paramsToObject`
|     - \+ `getCustomProperty`
|     - \+ `setCustomProperty`
|   - Commands
|     - \+ `setColorScheme()`
|     - \+ `cypress-localstorage-commands`
|
| - Config
|   - \+ `styles.js`
|   - \+ `socialLinks.js`
|
| - Packages
|   - \+ chrome-aws-lambda
|   - \+ cloudinary
|   - \+ cypress-image-snapshot
|   - \+ cypress-localstorage-commands
|   - \+ dotenv
|   - \+ netlify-lambda
|   - \+ node-fetch
|   - \+ puppeteer-core
|
| - Project Files
|   - \+ `.psd` template for images
|   - \+ `LabDJR-VF.woff`
|   - \+ `Barlow.woff2`
|   - \+ `Recursive.woff2`

</Change>

<Change>

## RF-05-03S - "Physalis"

Big changes. The nuclear option.

[remove-netlify-cms](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/96) - Remove NetlifyCMS from project

[refactor/mdx-to-remark](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/97) - Replace MDX custom components with remark/rehype plugins

[refactor/sapper](https://github.com/ryanfiller/portfolio-svelte/pull/1) - Big refactor to change entire site framework

[[details | Version Details]]
| - Features
|   - Completely remove NetlifyCMS
|   - Remove MDX custom components, add remark & rehype plugins
| 
| - CMS
|   - Editor
|     - \- Clearfix
|     - \- Embed
|     - \- Image
|   - Fields
|     - \- Blog 
|     - \- commonFields
|     - \- pageFields
|     - \- postFields
|     - \- mediasettings
| 
| - Components
|   - ≈ * `React` -> `Svelte`
|   - Markdown
|     - \- `<Blockquote />`
|     - \- `<Embed />`
|     - \- `<Heading />`
|     - \- `<Image />`
|     - \- `<Link />`
|     - \- `<Table />`
|   - Misc (moved into relevant page directories)
|     - \- `<Change />`
|     - \- `<ColorChart />`
|     - \- `<VariableFont />`
| 
| - Helpers
|   - ≈ `fishAttr`
|   - \+ `getPages`
|   - \+ `capitalize`
| 
| - Plugins
|   - remark
|     - \+ `blockquote`
|     - \+ `heading`
|     - \+ `image`
|     - \+ `link`
|     - \+ `twitter`
|   - rehype
|     - \+ `embed`
|     - \+ `video`
| 
| - Tests
|   - Markdown
|     - ≈ `blockquote`
|     - ≈ `embed`
|     - ≈ `fishAttr`
|     - ≈ `heading`
|     - ≈ `image`
|     - ≈ `link`
|     - \+ `twitter`
|     - \+ `video`
| 
| - Packages 
|   - \- gatsby-plugin-netlify-cms
|   - \+ mdast-util-to-string
|   - \- netlify-cms-app
|   - \+ node-fetch
|   - \+ remark-attr 
|   - \+ unist-util-visit
|   - ---
|   - \- @mdx-js/mdx
|   - \- @mdx-js/react
|   - \- axe-core
|   - \- babel-eslint
|   - \- classnames
|   - \- color-contrast-table-react
|   - \- enzyme
|   - \- enzyme-adapter-react-16
|   - \- eslint
|   - \- eslint-config-standard
|   - \- eslint-config-standard-react
|   - \- eslint-plugin-css-modules
|   - \- eslint-plugin-import
|   - \- eslint-plugin-jsx-a11y
|   - \- eslint-plugin-react
|   - \- eslint-plugin-react-hooks
|   - \- gatsby
|   - \- gatsby-image
|   - \- gatsby-plugin-feed
|   - \- gatsby-plugin-layout
|   - \- gatsby-plugin-manifest
|   - \- gatsby-plugin-mdx
|   - \- gatsby-plugin-netlify-cache
|   - \- gatsby-plugin-offline
|   - \- gatsby-plugin-preact
|   - \- gatsby-plugin-react-helmet
|   - \- gatsby-plugin-react-svg
|   - \- gatsby-plugin-sass
|   - \- gatsby-plugin-sitemap
|   - \- gatsby-remark-copy-linked-files
|   - \- gatsby-source-filesystem
|   - \- marked
|   - \- preact
|   - \- prop-types
|   - \- react
|   - \- react-dom
|   - \- react-helmet
|   - \- react-transition-group
|   - \- unist-util-visit
|   
|   - \+ @babel/core
|   - \+ @babel/plugin-syntax-dynamic-import
|   - \+ @babel/plugin-transform-runtime
|   - \+ @babel/preset-env
|   - \+ @babel/runtime
|   - \+ @rollup/plugin-babel
|   - \+ @rollup/plugin-commonjs
|   - \+ @rollup/plugin-node-resolve
|   - \+ @rollup/plugin-replace
|   - \+ color-contrast-table-svelte
|   - \+ compression
|   - \+ cross-env
|   - \+ html-entities
|   - \+ mdsvex
|   - \+ npm-run-all
|   - \+ polka
|   - \+ postcss
|   - \+ rehype-stringify
|   - \+ remark
|   - \+ remark-custom-blocks
|   - \+ remark-extract-frontmatter
|   - \+ remark-frontmatter
|   - \+ remark-parse
|   - \+ remark-parse-yaml
|   - \+ remark-rehype
|   - \+ remark-stringify
|   - \+ rollup
|   - \+ rollup-plugin-copy
|   - \+ rollup-plugin-svelte
|   - \+ rollup-plugin-svelte-svg
|   - \+ rollup-plugin-terser
|   - \+ sapper
|   - \+ sirv
|   - \+ svelte
|   - \+ svelte-preprocess
|   - \+ to-vfile
|   - \+ unified
|   - \+ unist-util-visit
|   - \+ yaml

</Change>

<Change>

## RF-05-03 - "Psycommu"

Make the site interface with other sites.

[feature/rss-feed](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/66) - Add a limited RSS feed function, create feed for blog "code" category

[feature/uses](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/73) - Add a /uses page and content

[refactor/relative-images](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/74) - Move `content/` directory to `name/index.mdx` convention to use relative paths for images

[feature/twitter-blockquote](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/83) - Add scripts and styles for embedding / linking to tweets.

[feature/contact](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/86) - Add a contact form to the homepage

[[details | Version Details]]
| - Features
|   - Added RSS feed for #code category in blog
|   - Added /uses page
|   - Refactored structure of content and updated CMS config accordingly
| 
| - CMS
|   - Fields
|     - \+ mediasettings
| 
| - Content
|   - /uses
|     - desk
|     - hardware
|     - software
|     - doesn't use
| 
| - Assets
|   - Twitter svg
| 
| - Components
|   - Markdown
|     - ≈ `<Blockquote />`
|   - \+ `<Form />`
|     
| - Tests
|   - Markdown
|     - ≈ `<Blockquote />`
|   - \+ `<Form />`
|   - Functions
|     - \+ `/rss`
|   - Commands
|     - \+ `fillOutContactForm()`
| 
| - Config
|   - \+ `forms.js`
| 
| - Packages
|   - \+ gatsby-plugin-feed
|   - \+ gatsby-remark-copy-linked-files
|   - \+ gatsby-plugin-react-svg
|   - \+ marked

</Change>

<Change>

## RF-05-02 - "Ground Type"

Adding structure beyond the homepage.

[design/header-footer](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/53) - Build header, footer, and navigation

[design/page-banners](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/54) - Added banners, custom blog banner and default for other pages

[design/color-chart](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/58) - Colors chart components, css changes, color config object

[feature/workshop-page](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/62) - Adding page to contain workshop experiments and gadgets

[design/fonts](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/63) - Add variable fonts to the site, create component to test them.

[refactor/rename-workshop-to-lab](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/64) - Rename Workshop -> Lab

[design/tables](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/65) - Add table component and plus-minus modifier

[[details | Version Details]]
| - Features
|   - Added actual site navigation
|   - Added `react-color-contrast-table` package, component, and chart
| 
| - Content
|   - Workshop -> Lab
| 
| - Components
|   - Layout
|     - ≈ `<Header />`
|     - \+ `<Nav />`
|     - \+ `<Banners />`
|       - \+ `<DefaultBanner />`
|       - \+ `<BlogBanner />`
|       - \+ `<WorkshopBanner />` -> `<LabBanner />`
|     - \+ `<Footer />`
|     - `<PageLayout />` -> `<Page />`
|   - Markdown
|     - \+ `<Table />`
|       - \+ `plusMinus()`
|   - Misc
|     - \+ `<ColorChart />`
|     - \+ `<VariableFont />`
|   - Static
|     - \+ `<FontLoader />`
| 
| - Tests
|   - Layout
|     - ≈ `<Header />`
|     - \+ `<Nav />`
|     - \+ `<Banners />`
|       - \+ `<DefaultBanner />`
|       - \+ `<BlogBanner />`
|       - \+ `<WorkshopBanner />` -> `<LabBanner />`
|     - \+ `<Footer />`
|     - `<PageLayout />` -> `<Page />`
|   - Misc
|     - \+ `<ColorChart />`
|     - \+ `<VariableFont />`
|   - Commands
|     - \+ `inputChange()`
| 
| - Styles
|   - globals
|     - changed global `rem` size from `16px` to `12px`
|   - functions
|     - \+ container
|     - \+ readable
|     - \+ visuallyHide
| 
| - Config
|   - \+ `pages.js`
| 
| - Packages
|   - \+ react-color-contrast-table
|   - \- babel-preset-gatsby
|   - \- identity-obj-proxy
|   - \- react-test-renderer
|   - \+ cypress-commands

</Change>

<Change>

## RF-05-01b - "Full Burnern"

Improving up CMS funtionality, site build time, and client side performance.

[feature/cms-clearfix](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/40) - Add clearfix editor widget because sometimes laying out pages is hard

[feature/cms-embed](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/47) - Add embed editor widget for CodePens and YouTubes

[feature/cms-pages](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/42) - Add pages file collection to CMS

[feature/preact](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/44) - Replace build environment rendering engine with Preact

[refactor/change-component](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/46) - Refactor `<Change/>` for accessbility

[refactor/link-header](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/48) - Refactor `<Heading/>` for accessbility

[feature/link-parser](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/49) - Added `<Link/>` to automatically use javascript routing for internal links

[tooling/cypres](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/50) - Replace `Jest` with `Cypress`

[[details | Version Details]]
| - Features
|   - Added Clearfix and Embed components to CMS widgets
|   - Added ability to edit pages with Netlify CMS
|   - Replaced clientside React with [Preact](https://preactjs.com/)
|   - Restructured Changes to use details/summary for better screen reader accessibility
|   - Refactored linked Heading component, added smooth scoll
|   - Added global helper function to wrap animations in `prefers-reduced-motion: reduce` check
|   - Added highlight hover animation
|   - Added component to automatically add [Gatsby Link](https://www.gatsbyjs.org/docs/gatsby-link/) to internal urls
|   - Remove [Jest](https://jestjs.io/), replace with [Cypress](https://www.cypress.io/) and refactor all tests. Also refactors scss-modules to be scss imports
| 
| - Components
|   - Markdown
|     - \+ `<Embed />`
|     - ≈ `<Heading />`
|     - \+ `<Link />`
|   - `<Change />`
| 
| - CMS
|   - Editor
|     - \+ Clearfix
|     - \+ Embed
|   - Fields
|     - \- commonFields
|     - \+ pageFields
|     - \+ postFields
| 
| - Tests
|   - Content
|     - ≈ `<Meta />`
|     - ≈ `<PostPreview />`
|   - Layout
|     - ≈ `<Markdown />`
|     - ≈ `<SEO />`
|   - Markdown
|     - \+ `<Embed />`
|     - ≈ `<Heading />`
|     - ≈ `<Image />`
|     - \+ `<Link />`
|   - ≈ `<Change />`
|   - Helpers
|     - ≈ `slugify()`
|     - ≈ `fishAttr()`
| 
| - Styles
|   - functions
|     - \+ animate
|     - \+ arrow
|     - \+ highlight
| 
| - Packages
|   - \+ gatsby-plugin-netlify-cache
|   - \+ gatsby-plugin-preact
|   - \+ axe-core
|   - \- babel-jest
|   - \+ cypress
|   - \+ cypress-axe
|   - \- jest
|   - \- jest-axe
|   - \- jest-coverage-badges
|   - \+ preact
|   - \+ react-transition-group
    
</Change>

<Change>

## RF-05-01 - "Zephyranthes"

General behind the scenes improvements and accessibility formatting.

[tooling/eslint-and-jest](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/31) - Testing and code styles.

[feature/headers-and-changelog-mdx-components](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/32) - Added better user experience for growing changes page - collapsable list and linked headers.

[feature/seo-and-metadata](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/34) - Updated metadata hopefully get accurate SEO traction.

[design/post-preview](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/35) - Added better post preview formatting.

[tooling/goat-counter](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/37) - Add [GoatCounter](https://www.goatcounter.com/) open source analytics.

[feature/sitemap](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/39) - Added generated sitemap

[[details | Version Details]]
| - Features
|   - [eslint](https://www.gatsbyjs.org/docs/eslint/)
|   - [Jest for Gatsby](https://www.gatsbyjs.org/docs/unit-testing/)
|   - Updated [ReactHelmet](https://github.com/nfl/react-helmet) to pull data from post frontmatter
| 
| - Content
|   - Changelog
|   - README.md
| 
| - Components
|   - Content
|     - \+ `<Meta />`
|     - \+ `<PostPreview />`
|   - Markdown
|     - \+ `<Heading />`
|   - \+ `<Change />`
| 
| - Tests
|   - Content
|     - \+ `<Meta />`
|     - \+ `<PostPreview />`
|   - Layout
|     - \+ `<Markdown />`
|     - \+ `<SEO />`
|   - Markdown
|     - \+ `<Heading />`
|     - \+ `<Image />`
|   - \+ `<Change />`
|   - Helpers
|     - \+ `slugify()`
|     - \+ `fishAttr()`
| 
| - Styles 
|   - \+ globals
| 
| - Packages
|   - \+ babel-eslint
|   - \+ babel-jest
|   - \+ babel-preset-gatsby
|   - \+ date-fns
|   - \+ enzyme
|   - \+ enzyme-adapter-react-16
|   - \+ eslint
|   - \+ eslint-config-standard
|   - \+ eslint-config-standard-react
|   - \+ eslint-plugin-css-modules
|   - \+ eslint-plugin-import
|   - \+ eslint-plugin-jsx-a11y
|   - \+ eslint-plugin-react
|   - \+ eslint-plugin-react-hooks
|   - \+ identity-obj-proxy
|   - \+ jest
|   - \+ jest-axe
|   - \+ jest-coverage-badges
|   - \+ react-test-renderer

</Change>

<Change>  

## RF-05-00-GN1 "Alex"

Building content editting.

[feature/netlify-cms](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/21) - Added NetlifyCMS backend

[feature/cms-images](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/24) - Netlify LFS image implementation

[[details | Version Details]]
| - Features
|   - [NetlifyCMS](https://www.netlifycms.org/docs/gatsby/)
|   - [Netlify Large Media](https://www.netlifycms.org/docs/netlify-large-media/)
| 
| - Content
|   - Changelog
|   - Styles
|     - add `<Image />` examples
| 
| - Components
|   - Markdown
|     - \+ `<Image />`
| 
| - CMS
|   - Editor
|     - \+ Image
|   - Fields
|     - \+ Blog (Scaffolded)
| 
| - Helpers
|   - `fishAttr()` - takes an element and returns a dom attribute or an empty string
| 
| - Packages 
|   - \+ netlify-cms-app
|   - \+ gatsby-plugin-netlify-cms
|   - \+ node-sass
|   - \+ gatsby-plugin-sass
|   - \+ classnames
| 
| - Styles 
|   - \+ variables
|   - \+ functions

</Change>

<Change>

## RF-05-00-G "Prototype"
  
Bare bones Gatsby site that aggregates blog posts on the homepage.

[Initial commit](https://github.com/ryanfiller/portfolio-gatsby-v2/commit/b56638550881dc0d4dd0e0856ec3ff362309ea78) - made Christmas Eve, 2019.

[init-config](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/1)

[feature/change-log ](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/2)

[[details | Version Details]]
| - Features
|   - [MDX](https://www.gatsbyjs.org/packages/gatsby-plugin-layout/)
|   - [Gatsby v1 Layout](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/)
|   - `gatsby-node.js`
|     - `customUrl` override for posts
|     - `customTemplate` override for posts
| 
| - Content
|   - 404 (scaffolded)
|   - About (scaffolded)
|   - Blog
|   - Changelog
|   - Homepage
|     - siteMetadata
|     - blog posts
|   - Portfolio (scaffolded)
|   - Styles (scaffolded)
|   - Workshop (scaffolded)
| 
| - Components
|   - \+ Layout
|     - \+ `<Header />`
|     - \+ `<Markdown />`
|     - \+ `<PageLayout />`
|   - \+ `<Posts />`
| 
| - Packages
|   - \+ @mdx-js/mdx
|   - \+ @mdx-js/react
|   - \+ gatsby-plugin-layout
|   - \+ gatsby-plugin-mdx
|   - \- gatsby-plugin-sharp
|   - \- gatsby-transformer-sharp

</Change>

<Change>

## Previous Versions

This version of my personal website follows five previous versions, dating all the way back to Thanksgiving Break 2011.

[[details | Previous Versions]]
| - RF-04-G
|   - [Early 2018](http://2018.ryanfiller.com/)
|   - Built using [Gatsby](https://www.gatsbyjs.org/) and [NetlifyCMS](https://www.netlifycms.org/)
|   - Abandoned due to ever increasing complexity and difficulty of backwards compatibility. Complexity and build time needed to be cut down since Netlify introduced limited build minutes, and sometimes starting fresh is easiest.
|
| - RF-03-J
|   - [Late 2016](http://2016.ryanfiller.com/)
|   - Built using [Jekyll](https://jekyllrb.com/)
|   - I never quite settled on a homepage for this site.
|   - Abandoned due to complexity of managing local Ruby versions and increasingly long build times as the site grew in size.
|
| - RF-02-2-WP
|   - Late 2016
|   - [Development](https://github.com/ryanfiller/wordpress-portfolio) on a custom WordPress theme was started but was never deployed.
|
| - RF-02-WP
|   - Mid 2014
|   - Built using the [Good Space](https://themeforest.net/item/good-space-responsive-minimal-wp-theme/2278615) WordPress page builder theme
|   - This site was lost to the internet while trying to migrate hosts, I did not know much about databases at the time
|
| - RF-01-P
|   - [Mid to Late Spring 2012](http://2012.ryanfiller.com/)
|   - HTML, CSS, and jQuery. A version that converted pages to PHP and used `<?php echo $year; ?>` in the footer for automatic copyright update also existed.
|   - Built for a Web02 college course, and to start applying for jobs.
|
| - RF-00-H
|   - [Late Fall 2011](http://2011.ryanfiller.com/)
|   - Built using HTML, CSS, and jQuery to satisfy an assignment for a Web01 college course.

</Change>
