<script>
  export let title
  
  import { slugify } from '../../../helpers'
  import { tabData } from './tab-data.js'
  const id = slugify(title)

  $tabData.tabs = [...$tabData.tabs, id]

  $: active = () => {
    if (!$tabData.active && $tabData.tabs[0] === id) { // default to first tab
      return true
    } else if ($tabData.active === id) { // else use active tab
      return true
    } else {
      return false
    }
  }

  const setActive = (event) => {
    if (event.target.getAttribute('for')) { // if this is the label
      const tab = event.target.getAttribute('for')
      console.log(tab)
      $tabData.active = tab
      document.getElementById(tab).focus()
    } else { // else if this is the input itself
      $tabData.active = event.target.getAttribute('id')
    }
  }

</script>

<!-- https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html -->

<input
  type='radio'
  name={$tabData.groupName}
  id={id}
  checked={active()}
  on:focus={setActive}
/>

<label
  for={id}
  id={`tab-${id}`}
  tab-index='1'
  on:click={setActive}
>
  <span
    role='tab'
    aria-selected={active()}
    aria-controls={`panel-${id}`}
  >
    {title}
  </span>
</label>

<div
  class='tab content1'
  role='tabpanel'
  id={`panel-${id}`}
  aria-labelledby={`tab-${id}`}
  aria-expanded={active()}
>
  <slot />
</div>