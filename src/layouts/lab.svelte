<script>
  import Markdown from './markdown.svelte'

  const props = $$props
  props.meta.date = null
</script>

<Markdown {...props}/>