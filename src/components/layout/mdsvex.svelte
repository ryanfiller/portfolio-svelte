<script>
  import { onMount, onDestroy } from 'svelte'

  import { markdown } from '../../stores.js'
  onMount(() => markdown.set({...$$props}))
  onDestroy(() => markdown.set({})) // make sure no data excapes its own page

  import Markdown from './markdown.svelte'

</script>

<!-- scss/global cannont be used in the style tag in this component -->

<Markdown>
  <slot />
</Markdown>