---
title: PostCSS Syntax Highlighting with Svelte in VS Code
options:
  published: true
meta:
  date: 2021-11-21
  excerpt: How to configure VS Code to syntax highlight PostCSS in Svelte components
  categories:
    - code
  tags:
    - svelte
    - postcss
---

## What?

![PostCSS logo](/images/postcss-logo.svg){data-small='true' data-align='right'}

[PostCSS](https://postcss.org/) is a build-step tool that runs on a project's styles to extend the native functions of CSS. Behind the scenes it works very differently, but it is often seen as an alternative to popular post-processing tools like [SASS](https://sass-lang.com/). Many people think of PostCSS as "[Babel](https://babeljs.io/) for CSS," and I would mostly agree with that. If you're not familiar with Babel that's okay, it doesn't really have anything at all to do with using PostCSS.

One of PostCSS's biggest differences versus SASS or SCSS is that those tools come full featured upon installation but PostCSS is very minimal by default. However, it can be configured with [plugins](https://www.postcss.parts/).

Another difference is intent. SASS/SCSS are tools for augmenting CSS using concepts and syntaxes tangential to any plans from the [CSS Working Group](https://www.w3.org/Style/CSS/). One of the main uses of PostCSS, on the other hand, is to "use tomorrow’s CSS today." Plugins, like [`postcss-nesting`](https://github.com/csstools/postcss-nesting), allow some features currently drafted in the CSS spec, like [native nesting](https://drafts.csswg.org/css-nesting-1/), to be used in any browser today. This ability to [polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) future features is where the main comparison to Babel comes from.

## Why?

Svelte supports the ability to easily preprocess code via the [`svelte.preprocess` function](https://svelte.dev/docs#svelte_preprocess). This functionality is also accessible in SvelteKit via the `config.preprocess` option in the [`svelte.config.js` file](https://kit.svelte.dev/docs#configuration).

One of my favorite preprocessors is the [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess), which supports PostCSS by default. In my project I've also installed the [`postcss-nesting` plugin](https://github.com/csstools/postcss-nesting) so I can try out the [CSS Nesting Module](https://drafts.csswg.org/css-nesting-1/) that even though nesting is currently still only a CSS Working Group draft proposal.

The problem that arises is that the [Svelte Language Tools](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) only supports default CSS, SCSS/SASS, and LESS. Since `h1 { & span { ... } }` is not a valid syntax in those preprocessors, VS Code is going to highlight it as if it were an error.

![screenshot of PostCSS nesting syntax with the nested & showing a highlighted error](/images/postcss-highlighting-bad.jpg){data-caption='this syntax is valid PostCSS and should not be marked invalid'}

It's possible to just ignore this warning as the code will compile correctly to valid CSS, but it is annoying. It also won't distinguish any actual errors from syntax it doesn't understand, so highlighting overall loses its purpose and just becomes noise.

## How?

It might seem counterintuative, but the first step to fixing syntax highlighting is actually to shut off CSS checking in the Svelte Language Tools. This can be done by accessing the VS Code [`settings.json` file](https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations) via the [command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) and shutting it off there.

```json
{
  ...,
  "svelte.plugin.css.diagnostics.enable": false
}
```

There is also a UI option for this setting that can be accessed by clicking on the ["Extensions" icon](https://code.visualstudio.com/docs/editor/extension-marketplace#_browse-for-extensions) in the left side Activity Bar under the "Svelte for VS Code" plugin.

![menu options for Extensions > Svelte for VS Code](/images/svelte-language-tools-css-options.png)

This will prevent valid PostCSS syntax from being highlighted as errors, but it will _also_ prevent highlighting of legitimate errors since all Svelte CSS diagnostics are now disabled.

To get syntax highlighting and error checking back the [PostCSS Language Tools](https://marketplace.visualstudio.com/items?itemName=csstools.postcss) extension can be installed. There shouldn't be any additional configuration needed to get this extension to start checking `<style>` blocks in `.svelte` files.

![screenshot of the same code from above, highlighting an intentional syntax error but NOT highlighting the nested & syntax](/images/postcss-highlighting-good.jpg){data-caption='the PostCSS code is not marked invalid, but the addition of several extra and missing characters is'}

## Notes

Following these steps will apply these settings to every project open in VS Code. So if it's important to keep the Svelte default CSS diagnostics for other projects, it might be worthwhile to set up a [VS Code Workspace](https://code.visualstudio.com/docs/editor/workspaces) for projects using PostCSS. This isn't something I've done since I tend to use the same tools on every Svelte project, but the documentation certainly makes it seem possible.

Thank you to [this issue](https://github.com/sveltejs/language-tools/issues/305#issuecomment-657205229) filed in the ` sveltejs/language-tools` project that helped me put this post together.