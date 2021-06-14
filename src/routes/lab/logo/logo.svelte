<script>
  import X from './_images/resize-square.svg'
  
  import RML from './_images/r-middle-left.svg'
  import RTL from './_images/r-top-left.svg'
  import RTM from './_images/r-top-middle.svg'
  import RTR from './_images/r-top-right.svg'
  import RMR from './_images/r-middle-right.svg'
  import RBR from './_images/r-bottom-right.svg'

  import FBL from './_images/f-bottom-left.svg'
  import FML from './_images/F-middle-left.svg'
  import FTL from './_images/f-top-left.svg'
  import FTM from './_images/f-top-middle.svg'
  import FTR from './_images/f-top-right.svg'
</script>

<div class='responsive-logo'>
  <RML class='r-m-l' />
  <X class='s s1 v' />
  <RTL class='r-t-l' />
  <X class='s s2 h' />
  <RTM class='r-t-m' />
  <X class='s s3 h' />
  <RTR class='r-t-r' />
  <X class='s s4 v' />
  <RMR class='r-m-r' />
  <X class='s s5 v' />
  <RBR class='r-b-r' />
  
  <FBL class='f-b-l' />
  <X class='s s6 v' />
  <FML class='f-m-l' />
  <X class='s s7 v' />
  <FTL class='f-t-l' />
  <X class='s s8 h' />
  <FTM class='f-t-m' />
  <X class='s s9 h' />
  <FTR class='f-t-r' />
</div>

<style global>
  div.responsive-logo {
    margin: 0 auto;
    --s: 1rem;
    --g: var(--s);
    --g: calc(.5 * var(--s));
    width: calc(7 * var(--s));
    height: calc(4 * var(--s));;
    display: grid;
    grid-template-rows:
      var(--s)
      calc(.375 * var(--s))
      1fr
      calc(.875 * var(--s))
      calc(.875 * var(--s))
      1fr
      var(--s);
    grid-template-columns:
      var(--s) 1fr calc(.875 * var(--s)) 1fr calc(.625 * var(--s)) var(--s) var(--g) var(--s) calc(.625 * var(--s)) 1fr calc(.875 * var(--s)) 1fr calc(.5 * var(--s));
    grid-template-areas:
      "r-t-l s2   r-t-m s3   r-t-r r-t-r g     f-t-l f-t-l s8    f-t-m s9    f-t-r"
      "r-t-l .    .     .    r-t-r r-t-r g     f-t-l f-t-l .     .     .     .    "
      "s1    .    .     .    .     s4    g     s7    .     .     .     .     .    "
      "r-m-l .    .     .    r-m-r r-m-r g     f-m-l f-m-l .     .     .     .    "
      ".     .    .     .    r-m-r r-m-r g     f-m-l f-m-l .     .     .     .    "
      ".     .    .     .    .     s5    g     s6    .     .     .     .     .    "
      ".     .    .     .    .     r-b-r g     f-b-l .     .     .     .     .    ";

    overflow: hidden;
    min-width: min-content;
    min-height: min-content;
  }

  div.responsive-logo:hover {
    resize: both;
  }

  svg * {
    fill: var(--color);
  }

  .v {
    margin: -1px 0;
    width: 100%;
    height: calc(100% + 2px);
  }

  .h {
    margin: 0 -1px;
    height: 100%;
    width: calc(100% + 2px);
  }

  .r-m-l { grid-area: r-m-l; }
  .s1 { grid-area: s1; }
  .r-t-l { grid-area: r-t-l; }
  .s2 { grid-area: s2; }
  .r-t-m { grid-area: r-t-m; }
  .s3 { grid-area: s3; }
  .r-t-r { grid-area: r-t-r; }
  .s4 { grid-area: s4; }
  .r-m-r { grid-area: r-m-r; justify-self: end; }
  .s5 { grid-area: s5; }
  .r-b-r { grid-area: r-b-r; }
  .f-b-l { grid-area: f-b-l; }
  .s6 { grid-area: s6; }
  .f-m-l { grid-area: f-m-l; justify-self: end;}
  .s7 { grid-area: s7; }
  .f-t-l { grid-area: f-t-l; }
  .s8 { grid-area: s8; }
  .f-t-m { grid-area: f-t-m; }
  .s9 { grid-area: s9; }
  .f-t-r { grid-area: f-t-r; }

  
</style>