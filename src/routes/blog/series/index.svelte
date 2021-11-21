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
	import List from  '$lib/content/list.svelte'
	import SeriesPreview from '$lib/components/blog/series-preview.svelte'
</script>

<Page segment='series'>
	<List
    content={series}
    component={SeriesPreview}
  />
</Page>
