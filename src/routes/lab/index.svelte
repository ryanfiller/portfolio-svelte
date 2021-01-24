<script context='module'>
	export function preload({ params, query }) {
		return this.fetch(`/lab.json`)
		.then(response => response.json())
		.then(labs => {
      return { labs }
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
