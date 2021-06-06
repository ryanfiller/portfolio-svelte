<script>
  import Page from './page.svelte'
  import Markdown from '../components/layout/markdown.svelte'
</script>

<Page {...$$props} >
  <Markdown>
    <slot />
  </Markdown>
</Page>
