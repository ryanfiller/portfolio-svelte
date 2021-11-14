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
  #site {
    --offCanvasWidth: 10vw;

    min-height: 100vh;
    width: calc(100% + (2 * var(--offCanvasWidth)));
    margin-left: calc(-2 * var(--offCanvasWidth));
    overflow-x: hidden;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto var(--offCanvasWidth) 100vw var(--offCanvasWidth);
    grid-template-areas: "bumper left header right"
                         "bumper left content right"
                         "bumper left footer right";
    
    & .bumper {
      grid-area: bumper;
      width: var(--offCanvasWidth);
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
      height: 100vh;
      position: sticky;
      top: 0;
      overflow: hidden;
      background-color: var(--colorBlueDark);
      color: var(--colorText);
    }

    & #check {
      grid-area: header;
      justify-self: end;
      align-self: center;
      margin-right: var(--padding);
      z-index: 100;
    }

    & label.icon {
      position: absolute;
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
    }

    & #check:checked ~ .bumper,
    & .right:focus-within ~ .bumper {
      width: 0;
    }
  }

  :global(#site-header) {
    grid-area: header;
    width: 100%;
    height: 100%;
  }

  :global(#content) {
    grid-area: content;
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

  <!-- new stuff -->
  <aside class='left'>
    <a href='#content'>skip to content</a>
    <ul>
      <li><a href='#toc'>toc</a></li>
      <li><a href='#toc'>toc</a></li>
      <li><a href='#toc'>toc</a></li>
    </ul>
  </aside>
  <input type='checkbox' id='check' />
  <label for='check' class='icon'> </label>
  <aside class='right'>
    <input type='text' id='right' placeholder='right'>
  </aside>
  <div class='bumper'></div>
  <!--  -->

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