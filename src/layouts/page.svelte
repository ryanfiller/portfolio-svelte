<script>
  import { page } from '$app/stores'
  import layout from '$stores/layout.js'

  // default to context, but overridable with prop // like the error page
  export let segment = $page.path === '/' ? 'homepage' : $page.path.split('/')[1]
  export let toc

  import { mainNav, forms } from '$site-config'
  
  import SEO from '$components/layout/seo.svelte'
  
  import Navicon from '$components/page/navicon.svelte'
  import Logo from '$components/page/logo.svelte'
  import PageLinks from '$components/page/page-links.svelte'

  import Nav from '$components/layout/nav.svelte'
  import ColorSchemeToggle from '$components/layout/color-scheme-toggle/index.svelte'
  import ContactForm from '$components/misc/contact-form.svelte'

  import Banner from '$components/layout/banner.svelte'
  import Footer from '$components/layout/footer.svelte'

  import focusTrap from '$actions/focus-trap.js'

  const alertActive = $$slots.alert
  
  let resizeTimer
  $: isResizing = false

  const handleResizeJank = () => {
    // safari will fire this on vertical scroll
    clearTimeout(resizeTimer)
    isResizing = true

    resizeTimer = setTimeout(function() {
      isResizing = false // resizing has "stopped"
    }, 500)
  }
</script>

<style>
  :global(body) {
    overflow-x: hidden;
  }

  #site {
    --contentWidth: 100vw;
    --headerLogoHeight: 1.5em;
    --naviconSize: calc(var(--padding) + var(--tapableSize));
    --headerHeight: calc(var(--padding) + max(var(--naviconSize), var(--headerLogoHeight)));
    --overlayOpacity: 0.5;
    /* mobile, smallest size first */
    --offCanvasWidth: calc(var(--contentWidth) - var(--naviconSize) - (2 * var(--padding)));
    --offCanvasSpeed: calc(2 * var(--transitionSpeed));

    @media (--smallWidth) {
      --offCanvasWidth: 75vw;
    }

    @media (--mediumWidth) {
      --offCanvasWidth: 50vw;
    }

    @media (--largeWidth) {
      --offCanvasWidth: 25vw;
    }
    
    /* @media (--extraWidth) {
    } */

    min-height: 100vh;
    margin-left: calc(-2 * var(--offCanvasWidth));
    display: grid;
    grid-template-rows: var(--headerHeight) 1fr auto;
    grid-template-columns: auto var(--contentWidth) var(--offCanvasWidth);
    grid-template-areas: "header header  header"
                         ".      content ."
                         ".      footer  .";

    /* general layout */

    & #site-header {
      display: grid;
      grid-template-rows: var(--headerHeight) auto;
      grid-template-columns: auto var(--offCanvasWidth) var(--contentWidth) var(--offCanvasWidth);
      grid-template-areas: "bumper left header right"
                           "bumper left body   right";
      grid-row: 1 / -1;
      grid-column: 1 / -1;
      align-items: center;

      & *,
      & :global(*:not(.screenreader)) {
        position: relative;
        z-index: 100;
      }

      & :global(.logo) {
        grid-area: header;
        justify-self: start;
        margin-left: var(--padding);
      }
  
      /* this effects both the icon and the actual input */
      & :global(.navicon) {
        grid-area: header;
        justify-self: end;
        /* position: sticky; */
        z-index: 150;
        /* top: calc(0.5 * var(--padding)); */
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
        z-index: 150;
        height: 100vh;
        padding: var(--padding);
      }

      & #site-left {
        grid-area: left;
        grid-template-rows: 1fr 1fr;
        grid-template-areas: "skip" "toc";
      }
  
      & #site-right {
        /* grid-area: right;
        grid-template-rows: var(--naviconSize) 1fr 1fr;
        padding-top: calc(0.5 * var(--padding));
        grid-template-areas: "options" "nav" "action"; */
        visibility: hidden;
        
        & > :global(*) {
          grid-area: options;
          justify-self: end;

          & :global(svg) {
            height: calc(0.5 * var(--naviconSize));
            width: calc(0.5 * var(--naviconSize));
          }
        }

        & > :global(nav) {
          grid-area: nav;
          justify-self: center;
        }

        & > :global(#contact) {
          grid-area: action;
        }
      }
    }

    & main#content {
      width: var(--contentWidth);
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

    & :global(#site-footer) {
      grid-area: footer;
      width: 100%;
      height: 100%;
    }

    /* navicon / overlay interactions  */
    & :global {
      & #site-left:focus-within ~ #site-bumper {
        /* expand the bumper, push site to the right */
        width: calc(2 * var(--offCanvasWidth));
      }

      & #navicon:checked ~ #site-bumper {
        /* retract the bumper, pull site to the left */
        width: 0;
      }

      & #navicon:checked ~ #site-right {
        visibility: visible;
      }

      & #site-left:focus-within ~ #site-overlay,
      & #site-right:focus-within ~ #site-overlay,
      & #navicon:checked ~ #site-overlay {
        pointer-events: initial;
        opacity: var(--overlayOpacity);
      }
    }

    /* hide the off canvas stuff while the browser is resizing */
    &.resizing {
      transition: width 0s !important;
      
      & #site-bumper,
      & #site-left,
      & #site-right {
        transition: width 0s !important;
      }
    }
    
    @media (--largeWidth) {
      & #site-right :global(.nav) {
        background: pink !important;
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
      <PageLinks links={[ {content: 'skip to content', hash: '#content'} ]} />
      {#if toc}
        <PageLinks links={toc} />
      {/if}
    </aside>

    <Logo />

    <!-- banner -->
    <!-- TODO banner needs to go outside the header -->
    <!-- <slot /> -->

    <Navicon />

    <aside
      id='site-right'
      use:focusTrap
    >
      <ColorSchemeToggle />

      <Nav
        segment={segment}
        label='main navigation'
        links={mainNav}
      />

      {#if $layout.navAction === 'contact'}
        <ContactForm {...forms.contact} />
      {:else}
        TODO
      {/if}
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
