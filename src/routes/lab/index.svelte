<script context="module">
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
	
	import Posts from '../../components/posts.svelte'
</script>

<!-- <svelte:head>
	<title>CHANGE ME</title>
</svelte:head> -->

<Posts {posts} />