<script>
  export let title
  import { getContext } from 'svelte'
  
  import { slugify } from '../../../helpers'
  const { data } = getContext('tabs')

  const id = `${slugify(title)}-${slugify($data.group)}`
  $data.tabs = [...$data.tabs, id]

  $: active = () => {
    if (!$data.active && $data.tabs[0] === id) { // default to first tab
      return true
    } else if ($data.active === id) { // else use active tab
      return true
    } else {
      return false
    }
  }

  const setActive = (event) => {
    if (event.target.getAttribute('for')) { // if this is the label
      const tab = event.target.getAttribute('for')
      $data.active = tab
      document.getElementById(tab).focus()
    } else { // else if this is the input itself
      $data.active = event.target.getAttribute('id')
    }
  }

</script>

<!-- https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html -->

<input
  type='radio'
  name={$data.group}
  id={id}
  checked={active()}
  on:focus={setActive}
/>

<label
  for={id}
  id={`tab-${id}`}
  on:click={setActive}
>
  <span
    role='tab'
    aria-selected={active().toString()}
    aria-controls={`panel-${id}`}
  >
    {title}
  </span>
</label>

<div
  class='tab'
  role='tabpanel'
  id={`panel-${id}`}
  aria-labelledby={`tab-${id}`}
  aria-expanded={active().toString()}
>
  <slot />
</div>