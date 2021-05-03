<style global type='text/scss'>
  @import '../../styles/functions.scss';

  .markdown {
    padding: calc(2 * var(--padding));
    @include readable();
    line-height: 1.5;

    // headings
    @mixin headingStyles() {
      position: relative;
      display: block;
      margin: 0;
      margin-bottom: 1rem;
      padding: 0;
      font-weight: bold;
    
      a {
        font-size: inherit;
        color: currentColor;
        text-decoration: none;
    
        span {
          display: none;
        }
    
        &::before {
          content: '#';
          font-size: 1em;
          opacity: 0;
          transition: var(--transitionSpeed);
          position: absolute;
          right: 100%;
          text-align: right;
        }
        
        &:hover {
          &::before {
            opacity: 1;
          }
        }
    
        // undo link styles, this is dumb...
        color: currentColor !important;
        border-bottom: none !important;
        background-image: none !important;
      }
    }
    
    h1 {
      font-size: 2.4em;
      @include headingStyles;
    }
    
    h2 {
      font-size: 1.8em;
      @include headingStyles;
    }
    
    h3 {
      font-size: 1.6em;
      @include headingStyles;
    }
    
    h4 {
      font-size: 1.4em;
      @include headingStyles;
    }
    
    h5 {
      font-size: 1.2em;
      @include headingStyles;
    }
    
    h6 {
      font-size: 1em;
      @include headingStyles;
    }

    li {
      margin-bottom: .5em;

      & > p {
        margin-bottom: 1em;
      }
    }
      
    // lists

    ol li,
    ul li {
      padding-left: 0;
    }

    li > ol,
    li > ul {
      margin-left: 2em;
      margin-bottom: 1em;
      margin-top: 1em;
    }
    
    li *:last-child,
    p *:last-child {
      margin-bottom: 0;
    }

    hr {
      margin: 5rem 0;
    }
    
    // images
    // ...and other media I guess.
    img,
    figure,
    video,
    *[data-align] {
      width: 100%;
      height: auto;
      margin: 0 0 1em 0;
      display: block;
      clear: both;

      /* TODO fix images and typography for dark mode, but probably don't do it in this file */
      /* [style*="--user-color-scheme:dark;"] & {
        filter: brightness(.8) contrast(1.2);
      } */
  
      &[data-align="center"] {
        @include small() {
            margin: 0 auto 1rem auto;
            width: 50%;
        }
      }
      
      &[data-align="right"] {
        @include small() {
            float: right;
            margin: 0 0 1rem 1rem;
            width: 50%;
        }
      }
      
      &[data-align="left"] {
        @include small() {
            float: left;
            margin: 0 1rem 1rem 0;
            width: 50%;
        }
      }
      
      &[data-align="full"] {
        @include small() {
            display: block;
            width: 100%;
            max-width: none !important; // full supercedes small
            height: auto;
            margin: 0 0 1rem 0;
        }
      }
      
      &[data-small="true"] {
        @include small() {
          max-width: 10em;
        }
      }
    
      // for when figure.image and img is a child
      img {
        display: block;
        line-height: 0;
        width: 100%;
        height: auto;
        margin: 0;
      }
    
      figcaption,
      .caption {
        text-align: center;
        font-style: italic;
        font-size: .8em;
        line-height: 1.25;
        padding: .5em 1em;
      }
    }
    
    // iframes
    .embed {
      position: relative;
      overflow: hidden;
      height: 0;
      width: 100%;
      margin-bottom: var(--padding);
    
      &[data-aspect-ratio="full"] {
        padding-top: 95vh;
      }
    
      &[data-aspect-ratio="16/9"] {
        padding-top: calc(100% / (16/9));
      }
    
      &[data-aspect-ratio="4/3"] {
        padding-top: calc(100% / (4/3));
      }
    
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
    }

    // links
    p,
    dl, ol, ul,
    blockquote {
      a  {
        color: var(--colorHighlight);
        text-decoration: none;
        border-bottom: 0;
        border-bottom: 2px currentColor dotted;
      
        @include medium() {
          @include highlight();
        }
      }
    }
    
    // blockquotes 
    // ... and also a list
    blockquote,
    dl {
      margin: var(--padding) 0;
      padding: 0 var(--padding);
      border-left: calc(.5 * var(--padding)) solid var(--colorPrimary);
      font-size: 1.125em;
      position: relative;
    
      cite {
        display: block;
        font-style: italic;
        font-size: .8em;
        margin-top: 1em;
        text-align: right;
        
        &::before {
          content: '— ';
        }
      }
    }
    
    // twitter
    .twitter-tweet {
      --twitterBlue: #1da1f2;
      --twitterGray: #ccd6dd;
      --twitterWhite: #ffffff;
      --twitterBlack: #000000;
      font-size: 15px;
      line-height: 1.3125;
    
      color: var(--twitterBlack);
      background-color: var(--twitterWhite);
      min-width: 30ch;
      max-width: 75ch;
      border: 1px solid var(--twitterGray);
      border-radius: 1em;
      padding: .75em 1em;
      margin: var(--verticalSpacing) auto;
      position: relative;

      // specificity!
      div.account,
      div.tweet,
      div.meta {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important; // twitter's font styles
        font-variation-settings: initial !important;
      }
    
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        transition: var(--transitionSpeed);
        background-color: var(--twitterGray);
        z-index: -1;
      }
    
      &:hover {
        &::after {
          opacity: .125;
        }
      }
    
      a, a:hover {
        border: none;
        background: none;
        color: currentColor;
      }
    
      a:hover {
        color: var(--colorHighlight);
      }
    
      svg {
        transition: var(--transitionSpeed);
        
        &:hover {
          transform: scale(1.25);
        }
      }
      
      .account {
        display: flex;
        align-items: stretch;
        margin-bottom: .75em;
        height: 3.33em;
        font-weight: bold;
    
        &__avatar {
          height: 3.33em;
          width: 3.33em;
          
          img {
            border-radius: 100%;
          }
        }
        
        &__text {
          font-size: 1em;
          margin: 0 .33em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          
          span {
            display: block;
          }
        }
        
        &__name {
          font-weight: bold !important;
        }
    
        .twitter-logo {
          width: 1.75em;
          height: 1.75em;
          align-self: start;
          margin-left: auto;
    
          * {
            fill: var(--twitterBlue);
          }
        }
      }
      
      .tweet {
        cursor: text;
        font-size: 1.45em;

        img {
          margin-top: .75em;
        }
      }
      
      .meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1em;
        font-weight: bold !important;
        
        &__date {
          font-size: 1em;
        }
        
        &__info {
          height: 1.25em;
          width: 1.25em;
    
          * {
            fill: currentColor;
          }
        }
      }
    }

    // definitions
    dfn {
      font-style: italic;
    }
    dl {
      margin: 0;
      margin-bottom: var(--padding);
    }
    dd {
      margin-left: 1em;
      margin-bottom: .5em;
    }

    // table

    table:not(.color-contrast-table) {
      margin-top: var(--verticalSpacing);
      margin-bottom: var(--verticalSpacing);
      border-collapse: collapse;
      width: 100%;
      border-bottom: 1rem solid var(--colorPrimary);
    
      caption {
        text-align: left;
        font-size: .8em;
        font-weight: bold;
    
        &::before {
          content: '*';
          margin-right: .25em;
          color: var(--colorPrimary);
        }
      }

      tbody {}
      
      thead th,
      th {
        background: var(--colorPrimary);
        color: var(--colorWhite);
        
        * {
          color: var(--colorWhite);
        }
      }
    
      tr {
        width: 100%;
      }
    
      th, td {
        border: 1px solid var(--colorPrimary);
        padding: .25em;
      }
    }

    pre, pre *,
    code, code *,
    kbd, kbd *,
    samp, samp * {
      font-family: var(--mono);
      font-variation-settings: "MONO" 1,  "wght" 450;
      font-size: .95em;
      overflow: auto;
    }

    pre, code {
      --codeBackgroundColor: var(--colorPrimary);
      --codeBackgroundOpacity: .25;

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    /* for inline */
    code {
      position: relative;
      padding: 0 .125em;
      color: var(--colorText);

      &::after {
        z-index: -1;
        background-color : var(--codeBackgroundColor);
        opacity: var(--codeBackgroundOpacity);
      }
    }

    /* for blocks */
    pre {
      --width: calc(100vw - (2 * var(--padding))); /* TODO this should be a utility class */
      width: var(--width);
      left: 50%;
      margin-left: calc(-1 * var(--width) / 2);
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      tab-size: 4;
      hyphens: none;
      padding: 0;
      position: relative;

      &::after {
        background-color: var(--codeBackgroundColor);
        opacity: var(--codeBackgroundOpacity);
        z-index: -2;
      }

      code {
        --tag-size: calc(2rem + (2 * var(--borderWidth)));
        display: block;
        padding: var(--tag-size) 0;
        @include readable();
        /* this matters a LOT for the line highlight */
        font-size: 1.5rem !important;
        --line-highlight-color: var(--colorBackground);
        --line-height: 1.5;
        line-height: var(--line-height); 

        &::after {
          top: var(--tag-size);
          bottom: var(--padding);
          background-color: transparent;
          background-image: var(--line-highlight);
          opacity: 1;
        }
      }

      code[data-language] {
        &::before {
          content: attr(data-language);
          background: var(--pixelBorder);
          font-size: .8em;
          padding: .125em 1em;
          font-variation-settings: "MONO" 0, "CASL" 0.5, "wght" 360, "slnt" -15, "ital" 1;
          position: absolute;
          top: var(--borderWidth);
          right: 0;
        }
      }
    }
  }
</style>

<article class='markdown'>
  <slot />
</article>