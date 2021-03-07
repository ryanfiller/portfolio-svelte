<script>
  import Page from './page.svelte'
  import Markdown from '../components/layout/markdown.svelte'
  import SeriesNavigator from '../components/blog/series-navigator.svelte'
</script>

<Page {...$$props} >
  <SeriesNavigator {...$$props}>
    <Markdown>
      <slot />
    </Markdown>
  </SeriesNavigator>
</Page>