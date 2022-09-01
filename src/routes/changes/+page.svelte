<script>
  import { transformMarkdown } from '$helpers'
  import content from './content.md?raw'

  const { html } = transformMarkdown(content, ['html'])
</script>

{@html html}
