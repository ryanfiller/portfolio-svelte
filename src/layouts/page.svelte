<script>
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

<style global>
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
  
  #site-header {
    grid-area: header;
    width: 100%;
    height: 100%;
  }

  #content {
    grid-area: content;
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #site-footer {
    grid-area: footer;
    width: 100%;
    height: 100%;
  }
</style>

<SEO {segment} {...$$props} />

<div
	tabindex={alertActive ? -1 : 0}
  id='site'
  class={segment}
>
  <Header>
    {#if !hideBanner}
      <Banner {segment} {...$$props} />
    {/if}
  </Header>

  <main
    id='content'
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