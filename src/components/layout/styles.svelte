<script>
  import { colors, themes } from '../../styles.js'
  import { capitalize } from '../../helpers'

  // create all the css vars based on a js object
  const setColors = (colors) => {
    return Object.entries(colors).map(color => {
      const [ name, value ] = color
      return `--color${capitalize(name)}: ${value};`
    }).join('\n')
  }

  const setTheme = (theme) => {
    return Object.entries(theme).map(color => {
      const [ name, value ] = color
      return `--color${capitalize(name)}: var(--color${capitalize(value)});`
    }).join('\n')
  }
</script>

<svelte:head>
  <meta name='color-scheme' content='dark light'>
  <!-- TODO need some sort of function/mixin for this... -->
  {@html `
    <style>
      :root {
        ${setColors(colors)}
        ${setTheme(themes.light)}
      }

      @media (prefers-color-scheme: dark) {
        /* prevent default from overriding user selection if no js */
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

<!-- TODO  a postCSS media query here would be sweet https://github.com/postcss/postcss-custom-media -->
<style global type='text/scss'>
  html {
    font-size: 12px;

    body {
      margin: 0;
      font-size: 1.5rem;
      line-height: 1;
      color: var(--colorText);
      background-color: var(--colorBackground);
    }
  }

  // resets and preferences
  * {
    box-sizing: border-box;

    @media not all and (prefers-reduced-motion: reduce) {
      --transitionSpeed: .2s;
      scroll-behavior: smooth;
    }

    transition: color var(--transitionSpeed);
  }

  // utility classes
  body[data-no-js] .needs-js {
		display: none;
	}
</style>

<!-- this is an intentionally blocking script that runs when js is enabled -->
{@html ` <script>document.body.removeAttribute('data-no-js')</script> `}