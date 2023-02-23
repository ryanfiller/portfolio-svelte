<script context='module'>
	export async function load({ fetch }) {
		return await fetch(`/blog/tips.json`)
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
	import PostPreview from '$components/blog/post-preview.svelte'
</script>

<Page segment='tips'>
	<List
    content={series}
    component={PostPreview}
  />
</Page>