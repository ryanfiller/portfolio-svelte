<script>
  import { colors, themes } from './config.js'
  import { capitalize } from '$helpers'

  import user from '$stores/user.js'

  // create all the css vars based on a js object
  const setColors = (colors) => {
    return Object.entries(colors).map(color => {
      const [ name, value ] = color
      return `--color${capitalize(name)}: ${value};`
    }).join('\n')
  }

  const monoizeTheme = (theme) => {
    const mono = {}
    for (const color in theme) {
      if (color === 'background') {
        mono[color] = theme[color]
      } else {
        // mono[color] = theme['primary']
        mono[color] = theme['highlight']
      }
    }
    return mono
  }

  const setTheme = (theme) => {
    return Object.entries(theme).map(color => {
      const [ name, value ] = color
      return `--color${capitalize(name)}: var(--color${capitalize(value)});`
    }).join('\n')
  }

  // handle css filters for images
  const filters = {
    light: '',
    dark: 'brightness(.75)',
    mono: {
      light: 'grayscale(100%) url(#mono-color-screen-light) url(#mono-color-multiply-light)',
      dark: 'grayscale(100%) brightness(1.25) url(#mono-color-screen-dark) url(#mono-color-multiply-dark)',
    }
  }

  let colorSchemeMeta
  $: if ($user.theme === 'light') {
    colorSchemeMeta = 'light'
  } else if ($user.theme === 'dark') {
    colorSchemeMeta = 'dark'
  } else {
    colorSchemeMeta = 'light dark'
  }
</script>

<svelte:head>
  <meta name='color-scheme' content={colorSchemeMeta}>
  <!-- this css is the work of a crazy person -->
  {@html `
    <${'style'}>
      /* defaults */

      :root {
        ${setColors(colors)}
        ${setTheme(themes.light)}
      }

      /* user set preferences */

      [data-user-theme='light'] {
        :root {
          ${setTheme(themes.light)}
        }
      }

      [data-user-theme='dark'] {
        ${setTheme(themes.dark)}
      }

      [data-user-contrast='more'] {
        ${setTheme(monoizeTheme(themes.light))}
      }

      [data-user-contrast='more'][data-user-theme='dark'] {
        ${setTheme(monoizeTheme(themes.dark))}
      }

      [data-user-writing-mode='horizontal-tb'] {
        writing-mode: horizontal-tb;
      }
      [data-user-writing-mode='vertical-lr'] {
        writing-mode: vertical-lr;
      }
      [data-user-writing-mode='vertical-rl'] {
        writing-mode: vertical-rl;
      }

      /* automatic from preferences */

      @media (prefers-color-scheme: dark) {
        :root:not([data-user-theme='light']),
        :root[data-user-theme='auto'] {
          --test: hello;
          ${setTheme(themes.dark)}
        }

        :root[data-user-theme='dark'][data-user-contrast='more'],
        :root[data-user-theme='auto'][data-user-contrast='more'] {
          ${setTheme(monoizeTheme(themes.dark))}
        }
      }

      @media (prefers-contrast: more) {
        :root:not([data-user-contrast='more']),
        :root[data-user-contrast='no-preference'] {
          ${setTheme(monoizeTheme(themes.light))}
        }

        :root[data-user-contrast='no-preference'][data-user-theme='dark'] {
          ${setTheme(monoizeTheme(themes.dark))}
        }
      }

      @media (prefers-contrast: more) and (prefers-color-scheme: dark) {
        :root:not([data-user-theme='light']),
        :root[data-user-theme='auto'] {
          ${setTheme(monoizeTheme(themes.dark))}
        }
      }
    </${'style'}>
  `}
</svelte:head>

