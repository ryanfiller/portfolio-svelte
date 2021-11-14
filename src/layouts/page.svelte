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
</script>

<style>
  :global(body) {
    /* overflow MUST go here for position sticky elements to work within #site */
    overflow-x: hidden;
  }

  #site {
    --offCanvasWidth: 50vw;
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

    & header {
      display: grid;
      grid-template-rows: var(--headerHeight) auto;
      grid-template-columns: auto var(--offCanvasWidth) 100vw var(--offCanvasWidth);
      grid-template-areas: "bumper left header right"
                           "bumper left .      right";
      grid-row-start: 1;
      grid-row-end: -1;
      grid-column-start: 1;
      grid-column-end: -1;

      & .bumper {
        grid-area: bumper;
        width: var(--offCanvasWidth);
        transition: var(--transitionSpeed);
      }

      & .left,
      & .right {
        transition: var(--transitionSpeed);
        & * {
          position: sticky;
          top: 0;
        }
      }
  
      & .left:focus-within ~ :global(.bumper) {
        width: calc(2 * var(--offCanvasWidth));
      }
  
      & .left:focus-within ~ :global(label) {
        pointer-events: initial;
        opacity: .25;
      }
  
      & .left {
        grid-area: left;
        background-color: var(--colorBlueDark);
        color: var(--colorText);
      }

      & .temp-logo {
        grid-area: header;
        justify-self: start;
        align-self: center;
        height: var(--headerLogoHeight);
        display: block;
        background: orange;
        position: relative;
        z-index: 50000;
      }
  
      & #check {
        grid-area: header;
        justify-self: end;
        align-self: center;
        margin-right: var(--padding);
        z-index: 100;

        position: sticky;
        top: 0;
      }
  
      & label.icon {
        position: fixed;
        background: black;
        inset: 0;
        pointer-events: none;
        opacity: 0;
      }
  
      & #check:checked + label {
        pointer-events: initial;
        opacity: .25;
      }
  
      & .right {
        position: relative;
        grid-area: right;
        background: lime;
        /* position: absolute; */
      }
  
      & #check:checked ~ .bumper,
      & .right:focus-within ~ .bumper {
        width: 0;
      }
    }
  }

  /* :global(#site-header) {
    grid-area: header;
    width: 100%;
    height: 100%;
  } */

  :global(#content) {
    grid-area: content;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background: pink;

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

  <!-- new stuff -->
  <header>
    <aside class='left'>
      <a href='#content'>skip to content</a>
      <ul>
        <li><a href='#toc'>toc</a></li>
        <li><a href='#toc'>toc</a></li>
        <li><a href='#toc'>toc</a></li>
      </ul>
    </aside>
    <a class='temp-logo' href='/'>logo</a>
    <input type='checkbox' id='check' />
    <label for='check' class='icon'> </label>
    <aside class='right'>
      <ul>
        <li><a href='#nav'>nav</a></li>
        <li><a href='#nav'>nav</a></li>
        <li><a href='#nav'>nav</a></li>
      </ul>
    </aside>
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