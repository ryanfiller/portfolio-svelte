<script context='module'>
	export function preload({ params, query }) {
		return this.fetch(`/blog/series.json`)
		.then(response => response.json())
		.then(series => {
      return { series }
    })
	}
</script>

<script>
	export let series
	
	import { setContext } from 'svelte'

  import Page from '../../../layouts/page.svelte'
	import List from  '../../../components/content/list.svelte'
	import SeriesPreview from '../../../components/blog/series-preview.svelte'

	setContext('segment', 'series')
</script>

<Page>
	<List
    content={series}
    component={SeriesPreview}
  />
</Page>
