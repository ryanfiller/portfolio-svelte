---
title: Tips & Tricks I've Learned About Gatsby with NetlifyCMS
options:
  published: true
meta:
  categories:
    - code
  date: 2020-01-30T06:00:00.000Z
  excerpt: 'Things I''ve learned about gatsby-config.js, gatsby-node.js, and NetlifyCMS'
  tags:
    - gatsby
    - netlifycms
---

For a number of reasons, some for money and some for fun, I've scaffolded out more than half a dozen new Gatsby sites in the past year. There have been a few weird "hacks" and escape hatches I've liked to leave myself every time and I thought those might be fun to share. 
Since Gatsby is already a React-based metaframework, it makes sense to me to do as much work in javascript as possible. This is a nice fit with NetlifyCMS since it also doe a lot behind the scenes with javascript, and its editor is also built using React components.

I compiled this non-comprehensive list of some quick-but-powerful tips and tricks might be helpful for anyone setting up a new Gatsby site managed with NetlifyCMS, or even anyone trying to augment an existing project. 

## Design stuff

### gatsby-plugin-layout

Gatsby v1 had the idea of "layouts", which were high level components that automatically wrapped each page. This feature was changed in Gatsby v2, but their offical docs explain the new situation pretty well. 

> In the original implementation, the layout component was wrapped around the outside of the page component. This meant that the layout component could manage things like transitions and persistent state without any special workarounds, because it never rerendered. In version 2, the layout component is no longer special, and it’s included in every page that wants to display it. This means that it does rerender on every route change.

I like being able to do page transitions and other things that required my header and footer not to rerender.﻿ This component wraps every page and I've found that it's also a good place to put other global things like styles or some context providers. I have a feeling this is using Gatsby's [`wrapPageElement` Browser API](https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement) behind the scenes, but I think it is a little bit easier to configure via plugin.

### gatsby-plugin-react-helmet

