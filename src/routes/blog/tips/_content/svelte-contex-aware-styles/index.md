---
title: Writing Context Aware Styles in a Svelte App
options:
  published: true
meta:
  date: 2021-09-30
  excerpt: How to use the :global() style modifier to style components based on their container
  categories:
    - code
  tags:
    - svelte
    - css
---

<script>
  import { Tab, Tabs } from '../../../../../components/misc/tabs'
</script>

## What?

An idea that's always popular in the design system community is writing "self contained" components that are able to dynamically adapt to their parents. [Container queries](https://www.smashingmagazine.com/2021/05/complete-guide-css-container-queries/) and [container units](https://css-tricks.com/container-units-should-be-pretty-handy/) have been getting a lot of buzz lately as they get closer to browser support, but that's not quite what I'm talking about.

Complex [child selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator) have been around probably as long as CSS has existed, but the ability to make selections based on parent components is something that does not exist ([yet](https://developer.mozilla.org/en-US/docs/Web/CSS/:has#browser_compatibility)). However, you can use child selectors along with Svelte's native scoping to apply styles based its HTML parents.

## Why?

Consider a basic website with a` <header>` and a `<footer>`, both of which contain a `<nav>` with a list of the site's pages and subpages. For design reasons, the two `<nav>`s are styled differently, but for semantic reasons they contain similar markup.

![a very basic site showing a <header> and <footer> element, with a <nav> element styled differently within each](/images/basic-header-footer-nav.png){data-align="center" data-caption="This represents like... 80% of every website I ever worked on when I was at a marketing agency."}

The design system could contain both a `<HeaderNav>` and `<FooterNav>`, require passing a [`prop`](https://svelte.dev/tutorial/declaring-props) to denote where the `<Nav>` is being used, or something _really_ complicated like use the [contextAPI](https://svelte.dev/docs#setContext). The layout of the `<Nav>` could be the responsibility of the `<Header>` and `<Footer>` to define, but that kind of breaks the encapsulation rules of component systems.

## How?

This "trick" is based on [one of my favorite SCSS features](https://css-tricks.com/the-sass-ampersand/#qualifying-based-on-context), but Svelte provides a cleaner way to do something similar with no additional configuration.

Svelte does some [really helpful style magic](https://svelte.dev/tutorial/styling). Styles within a component's `<style>` block will be scoped to that component by means of appending a unique `cssHash` to the selector and associated class name.

<Tabs name='svelte hash example'>
  <Tab title='nav.svelte'>

  ```svelte
  <style>
    .nav { ... }

    .ul { ... }
  </style>

  <nav class="nav">
    <ul class="ul">
      ...
    </ul>
  </nav>
  ```

  </Tab>

  <Tab title='compiled HTML'>

  ```html

  <nav class="nav svelte-19dr0nd">
    <ul class="ul svelte-19dr0nd">
      ...
    </ul>
  </nav>
  ```

  </Tab>

  <Tab title='compiled CSS'>

  ```CSS
  .nav.svelte-19dr0nd {
    ...
  }

  .ul.svelte-19dr0nd {
    ...
  }
  ```
  
  </Tab>
</Tabs>

Svelte also comes with an escape hatch from this scoping convention in the [`:global()` modifier](https://svelte.dev/docs#style). By wrapping a selector in `:global()` that CSS block can escape its component and apply to any other component rendered on the page.

<Tabs name='svelte global example'>
  <Tab title='nav.svelte'>

  ```svelte
  <style>
    :global(.nav) { ... }

    :global(.ul) { ... }
  </style>

  <nav class="nav">
    <ul class="ul">
      ...
    </ul>
  </nav>
  ```

  </Tab>

  <Tab title='compiled HTML'>

  ```html

  <nav class="nav">
    <ul class="ul">
      ...
    </ul>
  </nav>
  ```

  </Tab>

  <Tab title='compiled CSS'>

  ```CSS
  .nav {
    ...
  }

  .ul {
    ...
  }
  ```
  
  </Tab>
</Tabs>

This method combines these two ideas within one component. A `<style>` block can reach outside its own component using `:global()`, and _also_ apply a [descendant selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator) of a hashed class to keep the styles specific.

<Tabs name='svelte context aware styles example'>
  <Tab title='nav.svelte'>

  ```svelte
  <style>
    .nav { ... }

    :global(header) .nav { ... }

    :global(footer) .nav { ... }
  </style>

  <nav class="nav">
    ...
  </nav>
  ```

  </Tab>

  <Tab title='compiled HTML'>

  ```html
  <nav class="nav svelte-19dr0nd">
    ...
  </nav>

  <header class="svelte-1xigfij">
    <nav class="nav svelte-19dr0nd">
      ...
    </nav>
  </header>

  ...

  <footer class="svelte-1xigfij">
    <nav class="nav svelte-19dr0nd">
      ...
    </nav>
  </footer>
  ```

  </Tab>

  <Tab title='compiled CSS'>

  ```CSS
  .nav.svelte-19dr0nd {
    // styles for every .nav
    ... 
  }

  header .nav.svelte-19dr0nd {
    // styles only inside a <header>
    ... 
  }

  footer .nav.svelte-19dr0nd {
    // styles only inside a <footer>
    ... 
  }
  ```
  
  </Tab>
</Tabs>

And that's it! Without having to install any additional plugins, you can use Svelte to make components that react differently given different parents. If the `:global()` selector is used anywhere in the components parent tree, the contextual styles apply.

If you want to explore this more in action, I made a quick [REPL on svelte.dev](https://svelte.dev/repl/649e0fd244b044ab869c1b203245ffb7?version=3.43.0) that uses actual components to build the example from the screenshot above.