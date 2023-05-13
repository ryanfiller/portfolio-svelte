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
  date: 2024-10-29
  categories:
    - design
  tags:
    - typography
    - css
  excerpt: >-
    Choosing three new variable fonts and squeezing them for performance
---

<script>
  import Note from '$components/misc/note.svelte'
  import MkIIProgress from '$components/misc/mk-ii-progress.svelte'
</script>

## Inspiration

During the logo design process I had a pretty clear idea in my head of how I wanted it to turn out. However, choosing the right font was a more abstract challenge for me. I knew I wanted to lean more into a vintage science fiction direction.

![inspiration board of sans serif typography I liked - NASA Mercury Capsule poster, vintage How And Why science textbook, collection of VHS tape boxes, The Encyclopedia of Science Fiction book cover, Childhood's End by Arthur C. Clarke book cover, Planet of the Apes movie poster, Star Trek: The Next Generation LCARS screenshot, Plan 9 From Outer Space movie poster, vintage Nasa Saturn Rocket manuals, A Wrinkle in Time by Madeleine L'Engle book cover](/images/choosing-fonts-inspiration-board.png){data-align='full' data-caption='inspiration board of sans serif typography I liked'}

This direction might seem to clash with the logo I designed in my [last post](/blog/blackletter-logo#inspiration), but I've always found it cool to juxtapose clean and modern typography with more caligraphic elements. This combination shows up a lot in [anime](https://en.wikipedia.org/wiki/Anime) and other science fiction where English and traditional Japanese characters (hiragana, katakana, and kanji) are mixed together.

![inspiration board of combinations sans serif and brush typography - Mako Reactor from FFVII Remake, Social Distortion skeleton logo, Syd Mead Bladerunner concpet art, Bathman: Gotham by Gaslight collection cover, Castlevania II: Simon's Quest NES title screen, Mobile Suite Gundam: 0800 logo, New York Times front page from the day of the first moon landing, Hyaku Shiki Gundam model with decals, Nosferatu movie poster, Weyland-Yutani logo from Alien with Japanese subscript, Toonami bumper with 2003 branding, two computer screens from Neon Genesis Evangelion ](/images/logo-pairing-inspiration.png){data-align='full' data-caption='inspiration board of combinations sans serif and brush typography'}

There were also two technical limitations that I wanted to follow: 
 - Use a set of [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings) for my redesign (I even wrote a [blog post](/blog/science-with-science-gothic#what-are-variable-fonts) about this way back in March of 2020).
 - Pick a series of fonts that would comply with the [guidelines from neurodiversity.design](https://www.neurodiversity.design).

## Candidates and Choices

I needed three font families: a display font for headers, a flexible and readable option for body copy, and a monospace font for code blocks.

Two site I like for finding variable fonts are [v-fonts.com](https://v-fonts.com/) and [Google Fonts](https://fonts.google.com/variablefonts). V-Fonts is especially cool because fonts are filterable by licenses for [open source](https://v-fonts.com/licenses/open-source) or free [commercial](https://v-fonts.com/licenses/free-for-commercial-use)/[non-commercial](https://v-fonts.com/licenses/free-for-non-commercial-use) use.

After looking through pages and pages I narrowed my selection to two for each category.

### Display Font

For headers I was between Science Gothic, a sans serif art deco font, and Fraunces, an art nouveau serif font.

<!-- prettier-ignore -->
|           | [![Science Gothic](/images/example-science-gothic.svg)](https://v-fonts.com/fonts/science-gothic) | [![Fraunces](/images/example-fraunces.svg)](https://v-fonts.com/fonts/fraunces)    |
| --------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| axis(es)  | weight (`wght`)<br />width (`wdth`)<br />y opaque (`YOPQ`)<br /> slant (`slnt`)                   | optical size (`opsz`)<br />weight (`wght`)<br />soften (`SOFT`)<br />wonk (`WONK`) |
| size      | 653 KB                                                                                            | 230 KB<br />190 KB (italic)                                                        |
| ligatures | no                                                                                                | yes                                                                                |

I ultimately chose Science Gothic for a few reasons. I liked Fraunces because retro-ish serif fonts [are currently having a moment](https://99designs.com/blog/trends/font-trends-2022/#matrix-17), but was worried that choosing something trendy would date the design in a few years when industry tastes moved onto something else. I was also a little hesitant that the serifs would clash with the brush style of my logo, I wasn't completely sold on the lowercase "f" and "j" characters. Overall I _really_ wanted to work Science Gothic into the design since its been on my font radar for a few years and I think there's a lot of cool variation combinations that can be made.

This decision did involve a performance tradeoff - Science Gothic is about 200 kilobytes larger than Fraunces's regular and italic versions combined. While 200 KB is a significant amount of data to transfer over the network, I factored this into my subsequent font selections.

I also think that Science Gothic probably scores better on the [neurodiversity.design](https://www.neurodiversity.design) criteria than Fraunces does.

<!-- TODO - put the interactive font widget here -->
See an interactive font specimen of Science Gothic [here](http://sciencegothic.com).

### Body Copy

For the site's main text I wanted to maximize accessibility by following the [typography](https://www.neurodiversity.design/typography/) and [font](https://www.neurodiversity.design/font/) NDS guidelines. This meant finding a sans serif optimized for small and large screens. I narrowed down two choices to IBM Plex and Inter, both of which were specifically designed for digital user interfaces.

<!-- prettier-ignore -->
|           | [![IBM Plex](/images/example-ibm-plex.svg)](https://v-fonts.com/fonts/ibm-plex-sans-variable) | [![Inter](/images/example-inter.svg)](https://v-fonts.com/fonts/inter) |
| --------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| axis(es)  | weight (`wght`)<br />width (`wdth`)                                                           | weight (`wght`)<br />slant (`slnt`)                                    |
| size      | 106 KB<br />122 KB (italic)                                                                   | 786 KB<br />                                                           |
| ligatures | yes                                                                                           | no                                                                     |

I chose IBM Plex, largely because of the file size. Even with separate regular and italic files their combined size was less than 30% the size of the single Inter file. As a bonus, the Plex font had some ligature letters including my favorite which is the "ﬁ" grouping.

I did some digging into why Inter was so huge and found that contained of tons of (albeit cool) glyphs I didn't forsee myself using. Since it did include some very nice [contextual alternates](https://rsms.me/inter/#features/calt) I did consider using it for the code block font, but I was afraid that since it didn't come with a true monospace setting too similar to the regular body text.

<!-- TODO - put the interactive font widget here -->
See an interactive font specimen of IBM Plex [here](https://www.ibm.com/plex).

### Code Blocks

My two choices for code blocks were Recursive and Fira Code. I had previously used Fira Code as my daily editor font, so considering it for my website felt like a natural choice. Like Inter, Fira Code includes numerous programming-specific ligatures.

<!-- prettier-ignore -->
|           | [![Recursive](/images/example-recursive.svg)](https://v-fonts.com/fonts/recursive)                     | [![Fira Code](/images/example-fira-code.svg)](https://v-fonts.com/fonts/fira-code) |
| --------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| axis(es)  | monospace (`MONO`)<br />casual (`CASL`)<br />weight (`wght`)<br />slant (`slnt`)<br />cursive (`CRSV`) | weight (`wght`)                                                                    |
| size      | 284 KB                                                                                                 | 280 KB                                                                             |
| ligatures | no                                                                                                     | yes                                                                                |

The main reason picked Recursive over Fira Code was the same reason I stopped using it as my editor font — the more I used the fancy ligatures the more confusing they felt. I'd heard similar feedback from readers who were puzzled by ligatures in blog posts, like mistaking the "⇒" character for a special symbol rather than a joined "=" and ">". Recursive offered additional benefits through its variation settings for casual, cursive, and slant properties, which let me emulate [Wes Bos's](https://wesbos.com/uses#editor--terminal) approach of using script fonts for code comments. For only 4 kilobytes more file, Recursive just had a lot more flexibility to offer.

<!-- TODO - put the interactive font widget here -->
See an interactive font specimen of Recursive [here](https://www.recursive.design).

## Maximizing Performance

With these three variable fonts, I have a total of 1165 kilobytes (1.165 megabytes) of font files for my site - and that's a lot of bytes.

<Note title="Editor's Note">

  While fact checking this post, I realized I made a mistake — The version of Science Gothic I'd been using for these comparisons had _already_ had some of its axes removed using a tool that I [talk about later in the post](#removing-variable-axes).

</Note>

For comparison, the last fully-designed version of my site [from 2018](https://2018.ryanfiller.com/) used [Dosis (27KB)](https://fonts.google.com/specimen/Dosis?query=dosis) and [Raleway (21KB)](https://fonts.google.com/specimen/Raleway?query=raleway). Even if I had loaded multiple weights - say three for Dosis (light, medium, bold) and six for Raleway (the same three weights plus their italic variants) - the total would have been around 207KB, assuming similar file sizes for each variant.

### The Best File Types

At the time of writing this `.woff2` (Web Open Font Format 2) is generally the best file type to use for self hosted font files. Luckily IBM Plex and Recursive were already available in this format, but Science Gothic needed to be converted. I found a cool CLI tool called [`glyphhanger`](https://github.com/zachleat/glyphhanger) that made this conversion quick and easy.

```shell
glyphhanger --formats=woff2,woff --subset=ScienceGothic.ttf
```

This output a file with the overall same size, but because of the more modern format it can be compressed up to between 30-50% better, transmitted more efficiently, and has wider overall browser support.

<!-- prettier-ignore -->
| before                      | after                         | reduction |
| --------------------------- | ----------------------------- | --------- |
| ScienceGothic.ttf (1.41 MB) | ScienceGothic.woff2 (1.41 MB) | 0%        |

### Subsetting

Subsetting creates a new font file containing only specified characters from the original font. `glyphhanger` can also help with this. Two of the fonts — Science Gothic and IBM Plex — included complete Cyrillic alphabets and other glyphs I wouldn't need for English-language web content. To make the files as small as possible I removed all but the Latin letters and symbols.

```shell
glyphhanger  --subset=*ScienceGothic*.ttf --LATIN
```

This knocked a dramatic number of kilobytes off all three files!

<!-- prettier-ignore -->
| before                              | after                                | reduction  |
| ----------------------------------- | ------------------------------------ | ---------- |
| ScienceGothic.woff2 (1.41 MB)       | ScienceGothic.woff2 (279 KB)         | 80% (wow!) |
| IBM-Plex-Sans.woff2 (106 KB)        | IBM-Plex-Sans.woff2 (59.6 KB)        | 44%        |
| IBM-Plex-Sans-Italic.woff2 (122 KB) | IBM-Plex-Sans-Italic.woff2 (70.8 KB) | 42%        |

### Removing Variable Axes

While the subsetting significantly reduced file sizes, the combined total was still over 400KB - almost double my previous font stack. The last step I could think to take was removing unused variation axes. `glyphhanger` couldn't do this, but I found another tool called [`slice`](https://github.com/source-foundry/Slice) that allows you to edit variation settings. By setting the `min`, `max`, and `default` values all to 0 that axis can be removed entirely.

![slice app removing the mono axis from the Recursive font](/images/choosing-fonts-slice.png)

I took a hard look at what styles I thought I would actually use and ended up removing the `slnt` axis from Science Gothic, the `slnt` and `MONO` axes from Recursive (meaning the font will now always be monospaced), and because the "italic axis" or IBM Plex was a separate .woff file I removed it altogether.

<!-- prettier-ignore -->
| before                               | after                         | reduction  |
| ------------------------------------ | ----------------------------- | ---------- |
| ScienceGothic.woff2  (279 KB)        | ScienceGothic.woff2 (182 KB)  | 35%        |
| Recursive.woff2 (285 KB)             | Recursive.woff2 (117 KB)      | 59%        |
| IBM-Plex-Sans.woff2 (59.6 KB)        | IBM-Plex-Sans.woff2 (59.6 KB) | 0%         |
| IBM-Plex-Sans-Italic.woff2 (70.8 KB) | removed                       | 100% (lol) |

Browsers have the ability for any font to force oblique styles using `font-style: italic` (and event though the graphic designer in me knows this is considered the wrong thing to do), I decided the performance benefit outweighed the nicer letter forms.

![Recursive font with font-variation-settings: slnt -15 on top and font-style: italic on the bottom](/images/recursive-slant-vs-italic.png){data-caption="I'm willing to sacrifice a nicer V, X, Z, and K."}

This takes my total size down to 358.6 kilobytes, still larger than my ~200KB existing font stack, but I can live with it. It's whopping 806KB, or 69%, less than the four variable fonts I started with.

## Skipping These Fonts All Together

359 KB is still a pretty big ask, and I recognize the potential that anyone on a slow connection might not want to download them.

For a few years there was [a proposal](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-data) what would allow users to set a `prefers-reduced-data` setting on their device, and then through a combination of using `media="(prefers-reduced-data: no-preference)"` in the HTML and `@media (prefers-reduced-data: no-preference)` in the CSS I could skip loading these fonts entirely. This feature currently is [experimental and supported by no existing user agents](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data) because of concerns it could be used as "a source of fingerprinting, with a bias towards low income with limited data."

Without the ability to query this preference I don't know of any other way to not load these fonts, but like I explored in my [previous post](/blog/science-with-science-gothic#how-to-display-the-fonts) the best way is to set the appropriate [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) value. I do intend to set some reasonable fallback fonts for when the `swap` period runs out and these larger font files don't load, but I need to get further into the design process before I can start matching those to my final type styles.

<MkIIProgress imageUrl='/images/beta-screenshot-2.png' />
