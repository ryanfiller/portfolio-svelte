<script>
	import changes from './content.md?raw'

	// for some reason if `!` isn't escape this entire page just explodes...
	// eslint-disable-next-line no-useless-escape
	const regex = /<\!--(.|\s)*?-->/g
	const render = changes.replaceAll(regex, '')
</script>

<pre>
  {render}
</pre>
