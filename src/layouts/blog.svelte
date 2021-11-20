<script>
  import Page from './page.svelte'
  import Markdown from '$lib/components/layout/markdown.svelte'
  import SeriesNavigator from '$lib/components/blog/series-navigator.svelte'
</script>

<Page {...$$props} >
  <SeriesNavigator {...$$props}>
    <Markdown>
      <slot />
    </Markdown>
  </SeriesNavigator>

  <slot name='alert' slot='alert' />
</Page>