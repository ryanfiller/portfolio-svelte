<script>
  export let date = ''
  export let dateFormat = 'MMMM dd, yyyy'

  // remove timezone info from date
  date = new Date(date)
  date = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000)

  import { format } from 'date-fns'
</script>

<style global type='text/scss'>
  .date {
    display: block;
  }
</style>

<time
  class='date' 
  dateTime={date}
>
  {format(new Date(date), dateFormat)}
</time>