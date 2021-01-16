<script>
  import Page from './page.svelte'
  import Markdown from '../components/layout/markdown.svelte'
  import Banner from '../components/layout/banner.svelte'
</script>

<Page {...$$props} >
  <Markdown>
    <slot />
  </Markdown>
</Page>