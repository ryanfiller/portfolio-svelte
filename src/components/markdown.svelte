<script>
  export let content = ''
  import { transformMarkdown } from '$helpers'
  const { html } = transformMarkdown(content, ['html'])
</script>

{@html html}
