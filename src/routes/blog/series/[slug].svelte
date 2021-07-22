<script context='module'>
	export async function load({ page, fetch }) {
		const { params: { slug } } = page

		return await fetch(`/blog/series.json`)
			.then(response => response.json())
			.then(allSeries => {
				const series = allSeries.filter(series => series.slug === `/blog/series/${slug}`)[0]
				return { props: { series } }
			})
			.catch(error => {
				console.log('blog series page', error)
				return null
			})
	}
</script>

<script>
	export let series
	const preview = {...series, title: ''}
  
  import Page from '../../../layouts/page.svelte'
	// import List from  '../../../components/content/list.svelte'
	import SeriesPreview from '../../../components/blog/series-preview.svelte'
</script>

<Page {...series}>
	<SeriesPreview {...preview} />
</Page>