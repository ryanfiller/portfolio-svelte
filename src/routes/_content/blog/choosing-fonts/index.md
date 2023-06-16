---
title: Choosing Fonts
series: MKII Redesign
banner:
  src: '/images/1995-letterpress-overprint.jpg'
  alt: 'illuminated manuscript margin illustration of a knight in battle with a giant snail'
  attribution: '1995, freshlemonprint.com'
  # https://www.freshlemonprint.com/shop/1995-letterpress-poster
options:
  published: true
meta:
  date: 2023-05-13
  categories:
    - design
  tags:
    - typography
    - css
  excerpt: >-
    Choosing three new variable fonts and their fallback font stacks.
---

<script>
  import MkIIProgress from '$components/misc/mk-ii-progress.svelte'
</script>



## Inspiration

While working on my logo I had a fairly well-formed idea in my head of how I wanted it to turn out. The process of deciding on a font was a lot more abstract. I knew I wanted to lean more into a vintage science fiction direction.

![inspiration board of sans serif typography I liked - NASA Mercury Capsule poster, vintage How And Why science textbook, collection of VHS tape boxes, The Encyclopedia of Science Fiction book cover, Childhood's End by Arthur C. Clarke book cover, Planet of the Apes movie poster, Star Trek: The Next Generation LCARS screenshot, Plan 9 From Outer Space movie poster, vintage Nasa Saturn Rocket manuals, A Wrinkle in Time by Madeleine L'Engle book cover](/images/choosing-fonts-inspiration-board.png){data-align='full' data-caption='inspiration board of sans serif typography I liked'}

This might seem at odds with the logo I designed in my [last post](/blog/blackletter-logo#inspiration), but a look I've always found cool was the juxtaposition of clean and modern typography with more caligraphic elements. This combination shows up a lot in [anime](https://en.wikipedia.org/wiki/Anime) and science fiction where English and tradition Japanese characters (hiragana, katakana and kanji) are mixed together.

![inspiration board of combinations sans serif and brush typography - Mako Reactor from FFVII Remake, Social Distortion skeleton logo, Syd Mead Bladerunner concpet art, Bathman: Gotham by Gaslight collection cover, Castlevania II: Simon's Quest NES title screen, Mobile Suite Gundam: 0800 logo, New York Times front page from the day of the first moon landing, Hyaku Shiki Gundam model with decals, Nosferatu movie poster, Weyland-Yutani logo from Alien with Japanese subscript, Toonami bumper with 2003 branding, two computer screens from Neon Genesis Evangelion ](/images/logo-pairing-inspiration.png){data-align='full' data-caption='inspiration board of combinations sans serif and brush typography'}

On the technical end there were two limitations that I wanted to follow: 
 - I wanted to use a set of [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings) for my redesign (I even wrote a [blog post](/blog/science-with-science-gothic#what-are-variable-fonts) about this way back in March of 2020).
 - I wanted to pick a series of fonts that would comply with the [guidelines from neurodiversity.design](https://www.neurodiversity.design/font/).

## Candidates

I needed three fonts - a header or display font, something flexible and readable for body copy, and a monospace font for blocks of code.

Two of the best sites I can recommend for finding variable fonts are [v-fonts.com](https://v-fonts.com/) and [Google Fonts](https://fonts.google.com/variablefonts). V-Fonts is cool because it lets you filter by license and has many fonts that fall under either [open source](https://v-fonts.com/licenses/open-source) or free for [commercial](https://v-fonts.com/licenses/free-for-commercial-use)/[non-commercial](https://v-fonts.com/licenses/free-for-non-commercial-use) use.

After looking through pages and pages of fonts I narrowed my selection down to two for each category.

### Header

For a display font I was between Science Gothic, a sans serif art deco font, and Fraunces, an art nouveau serif font.

|           | [Science Gothic](https://v-fonts.com/fonts/science-gothic) | [Fraunces](https://v-fonts.com/fonts/fraunces)       |
| --------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| axes      | weight <br /> width <br /> y opaque <br /> slant           | optical size <br /> weight <br /> soften <br /> wonk |
| size      | 653 KB                                                     | 190 KB <br /> 230 KB (talic)                         |
| ligatures | no                                                         | yes                                                  |

### Body



|           | [IBM Plex](https://v-fonts.com/fonts/ibm-plex-sans-variable) | [Recursive](https://v-fonts.com/fonts/recursive)                  |
| --------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| axes      | 106 KB <br /> 122 KB (italic)                                | monospace <br /> casual <br /> weight <br /> slant <br /> cursive |
| size      | 786 KB                                                       | 190 KB <br /> 230 KB (italic)                                     |
| ligatures | yes                                                          | no                                                                |

### Code

(`Recursive` appears here as I was considering using it both as a body font and as a code font)
Fire code has ligatures that I like

|           | [Recursive](https://v-fonts.com/fonts/recursive)                  | [Fira Code](https://v-fonts.com/fonts/fira-code) |
| --------- | ----------------------------------------------------------------- | ------------------------------------------------ |
| axes      | monospace <br /> casual <br /> weight <br /> slant <br /> cursive | weight                                           |
| size      | 190 KB <br /> 230 KB (italic)                                     | 280 KB                                           |
| ligatures | no                                                                | yes                                              |


## Choices
 - mention fetching the size here
 - talk about `CSS.loadFont()` or whatever

 ### Header

 https://www.youtube.com/watch?v=k0oQr7ZVtBQ

 ### Body
 https://www.neurodiversity.design/font/

 ### Code
 https://wesbos.com/uses#editor--terminal

## Web Fonts

/blog/science-with-science-gothic

## Font Stacks

## Talke about `prefers-reduced-data` and how it WOULD work if it existed yet

<MkIIProgress imageUrl='/images/beta-screenshot-2.png' />
