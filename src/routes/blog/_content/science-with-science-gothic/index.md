---
title: 'Science, with Science Gothic'
banner:
 src: '/images/batman-science.jpg'
 alt: 'Batman and Alfred playing with beakers'
 attribution: 'Batman 1996, Warner Bros.'
options:
  published: true
meta:
  categories:
    - code
  date: 2020-03-31T05:00:00.000Z
  excerpt: >-
    Science Gothic is a very cool variable font, but it is over one megabyte in
    size. I am testing and comparing the most efficient ways to load and style
    custom web fonts.
  tags:
    - fonts
    - performance
---

<script>
  import Table from './_diff-table/index.svelte'
</script>

## What are Variable Fonts?

Webfonts are one of my favorite parts of making websites. When I first started learning web development back in college in 2011 we were still trying to stick to [a short list of web safe fonts](https://www.w3schools.com/cssref/css_websafe_fonts.asp). Eventually [Google Fonts](https://fonts.google.com/) really opened the door for anyone to use high quality web fonts, and toally for free. The downside to this approach is that its *very* easy to go overboard. Fonts are a heavy web resource, and loading a light, regular, bold, extrabold (and italic multiples!) for every font can get **heavy** very quickly.

Enter new kid on the block, [variable web fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide).

> Variable fonts are an evolution of the OpenType font specification that enables many different variations of a typeface to be incorporated into a single file, rather than having a separate font file for every width, weight, or style. 

That means that by loading just one file it is now possible to use the `font-variation-setting` css property to specify weight, italic, width, and really anything else a typographer might imagine. There are some very cool examples on [v-fonts.com](https://v-fonts.com/), and I also put together [my own tool](/lab/variable-font-display).

### There are downsides to this, though

There are two factors to consider with loading fonts, or really resource, on the web - number of requests and payload size. Since fonts tend to be both heavy and have numerous files for their variations, variable fonts solve the first part of this equation by loading a huge combination of font settings by making just one request and downloading only one file. However, the drawback to using one file that contains multitudes is that this file is usually much, much larger than any one file containing only a single variation. There's a balance to be made, with the size of a font file and the number of variations that get used on a site. If its only one or two, it might be better going the traiditional route and making more requests but for much smaller files.

## What is the best ways to load large files?

Because I love doing strange things with CSS, I'm choosing to bring some variable fonts into my site just so I can experiment with them. What's the best way to do this? Well, today that's exactly what I want to find out. As they said on Mythbusters once - 

> The Only Difference Between Screwing Around and Science Is Writing It Down

[Science Gothic](https://github.com/tphinney/science-gothic) is the font I'll be using for this test. This font has 4 axes, and is about 1.2MB uncompressed, which is *a lot*.

I will be using the [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) Firefox extension to check page speed, and taking the average of five results. I'll be hosting the site on Netlify, with each test site being a separate [pull request](https://github.com/ryanfiller/gatsby-font-science/branches) and preview deploy.

## Test Control

For a baseline in this experiment, I've made a fresh Gatsby site that contains the following code: 

```html
<h1>
  <span>
    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
  </span>
  <span>
    0123456789
  </span>
  <span>
    !@#$%&*_+-=?[]()
  </span>
</h1>
```

I'm testing the page's Lighthouse ranking with no extra fonts loaded to see what the weight of a "normal" web page under these circumstances would be.

![lighthouse control score](/images/font-load-test-control.png){data-caption="Page with default fonts, Science Gothic not loaded." data-align="full"}

<Table data='control' />

## Where to keep the fonts?

The first part of this test will be Gatsby specific. 

Gatsby offers two places to keep files - in the `src` directory of the project, or outside in the `static` folder. For these test I'll be putting the font file in each of these places, as well as loading from an external CDN, and running the same average of five speed tests. Each site will be using the same `@font-face` declaration:

```css
@font-face {
  font-family: 'Science Gothic';
  src: url('/path/to/file/ScienceGothicVF.ttf');
}
```

The external CDN is another Netlify hosted site I set up that only contains the .ttf file for the font.

<Table data='location' />

These numbers were roughly what I expected. Gatsby [reccomends putting all assets in the `src` folder](https://www.gatsbyjs.org/docs/recipes/styling-css/#adding-a-local-font) to take advantage of optimization, and actually [advises against using the `static` folder](https://www.gatsbyjs.org/docs/static-folder/#when-to-use-the-static-folder) for this sort of thing. I knew that loading the font from an external server would preform worse than self-hosting, but I decided to test it anyways because I guess you never really know until you try.

### Is there any way to speed Gatsby up?

Gatsby does offer this [first party plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-preload-fonts/) to help apply preloading to font calls (more on what exactly that means later). Here is the same speed test again, but with this plugin and its generated `font-preload-cache.json` file included.

<Table data='plugin' />

These actually were not the results I was expecting at all... 

Externally hosted fonts were cached, which makes sense they would show a performance boost, but it seems like adding this overhead to already self-hosted fonts actually makes them load *slower* somehow?

From the docs for this plugin:

> It works really well with services like Google Fonts that link to stylesheets that in turn link to font files.

This tracks with the improvements from the CDN link, but it would seem from this data that for self-hosted fonts there's actually a performance penalty for trying to load them this way. 

I know that I want to self-host these fonts, so to speed up testing I'm going to rule out the CDN and `gatsby-plugin-preload-fonts`. I'll still be testing both the src and static directories because even though it is against Gatsby's recommendation, there is [some added benefits](https://www.gatsbyjs.org/docs/caching/#static-files) and caching opportunites to keeping files in the static directory.

## How to load the fonts?

Another relatively new feature of the web is the ability to add a `rel` attribute to a `<link>` tag in the site's `<head>` for "resource hinting." This attributes gives the browser a heads up about the type of content being loading, and give some clues about how to load it and how soon it will be needed by the user. 

### rel="preload"

```html
<link
  rel='preload'
  as='font'
  href={../path/to/ScienceGothicVF.ttf}
  type='font/ttf'
/>
```

From [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content):

> The preload value of the &lt;link&gt; element's rel attribute lets you declare fetch requests in the HTML's &lt;head&gt;, specifying resources that your page will need very soon, which you want to start loading early in the page lifecycle \[...]

In short, `preload` is a flag to the browser that this resource, be it a font, javascript, or a critical css file, needs to be downloaded as soon as possible. The most important part about this is that the file will be loaded in a *non-blocking* way, meaning that the rest of the page can progress while the font is still downloading.

<Table data='preload' />

### Notes on other `rel` values

I won't be exploring the other potential `rel` values in this post because they don't seem to apply to my use case (and it *definitely* isn't because I waited until the last day of the month to get this blog post out...). According to the [W3C spec](https://www.w3.org/TR/resource-hints/#dfn-preconnect), the other resource hints apply mostly to outside resources, which aren't super relevant since I've already demonstrated the advantages of self hosting fonts.

<dl>
  <dt>
    <a href="https://www.w3.org/TR/resource-hints/#dfn-dns-prefetch">dns-prefetch</a> & <a href="https://www.w3.org/TR/resource-hints/#preconnect">preconnect</a>
  </dt>
  <dd>used to indicate an origin that will be used to fetch required resources</dd>

  Since these are self hosted files I shouldn't see any speed benefits here. These attributes seem most applicable to something like an externally hosted font, or a fetch request to needs to go to another url to get data.

  <dt>
    <a href="https://www.w3.org/TR/resource-hints/#prefetch">prefetch</a> & <a href="https://www.w3.org/TR/resource-hints/#prerender">prerender</a>
  </dt>
  <dd>used to identify a resource that might be required by the next navigation</dd>
<dl>

Since I'm intending the file to be loaded as fast as possible on *any* page, I don't think I'll get any speed benefits here either. These attributes seem most applicable to a specific page deeper in the site hierarchy that requires some heavy loading.

## How to display the fonts?

While large web fonts load in the background, browsers try to do their best to handle styles in the meantime. Flash Of Invisible Text (FOIT) and Flash Of Unstyled Text (FOUT) are two issues that developers have wrestled with for years, but thanks to the relatively new [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) property style authors finally have some control over what happens before and during load times.

### Controlling rendering with `font-display`

> The font display timeline is based on a timer that begins the moment the user agent attempts to use a given downloaded font face. The timeline is divided into the three periods below which dictate the rendering behavior of any elements using the font face.

<dl>
  <dt>Font block period</dt>
  <dd>If the font face is not loaded, any element attempting to use it must render an invisible fallback font face. If the font face successfully loads during this period, it is used normally.</dd>

  <dt>Font swap period</dt>
  <dd>If the font face is not loaded, any element attempting to use it must render a fallback font face. If the font face successfully loads during this period, it is used normally.</dd>

  <dt>Font failure period</dt>
  <dd>If the font face is not loaded, the user agent treats it as a failed load causing normal font fallback.</dd>

  There are four possible values that the `font-display` property can take.

  <dt>optional</dt>
  <dd>Gives the font face an extremely small block period and no swap period.</dd>

  This means that the browser will quickly check if the font is available, if it isn't the fallback font will display. This basically means "the font is optional to the design."

  <dt>fallback</dt>
  <dd>Gives the font face an extremely small block period and a short swap period.</dd>

  This means that the browser will also quickly check if the font is available, but it will provide a short period afterwards for the loaded font to be swapped in.

  <dt>swap</dt>
  <dd>Gives the font face an extremely small block period and an infinite swap period.</dd>

  This option quickly checks for the font, but lets the loaded font appear at any time afterwards.

  <dt>block</dt>
  <dd>Gives the font face a short block period and an infinite swap period.</dd>
</dl>

This option give the longest possible time to check for the font before rendering a fallback, but also lets the loaded font appear at any point.

![optional, fallback, swap, and block loading](/images/font-load-test-3g-font-display.mp4){data-caption="examples showing optional, fallback, swap, and block loading"}

In the above comparison the fonts are loaded after clearing the cache. The block period of the font can be observed in the time it takes the numbers to appear. The furthest left block, set to `optional`, will never load the font since it could not be downloaded during the short block period. The second to left block, set to `fallback`, fails to load the font during the block period, but it also fails to load during its short swap period. This means that this block will also not display the font. The third block, `swap`, loads the same as the `fallback` block but due to its longer swap period it does eventually display the font. The final block, styled with `block` is notably different because it has the longest block period. This is why the numbers appear later than in any other example, and due to its infinite swap period it will *always* eventually load the font.

## How to avoid flashes all together?

It would be nice if fonts could load instantaneously, and though that technically is possible I do have to advise against it, at least for this scenario with such a large font file.

### base64 encoding

[Base 64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) is a way to translate binary files into a text string. This can be done to most types of files, including fonts. That font can then be used as data in a number of places in css, including background-images, pseudo element content, and even @font-face declarations.

```css
@font-face {
  font-family: 'Science Gothic';
  /* truncated because this line was 1,593,708 characters long */
  src: url(data:@file/x-font-ttf;base64,AAEAAAAVAQAABABQRFNJRwAAAAEAEj0IA... );
}
```

Because the data has been transposed to text, it can now be downloaded as part of a the site's css (or js, if css-in-js is your thing) bundle. Just like with variable fonts themselves though, number of requests is only half the equation here. This will **greatly** increase the size of the overall bundle, and depending on the size of the font, probably isn't ever a good idea.

![lighthouse score of page with base64 encoded font](/images/font-load-test-base64.png){data-align="full"}

To compare the data: 

<Table data='encoded' />

## Can JavaScript help at all?

There are some javascript options, probably the most popular of which is the [Web Font Loader](https://github.com/typekit/webfontloader) (which Gatsby does have a [plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-web-font-loader/) for), but these tools don't tend to make the font load any faster. Instead tools like this help control unwanted flashes by using javascript to add or remove a classnames (`wf-loading` in the case of Web Font Loader) on the body of the page so that fonts can be hidden or styled differently while files load in.

I did make a [test page](https://5e854097e97dd4000678801a--font-science-gothic.netlify.com/) using Web Font Loader, but this actually hurt performance by adding to the overall size of the javascript bundle. The biggest downside to this approach, in my opinion, is that custom fonts will actually *never* load for users with javascript disabled since there is no mechanism to swap out class names when fonts are made available and shutting off features to users is something I try to avoid whenever possible.

<!-- TODO - take these netlify pages down, add an update about removing examples from this -->