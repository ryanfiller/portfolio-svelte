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
	import { stores } from '@sapper/app'
	const { page } = stores()
	
	series = series.filter(series => series.slug = $page.params.slug)[0]
	const preview = {...series, title: ''}
  
  import Page from '../../../layouts/page.svelte'
	import List from  '../../../components/content/list.svelte'
	import SeriesPreview from '../../../components/blog/series-preview.svelte'
</script>

<Page {...series}>
	<SeriesPreview {...preview} />
</Page>
