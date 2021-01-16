<script context='module'>
	export function preload({ params, query }) {
		return this.fetch(`/lab.json`)
		.then(response => response.json())
		.then(posts => {
      return { posts }
    })
	}
</script>

<script>
	export let posts
	
	import Page from '../../layouts/page.svelte'
	import Posts from '../../components/posts.svelte'
</script>

<Page>
  <Posts {posts} />
</Page>