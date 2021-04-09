---
title: Choosing Theme Colors
series: Dark Mode
banner:
  src: '/images/choosing-pantone-colors.jpg'
  alt: 'Pantone swatches'
  attribution: 'Christina Rumpf, unsplash.com'
options:
  published: true
meta:
  date: 2021-02-25
  updated: 
   - 2021-02-26
  categories:
    - code
    - design
  tags:
    - colors
    - branding
    - accessibility
  excerpt: >-
    Some advice on how to choose color palettes for both light and dark user themes.
---

<script>
  import ThemeExample from './_theme-example.svelte'
</script>

<style>
  code[data-color] {
    padding: .125em .25em;
    margin: -.125em 0;
  }

  code[data-color="#000000"] {
    background: #000000;
    color: var(--colorWhite);
  }

  code[data-color="#ffffff"] {
    background: #ffffff;
    color: var(--colorBlack);
  }

  code[data-color="#080025"] {
    background: #080025;
    color: var(--colorWhite);
  }

  code[data-color="#fefdf2"] {
    background: #fefdf2;
    color: var(--colorBlack);
  }

  code[data-color="#5651a7"] {
    background: #5651a7;
    color: var(--colorWhite);
  }

</style>

Choosing a color palette for a website is hard. Its even more complicated when trying to choose colors that will work with both a dark-on-light and [light-on-dark](https://en.wikipedia.org/wiki/Light-on-dark_color_scheme) theme. I recently re-themed my site and here are some things I learned along the way.

## Choosing a color palette

Picking a color palette is something I have always struggled with, even as far back as college. There are plenty of tools online that use algorithms to help you choose colors, [Coolors](https://coolors.co/) and [Adobe Kuler](https://color.adobe.com/create/color-wheel) are two favorites of my favorites.

A trick I learned in design school is to find an image with a vibe you like and sample colors from it as a starting point. [Color theory](https://en.wikipedia.org/wiki/Color_theory) is complicated, and I think it's okay to lean on experts who has already put in the work.

> Good artists borrow, great artists steal.
> ***
> ~~Pablo Picasso~~ <br /> Ryan Filler

(_Really I just wanted to make this joke, but the [actual history of this quote](https://www.uvu.edu/arts/applause/posts/stealing.html) was too ironic not to also share._)

![Starwatcher II, Moebius](/images/moebius-starwatcher-2.jpg){data-align="left" data-small="true"}

Copyright law seems kind of fuzzy on if it's legal to lift a color palette from an established brand. For instance, I wouldn't recommend just copying, say, Google's red, yellow, green, and blue. Photographs, advertisements, fine art, comics, even film and video game stills, though, are fair game. [colorpalette.cinema](https://www.instagram.com/colorpalette.cinema/) is a great Instagram account that posts color pallets made from scenes of popular movies.

The color palette for my 2020 re-theme was built by selecting colors from _Starwatcher II_, an illustration by [Jean "Moebius" Giraud](https://en.wikipedia.org/wiki/Jean_Giraud).

[[clearfix]]

Another pro-tip I learned in design college was to never use straight <code data-color='#000000'>#000000</code> black or <code data-color='#ffffff'>#ffffff</code> white in a design. A design, even in print, will look much more intentional with a slightly desaturated black and a slightly temperature-shifted white instead of using the default colors. I try to keep this in mind when sampling colors from images and try to instead grab any dark color to stand in for "black" on my site. In fact, the color I chose for "black," <code data-color='#080025'>#080025</code>, is actually a very deep purple and "white," <code data-color='#fefdf2'>#fefdf2</code>, is a very pale yellow.

## Keeping accessibility in mind

![all colors chosen for my website](/images/color-scheme-chart-all.png){data-align="right"}

One of the hardest parts about choosing colors for the web is finding the right balance between what looks good and what is high contrast enough for all users.  I've built a [tool to help with this](https://colors.ryanfiller.com/) ([learn how I built it in this post](/blog/svelte-sanity-and-serverless-functions)), but finding a combination that works can still be hard work.

Something that worked out well for me is to focus on making sure the first two rows and first two columns of this chart are all passing scores. In most scenarios, text will either appear as black or white on a colored background, or as a color on a black or white background. If there are other specific color combinations you know you want to use, make sure they also pass the [WCAG color contrast ratio](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).

Firefox also has a [cool feature](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector/Simulation) in the accessibility section of their developer tools that will simulate how different colors look to users with different vision deficiencies.

![simulated vision modes in dev tools](/images/color-scheme-simulated-vision-modes.png){data-align="full" data-caption="Simulation of Protanopia (no red), Deuteranopia (no green), Tritanopia (no blue), Achromatopsia (no color), and Contrast loss"}

## Naming colors

In modern web development, you're probably storing these color values in some kind of variable. I was a user of [SCSS variables](https://sass-lang.com/documentation/variables) for a long time, but I've switched over to using [native CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).

Naming these variables can be challenging because you want to pick a name that's meaningful, unique, and searchable. I'm a fan of prefixing every variable with `color-` to help my text editor give me a tab completion list when I start typing the word `color`.

![$color variable autocompleting in VS Code](/images/named-color-variables.png){data-align="full"}

For more complex color palettes I like to name my colors with the [Crayola naming convention](https://tanzu.vmware.com/content/blog/name-your-css-swatches-after-crayola-colors) so that each variant of, say "blue" has a unique name. These name variations can be tricky to choose out on your own, so I like to use [this site](https://chir.ag/projects/name-that-color) to generate them. My friend Josh wrote [an article that goes more in depth on this strategy](https://josh.beardedrobots.com/posts/crayola-naming/).

My color list is pretty simple so I named each color with a dark and light variant and stored them as CSS variables on the `:root` element.

```css
:root {
  --colorBlack: #080025;
  --colorWhite: #fefdf2;
  --colorPurpleLight: #a176b6;
  --colorPurpleDark: #5651a7;
  --colorBlueLight: #4f81c0;
  --colorBlueDark: #155f91;
  --colorOrangeLight: #f16a1f;
  --colorOrangeDark: #ac284f;
  --colorGrayLight: #5e828f;
  --colorGrayDark: #4e6773;
}
```

## Narrowing down a theme

I think there are six minimum colors required for any website color palette —

![light mode colors](/images/color-scheme-chart-light.png){data-align="right" data-caption="light theme colors"}

- **text** - the main text color of the page
- **background** - the main background color of the page
- **primary** - a brand's primary color
- **highlight** - a standout color, used to highlight buttons or other calls-to-action
- **active** - another standout color, using to indicate a hover state or focused element
- **disabled** - a muted color to show an element cannot be interacted with

That's not to say those are the _only_ colors, but I personally think restraint is key to building consistent designs. Many design systems will use dark and light variations of each color for variety and increase the amount of accessible color combinations. I wanted my color palette to be sparse yet flexible and only have two versions of each color.

To set the theme colors I created a second set of variables. Each of these new variables describes how the color would be used and has one of the original named colors assigned to it.

```css
:root {
  --colorText: var(--colorBlack);
  --colorBackground: var(--colorWhite);
  --colorPrimary: var(--colorPurpleDark);
  --colorHighlight: var(--colorBlueDark);
  --colorActive: var(--colorOrangeLight);
  --colorDisabled: var(--colorGrayLight);
}
```

## Converting a palette to Dark Mode

I kept the same six utility colors from the default light mode theme, but reassigned new values for dark mode.

![dark mode colors](/images/color-scheme-chart-dark.png){data-align="right" data-caption="dark theme colors"}

The closest color I have to an official "brand color" is <code data-color='#5651a7'>#5651a7</code>. This is the color I use for my page banners, and for the [social media image that is generated for each post](/blog/automatic-social-share-images) so for branding reasons I kept it as my primary color.

In addition to switching the `text` and `background` colors, I also picked brighter `highlight` and `active` colors that would stand out better on a dark background. I swapped `disabled` for the darker gray variant since light text would be appearing on it and I wanted to ensure it was still easy to read.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --colorText: var(--colorWhite);
    --colorBackground: var(--colorBlack);
    --colorPrimary: var(--colorPurpleDark);
    --colorHighlight: var(--colorOrangeDark);
    --colorActive: var(--colorBlueLight);
    --colorDisabled: var(--colorGrayDark);
  }
}
```

I’ll cover this much more in [part three](/blog/building-a-color-scheme-toggle), but it’s worth noting that media queries don’t increase [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). To make sure these variables are overwritten you’ll want to put the `prefers-color-scheme: dark` rules lower in the cascade.

## Other considerations for Dark Mode

<ThemeExample />

The first instinct to convert a theme to dark mode is to switch the foreground and background colors. This will get a design pretty far, but there's more to consider than only these two colors. When I started my [site over in 2020](/blog/starting-fresh-in-2020) with the default [Gatsby theme](https://github.com/gatsbyjs/gatsby-starter-default) it came with some nice default colors. Beyond black and white there was also brand purple and several gray variants. When switching to a dark-background theme, some of the darker gray text is unreadable, and vice-versa with light grays on a light background.

This awesome article by [Adhuhamism](https://twitter.com/adhuhamism) on [CSS-Tricks](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#design) talks about other things to consider beyond just colors — like modifying the contrast ratio of images and making modifications to text weights and other subtle UI elements like borders and shadows.
