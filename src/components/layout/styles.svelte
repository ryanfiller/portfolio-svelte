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

  <link rel='stylesheet' href='/slowly-delete-these-styles.css'>
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
    --borderWidth: calc(var(--padding) / 8);

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
    --display: 'LabDJR';
    // "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace

    // gradients
    --pixelSize: .25rem;
    --pixelStripes: transparent 0, transparent calc(var(--pixelSize) - 1px), var(--colorBlack) calc(var(--pixelSize) - 1px), var(--colorBlack) var(--pixelSize);
    --pixelGrid: repeating-linear-gradient(var(--pixelStripes)), repeating-linear-gradient(90deg, var(--pixelStripes));

    --steppedGradientColor: 0, 0, 0;
    --steppedGradient: linear-gradient(
			rgb(var(--steppedGradientColor), 0) 0%, rgb(var(--steppedGradientColor), 0) 5%, 
			rgb(var(--steppedGradientColor), .05) 5%, rgb(var(--steppedGradientColor), .05) 10%, 
			rgb(var(--steppedGradientColor), .10) 10%, rgb(var(--steppedGradientColor), .10) 15%, 
			rgb(var(--steppedGradientColor), .15) 15%, rgb(var(--steppedGradientColor), .15) 20%, 
			rgb(var(--steppedGradientColor), .20) 20%, rgb(var(--steppedGradientColor), .20) 25%, 
			rgb(var(--steppedGradientColor), .25) 25%, rgb(var(--steppedGradientColor), .25) 30%, 
			rgb(var(--steppedGradientColor), .30) 30%, rgb(var(--steppedGradientColor), .30) 35%, 
			rgb(var(--steppedGradientColor), .35) 35%, rgb(var(--steppedGradientColor), .35) 40%, 
			rgb(var(--steppedGradientColor), .40) 40%, rgb(var(--steppedGradientColor), .40) 45%, 
			rgb(var(--steppedGradientColor), .45) 45%, rgb(var(--steppedGradientColor), .45) 50%, 
			rgb(var(--steppedGradientColor), .50) 50%, rgb(var(--steppedGradientColor), .50) 55%, 
			rgb(var(--steppedGradientColor), .55) 55%, rgb(var(--steppedGradientColor), .55) 60%, 
			rgb(var(--steppedGradientColor), .60) 60%, rgb(var(--steppedGradientColor), .60) 65%, 
			rgb(var(--steppedGradientColor), .65) 65%, rgb(var(--steppedGradientColor), .65) 70%, 
			rgb(var(--steppedGradientColor), .70) 70%, rgb(var(--steppedGradientColor), .70) 75%, 
			rgb(var(--steppedGradientColor), .75) 75%, rgb(var(--steppedGradientColor), .75) 80%, 
			rgb(var(--steppedGradientColor), .80) 80%, rgb(var(--steppedGradientColor), .80) 85%, 
			rgb(var(--steppedGradientColor), .85) 85%, rgb(var(--steppedGradientColor), .85) 90%, 
			rgb(var(--steppedGradientColor), .90) 90%, rgb(var(--steppedGradientColor), .90) 95%, 
			rgb(var(--steppedGradientColor), .95) 95%, rgb(var(--steppedGradientColor), .95) 100%
		);

    --pixelBorderColor: currentColor;
    // --pixelBorderWidth: calc(2 * var(--borderWidth)); 
    --pixelBorderWidth: var(--borderWidth);
    --pixelBorder: 
      /* <image> <position> / <size> */
      /* top and bottom */
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(3 * var(--pixelBorderWidth)) 0 / calc(100% - calc(6 * var(--pixelBorderWidth))) var(--pixelBorderWidth),
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(3 * var(--pixelBorderWidth)) 100% / calc(100% - calc(6 * var(--pixelBorderWidth))) var(--pixelBorderWidth),
      /* left and right */
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) 0 calc(3 * var(--pixelBorderWidth)) / var(--pixelBorderWidth) calc(100% - calc(6 * var(--pixelBorderWidth))),
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) 100% calc(3 * var(--pixelBorderWidth)) / var(--pixelBorderWidth) calc(100% - calc(6 * var(--pixelBorderWidth))),
      /* inner corners */
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(2 * var(--pixelBorderWidth)) calc(var(--pixelBorderWidth)) / var(--pixelBorderWidth) var(--pixelBorderWidth),
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(2 * var(--pixelBorderWidth)) calc(100% - var(--pixelBorderWidth)) / var(--pixelBorderWidth) var(--pixelBorderWidth),
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(100% - (2 * var(--pixelBorderWidth))) calc(var(--pixelBorderWidth)) / var(--pixelBorderWidth) var(--pixelBorderWidth),
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(100% - (2 * var(--pixelBorderWidth))) calc(100% - var(--pixelBorderWidth)) / var(--pixelBorderWidth) var(--pixelBorderWidth),
      /* outer corners */
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(var(--pixelBorderWidth)) calc(2 * var(--pixelBorderWidth)) / var(--pixelBorderWidth) var(--pixelBorderWidth),
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(var(--pixelBorderWidth)) calc(100% - (2 * var(--pixelBorderWidth))) / var(--pixelBorderWidth) var(--pixelBorderWidth),
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(100% - var(--pixelBorderWidth)) calc(2 * var(--pixelBorderWidth)) / var(--pixelBorderWidth) var(--pixelBorderWidth),
      no-repeat linear-gradient(var(--pixelBorderColor), var(--pixelBorderColor)) calc(100% - var(--pixelBorderWidth)) calc(100% - (2 * var(--pixelBorderWidth))) / var(--pixelBorderWidth) var(--pixelBorderWidth)
    ;
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

  // -------------
  // layouts
  // -------------

  .columns {
    display: grid;
    padding: var(--padding);
    grid-template-columns: auto minmax(auto, var(--readableMax)) auto;
    grid-template-rows: auto;
    grid-template-areas: "left center right";

    & > * {
      grid-area: center;
      grid-row: auto;
    }
  }

</style>
