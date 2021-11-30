<script>
  import { page } from '$app/stores'
  // default to context, but overridable with prop // like the error page
  export let segment = $page.path === '/' ? 'homepage' : $page.path.split('/')[1]
  export let hideBanner = false

  import SEO from '$components/layout/seo.svelte'
  import Header from '$components/layout/header.svelte'
  import Banner from '$components/layout/banner.svelte'
  import Footer from '$components/layout/footer.svelte'

  const alertActive = $$slots.alert
  
  let resizeTimer
  $: isResizing = false
  const handleResizeJank = () => {
    clearTimeout(resizeTimer)
    isResizing = true
    resizeTimer = setTimeout(function() {
      // resizing has "stopped"
      isResizing = false
    }, 500)
  }
</script>

<style>
  :global(body) {
    /* overflow MUST go here for position sticky elements to work within #site */
    overflow-x: hidden;
  }

  #site {
    --safeAreaBecauseScrollBarsAreFrustrationg: 95vw;
    --naviconSize: var(--tapableSize);
    /* mobile, smallest size first */
    --offCanvasWidth: calc(var(--safeAreaBecauseScrollBarsAreFrustrationg) - var(--naviconSize) - (2 * var(--padding)));
    --offCanvasSpeed: calc(2 * var(--transitionSpeed));
    --headerLogoHeight: 60px;
    --headerHeight: calc(var(--padding) + var(--headerLogoHeight));

    min-height: 100vh;
    margin-left: calc(-2 * var(--offCanvasWidth));
    display: grid;
    grid-template-rows: var(--headerHeight) 1fr auto;
    grid-template-columns: auto 100vw var(--offCanvasWidth);
    grid-template-areas: "header header  header"
                         ".      content ."
                         ".      footer  .";

    @media (--touch) {
      /* this break position sticky but it makes touch devices freak out abour horizontal scroll */
      overflow-x: hidden !important;
    }

    /* hide the off canvas stuff while the browser is resizing */
    &.resizing {
      margin-left: 0;
      transition: width 0s !important;

      & .bumper,
      & .left,
      & .right {
        display: none !important;
      }

      & header {
        grid-template-columns: 0 0 100vw 0;
      }
    }

    & header {
      background-color: var(--colorPrimary);
      display: grid;
      grid-template-rows: var(--headerHeight) auto;
      grid-template-columns: auto var(--offCanvasWidth) 100vw var(--offCanvasWidth);
      grid-template-areas: "bumper left header right"
                           "bumper left body   right";
      grid-row: 1 / -1;
      grid-column: 1 / -1;

      /* todo put the header stuff here */
      & .temp-logo {
        grid-area: header;
        justify-self: start;
        align-self: center;
        height: var(--headerLogoHeight);
        display: block;
        background: orange;
        position: relative;
        z-index: 100;
      }
  
      & #navicon {
        height: var(--naviconSize);
        width: var(--naviconSize);
        grid-area: header;
        justify-self: end;
        align-self: center;
        margin-right: var(--padding);
        z-index: 300;

        position: sticky;
        top: var(--padding);
      }
    
      & label.overlay {
        /* cover header body */
        grid-row: 1 / -1;
        grid-column: 3 / 4;
        background: black;
        pointer-events: none;
        opacity: 0;
        z-index: 200;
      }
  
      & #navicon:checked ~ label.overlay {
        pointer-events: initial;
        opacity: .25;
      }

      & .bumper {
        /* start the bumper at 1x width */
        grid-area: bumper;
        width: var(--offCanvasWidth);
        transition: var(--offCanvasSpeed);
      }

      & .left,
      & .right {
        transition: var(--offCanvasSpeed);
        position: sticky;
        top: 0;
        height: 100vh;        
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--padding);

        @media (--touch) {
          /* styles for when position sticky is broken */
          height: 100%;
          display: block;
        }

        background-color: var(--colorBlueDark);
        color: var(--colorBackground);
        & a { color: var(--colorBackground); }
      }

      & .left {
        grid-area: left;
      }
  
      & .right {
        grid-area: right;
      }
  
      & .left:focus-within ~ :global(.bumper) {
        /* expand the bumper, push site to the right */
        width: calc(2 * var(--offCanvasWidth));
      }
  
      & .left:focus-within ~ :global(label.overlay) {
        opacity: .25;
      }
  
      & #navicon:checked ~ .bumper,
      & .right:focus-within ~ .bumper {
        /* retract the bumper, pull site to the left */
        width: 0;
      }
    }

    /* background: pink; */

    @media (--smallWidth) {
      --offCanvasWidth: 75vw;
    }
    @media (--mediumWidth) {
      /* background: orange; */
      --offCanvasWidth: 50vw;
    }
    @media (--largeWidth) {
      /* background: yellow; */
      --offCanvasWidth: 25vw;
      --offCanvasSpeed: calc(1.5 * var(--transitionSpeed));
    }
    
    @media (--extraWidth) {
      /* background: lime; */
    }
  }

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

  <!-- new stuff -->
  <header>
    <aside class='left'>
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
    <a class='temp-logo' href='/'>logo</a>
    <input type='checkbox' id='navicon' />
    <aside class='right'>
      <ul>
        <li><a href='#nav'>nav</a></li>
        <li><a href='#nav'>nav</a></li>
        <li><a href='#nav'>nav</a></li>
      </ul>
      <div class='bottom'>
        at the bottom
      </div>
    </aside>
    <label class='overlay' for='navicon'>
      <span class='screenreader'>show site navigation</span>
    </label>
    <div class='bumper'></div>
  </header>
  <!--  -->

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

<!-- <script>
  import { page } from '$app/stores'
  // default to context, but overridable with prop // like the error page
  export let segment = $page.path === '/' ? 'homepage' : $page.path.split('/')[1]
  export let hideBanner = false

  import SEO from '../components/layout/seo.svelte'
  import Header from '../components/layout/header.svelte'
  import Banner from '../components/layout/banner.svelte'
  import Footer from '../components/layout/footer.svelte'

  const alertActive = $$slots.alert
</script>

<style>
  #site {
    min-height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    justify-content: stretch;
    grid-template-rows: auto 1fr auto;
    align-items: center;
    grid-template-areas:
      "header"
      "content"
      "footer";
  }

  :global(#site-header) {
    grid-area: header;
    width: 100%;
    height: 100%;
  }

  :global(#content) {
    grid-area: content;
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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

<SEO {segment} {...$$props} />

<div
	tabindex={alertActive ? -1 : 0}
  id='site'
  data-segment={segment}
>
  <Header {segment}>
    {#if !hideBanner}
      <slot name='banner'>
        <Banner {segment} {...$$props} />
      </slot>
    {/if}
  </Header>

  <main
    id='content'
    tabindex='-1'
    class={segment}
  >
    <slot />
  </main>

  <aside id='sidebar'>
    <slot name='sidebar' />
  </aside>

  <Footer />
</div>

{#if alertActive}
  <slot name='alert' />
{/if} -->