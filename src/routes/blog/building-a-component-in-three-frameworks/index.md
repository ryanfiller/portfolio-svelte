---
title: Building a Component in Three Frameworks
banner:
  src: '/images/powerpuff-three-frameworks.jpg'
  alt: 'The Powerpuff Girls'
  attribution: 'The Powerpuff Girls, Cartoon Network'
options:
  published: true
meta:
  categories:
    - code
  date: 2020-08-31
  excerpt: 'Comparing and contrasting creating a basic widget in React, Svelte, and Vue'
  tags:
    - react
    - svelte
    - vue
---

<script>
  import FrameworkList from './_framework-list.svelte'
</script>

I recently decided to break up my `color-contrast-chart` NPM package to be less coupled to a specific framework. I split off the core functionality into [one package](https://www.npmjs.com/package/color-contrast-table) and the React rendering bits into [another](https://www.npmjs.com/package/color-contrast-table-react).

I did this because I knew I would be building a [Svelte version](https://www.npmjs.com/package/color-contrast-table-svelte) of the package to use on my new site whenever I get around to refactoring it with Sapper. Since I was already building two versions I figured I might as well make a third and try out [Vue](https://www.npmjs.com/package/color-contrast-table-vue) for the first time. (Sorry [Angular](https://angular.io/) friends, maybe next time.)

This post is far from an exhaustive tutorial about how to use each framework, but more of a look into how each handles common frontend concerns at a high level. I've been working with React for almost four years, looking into Svelte on and off for about a year, and this will be my first time digging into Vue. I feel pretty confident in the React version, having refactored it several times already, but there's probably room for improvement in my Svelte and Vue implementations. If you have any constructive criticism, I'd absolutely love to hear it either on [GitHub](https://github.com/ryanfiller/) or [Twitter](https://twitter.com/ryanfiller_).

## Specifications

![example color chart](/images/color-chart.jpg){data-align='right'}

In order to make sure I was building the same features into each package, I came up with a short list of specifications. Each component would: 

 - accept a color array to be transformed by the `color-contrast-table` core package
 - be able to toggle a set of default styles on but expose a set of usable class names for custom styles
 - have a pair of props that would be able to toggle the name and value being edited in real time and stored in local state
 - be able to pass in custom functions for when `names` and `values` change as well as a function for when inputs `blur`

 <div style="clear:both" class="clearfix"></div>

 I made a table of props and proptypes that each version of the component would need to conform to.

| name            | type        | notes |
| --------------- | ----------- | ----- |
| `colors`        | `array`     | see [color-contrast-table](#color-contrast-table) |
| `useStyles`     | `boolean`   | turn on default styles for chart |
| `editNames`     | `boolean`   | activate input for color names, does not need to be passed if `onNamesChange` is provided |
| `editValues`    | `boolean`   | activate input for color values, does not need to be passed if `onValuesChange` is provided |
| `onNamesChange` | `function`  | optional callback to be fired when color name inputs change, will be passed `(colorIndex, event.target.value)` |
| `onValueChange` | `function`  | optional callback to be fired when color value inputs change, will be passed `(colorIndex, event.target.value)` |
| `onInputBlur`   | `function`  | optional callback to be fired on blur of any input, will be passed `(event)` |

## Scaffolding a New Project

Creating a new project in a modern framework often require setting up complex environments and build setups. Luckily, all three frameworks offer a pretty straightforward ways to get a new project started.

<FrameworkList>

  - React offers a first party CLI application tool, [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app). It's definitely a fast and easy way to get a new project going, and comes with [Jest tests](https://jestjs.io/) and [Webpack](https://webpack.js.org/) already configured.

  Once you have the CLI installed, you can run

  ```bash
  create-react-app new-project
  ```

  There's actually a really helpful section in the [React documentation](https://reactjs.org/docs/create-a-new-react-app.html) suggesting some alternate tools for different scenarios if a full-blown Create React App would be too much overhead.

  If [TypeScript](https://www.typescriptlang.org/) is your thing, I've heard good things about [`TSDX`](https://www.npmjs.com/package/tsdx) but have never used it myself.
    
  - Starting a new Svelte project could not be easier. There's a code snippet to copy and paste from [The Svelte homepage](https://svelte.dev/) that runs a `degit` command to create a Svelte app. It even uses [`npx`](https://www.npmjs.com/package/npx) so it doesn't required that you have `degit` installed.

  ```bash
  npx degit sveltejs/template new-project
  ```

  While [`degit`](https://github.com/Rich-Harris/degit) is yet another tool built by Svelte's creator [Rich Harris](https://twitter.com/Rich_Harris), it isn't really a first party Svelte CLI tool. I think, though, that this speaks to how straightforward Svelte is compared to other frameworks. It can install from a simple repo with a `rollup.config.js` (another Rich Harris tool) and not have to deal with a complex Webpack configuration. This is because all of Svelte's work is done at compile time, so there's no need to transform or polyfill anything for run time in the browser.
    
  - Vue offers an absolutely amazing [first party CLI](https://cli.vuejs.org/guide/). To start a new project, run
  
  ```bash
  vue create new-project
  ```

  Honestly, this tool was magical, especially the [`vue serve`](https://cli.vuejs.org/guide/prototyping.html) command. It was crazy cool to be able to create any `.vue` file, then run `vue serve` and be able to view just that file being built and served in the browser.

</FrameworkList>

## Dev Tools

There isn't a ton to say about this, other than that all three frameworks have browser extension dev tools. I would highly recommend downloading them if you're doing any work with a particular framework. They help peer into component structure and data in more specific ways that a browser's normal inspect tools. This can save a lot of time when trying to diagnose the cause of an issue, plus it gives you some extra power to poke around in other people's websites and see how they're using a framework.

<FrameworkList>

  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) | [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools)
    
  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/svelte-devtools/) | [Chrome](https://chrome.google.com/webstore/detail/svelte-devtools/)
    
  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) | [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/)

</FrameworkList>

## Components & Template Engines

Components are small pieces of reusable code that combine to build up complex applications, which is called "component composition." Often they accept data from their parent components and display or transform it in some way. Most modern JavaScript frameworks refer to passed data as "props," short for properties.

![a color block component](/images/color-block.png){data-align='left' data-small='true'}

The most simple component in my color-chart is the `<Color>` component. This component needs to look at a `color` object which will contain a `name`, `value`, `score`, and contrast `ratio`. 



<FrameworkList>

  - There are two ways to create components in React: class components and function components. For the sake of simplicity in this post I'll be referring to function components. The React team is adamant that [class components are not being deprecated](https://reactjs.org/docs/hooks-intro.html#gradual-adoption-strategy) and are still a totally valid way to approach React.

  A React component is literally just a function that is exportd from a `.js` or `.jsx` file. Attributes that are passed to a component can be accessed with the `props` argument of a function component.

  The `React` package itself will need to be imported first thing in any React component file.

  ```react
  // color.jsx

  import React from 'react'

  const Color = (props) => {
    return {
      <div>
        <span>
          {props.color.score}
        </span>
      </div>
    }
  }

  export default Color
  ```

  It's not required to name this function, but doing so will make debugging a lot easier than `export default () => {...}` will.

  While technically not a requirement, the large majority of React projects use [JSX](https://reactjs.org/docs/introducing-jsx.html) as the template tool. JSX is not only for React, but I've never seen one used without the other.

  JSX works _mostly_ like HTML, but with ability to interpolate Javascript by wrapping it in curly brackets (`{ }`). This syntax can run expressions or print values, such as those from the `props` object . String attributes can be passed using quotation marks, but anything else will need to use the `prop={value}` bracket syntax.

  This particular component is self-contained, but if it needed to wrap and render another component it could use React's special [`props.children`](https://reactjs.org/docs/composition-vs-inheritance.html) value. This value will be automatically added to any component that contains children and doesn't need to be explicity passed anywhere.

  ```react
  // label.jsx

  import React from 'react'

  const Label = (props) => {
    return {
      <span>
        {props.children}
      </span>
    }
  }

  export default Label
  ```

  A component can be imported into another component's file with an [import statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and then used like any other element.

  ```react
  // color.jsx

  import React from 'react'
  import Label from './label.jsx'

  const Color = (props) => {
    return {
      <div>
        <Label>
          {props.color.score}
        </Label>
      </div>
    }
  }

  export default Color
  ```

  - A Svelte component is a special type of file with the `.svelte` extension that lets the Svelte compiler know it needs to be treated in a certain way. Behind the scenes, Svelte components are actually JavaScript classes, but writing them is a lot like writing [regular HTML](https://svelte.dev/docs#Component_format). JavaScript is contained within `<script>` tags, CSS within `<style>` tags, and everything else on the page will be rendered as HTML. A Svelte component can consist of one or more of these three sections.

  ```svelte
  // color.svelte

  <script>
    export let color
  </script>

  <div>
    <span>
      {color.score}
    </span>
  </div>
  ```

  A few things are immediately different from React. The component is automatically named and exported based on the name of the file. Rather than be passed an a `props` object, values must be created with the [`export let` syntax](https://svelte.dev/docs#1_export_creates_a_component_prop). Sort of a running theme for Svelte, the syntax seems weird at first but makes sense the more you think about it. Think of it as declaring a reassignable variable, and exporting it so that it can be overwritten by other components.

  Similarly to JSX, Svelte uses curly brackets to escape HTML and interpolate JavaScript values declared in the `<script>` tag. Unlike JSX, anything that is correct in HTML is also valid in a Svelte template. Svelte describes itself as as "superset" of HTML, so "any valid HTML is valid Svelte."

  Component composition works slightly different as well. Rather than passing children via props, Svelte uses a special tag called a [`<slot/>`](https://svelte.dev/docs#slot).

  `<slot>` elements are functionally very different than JSX's `props.children`, but at a basic level they should work mostly the same.

  ```svelte
  // label.svelte

  <span>
    <slot />
  </span>
  ```

  Components can be imported within the `<script>` section of other components and used as custom HTML tags.

  ```svelte
  // color.svelte

  <script>
    export let color
    import Label from './label.svelte'
  </script>

  <div>
    <Label>
      {color.score}
    </Label>
  </div>
  ```

  - Vue, like React, has multiple ways to structure a component file.  I don't have enough experience to speak to the pros and cons of each, but I chose to write all my components using the [single file component](https://vuejs.org/v2/guide/single-file-components.html) approach.

  Apparently you _can_ [use JSX with Vue](https://vuejs.org/v2/guide/render-function.html), but none of the Vue developers I know have ever mentioned doing this. By default, Vue comes with its [own template syntax](https://vuejs.org/v2/guide/syntax.html) that is similar to Svelte's.

  ```vue
  // color.vue

  <script>  
    export default {
      name: 'Color',
      props: {
        color
      }
    }
  </script>

  <template>
    <div>
      <span>
        {{ this.color.score }}
      </span>
    </div>
  </template>
  ```

  Just like Svelte, JavaScript in a Vue component lives inside a `<script>` tag at the top of the file. Unlike Svelte, this code is _required_ for a Vue component, and must contain a structured `default export` object. Vue components instantiate JavaScript classes, and Vue forces you to be declarative when defining a component's dependcies. This makes sense if you think about writing the `constructor()` function of a regular class.
  
  The `name` key corresponds to how the component will be referenced in other files. All the props need to be explicitly added to the `props` object. Once properties are assigned to the Vue component class, they can be used in the HTML by using the `this.` syntax. [`this` in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) can be kind of a hard thing to understand, but for this scenario think about it as "this component."

  Vue also needs to return a `<template>` tag in each component to register what HTML will be rendered. Interpolatin JavaScript in HTML uses ["Mustache" syntax](https://vuejs.org/v2/guide/syntax.html#Text), or double curly brackets (`{{ }}`).

  For composing components, Vue also uses the [`<slot>` tag](https://vuejs.org/v2/guide/components-slots.html). 

  ```vue
  // label.vue
  
  <script>  
    export default {
      name: 'Label'
    }
  </script>

  <template>
    <span>
      <slot />
    </span>
  </template>
  ```

  Like `props`, any imported components will need to be registered inside the `<script>` tag. After that, they can be used inside the `<template>` as custom elements.

  ```vue
  // color.vue

  <script>  
    import Label from './label.vue'

    export default {
      name: 'Color',
      props: {
        color
      },
      components: {
        Label
      }
    }
  </script>

  <template>
    <div>
      <Label>
        {{ this.color.score }}
      </Label>
    </div>
  </template>
  ```
  
</FrameworkList>

## Passing Props and Checking Types

![a color block component with a background](/images/color-block-2.png){data-align='right' data-small='true'}

`props`, like I briefly mentioned before, are how modern JavaScript frameworks pass data around. For the most part props "flow down," meaning that they are passed from parent to child and not in the other direction.

In the color chart, each `<Color>` component needs to get a certain set of color data from its parent `<Row>` component. That data looks like this:

```javascript
  color: {
    name: 'purple', // the color's name
    value: '#800080' // the color's hex value,
    score: 'AAA', // whether or not the color passes contrast with the row
    ratio: 1.5 // the actual contrast with the current row
  }
```

There are three main ways data can be passed: as individual attributes; bundled up as an object containing multiple attributes that can be unpacked later; or using some variation of the [spread funtion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to unpack the data _before_ it makes it into the component.

The good news is that all three frameworks also have tools to add [types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) to help manage a component's expectations around props data.

<FrameworkList>

 - In React, `props` are [immutable data passed into child components](https://reactjs.org/docs/components-and-props.html#props-are-read-only). This means that unless you go out of your way to allow changes, what you pass into a component will be exactly what the component will always render. Props are passed using regular HTML attribute syntax for strings, and the curly brackets syntax for any other type of value.

 ```react
  // row.jsx

  import React from 'react'
  import Color from './color.jsx'

  const Row = (props) => {
    return (
      <tr>
        <Color
          name={props.color.name}
          value={props.color.value}
          score={props.color.score}
          ratio={props.color.ratio}
        />
      </tr>
    )
  }

  export default Row
  ```

  To ensure that the `<Color>` component knows what type to expect for each prop, React requires the [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) addon. This used to be part of the core React package, but was split into its own dependency since using it is optional. It now needs to be separately imported into any file it is used in.

  A component's `.propTypes` are assigned in the same file, after the main body of the component.

  ```react
  // color.jsx

  import React from 'react'
  import PropTypes from 'prop-types'

  const Color = (props) => {
    return {
      <div title={`Ratio ${props.ratio}`}>
        <span>
          {props.score}
        </span>
      </div>
    }
  }

  Color.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    score: PropTypes.string,
    ratio: PropTypes.number
  }

  export default Color
  ```

  To make this more concise, the entire `color` object can be passed from `<Row>` to `<Color>`, then its attributes can be accessed inside the `<Color>` component.

  ```react
  // row.jsx

  import React from 'react'
  import Color from './color.jsx'

  const Row = (props) => {
    return (
      <tr>
        <Color color={props.color} />
      </tr>
    )
  }

  export default Row
  ```

  This means an update in the Color's PropTypes. It's possible to deep check the shape of an object, but for the sake of simplicity let's just check that it _is_ an object.

  ```react
  // color.jsx

  import React from 'react'
  import PropTypes from 'prop-types'

  const Color = (props) => {
    return {
      <div title={`Ratio ${props.color.ratio}`}>
        <span>
          {props.color.score}
        </span>
      </div>
    }
  }

  Color.propTypes = {
    color: PropTypes.object
  }

  export default Color
  ```

  The last way to pass props is to take advantage of the fact that they themselves are `object` type and use the [...spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) operator. Instead of passing the bundled object as one value, the spread operator will take each attribute and pass it individually. This is a particularly helpful tool when a parent is passed props that in turn need to all be passed through to a child. Rather than be set to the value of an attribute, this syntax is applied directly to the component.

  ```react
  // row.jsx
  
  import React from 'react'
  import Color from './color.jsx'

  const Row = (props) => {
    return (
      <tr>
        <Color {...props.color} />
      </tr>
    )
  }

  export default Row
  ```

  Because each attribute was passed unbundled from the single `color` object, the type of each individual prop can be checked.

  ```react
  // color.jsx

  import React from 'react'
  import PropTypes from 'prop-types'

  const Color = (props) => {
    return {
      <div title={`Ratio ${props.ratio}`}>
        <span>
          {props.score}
        </span>
      </div>
    }
  }

  Color.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    score: PropTypes.string,
    ratio: PropTypes.number
  }

  export default Color
  ```

  - [Svelte `props`](https://svelte.dev/docs#Attributes_and_props) work similar to React `props`. They have nearly the same syntax, with quotation marks for strings and curly brackets for other values, but can also accept any keywords that work in regular HTML.

  ```svelte
    // row.svelte

    <script>
      export let color

      import Color from './color.svelte'
    </script>

    <tr>
      <Color 
        name={color.name}
        value={color.value}
        score={color.score}
        ratio={color.ratio}
      />
    </tr>
  ```

  Unlike React, Svelte comes built-in with an easy-to-opt-into typing system. When defining a `prop` in a child component using the `export let` syntax, [a default value can be set](https://svelte.dev/docs#1_export_creates_a_component_prop). Svelte will then throw a warning when a new value is assigned that does not match that original type. To opt out of this either don't set a default or explicitly assign it `undefined`.

  ```svelte
  // color.svelte

  <script>
    export let name = ''
    export let value = ''
    export let score = ''
    export let ratio = 0
  </script>

  <div title={`Ratio ${ratio}`}>
    <span>
      {score}
    </span>
  </div>
  ```

  Svelte can also pass an entire object as one attribute. One cool thing Svelte offers is the ability to use a shorthand to pass a prop if its name and value are the same. Instead of setting an attribute equal to a value, the value can be wrapped with curly bracket and added directly on an element.

  ```svelte
    // row.svelte

    <script>
      export let color = {}

      import Color from './color.svelte'
    </script>

    <tr>
      // long form
      <Color color={color} />
      // shorthand
      <Color {color} />
    </tr>
  ```

  These values can then be accessed off of the object in the child component.

  ```svelte
  // color.svelte
  <script>
    export let color = {}
  </script>

  <div title={`Ratio ${color.ratio}`}>
    <span>
      {color.score}
    </span>
  </div>
  ```

  It may seem like all individually defined and exported props are not automatically grouped into a single `props` object, but they actually are. This comes with the caveat that this syntax is best used sparingly.

  > $$props references all props that are passed to a component – including ones that are not declared with export. It is useful in rare cases, but not generally recommended, as it is difficult for Svelte to optimise.

  The same spread operator syntax can be used to pass all props into a child.

    ```svelte
    // row.svelte

    <script>
      export let color = {}

      import Color from './color.svelte'
    </script>

    <tr>
      <Color {...$$props} />
    </tr>
  ```

  In the child component the exported `props` will need to correspond to whatever was also passed to the parent. In this example, it would be a `color` object.

  ```svelte
  // color.svelte
  
  <script>
    export let color = {}
  </script>

  <div title={`Ratio ${color.ratio}`}>
    <span>
      {color.score}
    </span>
  </div>
  ```
 
 - Passing props in Vue works mostly like React and Svelte, but with a few syntactical differences. Firstly, prop attributes have to be ["kebab-case"](https://vuejs.org/v2/guide/components-props.html#Prop-Casing-camelCase-vs-kebab-case). Vue props will also always use the double quotation (`" "`) syntax to declare **all** types of props, not just strings. Vue also makes a distinction between [static props and dynamic props](https://vuejs.org/v2/guide/components-props.html#Passing-Static-or-Dynamic-Props), the latter of which are prepended with `v-bind:`. Since the color chart will sometimes update when a user interacts with it, this is the syntax to use in this situation.

  ```vue 
  // row.vue

  <script>  
    import Color from './color.vue'

    export default {
      name: 'Row',
      components: {
        Color
      },
      props: {
        color
      },
    }
  </script>

  <template>
    <tr>
      <Color 
        v-bind:name="this.color.name"
        v-bind:value="this.color.value"
        v-bind:score="this.color.score"
        v-bind:ratio="this.color.ratio"
      />
    </tr>
  </template>
 ```
 
 Vue, like Svelte, comes with a [typing system](https://vuejs.org/v2/guide/components-props.html#Prop-Validation) that only requires a small amount of additional syntax. When registering `props` to a component, each prop can be assigned a value to define a type associated with each key.

  ```vue
  // color.vue
  
  <script>  
    export default {
      name: 'Color',
      props: {
        name: String,
        value: String,
        score: String,
        ratio: Number
      }
    }
  </script>

  <template>
    <td>
      <div title="`Ratio ${this.ratio}`">
        <span>
          {{ this.score }}
        </span>
      </div>
    </td>
  </template>
  ```

  Just like the other frameworks, objects can be passed down as props as well. Like Svelte, Vue offers a [shorthand](https://vuejs.org/v2/guide/syntax.html#v-bind-Shorthand) for writing out `v-bind:`. `v-bind` can be left off and dynamic props can be prepended with just `:`.

  ```vue 
  // row.vue
  <script>  
    import Color from './color.vue'

    export default {
      name: 'Row',
      components: {
        Color
      },
      props: {
        color: Object
      },
    }
  </script>

  <template>
    <tr>
      // long form
      <Color v-bind:color="this.color" />
      // shorthand
      <Color :color="this.color" />
    </tr>
  </template>
 ```

  As you would probably expect, those values can be accessed via the `color` object prop.

  ```vue
  // color.vue

  <script>  
    export default {
      name: 'Color',
      props: {
        color: Object
      }
    }
  </script>

  <template>
    <td>
      <div title="`Ratio ${this.color.ratio}`">
        <span>
          {{ this.color.score }}
        </span>
      </div>
    </td>
  </template>
  ```

  Similar to Svelte, Vue also secretly bundles all of a components registered prop values into an object called [`$props`](https://vuejs.org/v2/api/#vm-props), which can be referenced elsewhere in the component as `this.$props`. Unlike Svelte and React, however, there isn't really a way to spread this value into a child component and it is made more for referencing passed in values elsewhere in the `<script>` tag.

</FrameworkList>

## Inline Javascript and Styles

Sometimes, in order to make components more dynamic, values need to be set locally to each instance of a component. This is often useful to do within the render body of the component if the output will end up directly in the DOM. These DOM side effects often involve manipulating classes for CSS, or even adding inline CSS directly onto elements.

![block components with different color text](/images/color-row.png){data-align='center'}

For the color chart, the easiest way to style each block was to add an inline `background-color` to each `<Color>` component. Also, each block runs a small JavaScript function to determine whether to use black or white text.

Using a conditional CSS class is how I was able to scope the global style sheet for the entire chart. A user can turn styles off by not passing the `useStyles` top level prop.

I'll be using [Block Element Modifier](http://getbem.com/) style classes for this section, so if these look odd read up on what all the dashes and underscores mean.

<FrameworkList>

  - React does its best to be unopinionated when it comes to styles. JSX uses the [`className` attribute](https://reactjs.org/docs/faq-styling.html#how-do-i-add-css-classes-to-components) as an analog to the regular HTML `class`. Any string, or expression that evaluates to a string, can be used and will end up in the DOM and can be hooked up to an external style sheet.

  ```react
  // color.jsx
  
  import React from 'react'

  const Color = (props) => {
    return (
      <td className='color-contrast-table__color'>
        <div className='color-contrast-table__color-block'>
          <span className='color-contrast-table__color-score'>
            {props.color.score}
          </span>
        </div>
      </td>
    )
  }

  export default Color
  ```

  React also allows for inline styles, but the syntax is [different](https://reactjs.org/docs/dom-elements.html#style) than regular HTML. The `style` attribute accepts an object, and as such the keys need to be camelCase strings rathan than normal CSS properties that contain hyphens. JavaScript values can be used directly in this object.

  ```react
  // color.jsx

  import React from 'react'

  const Color = (props) => {
    return (
      <td>
        <div style={{ backgroundColor: props.color.value }}>
          <span>
            {props.color.score}
          </span>
        </div>
      </td>
    )
  }

  export default Color
  ```

  The last built-in way to work with styles in React is similar to inline styles, but is useful for styles that don't need to be attached to a specific DOM element. React's (hilariously named) [`dangerouslySetInnerHTML`](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) attribute can be combined with a `<style>` tag to create an on-page style sheet.

  ```react
  // styles.jsx

  import React from 'react'

  const Styles = () => {
    return (
      <style dangerouslySetInnerHTML={{__html: `
        .color-contrast-table
          ...
        }
      `}} />
    )
  }

  export default Styles
  ```
  
  Since JSX is "just javascript," running inline method doesn't require any special work. A function can be imported from another file, and then used anywhere in the body of the component or its returned JSX.

  ```react
  // color.jsx

  import React from 'react'
  import getLabelColor from './get-label-color.js'

  const Color = (props) => {
    return (
      <td>
        <div
          style={{
            backgroundColor: props.color.value,
            color: getLabelColor(props.color.value)
          }}
        >
          <span>
            {props.color.score}
          </span>
        </div>
      </td>
    )
  }

  export default Color
  ```

  More complex functions can even be defined as nested functions within a component before the return of the component's JSX. To hook up the `useStyle` prop I used this strategy to conditionally add a top level `className` and then scoped my `<style>` tag accordingly.

  ```react
  // table.jsx
  const Table = (props) => {

    function getClassName() {
      if (props.useStyles) {
        return 'use-styles color-contrast-table'
      } else {
        return 'color-contrast-table'
      }
    }

    return (
      <table className={getClassName()}>
        <tbody>
          ...
        </tbody>
      </table>
    )
  }

  export default Table
  ```
    
  - Svelte, striving to be as close to HTML as possible, lets you use regular HTML class attribute syntax.

  ```svelte
  // color.svelte
  <script>
    export let color
  </script>

  <td class='color-contrast-table__color'>
    <div class='color-contrast-table__color-block'>
      <span class='color-contrast-table__color-score'>
        {color.score}
      </span>
    </div>
  </td>
  ```

  Since "valid HTML is valid Svelte," a regular [`style` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style) can be used to create inline styles. This isn't very well documented, but Svelte can also interpolate JavaScript values within this attribute with the curly bracket syntax.

  ```svelte
  // color.svelte

  <script>
    export let color
  </script>

  <td>
    <div style='background-color: {color.value};'>
      <span>
        {color.score}
      </span>
    </div>
  </td>
  ```
  
  Svelte also comes with some pretty powerful built-in style tools. In addition to being able to define a `<script>` tag at the top of a `.svelte` file, you can define a [`<style>` tag](https://svelte.dev/docs#style) as well. The Svelte compiler will generate unique classes that will encapsulate styles to only effect elements within this component file. This means that styles won't naturally cascade down to child components, unless the style rule is wrapped with the `:global()` modifier.

  ```svelte
  // styles.svelte

  <style>
    :global(.color-contrast-table) {
      ...
    }
  </style>
  ```

  Because the `<script>` and HTML sections of a component are optional, this creates a global `<Style />` component I can include near the top level of my color chart.

  Since the `<script>` section of a component will run any valid JavaScript, component functions can be imported and run here. Variables can also be created and used in the HTML body with the same bracket syntax as `props` values.

  ```svelte
  // color.svelte

  <script>
    export let color

    import getLabelColor from './get-label-color.js'
    const textColor = getLabelColor(color.value)
  </script>

  <td>
    <div style='
      background-color: {color.value};
      color: {textColor};
    '>
      <span>
        {color.score}
      </span>
    </div>
  </td>
  ```

  Just like React, methods can be called inline using curly brackets. I used the same scoping method combined with a `:global()` modifier to toggle the styles for the chart. 

  ```svelte
  // table.svelte

  <script>
    export let colors
    export let useStyles

    function getClassName() {
      if (useStyles) {
        return 'use-styles color-contrast-table'
      } else {
        return 'color-contrast-table'
      }
    }
  </script>

  <table class='{useStyles()}'>
    <tbody>
      ...
    </tbody>
  </table>
  ```

  One extra thing to note here when applying this logic specifically to classes is that Svelte also comes with a [`class:` directive](https://svelte.dev/docs#class_name) that makes conditionally rendering classes easier. Whatever directly follows the `:` will be added to the element's class list if the prop is truthy.

  ```svelte
  // table.svelte

  <script>
    export let colors
    export let useStyles
  </script>

  <table
    class='color-contrast-table'
    class:use-styles={useStyles}
  >
    <tbody>
      ...
    </tbody>
  </table>
  ```
    
  - Vue, just like Svelte, uses the same class attribute syntax as regular HTML.

  ```vue
  // color.vue

  <script>
    export default {
      name: 'Color',
      props: {
        color
      }
    }
  </script>

  <template>
    <td class='color-contrast-table__color'>
      <div class='color-contrast-table__color-block'>
        <span class='color-contrast-table__color-score'>
          {{ color.score }}
        </span>
      </div>
    </td>
  </template>
  ```

  Vue's [inline style attribute](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles), however, is a little closer to React's. Vue uses the `v-bind:style` syntax and needs to be passed an object. It can use regular, hyphenated CSS properties as keys as long as they're surrounded with single quotation marks (`' '`).

  Any attributes that need access to interpolated values needs to use a Vue [directives](https://vuejs.org/v2/guide/custom-directive.html). A directive is a special kdinf of attribute, usually prefixed with "v-" that lets Vue know it needs to interpolate that attribute in a special way. 

  ```vue
  // color.vue

  <script>
    export default {
      name: 'Color',
      props: {
        color
      }
    }
  </script>

  <template>
    <td>
      <div v-bind:style="{ 'background-color': color.value }">
        <span>
          {{ color.score }}
        </span>
      </div>
    </td>
  </template>
  ```

  One awesome benefit of using a Vue [single file component](https://vuejs.org/v2/guide/single-file-components.html) is the ability to add a `<style>` tag to a component in addition to a `<script>` tag. This works a lot like the Svelte `<style>` tag, but is [more configurable](https://vue-loader.vuejs.org/guide/scoped-css.html). By default the styles will work like a global CSS stylesheet, but the tag itself can accept a `scoped` attribute. This will add generated classes and encapsulate the styles similar to Svelte.

  ```vue
  // styles.vue

  <script>
    export default {
      name: 'Styles',
    }
  </script>

  <style>
    .color-contrast-table {
      ...
    }
  </style>

  <template>
    <div></div>
  </template>
  ```

  One thing worth mentioning here is that since a Vue component must contain a `<template>` tag and that tag must contain an element, you will have to put some random DOM element here. If that bothers you (it bothered me), there is an NPM package called [`vue-fragment`](https://www.npmjs.com/package/vue-fragment) that will allow you to return a ghost element that won't actually render anything.

  When it comes to using methods inside of components, Vue requires a bit more structure than the other two frameworks. 
  
  To define a value in the `<script>` section and use that value in the component body, it must [be registered](https://vuejs.org/v2/guide/instance.html#Data-and-Methods) like other imports. In a single file component, `data` needs to be a [function that returns an object of data values](https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function). If that `data` value is going to be defined as the result of an expression, that function needs to also be registered to the `methods` key of the Vue object. 

  ```vue
  // color.vue
  
  <script>  
    import getLabelColor from './get-label-color.js'

    export default {
      name: 'Color',
      props: {
        color
      },
      methods: {
        getLabelColor
      },
      data: function() {
        return {
          textColor: this.getLabelColor(this.color.value)
        }
      }
    }
  </script>

  <template>
    <td>
      <div
        v-bind:style="{ 
          'background-color': color.value,
          'color': this.textColor
        }"
      >
        <span>
          {{ color.score}}
        </span>
      </div>
    </td>
  </template>
  ```

  Methods can also be defined as values inside the `methods` object, and can be run directly within the `<template>` section.

  ```vue
  // table.vue
  
  <script>  
    export default {
      name: 'Table',
      props: {
        colors,
        useStyles
      },
      methods: {
        getClassName: function() {
          if (this.useStyles) {
            return 'use-styles color-contrast-table'
          } else {
            return 'color-contrast-table'
          }
        }
      }
    }
  </script>

  <template>
    <table v-bind:class="getClassName()">
      <tbody>
        ...
      </tbody>
    </table>
  </template>
  ```

  For methods that determine which classes are added to an element, Vue allows for [binding a directive to the `class` attribute](https://vuejs.org/v2/guide/class-and-style.html#Binding-HTML-Classes). You can pass an object to a bound class attribute, and if the value returns truthy the key will be added to the element's class list.

  ```vue
  // table.vue
  
  <script>  
    export default {
      name: 'Table',
      props: {
        colors,
        useStyles
      }
    }
  </script>

  <template>
    <table v-bind:class="{ 'use-styles': useStyles }">
      <tbody>
        ...
      </tbody>
    </table>
  </template>
  ```

</FrameworkList>

## Loops and Conditional Rendering

Moving up one level from the `<Color>` component in the color charts is the Row component. Each row contains two things: a collection of generated `<Color>` components, and a `<Header>` element that needs to know whether to show regular text or editable inputs.

![row of blocks generated from an array](/images/color-row-2.png){data-align='full'}

Each Row will get `props` data that looks like this:

```javascript
  {
    color: {
      name: 'purple', // the name of this color
      value: '#800080', // the value of this color
      combinationScores: [...], // a list of data about the other colors
    },
    editNames: false, // whether the name should show text or an input
    editValues: false // whether the value should show text or an input
  }
```

<FrameworkList>

 - The biggest difference between JSX and any other templating system I've used is highlighted in the first paragraph of the JSX documentation.

  > JSX may remind you of a template language, but it comes with the full power of JavaScript.

  This means that rather than learning JSX specific ways to programmatically create markup, React relies on directly using JavaScript methods. To render a list of items, an array of data can be looped through with a [`.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) or a [`.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) `Array` method.

  ```react
  // row.jsx

  import React from 'react'
  import Color from './color.jsx'
  import Header from './header.jsx'

  const Row = (props) => {
    return (
      <tr>
        <Header editNames={props.editNames} editValues={props.editValues} />

        {props.color.combinationScores.map((color, index) => {
          return (
            <Color
              key={index}
              color={color}
            />
          )
        })}
      </tr>
    )
  }

  export default Row
  ```

  One particular quirk to note here is that when rendering elements any list of elements React requires each to have a unqiue `key` attribute. This can be anything — like the elements `name` value — but its often easiest to just use the array index. This helps React keep track of items during re-renders.

  Another gotcha of JSX is that despite being "just JavaScript," `if ()` statements don't work inside the return of a render method. Because of this JSX code is more likely to use either the ["short circuit"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) or [ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) operators.

  The "short circuit" is more of a design pattern and less of an actual operator, but it can be read as "if the data exists, show the HTML; if not, stop and show nothing."
 
  If the row component needed to _only_ show `<Color>` components for passing color combinations, it might look like this:

  ```react
  {color.score !== 'fail' && 
    <Color color={color} />
  }
  ```

  The ternary operator is used when one element is needed in one scenario and another in a different scenario, such as in the Header of each row.

  ```react
  // header.jsx

  import React from 'react'
  
  const Header = (props) => {
    return (
      <th>
        {props.editNames
          ? <input type='text' value={props.color.name} />
          : <span>{props.color.name}</span>
        }
        {props.editValues
          ? <input type='color' value={props.color.value} />
          : <span>{props.color.value}</span>
        }
      </th>
    )
  }

  export default Header
  ```

  A ternary, especially when intermixed with markup, can look confusing at first, but it functions essentially the same as an `if...else` statement. If the expression before the `?` is truthy, the first condition before the `:` will execute. If not, default to the second condition after the `:`.

  - Svelte comes with its own [built in template syntax](https://svelte.dev/docs#Template_syntax). To run logic you'll need to hook into their specific syntax, using `#` to start an expression, `:` to continue the previous expression, and `/` to end.

  To render a list of elements from an `array` of data, Svelte has several way to run an [each loop](https://svelte.dev/docs#each).

  ```svelte
    // row.svelte

    <script>
      export let color
      export let editNames
      export let editValues

      import Color from './color.svelte'
      import Header from './header.svelte'
    </script>

    <tr>
      <Header editNames={editNames} editValues={editValues} />

      {#each color.combinationScores as color}
        <Color color={color} />
      {/each}
    </tr>
  ```

  A nice thing about Svelte templates over JSX is that they are a little smarter, so there's no need to manually add a key to elements (although you can if you ever need to).

  Svelte also provides blocks for [`if` type statements](https://svelte.dev/docs#if) so there's no need to use something like the short circuit or the ternary.

  An `if` block wraps some HTML that will only be returned if the condition returns true. To only show blocks with a passing score:

  ```svelte
  {#if color.score !== 'fail'}
    <Color color={color} />
  {/if}
  ```

  An `if` statement can also have an `:else` clause, providing a default that will be rendered if the conditional is evaluated as false.

  ```svelte
  // header.svelte

  <script>
    export let editNames
    export let editValues
  </script>

  <th>
    {#if editNames}
      <input type='text' value={color.name} />
    {:else}
      <span>{color.name}</span>
    {/if}

    {#if editValues}
      <input type='color' value={color.value} />
    {:else}
      <span>{color.value}</span>
    {/if}
  </th>
  ```

 - Vue templates also come with a built in logic system, but rather than using custom tags it uses [directives](https://vuejs.org/v2/guide/syntax.html#Directives).
 
 Vue's template directive attributes are interesting because they can be applied directly onto a tag, or can be applied to a wrapping `<template>` element that will function as a "rootless" element during render.

  ```vue
  // row.vue

  <script>  
    import Header from './header.vue'
    import Color from './color.vue'

    export default {
      name: 'Row',
      components: {
        Header,
        Color
      },
      props: {
        color
      },
    }
  </script>

  <template>
    <tr>
      <Header :editNames="editNames" :editValues="editValues" />

      // directive directly on element
      <Color
        v-for="(color, index) in color.combinationScores"
        :key="index"
        :color="color"
      />

      // with wrapping element
      <template v-for="(color, index) in color.combinationScores">
        <Color
          :key="index"
          :color="color"
        />
      </template>

    </tr>
  </template>
  ```

  Vue also has both `v-if` and `v-else` directives that work how you would expect. Just like with `v-for` these can be applied on a wrapping `<template>` or directly to an element.

  ```
  // header.vue 
  <script>
    export default {
      name: 'Header',
      props: {
        editNames,
        editValues
      },
    }
  </script>

  <template>
    // directive directly on element
    <th>
      <input v-if="editNames" type='text' v-bind:value="color.name" />
      <span v-else>{{ color.name }}</span>

      <input v-if="editValues" type='color' v-bind:value="color.value" />
      <span v-else>{{ color.value }}</span>
    </th>

    // with wrapping element
    <th>
      <template v-if="editNames">
        <input type='text' v-bind:value="color.name" />
      </template>
      <template v-else>
        <span >{{ color.name }}</span>
      </template>

      <template v-if="editValues">
        <input type='color' v-bind:value="color.value" />
      </template>
      <template v-else>
        <span >{{ color.value }}</span>
      </template>
    </th>
  </template>
  ```

  Vue also comes with one extra operator that the other two frameworks don't include — [`v-show`](https://vuejs.org/v2/guide/conditional.html#v-show). `v-show` works visually just like `v-if`, but instead of not rendering an element it still renders the markup, but uses CSS to hide it from the DOM.

  ```vue
  // directive directly on element
  <Color v-show="color.score !== 'fail'" color={color} />
  
  // with wrapping element
  <template color.score !== 'fail'>
    <Color color={color} />
  </template>
  ```

  This could be accomplished in React or Svelte as well, but it's nice of Vue to provide such an easy syntax for it.

</FrameworkList>

## State and Events

If props are one half of modern frameworks, state is the other. Props are data passed into components, state represents values internal to the component at render time. State is often updated in response to actions that a user takes. State can even be derived from an initial set of `props` passed into a component as a starting state.

Each component can hold it's own state, and pass it down into child components via props, but often the top level component for a system will maintain all the state and disperse it down the tree. All three frameworks contain mechanisms to re-render a component if its `props` or `state` change. If a user takes an action, the top level component will be notified to update its state, and then let the children know they needs to re-render with new data.

![editing a color value](/images/edit-color.png){data-align='full'}

Custom events tied to different inputs and user actions are used to update state.

<FrameworkList>

  - React has a very complicated state system for class components that involves [binding values and updater functions to a component's `this`](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class). Since I've only been talking about function components it makes more sense to look at the [`useState` hook](https://reactjs.org/docs/hooks-state.html) and not the `setState` function. Hooks can be a confusing concept at first, especially if you're not already familiar with all of the [class lifecycle methods](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class), but try to think of them as importable functions that add ability for components to do more complex actions than just render JSX.

  Any of the [built-in React hooks](https://reactjs.org/docs/hooks-overview.html) can be imported as a named import from the `'react'` package, or they can be accessed directly off the `React` default import, like `React.useState()`. 
  
  The `useState` hook is a function that can accept an argument to use as its initial state. It will return two values: the state value and a function to update that state value. These two values are usually written with the [array destructure assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) syntax, and will mostly follow the `valueName`, `setValueName` naming convention.

  ```react
  // chart.js

  import React, { useState } from 'react'
  import generateChart from 'color-contrast-table'

  const Chart = (props) => {

    const [colors, setColors] = useState(props.colors)
    const colorChart = generateChart(colors)

    return (
      <Table colors={colorChart} />
    )
  }

  export default Chart
  ```

  Calling `setColor(newColors)` would cause the value of `colors` to change and cause a re-render of the `<Chart>` component as well as any children that depend on the `colors` prop. The `setColors` function can even be passed down as a prop itself and called within a child component. State setting functions in class components would need to have their `this` value bound in the class constructor, but because arrow function components [don't reassign `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this) a state updater can be passed and called wherever without worrying about binding.

  Because this function needs to be called on the change event of an input, which will only return one value, the function needs to do a little more work to get only that new value into the existing `colors` object. Once that is worked out, the new `colors` object can be set using the `setColor` updater.

    ```react
  // chart.js

  import React, { useState } from 'react'
  import generateChart from 'color-contrast-table'

  const Chart = (props) => {

    const [colors, setColors] = useState(props.colors)

    const onNamesChange = (index, value) => {
      const newColors = [...colors]
      newColors[index].name = value
      setColors(newColors)
    }

    const onValuesChange = (index, value) => {
      const newColors = [...colors]
      newColors[index].value = value
      setColors(newColors)
    }

    const colorChart = generateChart(colors)

    return (
      <Table
        colors={colorChart}
        onNamesChange={onNamesChange}
        onValuesChange={onValuesChange}
      />
    )
  }

  export default Chart

  // header.jsx

  import React from 'react'
  
  const Header = (props) => {
    return (
      <th>
        <input
          type='text'
          value={props.color.name}
          onChange={event => props.onNamesChange(props.index, event.target.value)}
        />
        <input
          type='color'
          value={props.color.value}
          onChange={event => props.onValuesChange(props.index, event.target.value)}
        />
      </th>
    )
  }

  export default Header
  ```

  The most important concept when dealing with state in React is that state objects are [immutable](https://developer.mozilla.org/en-US/docs/Glossary/Immutable) and should always be set using one of React's updaters and never reassigned directly. 

  ```react
  // don't do this!

  const [colors] = useState(props.colors)

  const onNamesChange = (index, value) => {
    colors[index].name = value
  }
  ```

  - Svelte is very interesting when it comes to stateful logic. One of the main tenets that differentiates Svelte from other frontend systems is that [all assignments are reactive](https://svelte.dev/docs#2_Assignments_are_reactive). Svelte "hijacks" the [assignment operator (=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment) and uses it to trigger state changes and re-renders within Svelte apps.

  Svelte also comes with a [built-in method](https://svelte.dev/docs#3_$_marks_a_statement_as_reactive) to make anything reactive by prefacing it with `$:`. This is another one of those "looks weird but is actually valid JavaScript" things from Svelte, this time taking advantage of a [JavaScript `label`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label).

  All of that to say, simply by declaring a prop, a Svelte app is already stateful. State, whether just a reactive prop or a labeled reactive statement, can be passed down to child components like any other type of data.

  ```svelte
  // table.svelte 

  <script>
    export let colors

    import generateChart from 'color-contrast-table'
    import Table from './table.svelte'
    
    $: colors = generateChart(colors)
  </script>

  <Table {colors} />
  ```

  Updating stateful values in Svlete can be handled in nearly the same way as in React, where an updater function is passed down into a child, and the return will set a new value in the parent. However, Svelte also offers something very different called a [`store`](https://svelte.dev/docs#svelte_store).

  A `store` is a place to put data outside of the normal component hierarchy. They provide methods to `subscribe`, `update` and `set` their data. Svelte stores come in several varieties, but the one that makes the most sense to use here is a [`writable`](https://svelte.dev/docs#writable), meaning that we can both read and write data to it.

  ```javascript
  // stores.js

  import { writable } from 'svelte/store'
  export const colorArray = writable()
  ```

  Then, in the `<Chart>` component, the `colorArray` store can be imported, `set` with `props` data, subscribed to, and passed down.

  ```svelte
  // chart.svelte

  <script>
    export let colors

    import generateChart from 'color-contrast-table'
    import Table from './table.svelte'

    import { colorArray } from './stores.js'
    colorArray.set(colors)
    colorArray.subscribe(colorArray => colors = colorArray)

    $: colors = generateChart(colors)
  </script>

  <Table {colors} />
  ```

  This doesn't change much in the `<Chart>` component itself, but what it does allow for is direct access to update the `colorArray` store without having to pass functions. Instead, the `<Header>` component can access the store directly, call its `update` method, and the rest of the components will be made aware of this change via the `subscribe` method in `<Chart>`. Store methods can be composed in other functions that will sort out updating a single object property, then can be bound to input events using Svelte's [element directives](https://svelte.dev/docs#Element_directives).

  ```svelte
  // header.svelte

  <script>
    export let color
    export let index

    import { colorArray } from './stores.js'
    const onNamesChange = (index, value) => {
      colorArray.update(colorArray => {
        const newColors = [...colorArray]
        newColors[index].name = value
        return newColors
      }
    })

    const onValuesChange = (index, value) => {
      colorArray.update(colorArray => {
        const newColors = [...colorArray]
        newColors[index].value = value
        return newColors
      }
    })
  </script>

  <th>
    <input
      type='text'
      value={color.name}
      on:input={event => onNamesChange(index, event.target.value)}
    />

    <input
      type='color'
      value={color.value}
      on:input={event => onValuesChange(index, event.target.value)}
    />
  </th>
  ```
    
  - Vue has two state-like concepts: [computed and watched properties](https://vuejs.org/v2/guide/computed.html). A [`computed` property](https://vuejs.org/v2/guide/computed.html#Computed-Properties) is one that is calculated based on some other data in the app and will remain cached after updating. A [`watch` property](https://vuejs.org/v2/guide/computed.html#Watchers) is like a `computed` property that requires a more custom implementation for how the data changing should be handled. The Vue docs recommend using `computed` over `watch` for most scenarios that don't involve asynchronous data, so that seemed like the right option for me.

  ```vue
  // chart.vue

  <script>  
    import generateChart from 'color-contrast-table'
    import Table from './table.vue'

    export default {
      name: 'Chart',
      components: {
        Table
      },
      props: {
        colors
      },
      methods: {
        generateChart,
      },
      data() {
        return {
          colorArray: this.$props.colors
        }
      },
      computed: {
        colorChart: function () {
          return this.generateChart(this.colorArray)
        }
      }
    }
  </script>

  <template>
    <Fragment>
      <Styles/>
      <Table v-bind:colors="colorChart" /> 
    </Fragment>
  </template>
  ```

  It feels slightly extraneous to have to assign a `data.colorArray` value and pass it through to `computed.colorChart`, but since Vue `props` are also immutable this is necessary. `props.colors` can't be changed, but `data.colorArray` can, and whenever it does `computed.colorChart` will also change and cause a re-render.

  Vue uses an event-driven system to update state. Rather than having a function be passed down and bound to the change event of an input, an event is emitted by the input and then "caught" by a parent component. Custom events are defined by using the `v-on:` syntax, and are then passed an `$emit()` function. The first argument of `$emit()` is the name of the event to be emitted and the rest will be passed into the function when the event is caught.

  ```vue
  // header.vue

  <script>  
    import getLabelColor from './get-label-color.js'
    import EditName from './edit-name.vue'
    import EditValue from './edit-value.vue'

    export default {
      name: 'Header',
      props: {
        color,
        index,
      },
      methods: {
        getLabelColor,
        namechange(index, value) { this.$emit('namechange', index, value) },
        valuechange(index, value) { this.$emit('valuechange', index, value) }
      }
    }
  </script>

  <template>
    <th>
      <input
        type='text'
        :value="value"
        v-on:input="$emit('namechange', index, $event.target.value)"
      />

      <input
        type='color'
        :value="value"
        v-on:input="$emit('valuechange', index, $event.target.value)"
      />
    </th>
  </template>
  ```
  
  These events can be caught and passed upwards so that a deeply nested child can update a value higher than its direct parent. For less typing, the `@` symbol can be used as a shorthand for `v-on`.
  
  ```vue 
  // header.vue

  methods: {
    namechange(index, value) { this.$emit('namechange', index, value) },
    valuechange(index, value) { this.$emit('valuechange', index, value) },
  }
  ...
  <input 
    type='text'
    :value="color.name"
    @input="$emit('namechange', index, $event.target.value)"
  />
  <input 
    type='color'
    :value="color.value"
    @input="$emit('valuechange', index, $event.target.value)"
  />

  // other components in between

  methods: {
    namechange(index, value) { this.$emit('namechange', index, value) },
    valuechange(index, value) { this.$emit('valuechange', index, value) },
  }
  ...
  <Header
    @namechange="namechange"
    @valuechange="valuechange"
  />

  //chart .vue

  methods: {
    namechange: function (index, value) {
      ...
    }
    valuechange: function (index, value) {
      ...
    }
    ...
    <Table
      @namechange="namechange"
      @valuechange="valuechange"
    >
  }
  ```

  This might _look_ like props being passed down, but this data flow is actually starting in the nested component and working its way upward. Once this function has been passed upwards to the same component in which the original computed values live, a method with the same name as the emitted event can be run to assign new data.

  ```vue
  // chart.vue

  <script>  
    import generateChart from 'color-contrast-table'
    import Table from './table.vue'

    export default {
      name: 'Chart',
      components: {
        Table,
      },
      props: {
        colors: Array,
      },
      methods: {
        generateChart,
        namechangefunction (index, value) {
          this.colorArray[index].name = value
        },
        valuechangefunction (index, value) {
          this.colorArray[index].value = value
        }
      },
      data() {
        return {
          colorArray: this.$props.colors
        }
      },
      computed: {
        colorChart: function () {
          return this.generateChart(this.colorArray)
        }
      },
    }
  </script>

  <template>
    <Fragment>
      <Styles/>
      <Table
        :colors="colorChart"
        @namechange="namechange"
        @valuechange="valuechange"
      />
    </Fragment>
  </template>
  ```

  Like I mentioned before, we can't mutate `props` values, so instead these functions needs to change `computed.colorArray`. One nice side effect of this requirement is that unlike in React and Svelte where we had to spread an existing value into a new object to update one value, Vue can directly change one piece of the `computed.colorArray` object.

</FrameworkList>

Front end state management is a LOT more complicated than what I briefly touched on here. Often since state deals with user input and data transformation there are a million different ways to handle this depending on how to optimize for the specific situation. 

React can use the [context API](https://reactjs.org/docs/context.html) to circumvent passing props a lot like how Svelte uses stores. Svelte can use [custom event directives](https://svelte.dev/docs#on_component_event) to emit and listen for custom events similar to how Vue works. All three frameworks can pass down a function in one way or another that can be used to update a parent's state.

## Performance

Just for fun, here's the final bundle size of each package running within three small example projects I put together.

<FrameworkList>

 - ![434kb react js bundle](/images/react-bundle.png){data-align='full'}

 - ![104kb svelte js bundle](/images/svelte-bundle.png){data-align='full'}

 - ![267kb vue js bundle](/images/vue-bundle.png){data-align='full'}

</FrameworkList>

## Quirks and Final Thoughts

<FrameworkList>

  - Of the these three frameworks, I've been working with React the longest and have built the most complex apps with it. My last few day jobs have involved primarily using React. That said, while I have the most knowledge about its intricacies, I probably also have the most experience with running up against its rough edges. There's a lot I like about React _now_, but I remember JSX being a lot to get used to. It can sometimes be hard to search out help as a beginner, especially now that there's probably as much information on the web about function components and Hooks as there are about class components and Lifecycle Methods. As a beginner its not always apparent when to use which.

  Also, for whatever reason, at some point React's dev tools became two views — Components and Profiler. To be honest, I still don't know what the Profiler view does and much preferred the old consolidated view.
    
  - I've only built a handful of small projects with Svelte, but its been very enjoyable to use. It definitely has some syntax oddities, but I've found that they're often justifiable when explained in the right way. A lot of things make sense eventually but are used in ways that I've never _quite_ seen JavaScript written before. This is out of the scope of what I wrote about in this post, but Svelte not relying on a virtual DOM is something that greatly interests me. This makes me want to explore Svlete more in the future.

  As far as the Svelte community, I'm not a fan of Discord being the official source of help. I've come across many GitHub issues through web searches, been redirected to the Discord group, then been unable to use Discord's search to find any relevant information. Asking for help in Discord is hit or miss. It really depends who else is online at the time and if they have the answer to the question you're asking. Plus, I don't always have time to wait around for an answer, and since Discord lacks threads I've definitely missed responses that have come in after I've closed the Discord app.
    
  - Vue is super interesting, and as a direct alternative to React there's a lot about it that appealed to me. At first it felt like registering props, components, methods, data, etc... in each file felt like a lot of work, but the more I worked with Vue the more I appreciated its strong guidance system. For this being my first Vue project, the compiler threw a LOT of helpful console warnings and errors that really led to an overall smooth developer experience.

  That said, I found Vue's versions can be kind of confusing. I can imagine this is how a lot of people feel not really being familiar with class vs function components in React, but I got pretty mixed up several times trying to use version 3 solutions to version 2 problems, or trying to do something in a single file component that was meant for a regular Vue instance.

  This is just a personal opinion, but I think its super weird to use double quotes for interpolation.

  ```
  // React
  <div attribute={value}>text</div>

  // Svelte
  <div attribute={value}>text</div>
  
  // Vue
  <div v-attribute="value">text</div>
  ```

  I have to say that most of my compile errors were around trying to use curly brackets when Vue wanted double quotes. Quotation marks pretty heavily signify a `string` type in my mental model at this point.

</FrameworkList>

I hope this brief look into React, Svelte, and Vue helped someone make up their mind about which of the frameworks they'd like to get started with. All three have strengths and weaknesses, things I like and things I don't. It's hard to pick one I would definitely say is "the best," and that's probably a some-what subjective answer anyways. The best way to find out for yourself is to just start building.

If any of the examples from the post need a little bit more context to make sense, check out the full mono-repo for all three versions [on GitHub](https://github.com/ryanfiller/color-contrast-table). And if I got something wrong, either in the explanation or the packages themselves, I'm definitely accepting feedback and pull requests!

Good luck building!
