<script>
  export let posts
  import PostPreview from './content/post-preview.svelte'
</script>

<style type="text/scss">
  section {
    clear: both;
    line-height: 1.5;
  }

	ul {
    margin: 0 0 2em 0;
    padding: 0;
		font-size: 1.5rem;
		line-height: 1.5;
    list-style: none;
    
		li {
			margin: .25em 0;
			&:before {
				content: attr(data-bullet);
				margin-right: .25em;
			}
		}
	}
</style>

<section>
  <ul>
    {#each posts as post}
      <li>
        <PostPreview {post} />
      </li>
    {/each}
  </ul>
</section>