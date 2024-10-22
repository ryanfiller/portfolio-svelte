<!-- @migration-task Error while migrating Svelte code: Unexpected token -->
<script lang="typescript">
	import keySequenceListener from '$actions/key-sequence-listener'
  import { sendToAnalytics } from '$helpers';

  const code = [
    { key: 'ArrowUp', symbol: '⬆️' },
    { key: 'ArrowUp', symbol: '⬆️' },
    { key: 'ArrowDown', symbol: '⬇️' },
    { key: 'ArrowDown', symbol: '⬇️' },
    { key: 'ArrowLeft', symbol: '⬅️' },
    { key: 'ArrowRight', symbol: '➡️' },
    { key: 'ArrowLeft', symbol: '⬅️' },
    { key: 'ArrowRight', symbol: '➡️' },
    { key: 'B', symbol: '🅱️' },
    { key: 'A', symbol: '🅰️' }
  ]

	export let activated = false

  const keys = code.map(({ key }) => key)
  const symbols = code.map(({ symbol }) => symbol)

  function onMatch(sequenceIndex: number) {
    console.log(sequenceIndex, symbols[sequenceIndex])
  }

  function onComplete() {
		const style = 'font-size: 5em; line-height: 1; padding: 1em 0;'
		console.log(`%c${symbols.join('')}`, style)
		
		activated = !activated

    const site = document.getElementById('site')
    if (activated) {
      sendToAnalytics({ event: 'secret code activated' })
      site?.classList.add('code-activated')
    } else {
      site?.classList.remove('code-activated')
    }
	}
</script>

<svelte:body use:keySequenceListener={{ sequence: keys, onMatch, onComplete }} />

<style lang="postcss">
  :global {
    #site {
      transition-duration: 0.5s;
      position: relative;
      transform: scaleX(1) scaleY(1);
      opacity: 1;
      filter: blur(0);
  
      &.code-activated {
        transform: scaleX(0) scaleY(2);
        opacity: 0;
        filter: blur(100px);
        pointer-events: none;
      }
    }
  }
</style>
