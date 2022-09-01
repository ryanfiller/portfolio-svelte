<script>
  import Markdown from '$components/markdown.svelte'
  import markdown from './content.md?raw'
</script>

<div class='columns'>
  <Markdown content={markdown} />
</div>