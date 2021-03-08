<script>
  export let text
</script>

<li class='text'>
  {#if text}
    <span class='label'>{@html text}</span>
  {/if}
</li>
