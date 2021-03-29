<script>
  export let text
  export let path
</script>

<li class='transform'>
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' overflow='hidden' preserveAspectRatio='none'>
    {#if path === 'single'}
      <use xlink:href='#single' />
    {:else if path === 'double'}
      <use xlink:href='#double' />
    {:else if path === 'double-in'}
      <use xlink:href='#double-in' />
    {:else if path === 'double-out'}
      <use xlink:href='#double-out' />
    {/if}
  </svg>
  {#if text}
    <span class='label'>{@html text}</span>
  {/if}
</li>
