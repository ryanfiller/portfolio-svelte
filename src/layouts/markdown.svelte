<script>
  import Page from './page.svelte'
  import Markdown from '$lib/components/layout/markdown.svelte'
</script>

<Page {...$$props} >
  <Markdown>
    <slot />
  </Markdown>
</Page>
