---
title: Blackletter Logo
series: MKII Redesign
banner:
  src: '/images/knight-vs-snail.jpg'
  alt: 'illuminated manuscript margin illustration of a knight in battle with a giant snail'
  attribution: 'Knight v Snail V:  Revenge of the Snail, Smithfield Decretals'
options:
  published: true
meta:
  date: 2022-04-13
  categories:
    - design
  tags:
    - logo
    - typography
    - css
  excerpt: >-
    Refining an old logo design I've been working on to use for the basis of a new site.
---

When I [started my website from scratch in 2020](http://localhost:3000/blog/starting-fresh-in-2020), I always intended to create a new logo as one of the first things I would work on. However, other tasks took priority, and now more than three years later, I still only have my name typed out in a font at the top of the site serving as a makeshift logo. This has made it difficult to make big design decisions elsewhere on the site, as I was afraid I would put a lot of work into a design element, only to have it clash with whatever I eventually settled on for a logo. This time around, I made sure to do things in a different order when starting over.

To check out the finished logo, feel free to jump straight to [the end](#the-finished-logo).

## What is Blackletter

![Unicode Character U+211C](/images/U+211C.svg){data-small='true' data-align='right' data-caption='Unicode Character U+211C'}

"Blackletter," according to [Wikipedia](https://en.wikipedia.org/wiki/Blackletter), "is a script used throughout Western Europe from approximately 1150 until the 17th century." Despite its wide usage during the European Middle Ages, the style eventually fell out of favor due to the rising popularity of less ornate and more readable styles, in addition to having [a complicated relationship to one of the 20th century's worst events](https://blog.ocad.ca/wordpress/visd2004-fw2020-002-m/sample-page/futurablackletter-and-their-links-to-nazi-germany/).

The style of this lettering is characterized by tall and narrow letters formed by straight, angular lines that often end in sharp final shapes that "bite," or overlap, other letters. Due to its prominent historical usage in the European Middle Ages it still lives on as a sort of shorthand for the "medieval period" for works set in the time period, especially the fantasy fiction genre.

## Inspiration

![inspiration board of things that made me think of 'blackletter' - The Addams Family, Treasure Island, Bugs Bunny in Knighty Knight Bugs, The Legend of Zelda, Final Fantasy, Lord of the Rings, Doctor Doom, Merlin, Quest 64, The Sword in the Stone, Gargoyles, Dragonheart, Dungeons & Dragons, Lego Castles, Hook, Shining Force II, The Hobbit, Night on Bald Mountain, Castlevania, The Chronicles of Narnia, The Three Musketeers, Castlevania III, Gauntlet, Pirates of Dark Water, Robin Hood, Warcraft II](/images/blackletter-inspiration-board.png){data-align='full' data-caption='everything from my childhood that made me think "blackletter"'}

I began the project by researching everything I personally associated with this style of font. Surprising to me, many of the things I thought of as using "blackletter" actually use a different type of lettering like [antiqua](https://en.wikipedia.org/wiki/Antiqua_(typeface_class)), a [rotunda](https://en.wikipedia.org/wiki/Rotunda_(script)) or [minuscule](https://en.wikipedia.org/wiki/Carolingian_minuscule) style, or even a more generic [Roman style](https://en.wikipedia.org/wiki/Roman_square_capitals) font. I found this interesting because I guess I wasn't aiming to reference any specific historic period precisely, rather I wanted to capture the general "vibe" these projects had.

## Rough Sketch

I actually had this initial idea a while back and jumped directly into Adobe Illustrator to rough it out. According to the file created time, I started experimenting with this logo in April 2021.

![original logo sketch from 2021](/images/blackletter-logo-sketch.svg){data-align='full' data-caption='the original version of the logo from 2021'}

I took a lot of inspiration from the [Textura](https://en.wikipedia.org/wiki/Blackletter#Textura) form because I thought its inherent geometry fit the best with my personal design style. I also _really_ wanted to avoid the WWII connotations I mentioned above so I did my best to stay away from directly referencing the [Fraktur](https://en.wikipedia.org/wiki/Fraktur) style. The logo is made up only of straight lines, with each letter constructed using a combination of a square diamond shape and a vertical rectangle.

## Refining

I lost interest in this logo for a while, but then something happened earlier last year that really got me back into the "medieval fantasy aesthetic" mindset.

![screenshot of my Elden Ring game menu showing my level 247 knight character with 251 hours of playtime](/images/elden-ring-ryanknight.jpg){data-caption='Elden Ring is the only game I have ever earned a Platinum Trophy for in my entire life.'}

After months of adventuring around [The Lands Between](https://www.youtube.com/watch?v=E3Huy2cdih0), battling all sorts of knights, wizards, and monsters, I felt compelled to find a way to make this logo work.

### Letter Stems

![outlined version of letter r, after on the left and the right. the after version is shorter and thinner](/images/blackletter-logo-r-comparison.svg){data-small='true' data-align='right' data-caption='left: sketch, right: refined'}

One of the first changes I made was to slim down all of the vertical letter stems. In the original sketch each stem had the same width as one of the diamonds rotated 45°, but for the updated version I reduced the width to only half of the width of one of the serif finals. This added some visual contrast to the logo and made it more realistic in terms of what a calligraphy pen could produce.

### X-Height

![a monogram version of the logo showing only the letters 'rf', a square is drawn around them](/images/blackletter-logo-rf-square.svg){data-small='true' data-align='left'}
![a new version of the 'rf' monogram overlaid on the old version showing that the new version is shorter](/images/blackletter-logo-rf-comparison.svg){data-small='true' data-align='left'}

From the start, I had envisioned a version of the logo that could work as a monogram with only my initials. While working on the lockup, I realized that it would work best if it fit inside a square so it could be used for various [favicon images](https://en.wikipedia.org/wiki/Favicon) that my site would eventually need.

This ultimately ended up deciding the final height of the letters so that the ascender and descender of the "f" would line up with the imagined outline, as would the bottom bottom terminal of the "r". To fit into the square the overall [x-height](https://en.wikipedia.org/wiki/X-height) and [body height](https://en.wikipedia.org/wiki/Body_height_(typography)) of the letters was reduced a decent amount from the original sketch.

[[clearfix]]

![logo with vertical dotted lines overlaid to show that each letter has a consistent stem width](/images/blackletter-logo-vertical-alignment.svg)

![letter with horizontal dotted liens overlaid to show that each letter has a consistent baseline, x-height, and body height  ](/images/blackletter-logo-horizontal-alignment.svg)

With the x-height, body height, stem width, and terminal size were established, I reworked the rest of the letters for consistency with the updated "r" and "f."

### Grid Layout

![outline of full logo overlaid on a grid system showing uniform alignment for all the shapes](/images/blackletter-logo-outline-grid.svg)
<!-- ![full logo overlaid on a grid system showing uniform alignment for all the letters](/images/blackletter-logo-grid.svg) -->

I had two main goals while creating each individual letter form: to use the minimum number of shapes necessary, and to strictly adhered to a 6x6 grid system created from the size of the base diamond shape.

I also decided to combine the "f" and "i" characters into an "ﬁ" ligature was both for consistency in the letter spacing of my last name and also just because I am a fan of ligatured letters in general.

![logo with diagonal dotted lines overlaid showing the consistent angled gaps between the r and y, f and i, and e bowl](/images/blackletter-logo-gaps.svg)

When I was in design school I remember a professor telling me - 

> Once An Accident, Twice A Coincidence, Three Times A Pattern

I looked this quote up and expected it to have been said by a famous designer, but apparently this is actually an [Ian Flemming](https://en.wikipedia.org/wiki/Ian_Fleming) quote from the James Bond novel [Goldfinger](https://en.wikipedia.org/wiki/Goldfinger_(novel)). Regardless of who coined the phrase, I made sure to repeat the small, diagonal spacing at least three times — once between the "r" and "y", once in the "ﬁ" ligature, and once in the open counter of the "e".

![logo with diagonal dotted lines overlaid showing alignment between different letter ascenders, descenders, and terminals](/images/blackletter-logo-block-alignment.svg)

With that spacing nailed down I designed the remaining letters to create as much diagonal alignment among their ascenders, descenders, and terminals as possible. Because of the previous constraints around x-height and overall letter height not every element could align perfectly.

## The Finished Logo

<!-- ![final version of full logo](/images/blackletter-logo.svg){data-caption="final version of full logo"} -->
<!-- ![final version of monogram logo](/images/blackletter-logo-monogram.svg){data-caption="final version of monogram logo" data-align="center"} -->

![final version of both full and monogram logo side by side](/images/blackletter-logo-two-up.svg){data-caption="final versions the logo"}

Overall, I am very happy with how to the logo turned out. I think it is greatly improved from the sketch I started over a year ago. It feels like a progression in a line of geometric self branding I've been developing over the years, and I think it will be a good place to start developing the rest of the visual identity for my site redesign.

One accidental nicety from the design adhering to a strict grid is that the final logo comes out with a perfect 24:7 aspect ratio and full size and a 21:28 aspect ratio in the abbreviated form, which makes scaling the logo easier without getting into sub-pixel sizes.


## Bonus - CSS Container Queries

### What are Container Queries?

[Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) are a highly anticipated CSS feature that finally landed in all major browsers early in 2023.  Unlike [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) queries, which respond to the viewport size, container queries allow components to react to the size of their ancestor container rather than the overall page.

Swapping out a logo for an abbreviated version on small screen sizes is a very common design pattern, and with the two versions of my new logo it seemed like a natural place to try out this new feature.

### The Code

Container queries rely on the CSS principle of "containment," which requires the element to be styled to be wrapped in another element which has a [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type) property set. For the inline SVG logo the wrapping element should semantically be a [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) tag.

```html
<figure>  
  <svg preserveAspectRatio="xMinYMin slice" ...>
    <path class="r" id="r" ... />
    <path class="y" ... />
    <path class="a" ... />
    <path class="n" ... />
    <path class="f" id="f" ... />
    <path class="i" ... />
    <path class="l" ... />
    <path class="l" ... />
    <path class="e" ... />
    <path class="r" ... />
  </svg>
</figure>
```

One other thing to note is the `preserveAspectRatio` set on the `<svg>` itself. The [syntax](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio#syntax) can be kind of confusing, but in short `xMinYMin` means the graphic will scale uniformly and `slice` means the graphic can expand beyond the set viewport without scaling down.

```css
figure {
    container-type: inline-size;
    resize: horizontal;
    overflow: hidden;
}
```

The `<figure>` element is styled with a `container-type` property of `inline-size`, which is a [logical property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) that corresponds to the width of the element in left-to-right languages. This allows the child `<svg>` element to respond when its container changes width. For the interactivity of the demo I also made the containing element [resizable](https://developer.mozilla.org/en-US/docs/Web/CSS/resize).

```css {7-17}
figure {
  container-type: inline-size;
  resize: horizontal;
  overflow: hidden;
}

svg {
  aspect-ratio: ...;
}

svg path:where(:not(#r):not(#f)) {
  opacity: 0;
}

svg path#f {
  transform: translateX(...);
}
```

Container queries are [supported in all modern browsers](https://caniuse.com/css-container-queries), but it is still possible that some users may not have this feature available. To provide a better experience for these users, especially on smaller screens, I want the monogram logo to be the default and to only show the full logo with an `@container` rule for larger screens. If a browser does not support container queries, it will ignore the ` @container` block and always display the smaller logo.

Since the logo was designed using a grid, I was able to use an [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) property calculated from the size of the logo's [`viewbox`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox). Combined with the `preserveAspectRatio` value, the logo will scale down to the appropriate monogram size. I also used the new [`:where`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) pseudo-class to avoid specificity conflicts when overriding these styles further down the stylesheet.

```css {19-28}
figure {
  container-type: inline-size;
  resize: horizontal;
  overflow: hidden;
}

svg {
  aspect-ratio: ...;
}

svg path:where(:not(#r):not(#f)) {
  opacity: 0;
}

svg path#f {
  transform: translateX(...);
}

@container (min-width: ...) {
  svg {
    aspect-ratio: ...;
  }

  svg path {
    opacity: 1;
    transform: none;
  }
}
```

I chose not to [name my container context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries#naming_containment_contexts), which means that the `@container` style block will automatically apply to the first parent element with a set `container-type`, in this case the `<figure>` element. Resetting the style to the "default" only took a few lines — I set the original `aspect-ratio` and made sure that all of the letter `<path>`s were visible and in their original position.

<!-- TODO - make this better -->
<style>
  figure#resize-logo {
    font-size: 2em;
    margin-block: 0 !important;
    margin-inline: auto !important;
    line-height: 0;
    padding: 0.5em;
    outline: 1px solid currentcolor;
    resize: horizontal;
    overflow: hidden;
    inline-size: 50dvw;
    block-size: 2.925em !important;
    min-inline-size: 2.5em !important;
    max-inline-size: 100% !important;
    container-type: inline-size;
    display: flex !important;
    justify-content: center;
    /* logo is 6.7125em wide */
  }
  figure#resize-logo svg {
    inline-size: 100%;
    /* canvas 210px x 280px */
    /* this ratio reduces to 21 x 28 */
    aspect-ratio: 21/28;
    max-inline-size: 1.5em;
  }
  figure#resize-logo svg path {
    fill: currentcolor;
    stroke: currentcolor;
    stroke-linecap: round;
    stroke-inline-size: 1;
    /* use where for specificity */
  }
  figure#resize-logo svg path:where(.f) {
    transform: translateX(-39.5%);
  }
  figure#resize-logo svg path:where(:not(.r.one):not(.f)) {
    opacity: 0;
  }
  @container (min-width: 6.5em) {
    figure#resize-logo svg {
      /* canvas 960px x 280px */
      /* this ratio reduces to 24 x 7 */
      aspect-ratio: 24/7;
      max-inline-size: 6.6em;
    }
    figure#resize-logo svg path {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
<br />
<figure id='resize-logo'>  
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 280" preserveAspectRatio="xMinYMin slice" title="ryan filler">
    <path class="r one" d="m60,100v60l30,30-30,30-30-30v-60L0,100l30-30,30,30Zm60,0l-30-30-30,30,30,30,30-30Z"/>
    <path class="y" d="m190,190l-30,30-30-30v-20l-30-30,30-30,30,30v20l30,30Zm-30-90l30,30v120l30-30v-120l-30-30-30,30Zm-30,150l30,30,30-30-30-30-30,30Z"/>
    <path class="a" d="m320,160l30,30-30,30-30-30v-60l-30-30,30-30,30,30v60Zm-60-60l-30,29v61l30,30,30-30-30-30v-60Z"/>
    <path class="n" d="m380,160l30,30-30,30-30-30v-60l-30-30,30-30,30,30v60Zm90,30l-30,30-30-30v-60l-30-30,30-30,30,30v60l30,30Z"/>
    <path class="f" d="m530,30v220l-30,30-30-30,30-30V60l30-30Zm60,0l-30-30-30,30,30,30,30-30Zm-30,40l-30,30,30,30,30-30-30-30Z"/>
    <path class="i" d="m600,160l30,30-30,30-30-30v-50l30-30v50Z"/>
    <path class="l one" d="m660,160l30,30-30,30-30-30V60l-30-30,30-30,30,30v130Z"/>
    <path class="l two" d="m720,160l30,30-30,30-30-30V60l-30-30,30-30,30,30v130Z"/>
    <path class="e" d="m780,100v60l30,30-30,30-30-30v-61l30-29Zm0,0l20,20-20,20,30,30,30-30-20-20,20-20-30-30-30,30Z"/>
    <path class="r two" d="m900,100v60l30,30-30,30-30-30v-60l-30-30,30-30,30,30Zm60,0l-30-30-30,30,30,30,30-30Z"/>
  </svg>
</figure>
<br />

And that's it! In less than 30 lines of CSS I was able to create a logo that dynamically responds to available space and automatically transforms itself into a condensed version when necessary. If you want to see the full code, along with some fun animation effects, check out [this CodePen](https://codepen.io/ryanfiller/pen/xxaOjEe).

<!-- <iframe height="300" style="width: 100%;" scrolling="no" title="container query blackletter logo" src="https://codepen.io/ryanfiller/embed/xxaOjEe?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ryanfiller/pen/xxaOjEe">
  container query blackletter logo</a> by Ryan Filler (<a href="https://codepen.io/ryanfiller">@ryanfiller</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe> -->

<!-- TODO make this better -->
## Progress on the New Site

![screenshot of beta.ryanfiller.com that corresponds with the additions from this blog post](/images/beta-screenshot-1.png)

Follow along with my redesign at [beta.ryanfiller.com](http://beta.ryanfiller.com/) (which may or may not currently match what is shown at the time of publishing this blog post.)
