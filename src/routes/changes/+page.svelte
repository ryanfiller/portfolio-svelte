<script>
  import changes from './content.md?raw'

  const regex = /<\!--(.|\s)*?-->/g
  const render = changes.replaceAll(regex, '')
</script>

<pre>
  {render}
</pre>