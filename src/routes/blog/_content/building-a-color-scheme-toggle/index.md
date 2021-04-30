---
title: Building a Color Scheme Toggle
series: Dark Mode
banner:
  src: '/images/wednesday-addams-toggle-switch.jpg'
  alt: 'Wednesday Addams throwing a toggle switch'
  attribution: 'The Addams Family, Paramount Pictures'
options:
  published: true
meta:
  date: 2021-04-30
  categories:
    - code
  tags:
    - colors
    - css
    - javascript
    - ui
  excerpt: >-
    This one is going to be able building the toggle.
---

<script>
  import ColorSchemeToggle from './_components/toggle-demo.svelte'
</script>

In my [last post](http://localhost:3000/blog/choosing-theme-colors#converting-a-palette-to-dark-mode) I covered how to choose a flexible set of colors and use [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) to switch them out depending on a user's color preference. This post is about taking that a step further and build a toggle so a user can set and save a color theme.

My site is built using [Sapper](https://sapper.svelte.dev/), so some of the code will be [Svelte](https://svelte.dev/)-specific. However, most of these concepts are broad enough that they should be applicable other frameworks, or even plain JavaScript. I'll make sure to point out anything that is relying on a Svelte-specific API.

## Setting up Colors

Using `css-in-js` is a [hotly topic debated](https://css-tricks.com/the-differing-perspectives-on-css-in-js/), with some valid pros and cons. I've gone back and forth on whether or not to use it, I currently think you should [separate your concerns](https://en.wikipedia.org/wiki/Separation_of_concerns#HTML,_CSS,_JavaScript). This method isn't a `css-in-js` set up, but I think it's helpful to have a single [source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for any configuration.

The color chart component I used to [build my light and dark themes](/blog/choosing-theme-colors#choosing-a-color-palette) needs data from JavaScript. I want this chart to work as an server-side rendered component, so I need to be able to pass it an array of colors without needing to query them from the DOM. In my project I have a `styles.js` configuration file that looks like this: 

```javascript
const colors = {
  black: '#080025',
  white: '#fefdf2',
  ...
}

const themes = {
  light: {
    text: colors['black'],
    background: colors['white'],
    ...
  },
  dark: {
    text: colors['white'],
    background: colors['black'],
    ...
  }
}
```

The two themes also live in this same file, and are constructed by choosing colors from the larger `colors` object.

The mechanics of getting and setting [css custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) is kind of verbose, so I created two helpers methods:

```javascript
function getCustomProperty(property) {
  if (typeof(window) != 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${property}`).replace(/(\"|\')/g, '').trim()
  } else {
    return ''
  }
}

function setCustomProperty(property, value) {
  if (typeof(window) != 'undefined') {
    document.documentElement.style.setProperty(`--${property}`, value)
  }
}
```

Svelte will error if it tries to access the `window` object during server-side rendering, so it's important to [make sure `window` exists](https://sapper.svelte.dev/docs/#Server-side_rendering) before trying to access any `document` properties. I'm doing this because I specifically know I have to account for server-side rendering, but this catch is a best practice to keep the function from throwing any unexpected errors.

The last helper method is one that will take an array of theme colors, map through and apply the `setCustomProperty()` function, then join them into a string of CSS variables.

```javascript
const setTheme = (theme) => {
  return Object.entries(theme).map(color => {
    const [ name, value ] = color
    return `--color${capitalize(name)}: var(--color${capitalize(value)});`
  }).join('\n')
}
```

This might all seem like a _lot_ of legwork just to set some color variables, but these helper functions will be super useful later, I promise.

## Designing the Toggle

Josh W Comeau has a [great post](https://www.joshwcomeau.com/react/dark-mode) about how he built The Peferct Dark Mode for his site. I thought the section about [requirements](https://www.joshwcomeau.com/react/dark-mode/#our-requirements) was especially helpful, and is the general plan I'm going to follow for my toggle. My goals were mostly the same as his, but I chose to tackle them in a different order:

1. The site should respect the user's Operating System preference if it is set and supported, if not it will default to light theme.
2. The user should be able to click a button to toggle themes.
3. If the user has disabled browser JavaScript, the toggle should [not appear](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation).
4. The site should remember the theme the user toggled to, and should use this over their OS preference.
5. The site should **not** show a flash of the wrong theme while loading.
6. It should not be possible to mismatch the state between the theme and the toggle button.

### Some Prerequisites

[This post](https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/#heading-dealing-with-the-prefers-color-scheme-media-query) by Andy Bell (who for some reason goes by Hank Chizljaw sometimes) puts together a pretty clever way to handle user color preferences. To borrow some of the scaffolding from his post, there are a few constants we need to set.

``` javascript
// what we will store this in local storage as
const LS_KEY = 'user-color-scheme'

// an HTML data-attribute to keep track of user preference
const DOM_ATTR = `data-${LS_KEY}`

// the name of the CSS variable we'll be reading and overwriting
const CSS_PROP = LS_KEY
```

### 1. Reading a User's OS Preference
{id="reading-a-users-os-preference"}

In [part two](/blog/choosing-theme-colors) of this series I briefly showed how to [put colors behind `prefers-color-scheme`](/blog/choosing-theme-colors#converting-a-palette-to-dark-mode). That feels like the most obvious tool to reach for to accomplish goal #1. Using this media query will read a user’s configured preference from their browser, but there’s some nuance to consider knowing that we’ll be making a button to manually toggle this. There isn’t a way for any code from a browser to change a user’s Operating System level preferences, so we need to use a different method to toggle the theme.

Because it isn't possible to call any JavaScript inside of the special Svelte `<style>` tag we have to get creative. We can call the `setTheme()` function inside of a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) combined with the Svelte [`@html` interpolation](https://svelte.dev/docs#html) to build out the contents of a regular `<style>` tag. This entire section needs to be wrapped in a [`<svelte:head>` tag](https://svelte.dev/docs#svelte_head) so that the framework will hoist it to the appropriate place in the document `<head>`.

```svelte
<svelte:head>
  {@html `
    <style>
      :root {
        --${CSS_PROP}: 'light';
        ${setTheme(themes.light)}
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --${CSS_PROP}: 'dark';
          ${setTheme(themes.dark)}
        }
      }
    </style>
  `}
</svelte:head>
```

If you're not using Svelte, you can do the same thing by calling `document.getElementsByTagName('head')` and then using the [`appendChild()` method](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) to add a `<style>` tag.

Since we also want to track this OS preference in JavaScript later, we’re going to borrow another idea from Andy’s post and set another variable to flag OS preference. In order to easily find and change this later, we want to use the `CSS_PROP` variable from earlier.

The site will render the light theme by default, if a user has no OS level preference, or if their system does not support `prefers-color-scheme` at all. If the OS signals to the browser that the user prefers a dark color scheme we can use this CSS variable later to provide the right set of colors. By tracking the theme with a single value, this also makes it easier to set up the toggle button later.

### 2. Clicking the Toggle Button
{id="clicking-the-toggle-button"}

The click event logic for the toggle button starts pretty straightforward. I abstracted it into several smaller functions that will have more complexity added later.

```javascript
const getOpposite = (currentMode) => {
  return currentMode === 'dark'
    ? 'light'
    : 'dark'
}

const setPreference = (newPreference) => {
  if (window) {
    document.documentElement.setAttribute(DOM_ATTR, newPreference)
    setCustomProperty(CSS_PROP, newPreference)
  }
}

const toggleColorScheme = () => {
  let currentPreference = getCustomProperty(CSS_PROP)
  const newPreference = getOpposite(currentPreference)
  setPreference(newPreference)
}
```

A user clicks the button and a chain of helper functions will fire. The first will read the `--user-color-scheme` variable we set in step #1. This functions call a second function to get the opposite value, and then calls `setPreference()`. `setPreference()` overwrites the CSS variable and sets the `data-user-color-scheme` attribute on the page’s `<html>` element. To know what state we’re toggling _from_ we’ll look to the `CSS_PROP` custom property we set in the `<style>` tag. If it is equal to `'dark'` we know the user has an OS level preference and `getOpposite()` will return `'light'`. If it’s `'light'` or `undefined`, then `getOpposite()` will return `'dark'`.

We need to update our `:root` CSS logic a little to allow the chosen theme to take precedence over any OS level theme. 

```svelte {14-16, 19-21}
<svelte:head>
  {@html `
    <style>
      :root {
        --${CSS_PROP}: 'light';
        ${setTheme(themes.light)}
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --${CSS_PROP}: 'dark';
        }

        :root:not([data-user-color-scheme]) {
          ${setTheme(themes.dark)}
        }
      }

      [data-user-color-scheme='dark'] {
        ${setTheme(themes.dark)}
      }
    </style>
  `}
</svelte:head>
```

We can use the [CSS `:not` pseudo selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:not) to check if the `<body>` attribute has been set by the toggle button. If it does not exist we can rely on the wrapping `prefers-color-scheme` media query.

This might seem a little confusing, but the logic works like this:
- The site will always default to the light theme.
- If the OS is set to dark theme _and_ the user has not made a choice, the site will show the dark theme because of the `prefers-color-scheme` setting.
- If the user has chosen dark theme with the toggle, the site will show that because of the `<body>` attribute.
- If the user has chosen light theme with the toggle, there is no explicit state for this so the site will fall back to the default light theme.

The last step in setting up the `toggleColorScheme()` function is to deal with how Svelte optimizes code for SSR. Because `toggleColorScheme()` and `getCustomProperty()` both make calls to the `window` object, this code breaks when it runs server-side. To work around this, we can use a [trick from the Svelte docs](https://sapper.svelte.dev/docs#Third-party_libraries_that_depend_on_window) and reassign them after the `window` object exists. If you aren't using Svlete this shouldn't be an issue, but if it is in your framework there's likely a similar workaround out there.

```svelte {4-9}
<script>
  let currentColorScheme
  let toggleColorScheme
  onMount(() => {
    toggleColorScheme = () => {
      const currentPreference = getCustomProperty(CSS_PROP)
      const newPreference = getOpposite(currentPreference)
      setPreference(newPreference)
    }
  })
</script>
```

### 3. Intentionally Blocking JavaScript
{id="intentionally-blocking-javascript"}

Putting blocking JavaScript in the `<head>` of a website is something that typically should be avoided. The page rendering process is [complicated](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#parsing), but this is the most relevant concept to understand:

> `<script>` tags — particularly those without an async or defer attribute — block rendering, and pause the parsing of HTML.

You wouldn't want to load, say, all of [jquery](https://www.npmjs.com/package/jquery) at the top of your page before you even need to use it. Since we don’t want this toggle to appear for users who don’t allow JavaScript and therefore can't interact with it, we need to run a script that intentionally blocks the rest of the page from loading. The `<body>` element needs to have a `data-no-js` attribute added by default, and a quick script will run before loading the rest of the page to remove it.

Just like with the CSS block earlier, the trick here is to again use the `@html` interpolation. Rather than hook into the regular Svelte `<script>` tag, we want to render a string so that when the page is rendered at build time this code gets baked into the actual page source. This means it will execute as soon as the browser comes across it and not be optimized by Svelte to be non-blocking.

```svelte
<svelte:head>
  {@html `
    <script>
      document.body.removeAttribute('data-no-js')
    </script>
  `}
</svelte:head>
```

Since any user with JavaScript will immediately have this attribute removed, we can now target a CSS class of `.needs-js` only when this attribute is present. This temporarily blocks rendering and happens before the rest of the page loads, so neither type of user should get a blip of the toggle when they should or shouldn’t see it.

```css
body[data-no-js] .needs-js {
  display: none;
}
```

### 4. Keeping Data in LocalStorage
{id="keeping-data-in-localstorage"}

[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is a browser API that can be used to store a list of key value pairs per website. These values will persist even after a user leaves a website, making this the perfect place to store a user's color scheme preference after they set it.

We can add a line to our `setPreference()` function and use the `LS_KEY` constant we added earlier.

```javascript {5}
const setPreference = (newPreference) => {
  if (window) {
    document.documentElement.setAttribute(DOM_ATTR, newPreference)
    setCustomProperty(CSS_PROP, newPreference)
    window.localStorage.setItem(LS_KEY, newPreference)
  }
}
```

Now, when a user clicks the button, this script will modify the `<body>` tag attribute, update the CSS variable, _and_ save either `'light'` or `'dark'` in `localStorage` so we can read it again when they come back to the site later. 

The actual logic for clicking the button needs a slight update as well. We want data persisted in `localStorage` to override any OS preference. We can use `window.localStorage.getItem` and our `LS_KEY` to check and see if a user has any existing data. If they do, we need to pass it to `setPreference()` instead of their `CSS_PROP` value.

```javascript {2}
toggleColorScheme = () => {
  const currentPreference = window.localStorage.getItem(LS_KEY) || getCustomProperty(CSS_PROP)
  const newPreference = getOpposite(currentPreference)
  setPreference(newPreference)
}
```

If `existingUserPreference` is `undefined` the function will fall back to their OS preference and `setPreference()` will save this new value in `localStorage`.

### 5. Reading Data Without Flashes
{id="reading-data-without-flashes"}

In order to check the stored value whenever a user visits the page, it might seem like the best way to do this is an [`onMount` function](https://svelte.dev/docs#onMount) as soon as the page loads.

```javascript
onMount(() => {
  const existingPreference = window.localStorage.getItem(LS_KEY)
  setPreference(existingPreference)
})
```

If you've been coding along you likely see the problem here. If you haven't, here's an example of the issue we're facing.

![flash of the wrong themes loading](/images/wrong-theme-flash.mp4){data-align='full' data-caption='a flash of the wrong theme, brief light theme on the right, brief dark theme on the left'}

`onMount` fires _after_ the component loads, which means that if the user's OS preference doesn't match the value they have saved in `localStorage` they will see a flash of that theme before `setPreference()` can fire and sort out the appropriate classes on the `<body>` tag. That's no good.

We're actually going to use the same trick here that we did to remove `data-no-js` before the page fully loaded.

```svelte {5-9}
<svelte:head>
  {@html `
    <script>
      document.body.removeAttribute('data-no-js')
      var existingUserPreference = window.localStorage.getItem('${LS_KEY}')
      var setPreference = ${setPreference.toString()}
      var getCustomProperty = ${getCustomProperty.toString()}
      var setCustomProperty = ${setCustomProperty.toString()}
      setPreference(existingUserPreference, getCustomProperty, setCustomProperty, '${LS_KEY}', '${DOM_ATTR}', '${CSS_PROP}')
    </script>
  `}
</svelte:head>
```

This might look slightly strange, but there are two things going on here.

First, just like with the `removeAttribute('data-no-js')` script, we need everything to be self-contained. This means we need a complete string that creates a new function and not just a reference to an existing assignment from the Svelte `<script>` tag. Luckily, the `function` prototype contains a [`.toString()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) that will stringify and return the entire function block. By combining this with Svelte’s `@html` interpolation we can redefine the same functions in the inline script.

The second caveat is that in order to stay properly encapsulated, `setPreference()` will need to accept a few more arguments. We can stringify `setCustomProperty()` the same way, but we'll need to pass _that instance_ of `setCustomProperty()` into `setPreference()` in order for it to work correctly. The same is true with the stringified and interpolated versions of all of our getters, setters, and constants.

```javascript {1}
const setPreference = (newPreference, setCustomProperty, LS_KEY, DOM_ATTR, CSS_PROP) => {
  if (window) {
    document.documentElement.setAttribute(DOM_ATTR, newPreference)
    setCustomProperty(CSS_PROP, newPreference)
    window.localStorage.setItem(LS_KEY, newPreference)
  }
}
```

We’ll also need to update the calls to `setPreference()` inside of `toggleColorScheme()`. It needs to accept and use the instances of those functions and constants from the Svelte instance rather than the inline `<script>`.

```javascript {4}
toggleColorScheme = () => {
  const currentPreference = window.localStorage.getItem(LS_KEY) || currentColorScheme
  const newPreference = getOpposite(currentPreference)
  setPreference(newPreference, setCustomProperty, LS_KEY, DOM_ATTR, CSS_PROP)
}
```

It might seem like putting this many blocking scripts on a page could start to get into performance-harming territory. Josh has a [note on his post](https://www.joshwcomeau.com/react/dark-mode/#blocking-html) where he tested this. I also did my own test here using [`console.time()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/time) and found that the entire block of scripts runs in less than 1ms.


### 6. Keeping Everything in Sync
{id="keeping-everything-in-sync"}

The last concern is making sure that a user is never able to load a page or click the toggle in such a way that they see the wrong theme with the wrong button.

The best way to keep things as in-sync as possible is to try to rely on a single source of truth and let everything read from there. For me, the `CSS_PROP` on `:root` is the single source of truth. It reads from `localStorage` if it exists and then falls back to being set by the initial `media-query`. JavaScript then adds it to the `<body>` tag and updates the value in `localStorage` if it has changed. This very specific set of dominos is why I avoided using something like [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to read the user's `prefers-color-scheme` value directly.

In order to fire off this chain of events correctly, we need to make one more change to the `setPreference()` function to correctly update the `<body>` tag during the blocking period. When `setPreference()` is called from the inline script, it may or may not find an existing preference in `localStorage`. We need to add an `else` condition to read the `CSS_PROP` value and update the rest of the page accordingly.

```javascript {1,3,6-10}
const setPreference = (newPreference, getCustomProperty, setCustomProperty, LS_KEY, DOM_ATTR, CSS_PROP) => {
  if (window) {
    if (newPreference) {
      document.documentElement.setAttribute(DOM_ATTR, newPreference)
      setCustomProperty(CSS_PROP, newPreference)
      window.localStorage.setItem(LS_KEY, newPreference)
    } else {
      const OS = getCustomProperty(CSS_PROP)
      document.documentElement.setAttribute(DOM_ATTR, OS)
      setCustomProperty(CSS_PROP, OS)
    }
  }
}
```

Making sure the button never shows the wrong state also means looking to a single source of truth. We can actually style the toggle button based directly off of the inline style that the `setCustomProperty` helper class applies. For Svelte we'll have to use the [`:global()` style modifier](https://svelte.dev/docs#style) to escape the style encapsulation if everything isn't in the same file.

```css
:global([style*='light'] .color-scheme-toggle-button) {
  ...
}

:global([style*='dark'] .color-scheme-toggle-button) {
  ...
}
```

The selector `[style*='...']` is using a [matcher](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) to target any element with an inline `style` attribute that contains either version of the set `--user-color-scheme` value. Since we've gone through steps to make sure all other logic checks this same source, styling based directly on this is much safer than using another JavaScript function to try to toggle CSS classes on the button element.

## Final Code

The final code for the entire component should look something like [this](https://github.com/ryanfiller/snippets/blob/main/color-scheme-toggle-demo.svelte).

The actual code as it exists on my site is a bit more abstracted, but you can find the `data-no-js` functionality in my [`template.html` file](https://github.com/ryanfiller/portfolio-svelte/blob/8fd00f52b10f7a1a1f17dfffcc8cd962c0ca04ae/src/template.html), the setting of my CSS variables from JSON in my [`styles.svelte` file](https://github.com/ryanfiller/portfolio-svelte/blob/8fd00f52b10f7a1a1f17dfffcc8cd962c0ca04ae/src/components/layout/styles.svelte), the rest of the theme and button logic in the [component file](https://github.com/ryanfiller/portfolio-svelte/blob/8fd00f52b10f7a1a1f17dfffcc8cd962c0ca04ae/src/components/layout/color-scheme-toggle.svelte).

As always, reach out on [Twitter](https://twitter.com/ryanfiller_) or [GitHub](https://github.com/ryanfiller/) with any questions, comments, or concerns. Happy theming!

<ColorSchemeToggle />
