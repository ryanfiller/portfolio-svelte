<script context='module'>
	export function preload({ params, query }) {
		return this.fetch(`/blog.json`)
		.then(response => response.json())
		.then(posts => {
      return { posts }
    })
	}
</script>

<script>
	export let posts
	
	import Page from '../../layouts/page.svelte'
	import List from  '../../components/content/list.svelte'
	import PostPreview from '../../components/blog/post-preview.svelte'
</script>

<Page>
	<List
    content={posts}
    component={PostPreview}
  />
</Page>
