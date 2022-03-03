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
  function shouldFocusTrap(element) {
    // TODO - for some reason this isn't recalculating when the window changes, I dunno
    const extraSize = getCustomProperty('extraSize')
    const extraBreak = window.matchMedia(`(min-width: ${extraSize})`);
    let trapFocus = !extraBreak.matches
    extraBreak.addEventListener('change', () => {
      // intentionally invert this logic, DON'T trap when it DOES match
      trapFocus = !extraBreak.matches
    })

    return trapFocus ? focusTrap(element) : null
  }

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
  #site {
    /* TODO - change this to new content aware width value one day? */
    --contentWidth: 100vw;
    --headerLogoHeight: 1.5em;
    --naviconSize: calc(var(--padding) + var(--tapableSize));
    --headerHeight: calc(var(--padding) + max(var(--naviconSize), var(--headerLogoHeight)));
    --overlayOpacity: 0.5;
    /* mobile, smallest size first */
    --offCanvasWidth: calc(var(--contentWidth) - var(--naviconSize) - (2 * var(--padding)));
    --offCanvasSpeed: calc(2 * var(--transitionSpeed));

    @media (--mouse) {
      --naviconSize: calc(var(--padding) + 1em);
    }

    @media (--smallWidth) {
      --offCanvasWidth: 75vw;
    }

    @media (--mediumWidth) {
      --offCanvasWidth: 50vw;
    }

    @media (--largeWidth) {
      --offCanvasWidth: 25vw;
    }

    @media (--extraWidth) {
      --offCanvasWidth: min(15vw, 25rem);
    }

    min-height: 100vh;
    margin-left: calc(-1 * var(--offCanvasWidth));
    margin-right: auto;
    display: grid;
    grid-template-rows: var(--headerHeight) 1fr auto;
    grid-template-columns: auto var(--contentWidth) 1fr;
    /* header doesn't actually use these areas, this is just for reference */
    grid-template-areas: "header header  ."
                         ".      content ."
                         ".      footer  .";

    /* general layout */

    & #site-header {
      display: grid;
      grid-template-rows: var(--headerHeight);
      grid-template-columns: auto var(--contentWidth);
      grid-template-areas: "bumper header";
      grid-area: header;
      grid-row: 1 / -1;
      grid-column: 1 / -2;
      align-items: center;
      position: relative;

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
        z-index: 350;
        margin-right: calc(0.5 * var(--padding));
      }
    
      & :global(#site-overlay) {
        /* cover header body and make non-interactive */
        pointer-events: none;
        opacity: 0;
        z-index: 250;
        grid-row: 1 / 3;
        grid-column: 2 / 3;
        height: 100%;
        width: 100%;
      }

      & #site-bumper {
        /* start the bumper at 1x width */
        grid-area: bumper;
        width: var(--offCanvasWidth);
        transition: width var(--offCanvasSpeed);
      }

      & #site-left,
      & #site-right {
        align-self: start;
        width: var(--offCanvasWidth);
        transition: var(--offCanvasSpeed);
        position: absolute;
        z-index: 100;
        top: 0;
        bottom: -100%;
        height: 100%;
        padding: var(--padding);
        display: flex;
        flex-direction: column;
        gap: var(--padding);
      }

      & #site-left {
        /* this needs to slide relative to the right side */
        right: var(--contentWidth);
      }
  
      & #site-right {
        right: calc(-1 * var(--offCanvasWidth));
        padding: var(--padding);
        
        /* & :global(.nav[aria-label="main navigation"]) {
          grid-area: nav;
        }

        & #action-area {
          grid-area: action;
          display: flex;
          align-items: center;
        }

        & #site-options {
          grid-area: options;
        } */

        @media (--navWidth) {
          /* --siteOptionsHeight: var(--naviconSize); */
          /* --actionAreaHeight: calc(100vh - (3 * var(--padding)) - var(--siteOptionsHeight)); */

          /* makes sure things don't animate weird when this sliding around */
          transition: 0s;

          /* nav starts in the tray, is pulled out on big screens */
          & :global(.nav[aria-label="main navigation"]) {
            display: block !important;
            visibility: visible !important;
            position: absolute;
            right: calc(100% + var(--padding) + var(--naviconSize));
            top: calc(0.5 * var(--headerHeight));
            transform: translateY(-50%);
            height: min-content;
            width: 50vw; /* arbitrary, just wide */
          }

          /* & #action-area,
          & #site-options {
            position: sticky;
          }
          
          & #action-area {
            top: var(--padding);
            height: var(--actionAreaHeight);
          }

          & #site-options {
            top: calc(var(--actionAreaHeight) + (2 * var(--padding)));
            height: var(--siteOptionsHeight);
          } */
        }
      }
    }

    & main#content,
    & :global(#site-footer) {
      z-index: 200;
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

      & #navicon:not(:checked) ~ #site-right {
        & > * {
          display: none;
          /* visibility: hidden; */
        }
      }

      & #navicon:checked {
        & ~ #site-bumper {
          /* retract the bumper, pull site to the left */
          width: 0;
        }

        & ~ #site-right {
          & > * {
            visibility: visible !important;
          }
        }
      }

      & #site-left:focus-within ~ #site-overlay,
      & #navicon:checked ~ #site-overlay {
        pointer-events: initial;
        opacity: var(--overlayOpacity);
      }
    }

    @media (--extraWidth) {
      @supports (grid-template-columns: subgrid) {
        margin-left: 0;
        width: 100%;
        /* height: 100vh; */
        grid-template-areas: "offcanvas header content sidebar"
                             "offcanvas footer content sidebar";
        grid-template-columns: auto var(--offCanvasWidth) 1fr var(--offCanvasWidth);

        & #site-header {
          grid-row: 1 / -1;
          grid-column: 1 / -1;
          /* grid-template-rows: 1fr 1fr; */
          grid-template-rows: var(--headerHeight) 1fr;
          grid-template-columns: subgrid;
          grid-template-areas: "offcanvas header content sidebar"
                               "offcanvas footer content sidebar";
          position: sticky;
          top: 0;
          
          & :global(.logo) {
            grid-area: header;
            /* align-self: start; */
          }

          & :global(#navicon),
          & :global(.navicon),
          & :global(#site-overlay) {
            display: none;
          }

          & #site-left,
          & #site-right {
            position: unset;
            display: block;
            height: 100vh;
          }

          & #site-left {
            grid-area: offcanvas;
            margin-left: calc(-1 * var(--offCanvasWidth));

            &:focus-within {
              margin-left: 0;
            }
          }

          & #site-right {
            grid-area: sidebar;
            max-width: unset;
            position: unset;
            display: revert;

            display: grid;
            padding: 0;
            gap: 0;
            grid-template-columns: auto var(--offCanvasWidth) 1fr var(--offCanvasWidth);
            align-items: start;
            background: lime;
            grid-column-start: 2;
            grid-column-end: 5;
            width: 100%;

            position: sticky;
            top: 0;

            & #action-area,
            & #site-options {
              display: block !important;
              grid-row-start: 1;
              grid-column-start: 4;
              background: orange;
            }

            & :global(.nav[aria-label="main navigation"]) {
              all: revert;
              align-self: start;
              background: red;
            }
          }
        }

        & main#content,
        & :global(#site-footer) {
          width: auto;
          height: 100%;
        }
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
  }

  /* colors and stuff */
  #site {
    background-color: var(--colorPrimary);
  }

  #site-header {
    color: var(--colorBackground);
    background-color: var(--colorPrimary);
  }

  /* #site-left,
  #site-right {
    color: var(--colorBackground);
    background-color: var(--colorHighlight);
  } */
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
      use:shouldFocusTrap
    >
      <Nav
        segment={segment}
        label='main navigation'
        links={mainNav}
      />

      <div id='action-area'>
        {#if $layout.navAction === 'contact'}
          <ContactForm {...forms.contact} />
        {:else}
          TODO
        {/if}
      </div>

      <div id='site-options'>
        <ColorSchemeToggle />
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
