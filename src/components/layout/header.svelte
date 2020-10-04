<script>
  export let segment
  import { mainNav } from '../../site-config.js'
  import Nav from './nav.svelte'
  import Banner from './banner.svelte'
</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  :root {
    --headerBackground: var(--colorPrimary);
    --headerText: var(--colorLight);
  }

  .header {
    background: var(--headerBackground);
    color: var(--headerText);
    position: relative; // catch banner <picture> element

    &__content {
      padding: 1rem;
      @include container;
      position: relative;
      z-index: 2;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-weight: bold;
    
      a {
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    
      .logo {
        display: inline-block;
        color: currentColor;
        font-size: 1.5em;
      } 
    }
  }
</style>

<header
  id='site-header'
  class='header'
>
  <div class='header__content'>
    <Nav 
      segment={segment}
      label='main navigation'
      links={mainNav}
    >
      <a href='/' class='logo'>
        ryanfiller.com
      </a>
    </Nav>
  </div>
  {#if !!segment}  <!-- blank segment is homepage or _error -->
    <Banner {segment} />
  {/if}
</header>