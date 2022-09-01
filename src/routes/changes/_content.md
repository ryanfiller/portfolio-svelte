---
name: 'changes'
title: 'Changelog'
banner:
  src: '/images/gundam-gp01-repair.png'
  alt: 'gundam gp-01 being upgraded'
  attribution: 'Mobile Suit Gundam 0083: Stardust Memory, Sunrise / Bandai'
---

## RF-05-06.2 - "Full Armor"

I should _probably_ learn TypeScript. I should _definitely_ write better tests.

[[details]]
| - [feature/typescript](https://github.com/ryanfiller/portfolio-svelte/pull/64) - turn TypeScript on as the default script type
| - [feature/vitest](https://github.com/ryanfiller/portfolio-svelte/pull/70) - install a proper unit test runner

## RF-05-06 - "Mk-II"

Refactor and redesign.

[[details]]
| - [refactor/move-content-files](https://github.com/ryanfiller/portfolio-svelte/pull/55) - refactor content enpoints
| - [refactor/lib](https://github.com/ryanfiller/portfolio-svelte/pull/57) - put lots of things into `src/lib`
| - [refactor/clean-up-static-folder](https://github.com/ryanfiller/portfolio-svelte/pull/58) - take lot of things out of `static`
| - [refactor/aliases](https://github.com/ryanfiller/portfolio-svelte/pull/59) - hilariously undo all the `$lib` work to use aliases instead
| - [bug/fix-rss](https://github.com/ryanfiller/portfolio-svelte/pull/60) - refactor RSS feed
| - [bug/fix-sitemap](https://github.com/ryanfiller/portfolio-svelte/pull/61) - refactor sitemap
| - [feature/auto-table-of-contents](https://github.com/ryanfiller/portfolio-svelte/pull/62) - create a plugin to create a table of contents for markdown posts (data currently unused)
| - [design/new-fonts](https://github.com/ryanfiller/portfolio-svelte/pull/66) - choose and implement new variable fonts
| - [refactor/code-component](https://github.com/ryanfiller/portfolio-svelte/pull/67) - slightly redesign the embedded code component
| - [design/simplify-changelog](https://github.com/ryanfiller/portfolio-svelte/pull/74) - remove extraneous details from the /changes page
| - [refactor/web-components](https://github.com/ryanfiller/portfolio-svelte/pull/77) - refactor all markdown components to have both a Svelte and web-component scenario

## RF-05-05.2 - "Chobam"

Improve tooling and testing

[[details]]
| - [feature/linting](https://github.com/ryanfiller/portfolio-svelte/pull/45) - Add `eslint` and `stylelint`
| - [design/styles](https://github.com/ryanfiller/portfolio-svelte/pull/46) - Refactor `/styles` page
| - [feature/tips](https://github.com/ryanfiller/portfolio-svelte/pull/49) - Add a `/blog/tips` section and posts
| - [refactor/reduce-tests](https://github.com/ryanfiller/portfolio-svelte/pull/50) - Delete a large number of one off tests, replace them with page integrations
| - [feature/actions](https://github.com/ryanfiller/portfolio-svelte/pull/53) - Add a GitHub action to run tests and linting

## RF-05-05.1 - "Core Block"

Change some internals

[[details]]
| - [refactor/code-highlighting](https://github.com/ryanfiller/portfolio-svelte/pull/36) - Replace `Prism` with a `remark` plugin.
| - [feature/lab-pop-up](https://github.com/ryanfiller/portfolio-svelte/pull/40) - Rename some components, add a warning to `/lab` pages
| - [refactor/sveltekit](https://github.com/ryanfiller/portfolio-svelte/pull/41) - Sapper -> SvelteKit
| - [refactor/post-css](https://github.com/ryanfiller/portfolio-svelte/pull/43) - SCSS -> PostCSS

## RF-05-05 - "Hazel"

Performance Updates and Refactors

[[details]]
| - [refactor/data-flow](https://github.com/ryanfiller/portfolio-svelte/pull/18) - Refactor to move away from `$stores` for better SSR support
| - [refactor/lighthouse-scores-01](https://github.com/ryanfiller/portfolio-svelte/pull/21) - Address Lighthouse scores, mostly around preloading and Large Media images
| - [feature/series](https://github.com/ryanfiller/portfolio-svelte/pull/22) - Add structure of posts to be part of a series
| - [refactor/fix-rss](https://github.com/ryanfiller/portfolio-svelte/pull/24) - Rework RSS filter, add new missing data and make sure the feed validates
| - [feature/alert](https://github.com/ryanfiller/portfolio-svelte/pull/25) - Create an alert/aside component
| - [refactor/remove-babel](https://github.com/ryanfiller/portfolio-svelte/pull/29) - remove Babel
| - [design/series-layout](https://github.com/ryanfiller/portfolio-svelte/pull/23) - Add pages for series, way for posts within a series to navigate between each other
| - [feature/last-updated](https://github.com/ryanfiller/portfolio-svelte/pull/32) - Edited posts can now have an array of publish dates
| - [feature/surge](https://github.com/ryanfiller/portfolio-svelte/pull/33) - add script to use [surge.sh](https://surge.sh/) to deploy to [beta.ryanfiller.com](http://beta.ryanfiller.com/)

## RF-05-04 - "Ez8"

A new header and footer, new styles, and some internal updates.

[[details]]
| - [design/tabs](https://github.com/ryanfiller/portfolio-svelte/pull/2) - Build a `<Tabs />` component
| - [design/banner-images](https://github.com/ryanfiller/portfolio-svelte/pull/6) - Refactor `<Banner />`, add images for every blog post and then some.
| - [design/post-images](https://github.com/ryanfiller/portfolio-svelte/pull/7) - Add a cloud function to automatically generate social images.
| - [feature/webmentions](https://github.com/ryanfiller/portfolio-svelte/pull/10) - Add email to log into [webmention.io](https://webmention.io/)
| - [design/colors](https://github.com/ryanfiller/portfolio-svelte/pull/11) - Add brand colors and light/dark theme toggle
| - [design/fonts](https://github.com/ryanfiller/portfolio-svelte/pull/12) - Add some variable fonts to the site
| - [design/design/four-oh-four-page](https://github.com/ryanfiller/portfolio-svelte/pull/13) - Design the error page
| - [refactor/photo-grid-component](https://github.com/ryanfiller/portfolio-svelte/pull/15) - Make `<PhotoGrid>` a real component
| - [design/footer](https://github.com/ryanfiller/portfolio-svelte/pull/16) - Create `<SocialLinks>` component and add it to footer
| - [feature/webmonetization](https://github.com/ryanfiller/portfolio-svelte/pull/17) - Add [Coil](https://coil.com/) integration

## RF-05-03S - "Physalis"

Big changes. The nuclear option.

[[details]]
| - [remove-netlify-cms](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/96) - Remove NetlifyCMS from project
| - [refactor/mdx-to-remark](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/97) - Replace MDX custom components with remark/rehype plugins
| - [refactor/sapper](https://github.com/ryanfiller/portfolio-svelte/pull/1) - Big refactor to change entire site framework

## RF-05-03 - "Psycommu"

Make the site interface with other sites.

[[details]]
| - [feature/rss-feed](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/66) - Add a limited RSS feed function, create feed for blog "code" category
| - [feature/uses](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/73) - Add a /uses page and content
| - [refactor/relative-images](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/74) - Move `content/` directory to `name/index.mdx` convention to use relative paths for images
| - [feature/twitter-blockquote](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/83) - Add scripts and styles for embedding / linking to tweets.
| - [feature/contact](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/86) - Add a contact form to the homepage

## RF-05-02 - "Ground Type"

Adding structure beyond the homepage.

[[details]]
| - [design/header-footer](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/53) - Build header, footer, and navigation
| - [design/page-banners](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/54) - Added banners, custom blog banner and default for other pages
| - [design/color-chart](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/58) - Colors chart components, css changes, color config object
| - [feature/workshop-page](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/62) - Adding page to contain workshop experiments and gadgets
| - [design/fonts](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/63) - Add variable fonts to the site, create component to test them.
| - [refactor/rename-workshop-to-lab](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/64) - Rename Workshop -> Lab
| - [design/tables](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/65) - Add table component and plus-minus modifier

## RF-05-01b - "Full Burnern"

Improving up CMS funtionality, site build time, and client side performance.

[[details]]
| - [feature/cms-clearfix](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/40) - Add clearfix editor widget because sometimes laying out pages is hard
| - [feature/cms-embed](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/47) - Add embed editor widget for CodePens and YouTubes
| - [feature/cms-pages](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/42) - Add pages file collection to CMS
| - [feature/preact](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/44) - Replace build environment rendering engine with Preact
| - [refactor/change-component](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/46) - Refactor `<Change/>` for accessbility
| - [refactor/link-header](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/48) - Refactor `<Heading/>` for accessbility
| - [feature/link-parser](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/49) - Added `<Link/>` to automatically use javascript routing for internal links
| - [tooling/cypres](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/50) - Replace `Jest` with `Cypress`
  

## RF-05-01 - "Zephyranthes"

General behind the scenes improvements and accessibility formatting.

[[details]]
| - [tooling/eslint-and-jest](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/31) - Testing and code styles.
| - [feature/headers-and-changelog-mdx-components](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/32) - Added better user experience for growing changes page - ollapsable list and linked headers.
| - [feature/seo-and-metadata](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/34) - Updated metadata hopefully get accurate SEO traction.
| - [design/post-preview](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/35) - Added better post preview formatting.
| - [tooling/goat-counter](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/37) - Add [GoatCounter](https://www.goatcounter.com/) open source analytics.
| - [feature/sitemap](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/39) - Added generated sitemap

## RF-05-00-GN1 "Alex"

Building content editing.

[[details]]
| - [feature/netlify-cms](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/21) - Added NetlifyCMS backend
| - [feature/cms-images](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/24) - Netlify LFS image implementation

## RF-05-00-G "Prototype"
  
Bare bones Gatsby site that aggregates blog posts on the homepage.
[[details]]
| - [Initial commit](https://github.com/ryanfiller/portfolio-gatsby-v2/commit/b56638550881dc0d4dd0e0856ec3ff362309ea78) - made Christmas Eve, 2019.
| - [init-config](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/1)
| - [feature/change-log](https://github.com/ryanfiller/portfolio-gatsby-v2/pull/2)

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