<style global>
  /* ------------- */
  /* sizes & postcss media queries */
  /* ------------- */
  @import './custom-media.css';

  /* ------------- */
  /* fonts */
  /* ------------- */

  @import './font-face.css';

  /* ------------- */
  /* variables */
  /* ------------- */

  :root {
    /* spacing */
    --padding: clamp(1rem, 2.5vw, 2rem);
    --verticalSpacing: calc(2 * var(--padding));

    /* sizing */
    --containerMaxWidth: var(--largeSize);
    --borderRadius: 1rem;
    --borderWidth: calc(var(--padding) / 8);
    --fullBleedWidth: 100vw;
    --fullBleedPadding: var(--padding);

    /* accessibility stuff */
    --tapableSize: 40px;
    --readableMax: 65rem;
    --readableColumn: minmax(auto, var(--readableMax));

    /* fonts */
    --fontDisplay: 'Science Gothic';
    /* "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace */
    --fontSansSerif: 'IBM Plex';
    /* -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif */
    --fontMono: 'Fira Code';
    /* "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace */

    /* "gradients" */
    --pixelSize: var(--borderWidth);
    --pixelStripes: transparent 0, transparent calc(var(--pixelSize) - 1px), var(--colorBlack) calc(var(--pixelSize) - 1px), var(--colorBlack) var(--pixelSize);
    --pixelGrid: repeating-linear-gradient(var(--pixelStripes)), repeating-linear-gradient(90deg, var(--pixelStripes));
    --steppedGradientColor: 0, 0, 0;
    /* stylelint-disable function-comma-newline-after */
    --steppedGradient:
      linear-gradient(
        rgb(var(--steppedGradientColor), 0) 0%, rgb(var(--steppedGradientColor), 0) 5%,
        rgb(var(--steppedGradientColor), 0.05) 5%, rgb(var(--steppedGradientColor), 0.05) 10%,
        rgb(var(--steppedGradientColor), 0.1) 10%, rgb(var(--steppedGradientColor), 0.1) 15%,
        rgb(var(--steppedGradientColor), 0.15) 15%, rgb(var(--steppedGradientColor), 0.15) 20%,
        rgb(var(--steppedGradientColor), 0.2) 20%, rgb(var(--steppedGradientColor), 0.2) 25%,
        rgb(var(--steppedGradientColor), 0.25) 25%, rgb(var(--steppedGradientColor), 0.25) 30%,
        rgb(var(--steppedGradientColor), 0.3) 30%, rgb(var(--steppedGradientColor), 0.3) 35%,
        rgb(var(--steppedGradientColor), 0.35) 35%, rgb(var(--steppedGradientColor), 0.35) 40%,
        rgb(var(--steppedGradientColor), 0.4) 40%, rgb(var(--steppedGradientColor), 0.4) 45%,
        rgb(var(--steppedGradientColor), 0.45) 45%, rgb(var(--steppedGradientColor), 0.45) 50%,
        rgb(var(--steppedGradientColor), 0.5) 50%, rgb(var(--steppedGradientColor), 0.5) 55%,
        rgb(var(--steppedGradientColor), 0.55) 55%, rgb(var(--steppedGradientColor), 0.55) 60%,
        rgb(var(--steppedGradientColor), 0.6) 60%, rgb(var(--steppedGradientColor), 0.6) 65%,
        rgb(var(--steppedGradientColor), 0.65) 65%, rgb(var(--steppedGradientColor), 0.65) 70%,
        rgb(var(--steppedGradientColor), 0.7) 70%, rgb(var(--steppedGradientColor), 0.7) 75%,
        rgb(var(--steppedGradientColor), 0.75) 75%, rgb(var(--steppedGradientColor), 0.75) 80%,
        rgb(var(--steppedGradientColor), 0.8) 80%, rgb(var(--steppedGradientColor), 0.8) 85%,
        rgb(var(--steppedGradientColor), 0.85) 85%, rgb(var(--steppedGradientColor), 0.85) 90%,
        rgb(var(--steppedGradientColor), 0.9) 90%, rgb(var(--steppedGradientColor), 0.9) 95%,
        rgb(var(--steppedGradientColor), 0.95) 95%, rgb(var(--steppedGradientColor), 0.95) 100%
      );
    /* stylelint-enable function-comma-newline-after */

    /* <image> <position> / <size> */
    --pixelBorder:
      /* top and bottom */
      no-repeat linear-gradient(currentColor, currentColor) calc(3 * var(--borderWidth)) 0 / calc(100% - calc(6 * var(--borderWidth))) var(--borderWidth),
      no-repeat linear-gradient(currentColor, currentColor) calc(3 * var(--borderWidth)) 100% / calc(100% - calc(6 * var(--borderWidth))) var(--borderWidth),
      /* left and right */
      no-repeat linear-gradient(currentColor, currentColor) 0 calc(3 * var(--borderWidth)) / var(--borderWidth) calc(100% - calc(6 * var(--borderWidth))),
      no-repeat linear-gradient(currentColor, currentColor) 100% calc(3 * var(--borderWidth)) / var(--borderWidth) calc(100% - calc(6 * var(--borderWidth))),
      /* inner corners */
      no-repeat linear-gradient(currentColor, currentColor) calc(2 * var(--borderWidth)) calc(var(--borderWidth)) / var(--borderWidth) var(--borderWidth),
      no-repeat linear-gradient(currentColor, currentColor) calc(2 * var(--borderWidth)) calc(100% - var(--borderWidth)) / var(--borderWidth) var(--borderWidth),
      no-repeat linear-gradient(currentColor, currentColor) calc(100% - (2 * var(--borderWidth))) calc(var(--borderWidth)) / var(--borderWidth) var(--borderWidth),
      no-repeat linear-gradient(currentColor, currentColor) calc(100% - (2 * var(--borderWidth))) calc(100% - var(--borderWidth)) / var(--borderWidth) var(--borderWidth),
      /* outer corners */
      no-repeat linear-gradient(currentColor, currentColor) calc(var(--borderWidth)) calc(2 * var(--borderWidth)) / var(--borderWidth) var(--borderWidth),
      no-repeat linear-gradient(currentColor, currentColor) calc(var(--borderWidth)) calc(100% - (2 * var(--borderWidth))) / var(--borderWidth) var(--borderWidth),
      no-repeat linear-gradient(currentColor, currentColor) calc(100% - var(--borderWidth)) calc(2 * var(--borderWidth)) / var(--borderWidth) var(--borderWidth),
      no-repeat linear-gradient(currentColor, currentColor) calc(100% - var(--borderWidth)) calc(100% - (2 * var(--borderWidth))) / var(--borderWidth) var(--borderWidth);
    --pixelBorderFill:
      /* top and bottom */
      no-repeat linear-gradient(currentColor, currentColor) calc(3 * var(--borderWidth)) 0 / calc(100% - calc(6 * var(--borderWidth))) 100%,
      /* left and right */
      no-repeat linear-gradient(currentColor, currentColor) 0 calc(3 * var(--borderWidth)) / 100% calc(100% - calc(6 * var(--borderWidth))),
      /* inner corners */
      no-repeat linear-gradient(currentColor, currentColor) calc(2 * var(--borderWidth)) calc(var(--borderWidth)) / calc(100% - (4 * var(--borderWidth))) calc(100% - (2 * var(--borderWidth))),
      /* outer corners */
      no-repeat linear-gradient(currentColor, currentColor) calc(var(--borderWidth)) calc(2 * var(--borderWidth)) / calc(100% - (2 * var(--borderWidth))) calc(100% - (4 * var(--borderWidth)));
    --pixelBorderRadius: calc(6.25 * var(--borderWidth));

    /* "icons" */

    /* <image> <position> / <size> */
    --pixelX:
      /* left top top */
      no-repeat linear-gradient(currentColor, currentColor) calc(0 * var(--pixelSize)) calc(0 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* left top middle */
      no-repeat linear-gradient(currentColor, currentColor) calc(1 * var(--pixelSize)) calc(1 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* right top top */
      no-repeat linear-gradient(currentColor, currentColor) calc(4 * var(--pixelSize)) calc(0 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* right top middle */
      no-repeat linear-gradient(currentColor, currentColor) calc(3 * var(--pixelSize)) calc(1 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* middle middle */
      no-repeat linear-gradient(currentColor, currentColor) calc(2 * var(--pixelSize)) calc(2 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* left bottom bottom */
      no-repeat linear-gradient(currentColor, currentColor) calc(0 * var(--pixelSize)) calc(4 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* left bottom middle */
      no-repeat linear-gradient(currentColor, currentColor) calc(1 * var(--pixelSize)) calc(3 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* right bottom bottom */
      no-repeat linear-gradient(currentColor, currentColor) calc(4 * var(--pixelSize)) calc(4 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* right bottom middle */
      no-repeat linear-gradient(currentColor, currentColor) calc(3 * var(--pixelSize)) calc(3 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize)
    ;

    --pixelXHover:
      /* left top top -> right top top */
      no-repeat linear-gradient(currentColor, currentColor) calc(4 * var(--pixelSize)) calc(0 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* left top middle -> left bottom middle */
      no-repeat linear-gradient(currentColor, currentColor) calc(1 * var(--pixelSize)) calc(3 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* right top top -> right bottom bottom */
      no-repeat linear-gradient(currentColor, currentColor) calc(4 * var(--pixelSize)) calc(4 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* right top middle -> left top middle */
      no-repeat linear-gradient(currentColor, currentColor) calc(1 * var(--pixelSize)) calc(1 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* middle middle -> stay */
      no-repeat linear-gradient(currentColor, currentColor) calc(2 * var(--pixelSize)) calc(2 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* left bottom bottom -> left top top*/
      no-repeat linear-gradient(currentColor, currentColor) calc(0 * var(--pixelSize)) calc(0 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* left bottom middle -> right bottom middle */
      no-repeat linear-gradient(currentColor, currentColor) calc(3 * var(--pixelSize)) calc(3 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* right bottom bottom -> left bottom bottom */
      no-repeat linear-gradient(currentColor, currentColor) calc(0 * var(--pixelSize)) calc(4 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize),
      /* right bottom middle -> right top middle */
      no-repeat linear-gradient(currentColor, currentColor) calc(3 * var(--pixelSize)) calc(1 * var(--pixelSize)) / var(--pixelSize) var(--pixelSize)
    ;
  }

  /* ------------- */
  /* default styles */
  /* ------------- */

  html {
    font-size: 12px;

    & body {
      margin: 0;
      font-size: 1.5rem;
      line-height: 1;
      color: var(--colorText);
      background-color: var(--colorBackground);
      font-family: var(--fontSansSerif);
      font-variation-settings: 'wght' 60, 'wdth' 500;
    }
  }

  /* ------------- */
  /* resets and preferences */
  /* ------------- */

  * {
    box-sizing: border-box;

    @media not all and (prefers-reduced-motion: reduce) {
      --transitionSpeed: 0.1s;

      scroll-behavior: smooth;
    }

    transition: color var(--transitionSpeed);
  }

  /* ------------- */
  /* utility classes */
  /* ------------- */

  body[data-no-js] .needs-js {
    display: none !important;
  }

  [aria-hidden='true'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .x {
    position: relative;
    height: 1em;
    width: 1em;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before,
    &::after {
      content: '';
      display: block;
      background-color: currentColor;
      height: 0.25em;
      width: 1em;
      position: absolute;
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  .clearfix {
    clear: both !important;
  }

  /* ------------- */
  /* animation classes */
  /* ------------- */

  .flip-arrow {
    --arrow-size: 0.5em;

    &::before {
      content: '';
      display: inline-block;
      height: 0;
      width: 0;
      border-top: 0.33em solid transparent;
      border-bottom: 0.33em solid transparent;
      border-left: var(--arrow-size) solid currentColor;
      margin-right: calc(0.5 * var(--arrow-size));
      transition: transform calc(2 * var(--transitionSpeed));
      transition-timing-function: steps(5, end);
      transform: rotateX(-0.25turn);
      transform-style: preserve-3d;
    }

    &:hover::before,
    &:focus::before {
      transform: rotateX(0.5turn);
      transition: transform calc(4 * var(--transitionSpeed));
    }
  }

  /* ------------- */
  /* layouts */
  /* ------------- */

  .columns {
    display: grid;
    padding: var(--padding);
    grid-template-columns: auto var(--readableColumn) auto;
    grid-template-rows: auto;
    grid-template-areas: "left center right";

    & > * {
      grid-area: center;
      grid-row: auto;
    }
  }

  /* ------------- */
  /* form elements */
  /* ------------- */

  fieldset {
    & legend {
      color: var(--colorBackground);
      background-color: var(--colorText);
      padding: 0 0.5em;
      font-weight: bold;
    }

    margin: 1rem 0 0 0;
    width: 100%;
    padding: 1rem var(--padding) 1rem var(--padding);
    border: var(--borderWidth) solid var(--colorText);
  }

  textarea {
    width: 100%;
    resize: vertical;
  }

  .button,
  button {
    text-decoration: none;
    display: block;
    cursor: pointer;
    border: none;
    background: var(--colorHighlight);
    color: var(--colorWhite);
    transition: var(--transitionSpeed);
    font-size: 1em;
    padding: 1rem;

    &:hover,
    &:focus {
      background: var(--colorActive);
    }

    &:disabled {
      background: var(--colorDisabled);
      cursor: not-allowed;
    }
  }

  /* ------------- */
  /* typography */
  /* ------------- */

  *, /* default font */
  .font-sans-serif {
    font-family: var(--fontSansSerif);
    font-variation-settings: "wght" 400, "wdth" 92.5;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .font-display {
    font-family: var(--fontDisplay);
    font-variation-settings: "wght" 500, "wdth" 125, "YOPQ" 122;
  }

  pre,
  pre *,
  code,
  code *,
  kbd,
  kbd *,
  samp,
  samp *,
  .font-mono {
    font-family: var(--fontMono);
    font-variation-settings: "wght" 400;
  }

  b,
  strong {
    font-weight: bold;
  }

  i,
  em {
    font-style: italic;
  }

  /* ------------- */
  /* holdover gatsby styles to slowly delete */
  /* ------------- */
  progress {
    vertical-align: baseline;
  }

  mark {
    background-color: #ff0;
    color: #000;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub { bottom: -0.25em; }

  sup { top: -0.5em; }

  address {
    margin: 0;
    margin-bottom: 1.45rem;
    padding: 0;
  }

  dt {
    font-weight: bold;
  }

  acronym,
  abbr,
  abbr[title] {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }

  abbr[title] {
    text-decoration: none;
  }
</style>
