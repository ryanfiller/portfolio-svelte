<script context='module'>
	export async function load({ fetch }) {
		let error
		const posts = await fetch(`/blog.json`)
			.then(response => response.json())
			.catch(response => error = response)

		if (error) {
			console.error('blog page', error)
			return {
				props: { error }
			}
		}

		return {
			props: { posts }
		}
	}
</script>

<script>
	export let posts
	
	import Page from '../../layouts/page.svelte'
	import List from  '$components/content/list.svelte'
	import PostPreview from '$components/blog/post-preview.svelte'
</script>

<Page>
	<List
    content={posts}
    component={PostPreview}
  />
</Page>
