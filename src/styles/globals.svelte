<style global>
  /* ------------- */
  /* sizes & postcss media queries */
  /* ------------- */
  @import './sizes.css';

  /* ------------- */
  /* fonts */
  /* ------------- */

  @import './fonts.css';

  /* ------------- */
  /* variables */
  /* ------------- */
  :root {
    /* fonts */
    --font-display: 'Science Gothic';
    /* "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace */
    --font-sans-serif: 'IBM Plex';
    /* -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif */
    --font-mono: 'Fira Code';
    /* "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace */
  }

  /* ------------- */
  /* default styles */
  /* ------------- */

  html {
    & body {
      font-family: var(--font-sans-serif);
      font-variation-settings: 'wght' 60, 'wdth' 500;
    }
  }
</style>
