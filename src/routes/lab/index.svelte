<script context='module'>
	export async function load({ fetch }) {
		return await fetch(`/lab.json`)
			.then(response => response.json())
			.then(labs => {
				return {
					props: { labs }
				}
			})
			.catch(error => {
				console.log('lab page', error)
				return {
					props: { error }
				}
			})
	}
</script>

<script>
	export let labs
	
	import Page from '../../layouts/page.svelte'
	import List from  '../../components/content/list.svelte'
	import PostPreview from '../../components/blog/post-preview.svelte'
</script>

<Page>
	<List
		content={labs}
		component={PostPreview}
	/>
</Page>
