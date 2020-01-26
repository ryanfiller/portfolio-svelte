# ryanfiller.com

This is my personal portfolio site and blog. It's way over engineered for just a blog that parses markdown files and serves images, but hey, I want to show off my ability to code, too.

## Installing

Clone the repository

``` shell
git clone git@github.com:ryanfiller/portfolio-gatsby-v2.git ryansite
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

## I like Gatsby!

Navigate into this site’s directory and start it up.

``` shell
gatsby develop
```

The site is now running at `http://localhost:8000`!

  _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## I like testing!

![Coverage badge green](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)

(This badge _probably_ isn't 💯 yet but I'm doing my best!)

This site uses Jest with several extensions. To run basic tests

``` shell
npm run test
```

See my testing setup [here](#TODO)

## I like Netlify!

[![Netlify Status](https://api.netlify.com/api/v1/badges/60054267-354c-4772-8941-db16095fee82/deploy-status)](https://app.netlify.com/sites/ryanfiller-gatsby/deploys)

I use Netlify for hosting, NetlifyCMS for content management, and Netlify Large Media as my image CDN. I also *only* use Netlify Analytics on the site to anonymously track how many visitors my site gets.

## Roadmap

See my planned features / known bugs [here](https://github.com/ryanfiller/portfolio-gatsby-v2/projects/1).
I also keep a pretty up to date change log [here](http://ryanfiller.com/changes)

## Bugs!

Oh no! 🐜

If you find something broken, feel free to [file an issue](https://github.com/ryanfiller/portfolio-gatsby-v2/issues) or DM me on [twitter](https://twitter.com/ryanfiller_) and I will get to it as soon as possible.

## License

This is a public repository under an MIT license. Feel free to replicate any code you find here if it helps you, but please, do not steal my original content.
