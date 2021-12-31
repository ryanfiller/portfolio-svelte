<script>
  import { page } from '$app/stores'
  // default to context, but overridable with prop // like the error page
  export let segment = $page.path === '/' ? 'homepage' : $page.path.split('/')[1]
  export let hideBanner = false

  import { mainNav, forms } from '$site-config'
  
  import SEO from '$components/layout/seo.svelte'
  
  import Nav from '$components/layout/nav.svelte'
  import ColorSchemeToggle from '$components/layout/color-scheme-toggle/index.svelte'
  import Navicon from '$components/page/navicon.svelte'
  import Logo from '$components/page/logo.svelte'
  import ContactForm from '$components/misc/contact-form.svelte'

  import Banner from '$components/layout/banner.svelte'
  import Footer from '$components/layout/footer.svelte'

  import focusTrap from '$actions/focus-trap.js'

  const alertActive = $$slots.alert
  
  let resizeTimer
  $: isResizing = false

  const handleResizeJank = () => {
    clearTimeout(resizeTimer)
    isResizing = true
    resizeTimer = setTimeout(function() {
      isResizing = false // resizing has "stopped"
    }, 500)
  }
</script>

<style>
  #site {
    --headerLogoHeight: 1.5em;
    --naviconSize: calc(var(--padding) + var(--tapableSize));
    --headerHeight: calc(var(--padding) + max(var(--naviconSize), var(--headerLogoHeight)));
    --overlayOpacity: 0.5;
    /* mobile, smallest size first */
    --offCanvasWidth: calc(100vw - var(--naviconSize) - (2 * var(--padding)));
    --offCanvasSpeed: calc(3 * var(--transitionSpeed));

    @media (--smallWidth) {
      --offCanvasWidth: 75vw;
    }

    @media (--mediumWidth) {
      --offCanvasWidth: 50vw;
    }

    @media (--largeWidth) {
      --offCanvasWidth: 25vw;
      /* --offCanvasSpeed: calc(1.5 * var(--transitionSpeed)); */
    }
    
    /* @media (--extraWidth) {
    } */

    min-height: 100vh;
    margin-left: calc(-2 * var(--offCanvasWidth));
    display: grid;
    grid-template-rows: var(--headerHeight) 1fr auto;
    grid-template-columns: var(--offCanvasWidth) 100vw var(--offCanvasWidth);
    grid-template-areas: "header header  header"
                         ".      content ."
                         ".      footer  .";

    /* general layout */

    & #site-header {
      display: grid;
      grid-template-rows: var(--headerHeight) auto;
      grid-template-columns: auto var(--offCanvasWidth) 100vw auto;
      grid-template-areas: "bumper left header right"
                           "bumper left body   right";
      grid-row: 1 / -1;
      grid-column: 1 / -1;

      & *,
      & :global(*:not(.screenreader)) {
        position: relative;
        z-index: 500;
      }

      & :global(.logo) {
        grid-area: header;
        justify-self: start;
        align-self: center;
        margin-left: var(--padding);
      }
  
      /* this effects both the icon and the actual input */
      & :global(.navicon) {
        grid-area: header;
        justify-self: end;
        align-self: center;

        position: sticky;
        top: calc(0.5 * var(--padding));
        margin-right: calc(0.5 * var(--padding));
      }
    
      & :global(#site-overlay) {
        /* cover header body and make non-interactive */
        position: fixed;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        z-index: 100;
      }

      & #site-bumper {
        /* start the bumper at 1x width */
        grid-area: bumper;
        width: var(--offCanvasWidth);
        transition: width var(--offCanvasSpeed);
      }

      & #site-left,
      & #site-right {
        transition: var(--offCanvasSpeed);
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--padding);
      }

      & #site-left {
        grid-area: left;
      }
  
      & #site-right {
        grid-area: right;
        display: none;
      }
    }

    & main#content {
      width: 100vw;
      margin-left: var(--offCanvasWidth);
    }

    /* navicon / overlay interactions  */
    & :global {
      & #site-left:focus-within ~ #site-bumper {
        /* expand the bumper, push site to the right */
        width: calc(2 * var(--offCanvasWidth));
      }

      & #site-left:focus-within ~ #site-overlay {
        opacity: var(--overlayOpacity);
      }

      & #site-left:focus-within ~ .navicon {
        display: none;
      }

      & #navicon:checked ~ #site-overlay {
        pointer-events: initial;
        opacity: var(--overlayOpacity);
      }

      & #navicon:checked ~ #site-right,
      & #site-right:focus-within {
        display: flex;
      }
      
      & #navicon:checked ~ #site-bumper {
        /* retract the bumper, pull site to the left */
        width: 0;
      }
    }

    /* hide the off canvas stuff while the browser is resizing */
    &.resizing {
      margin-left: 0;
      transition: width 0s !important;

      & #site-bumper,
      & #site-left,
      & #site-right {
        display: none !important;
      }

      & #site-header {
        grid-template-columns: 0 0 100vw 0;
      }

      & main#content {
        width: 100vw;
        margin-left: calc(-1 * var(--offCanvasWidth));
      }
    }
  }

  /* colors and stuff */
  #site-header {
    color: var(--colorBackground);
    background-color: var(--colorPrimary);
  }

  #site-left,
  #site-right {
    color: var(--colorBackground);
    background-color: var(--colorHighlight);
  }

  /* page layout */

  :global(#content) {
    grid-area: content;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--colorBackground);

    & > :global(*) {
      width: 100%;
    }
  }

  :global(#site-footer) {
    grid-area: footer;
    width: 100%;
    height: 100%;
  }
</style>

<svelte:window on:resize={handleResizeJank}/>

<SEO {segment} {...$$props} />

<div
  tabindex={alertActive ? -1 : 0}
  id='site'
  data-segment={segment}
  class={isResizing ? 'resizing' : ''}
  >

  <header id='site-header'>

    <aside id='site-left'>
      <a href='#content'>skip to content</a>
      <a href='#navicon'>skip to site navigation</a>
      <ul>
        <li><a href='#toc'>toc</a></li>
        <li><a href='#toc'>toc</a></li>
        <li><a href='#toc'>toc</a></li>
      </ul>
      <div class='bottom'>
        at the bottom
      </div>
    </aside>

    <Logo />

    <!-- banner -->
    <!-- TODO banner needs to go outside the header -->
    <!-- <slot /> -->

    <Navicon />

    <aside
      id='site-right'
      use:focusTrap
      nav needs escape listener
    >
      <Nav
        segment={segment}
        label='main navigation'
        links={mainNav}
      />
      
      <div class='options'>
        <ColorSchemeToggle />
      </div>

      <div class='bottom'>
        <ContactForm {...forms.contact} />
      </div>
    </aside>

    <div id='site-bumper'></div>

  </header>

  <!-- <Header {segment}>
    {#if !hideBanner}
      <slot name='banner'>
        <Banner {segment} {...$$props} />
      </slot>
    {/if}
  </Header> -->

  <main
    id='content'
    tabindex='-1'
    class={segment}
  >
    <slot />
  </main>

  <!-- <aside id='sidebar'>
    <slot name='sidebar' />
  </aside> -->

  <Footer />
</div>

{#if alertActive}
  <slot name='alert' />
{/if}
