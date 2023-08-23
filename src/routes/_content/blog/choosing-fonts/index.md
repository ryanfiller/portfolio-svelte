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
 - I wanted to pick a series of fonts that would comply with the [guidelines from neurodiversity.design](https://www.neurodiversity.design).

## Candidates and Choices

I needed three fonts - a header or display font, something flexible and readable for body copy, and a monospace font for blocks of code.

Two of the best sites I can recommend for finding variable fonts are [v-fonts.com](https://v-fonts.com/) and [Google Fonts](https://fonts.google.com/variablefonts). V-Fonts is cool because it lets you filter by license and has many fonts that fall under either [open source](https://v-fonts.com/licenses/open-source) or free for [commercial](https://v-fonts.com/licenses/free-for-commercial-use)/[non-commercial](https://v-fonts.com/licenses/free-for-non-commercial-use) use.

After looking through pages and pages of fonts I narrowed my selection down to two for each category.

### Display Font

For the headers font I was between Science Gothic, a sans serif art deco font, and Fraunces, an art nouveau serif font.

<!-- prettier-ignore -->
|           | [![Science Gothic](/images/example-science-gothic.svg)](https://v-fonts.com/fonts/science-gothic) | [![Fraunces](/images/example-fraunces.svg)](https://v-fonts.com/fonts/fraunces)    |
| --------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| axis(es)  | weight (`wght`)<br />width (`wdth`)<br />y opaque (`YOPQ`)<br /> slant (`slnt`)                   | optical size (`opsz`)<br />weight (`wght`)<br />soften (`SOFT`)<br />wonk (`WONK`) |
| size      | 653 KB                                                                                            | 230 KB<br />190 KB (italic)                                                        |
| ligatures | no                                                                                                | yes                                                                                |

I ended up going with Science Gothic for a few reasons. I was interested in Fraunces because retro-ish serif fonts [are currently having a bit of a moment](https://99designs.com/blog/trends/font-trends-2022/#matrix-17). I liked the look of this font, but I was worried that choosing something trendy would date the design in a few years when industry tastes moved onto something else. While I did like the vibe of the font I was also a little hesitant that the serifs would clash with the brush style of my logo, and the lowercase "f" and "j" characters weren't my favorite. Overall I just _really_ wanted to work Science Gothic into the design since its been a font on my radar for a few years now and I think there's a lot of cool variation combinations that can be made.

Choosing this font was a bit of a performance tradeoff in that its about 200 kilobytes larger than the combined size of Fraunces and its italic version. 200 KB is significant amount of data to transfer over the network, so I had to keep this in mind while selecting the rest of the fonts.

<!-- TODO - put the interactive font widget here -->
See an interactive font specimen of Science Gothic [here](http://sciencegothic.com).

### Body Copy

For the main text of the site I wanted to maximize accessibility by following the [typography](https://www.neurodiversity.design/typography/) and [font](https://www.neurodiversity.design/font/) guidelines from [neurodiversity.design](https://www.neurodiversity.design). This meant finding a sans serif font that would work on screens at small sizes. The two fonts I narrowed down to were IBM Plex and Inter, both fonts specifically designed for digital user interfaces

<!-- prettier-ignore -->
|           | [![IBM Plex](/images/example-ibm-plex.svg)](https://v-fonts.com/fonts/ibm-plex-sans-variable) | [![Inter](/images/example-inter.svg)](https://v-fonts.com/fonts/inter) |
| --------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| axis(es)  | weight (`wght`)<br />width (`wdth`)                                                           | weight (`wght`)<br />slant (`slnt`)                                    |
| size      | 106 KB<br />122 KB (italic)                                                                   | 786 KB<br />                                                           |
| ligatures | yes                                                                                           | no                                                                     |

I chose IBM Plex, and to be honest it was almost entirely because of the file size. Even with the regular and italic styles split up into two files the combined size of both was less than 30% the size of the single Inter file. As a nice bonus the Plex font had some ligature letters, including my favorite which is the "ﬁ" grouping.

I did some digging into why Inter was so huge, and the answer ended up being that it is full of tons of (albeit cool) glyphs I didn't forsee myself using. Since it did include some very nice [contextual alternates](https://rsms.me/inter/#features/calt) I did consider using it for the code block font, but I was afraid it didn't come with a true monospace setting it wouldn't be differentiated enough from the regular body text.

<!-- TODO - put the interactive font widget here -->
See an interactive font specimen of IBM Plex [here](https://www.ibm.com/plex).

### Code Blocks

My two choices for code blocks were Recursive and Fira Code. I actually used Fira Code for a while as my daily editor font for a long while so I thought it would be cool to use it on my website as well. Like Inter, Fira Code comes with a ton of cool ligatures for use in coding.

<!-- prettier-ignore -->
|           | [![Recursive](/images/example-recursive.svg)](https://v-fonts.com/fonts/recursive)                     | [![Fira Code](/images/example-fira-code.svg)](https://v-fonts.com/fonts/fira-code) |
| --------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| axis(es)  | monospace (`MONO`)<br />casual (`CASL`)<br />weight (`wght`)<br />slant (`slnt`)<br />cursive (`CRSV`) | weight (`wght`)                                                                    |
| size      | 284 KB                                                                                                 | 280 KB                                                                             |
| ligatures | no                                                                                                     | yes                                                                                |

The biggest reason I chose Recursive of Fira Code was the same reason I stopped using it as my editor font — the more I used the fancy ligatures the more I found them to be confusing. I've also heard stories of people being confused to see them in blog posts, not knowing that the "⇒" character is just a conjoined version of "=" and ">". Recursive also had variation-settings for casual, cursive, and slant settings which I could crank all the way up and emulate how [Wes Bos](https://wesbos.com/uses#editor--terminal) uses a script font for code comments. For only 4 kilobytes for size, Recursive just had a lot more flexibility to offer.

<!-- TODO - put the interactive font widget here -->
See an interactive font specimen of Recursive [here](https://www.recursive.design).

## Maximizing Performance

So, with three variable fonts I have a total of 1165 kilobytes, or 1.165 megabytes, o files _just_ for fonts on my site.

However, if I look at the last fully-designed version of my site [from 2018](https://2018.ryanfiller.com/) I was using the fonts `Dosis` (27KB) and `Raleway` (21KB). I wasn't loading every font weight, but let assume I was getting three for `Dosis` - light, medium, and bold, and six for `Raleway` - the same three weights and italic for each. That's... only 207KB. Shit.

https://fonts.google.com/specimen/Dosis?query=dosis
https://fonts.google.com/specimen/Raleway?query=raleway


## Fallback Font Stacks

## Choices
 - talk about `CSS.loadFont()` or whatever

  - /styles#fonts

 ### Code
 https://wesbos.com/uses#editor--terminal

## Web Fonts

/blog/science-with-science-gothic

## Font Stacks

## Talk about `prefers-reduced-data` and how it WOULD work if it existed yet

<MkIIProgress imageUrl='/images/beta-screenshot-2.png' />
