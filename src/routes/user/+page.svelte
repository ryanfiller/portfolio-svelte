<script>
  import user, { defaultData } from '$stores/user.js'

  function clearUserData() {
    $user = {...defaultData}
  }
</script>

TODO:

<pre>{JSON.stringify($user, null, 2)}</pre>

<button on:click={clearUserData}>
  clear all data
</button>