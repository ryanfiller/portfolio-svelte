<script>
  export let segment = ''
  import { mainNav } from '../../config.js'
  import Nav from './nav.svelte'
  import ColorSchemeToggle from './color-scheme-toggle.svelte'
</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  .header {
    color: var(--colorWhite);
    background: var(--colorPrimary);
    font-weight: bold;

    display: grid;
    align-items: center;
    grid-template-columns: auto minmax(var(--padding), 1fr) auto auto;
    grid-template-rows: auto 1fr;
    grid-template-areas: "logo    gap     nav    options"
                         "content content content content";

    & > * { // put things on top of the banner
      position: relative;
      z-index: 2;
    }

    .logo,
    nav,
    .options {
      margin: 1rem var(--padding);
    }
  
    a {
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  
    .logo {
      grid-area: logo;
      display: inline-block;
      color: currentColor;
      font-size: 1.5em;
    }

    nav {
      grid-area: nav;
    }

    .options {
      grid-area: options;
      margin-left: 0;
      display: flex;
      align-items: center;
    }
  }
</style>

<header
  id='site-header'
  class='header'
>
  <a href='/' class='logo'>
    ryanfiller.com
  </a>

  <Nav
    segment={segment}
    label='main navigation'
    links={mainNav}
  />

  <div class='options'>
    <ColorSchemeToggle />
  </div>

  <slot />
</header>
