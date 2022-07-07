<script>
  import { transformMarkdown } from '$helpers'
  import content from './_content.md?raw'

  const { html } = transformMarkdown(content, ['html'])
</script>

{@html html}