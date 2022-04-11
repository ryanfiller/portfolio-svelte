<script context='module'>
	export async function load({ fetch }) {
		return await fetch(`/blog/series.json`)
		.then(response => response.json())
		.then(series => {
      return { 
				props: { series } 
			}
    })
	}
</script>

<script>
	export let series

  import Page from '../../../layouts/page.svelte'
	import List from  '$components/content/list.svelte'
	import SeriesPreview from '$components/blog/series-preview.svelte'
</script>

<Page segment='series'>
	<List
    content={series}
    component={SeriesPreview}
  />
</Page>
