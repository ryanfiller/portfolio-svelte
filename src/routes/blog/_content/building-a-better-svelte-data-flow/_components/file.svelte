<script>
  export let type
  export let text
  export let image
  export let multi = false
</script>

<li class={type}>
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' overflow='visible'>

    {#if type === 'file'}
      {#if multi}
        <use xlink:href='#file-outline' x='10' y='-5' />
      {/if}

      <use xlink:href='#file-outline' x='15' />

      {#if multi}
        <use xlink:href='#file-outline' x='20' y='5' />
      {/if}

    {:else if type === 'browser'}
      <use xlink:href='#browser-outline'/>
    {/if}

    <!-- multi bumps things 5 to the right -->
    {#if image === 'markdown'}
      <use xlink:href='#markdown' x={multi ? '41.5' : '36.5'} y='77.5' />
    {:else if image === 'json'}
      <use xlink:href='#json' x={multi ? '43' : '38'} y='77.5' />
    {:else if image ===  'html'}
      <use xlink:href='#html' x={multi ? '42.5' : '37.5'} y='77.5' />
    {:else if image === 'svelte'}
      <use xlink:href='#svelte' x={multi ? '43' : '38'} y='77.5' />
    {:else if image ===  'hydration'}
      <use xlink:href='#hydration' x={multi ? '43' : '38'} y='77.5' />
    {:else if image ===  'server'}
      <use xlink:href='#server' x={multi ? '42.5' : '37.5'} y='77.5' />
    {:else if image ===  'browser'}
      <use xlink:href='#browser' x={multi ? '42' : '37'} y='77.5' />
    {/if}

  </svg>
  {#if text}
    <span class='label'>{@html text}</span>
  {/if}
</li>
