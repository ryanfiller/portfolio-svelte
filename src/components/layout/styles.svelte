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

  <!-- preload fonts for performance reasons -->
  <link
    rel='preload'
    as='font'
    href={'/fonts/LabDJR-VF.woff'}
    type='font/woff'
  />
  <link
    rel='preload'
    as='font'
    href={'/fonts/Barlow.woff2'}
    type='font/woff2'
  />
  <link
    rel='preload'
    as='font'
    href={'/fonts/Recursive.woff2'}
    type='font/woff2'
  />
</svelte:head>

<style global type='text/scss'>

  // -------------
  // fonts
  // -------------

  @font-face {
    font-family: 'LabDJR';
    src: url('/fonts/LabDJR-VF.woff');
    // unicode-range: U+0000-00FF;  
    // font-display: fallback;
  }

  @font-face {
    font-family: 'Barlow';
    src: url('/fonts/Barlow.woff2');
    // unicode-range: U+0000-00FF;
    // font-display: fallback;
  }

  @font-face {
    font-family: 'Recursive';
    src: url('/fonts/Recursive.woff2');
    // unicode-range: U+0000-00FF;
    // font-display: fallback;
  }

  // -------------
  // variables
  // -------------

  :root {
    // sizing
    --containerMaxWidth: $largeBreak;

    // spacing
    --padding: clamp(1rem, 2.5vw, 2rem);
    --verticalSpacing: calc(2 * var(--padding));

    // accessibility stuff
    --tapableSize: 40px;
    --readableMax: 65rem;

    // fonts
    --sansSerif: 'Barlow';
    // -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif
    --mono: 'Recursive';
    // "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace
  }

  // -------------
  // default styles
  // -------------

  html {
    font-size: 12px;

    body {
      margin: 0;
      font-size: 1.5rem;
      line-height: 1;
      color: var(--colorText);
      background-color: var(--colorBackground);
      font-family: var(--sansSerif);
      font-variation-settings: 'wght' 60, 'wdth' 500;
    }
  }

  // -------------
  // resets and preferences
  // -------------

  * {
    box-sizing: border-box;

    @media not all and (prefers-reduced-motion: reduce) {
      --transitionSpeed: .2s;
      scroll-behavior: smooth;
    }

    transition: color var(--transitionSpeed);
  }

  // -------------
  // utility classes
  // -------------

  body[data-no-js] .needs-js {
		display: none;
	}
</style>

<!-- this is an intentionally blocking script that runs when js is enabled -->
{@html ` <script>document.body.removeAttribute('data-no-js')</script> `}
