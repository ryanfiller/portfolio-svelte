<script>
  export let date = ''
  export let dateFormat = 'MMMM dd, yyyy'

  const removeTimezone = date => {
    date = new Date(date)
    date = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000)
    return date
  }

  const format = date => date.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
</script>

<style>
  .date {
    display: block;

    & .initial,
    & .updated {
      display: block;
    }
  }
</style>

{#if Array.isArray(date)}
  <div class='date'>
    <time
      class='initial' 
      dateTime={removeTimezone([date[0]])}
    >
      {format(new Date(removeTimezone([date[0]])), dateFormat)}
    </time>
    <time
      class='updated' 
      dateTime={removeTimezone(date[date.length - 1])}
    >
      (updated on {format(new Date(removeTimezone(date[date.length - 1])), dateFormat)})
    </time>
  </div>
{:else}
  <time
    class='date' 
    dateTime={removeTimezone(date)}
  >
    {format(new Date(removeTimezone(date)), dateFormat)}
  </time>
{/if}
