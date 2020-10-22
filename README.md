# ryanfiller.com

This is my personal portfolio site and blog. It's way over engineered for just a blog that parses markdown files and serves images, but hey, I want to show off my ability to code, too.

## Installing

Clone the repository

``` shell
git clone git@github.com:ryanfiller/portfolio-svelte.git ryansite
```

This site uses [git LFS](https://git-lfs.github.com/) to store images, so if you want those you'll also need to run

``` shell
git lfs get
```

Install dependencies

``` shell
cd ryansite
yarn install
```

## I like Sapper!

This site is built using [Svelte](https://svelte.dev/) & [Sapper](https://sapper.svelte.dev/).

Navigate into this site’s directory and start it up.

``` shell
npm run start
```

The site is now running at `http://localhost:3000`!

## I like testing!

This site uses [Cypress](https://www.cypress.io/) with several accessibility extensions. To run basic tests

``` shell
npm run test
```

See my testing setup [here](https://github.com/ryanfiller/portfolio-svelte/tree/main/cypress)

## I like Netlify!

[![Netlify Status](https://api.netlify.com/api/v1/badges/60054267-354c-4772-8941-db16095fee82/deploy-status)](https://app.netlify.com/sites/ryanfiller-gatsby/deploys)

I use [Netlify](https://www.netlify.com/) for hosting and [Netlify Large Media](https://www.netlify.com/products/large-media/) as my image transformer and CDN.

## I like Your Privacy!
This site contains no invasive analtyics tracking. It uses  [Netlify Analytics](https://www.netlify.com/products/analytics/) on the site to anonymously track how many server requests are made, and [GoatCounter](https://www.goatcounter.com/) to see what browsers and screen sizes people are using.

## Roadmap

See my planned features / known bugs [here](https://github.com/ryanfiller/portfolio-svelte/projects/1).
I also keep a pretty up to date change log [here](http://ryanfiller.com/changes)

## Bugs!

Oh no! 🐜

If you find something broken, feel free to [file an issue](https://github.com/ryanfiller/portfolio-svelte/issues) or DM me on [twitter](https://twitter.com/ryanfiller_) and I will get to it as soon as possible.

## License

This is a public repository under an MIT license. Feel free to replicate any code you find here if it helps you, but please, do not steal my original content.

## Old Repo

If for some reason you're looking for the [Gatsby](https://www.gatsbyjs.com/) version of this site, that repo can be found [here](ttps://github.com/ryanfiller/portfolio-gatsby-v2).