[`gatsby-plugin-react-helmet`](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/) is a default Gatsby plugin that comes with every new Gatsby starter site. The starter site uses the plugin to pass metadata from pages up and into the `<head>` of the site, but it actually comes with a lot of other features. The layout wrapping method I outlined above can make it kind of difficult to pass data upwards, but if you dig into the [documentation of the base package](https://github.com/nfl/react-helmet#reference-guide) there's actually a way to add attributes to the `<body>` tag of the page. I've used this in a few instances to add high level classnames to the top of the page and then used my [favorite scss feature](https://css-tricks.com/the-sass-ampersand/#article-header-id-5) to add page specific overrides.

```javascript
// layout.jsx

const Layout = props => {
  return (
    <Header className="header"/>
      {props.children}
    <Footer className="footer"/>
  )
}

// homepage.jsx

const Homepage = props => {
  return (
    <>
      <Helmet>
        <body className="homepage" />
      </Helmet>
      <Content {...props} />
    </>
  )
}

// header.scss

.header {
  background: maroon;
  color: white;
  
  .homepage & {
    background: white;
    color: grey;
  }
}
```

By adding a class high up on the chain any components can have page specific styles. This is a good way to reuse components but still be able to have a complex grid layout on a homepage or hide a header on a custom 404 page.

## Content Stuff

### gatsby-plugin-mdx

For anyone not familiar with MDX, I think the [plugin docs](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/) explain it is best - 

> MDX is markdown for the component era. It lets you write JSX embedded inside markdown.

Anyone using Gatsby is already somewhat familiar with React, so the ability to render React components inside markdown feels like a natural next step. The part that I want to highlight is the ability to pass a `components` object to the `MDXProvider` and have it *automagically* replace markdown elements with React components.

```javascript
import Header from './special-header'
import Image from './special-image'

const Markdown = props => (
  <MDXProvider components={{
    h2: Header,
    img: Image
  }}>
    <MDXRenderer>
      {props.post}
    </MDXRenderer>
  </MDXProvider>
)
```

This setup lets you build tools similar to[ gatsby-remark-autolink-headers](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/) or custom images with any built in optimization features. You have the power of a custom React component anywhere, and you only have to configure it in one place.

### gatsby-node.js

Gatsby has a pretty robust node API exposed in their `gatsby-node` file. Anyone who has build a blog and programatically made pages from markdown files has dug into this file. [This tutorial section](https://www.gatsbyjs.org/tutorial/part-seven/) walks through how to generate pages for say, a blog, from data by creating a slug for each .md file and then resolving a template to render. I like to take this a step further and give myself some nice defaults with the ability to override them in frontmatter.

```javascript
if (node.internal.type === 'Mdx' && !node.fileAbsolutePath.includes('content/pages/')) {
  const directory = node.fileAbsolutePath.match(/([^/]+)\/[^/]+$/)[1]
  let url
  let template

  if (node.frontmatter.options.customUrl) {
    url = slugify(node.frontmatter.options.customUrl)
  } else {
    url = slugify(node.frontmatter.title)
  }

  const slug = `${directory}/${url}`

  if (node.frontmatter.options.customTemplate) {
    template = node.frontmatter.options.customTemplate
  } else {
    template = directory
  }

  // create appropriate createNodeField() calls down here...
}
```

With this setup anything in the `blog` directory gets the default template of `blog.js`. I have a similar default that will build a url from the directory name and post title - `blog/post-title`. If I want to override that I can give any post a custom url with something maybe shorter or more readable.

## CMS Stuff

### CMS Manual Initialization

While technically in beta, NetlifyCMS supports [manual javascript initialization](https://www.netlifycms.org/docs/beta-features/#manual-initialization) instead of using a `config.yaml` file. This makes a lot of sense to use with Gatsby since the entire ecosystem is already javascript based. Besides not having to deal with yaml indention this also adds the full power of javascript to the configuration file. That means you can break up configurations into different partials and compose them in your `config` object.

```javascript
// common-fields.js

export const commonFields = [
  {
    name: 'title',
    label: 'Title',
    widget: 'string'
  },
  {
    name: 'date',
    label: 'Date',
    widget: 'date'
  }
]

---

// blog.js

import commonFields from './common-fields'

export const blog = {
  label: 'Blog',
  name: 'blog',
  fields: [
    ...commonFields,
    {
      name: 'body',
      label: 'Body',
      widget: 'markdown'
    }
  ]
}

---

// cms.js

import blog from './blog'

CMS.init({
  config: {
    ... 
    collections: [
      blog
    ]
  }
})
```

This is nice because I *personally* don't care for yaml, but it makes common things like title and date abstractable and able to be reused in any collection.

### Extending Default Editor Widgets

Editor Widgets are editor components that appear under the + in the body while editing a post. The default comes with Image and Code blocks, and there are [pretty good docs](https://www.netlifycms.org/docs/custom-widgets/#registereditorcomponent) on the NetlifyCMS site about how to create custom editor widgets. The example shows how to build a YouTube embed, but what happens if you pass the name of an existing widget to the `id` field? Well, it overwrites it of course! Obviously its easy to break default functionality with this, but I have had a lot of luck overriding the default Image widget to add a few extra options.

![example of my custom media editor widget](/images/cms_image_editor_widget_example.png){data-align='full'}

It's **very** easy to break the editor by trying to query something that isn't there, so be careful with that regex and make sure it accounts for *not* matching anything. It's even possible to pass a custom React component into the `toPreview` value and customize how the image looks in the preview pane. This pairs super well with the MDX component I outlined above. Just [dump out the props in the `toBlock` value](https://github.com/ryanfiller/portfolio-gatsby-v2/blob/master/src/cms/editor/image.js#L63) and have the [MDX component grab them on the front end](https://github.com/ryanfiller/portfolio-gatsby-v2/blob/master/src/components/markdown/image.js#L8) and it's possible to make highly configurable React widgets that a user can easily edit.

## Final Thoughts

Gatsby is a powerful tool, and adding the NetlifyCMS can make it easy enough to edit content that the combination can even power sites where clients needs to log in and make changes. These were just a few tricks I've learned over the past few years of working on my personal blog, hopefully they're helpful to others as well. For examples on everything I mentioned, check out the [repo](https://github.com/ryanfiller/portfolio-gatsby-v2) of this site, and feel free to [reach out](https://twitter.com/ryanfiller_) with any questions!
