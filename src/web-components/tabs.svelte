<!-- <svelte:options tag='rf-tabs' /> -->
<svelte:options tag={null} />

<script>
  // this one is SUPER WEIRD for the web-components & no-js
  // KIND OF inspired by:
  // https://github.com/github/tab-container-element

  export let name
  let component

  let groupId = slugify(name)

  import { onMount } from 'svelte'
  import slugify from '../helpers/slugify.js'

  let isSvelteComponent
  let elements, tabIds
  let activeTab = null

  onMount(() => {
    isSvelteComponent = Object.keys(component).includes('__svelte_meta')

    // web-components don't get this until browser run time, set it again
    groupId = groupId || slugify(name)
    
    // shadow dom timing is weird, use a timeout to fire this when the browser event loop is empty
    setTimeout(() => {
      // make these 'globally' available to all the functions that might need them
      elements = getElements()
      tabIds = getTabIds()

      // the component will just render the semantic equivalent of <div>s
      // so apply a11y attributes dynamically so screenreaders work [1]
      addAttributes()

      setInitialActiveTab()
      addEventListeners()
    })
  })

  function getElements() {
    let tablist, tabs, panels

    if (isSvelteComponent) {
      const htmlChildren = [...component.children]

      tablist = htmlChildren.find(node => node.tagName === 'TABLIST')
      tabs = [...tablist.children]
      panels = htmlChildren.filter(node => node.tagName === 'PANEL')
    } else {
      const slots = [...component.children]

      tablist = slots.find(slot => slot.name === 'tablist').assignedNodes()[0]
      tabs = [...tablist.children]
      panels = [...slots.find(slot => !slot.name).assignedNodes()].filter(node => node.tagName === 'PANEL')
    }

    return { tablist, tabs, panels }
  }

  function getTabIds() {
    const { tabs } = elements
    const ids = []
    for (const tab of tabs) {
      // get the id to add to the panels later
      const constructedId = `${groupId}-${tab.id}`
      ids.push(constructedId)
    }
    return ids
  }

  function addAttributes() {
    const { tablist, tabs, panels } = elements

    component.setAttribute('id', groupId)
    component.setAttribute('aria-label', name)

    tablist.setAttribute('role', 'tablist')
    tablist.setAttribute('tabindex', '-1')

    for (const [index, tab] of tabs.entries()) {
      tab.setAttribute('id', tabIds[index])
      tab.setAttribute('tabindex', '-1')
      tab.setAttribute('type', 'button')
      tab.setAttribute('role', 'tab')
    }

    for (const [index, panel] of panels.entries()) {
      panel.setAttribute('role', 'tabpanel')
      panel.setAttribute('aria-labelledby', tabIds[index])
    }
  }

  function setInitialActiveTab() {
    const { tabs, panels } = elements

    // when the component initially loads set the first tab active,
    // css should hide this attribute shuffling from the user
    const locationHash = window.location.hash.replace('#', '')
    const locationActiveTab = tabIds.includes(locationHash)

    if (locationActiveTab) {
      const activeIndex = tabIds.indexOf(locationHash)
      setActiveTab(tabs[activeIndex].id)
    } else {
      setActiveTab(tabs[0].id)

      if (isSvelteComponent) {
        component.dataset.activeTab = activeTab.id
      } else {
        component.parentNode.host.dataset.activeTab = activeTab.id
      }
      tabs[0].setAttribute('tabindex', '0')
      tabs[0].classList.add('active')
      panels[0].classList.add('active')
    }
  }

  function addEventListeners() {
    const { tablist, tabs } = elements
    tablist.addEventListener('keydown', handleKeyboardEvents)

    for (const tab of tabs) {
      tab.addEventListener('click', event => setActiveTab(event.target.id))
    }
  }

  function setActiveTab(id) {
    const { tabs, panels } = elements

    activeTab = tabs.find(tab => tab.id === id)

    if (isSvelteComponent) {
      component.dataset.activeTab = activeTab.id
    } else {
      component.parentNode.host.dataset.activeTab = activeTab.id
    }

    for (const tab of tabs) {
      tab.getAttribute('id') === activeTab.id
        ? (tab.classList.add('active'), tab.setAttribute('tabindex', '0'))
        : (tab.classList.remove('active'), tab.setAttribute('tabindex', '-1'))
    }

    for (const panel of panels) {
      panel.getAttribute('aria-labelledby') === activeTab.id
        ? panel.classList.add('active')
        : panel.classList.remove('active')
    }
  }

  function handleKeyboardEvents(event) {
    const key = event.code
    if (!['Home', 'End', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return

    // prevent the arrow keys from scrolling the page
    event.preventDefault()

    const { tabs } = elements 
    const writingMode = getComputedStyle(component)['writing-mode']

    if (key === 'Home') return setActiveTab(tabs[0].id)
    if (key === 'End') return setActiveTab(tabs[tabs.length - 1].id)

    let direction
    if (writingMode === 'horizontal-tb' || writingMode === 'vertical-rl') {
      ['ArrowRight', 'ArrowDown'].includes(key)
        ? direction = 'forward'
        : direction = 'backward'
    } else if (writingMode === 'vertical-lr') {
      ['ArrowRight', 'ArrowDown'].includes(key)
        ? direction = 'forward'
        : direction = 'backward'
    }

    const tabTotal = tabs.length - 1
    const activeTabIndex = tabs.indexOf(tabs.find(tab => tab === activeTab))

    if (direction === 'forward') {
      const nextTab = (activeTabIndex + 1) <= tabTotal
        ? tabs[activeTabIndex + 1]
        : tabs[0]
      setActiveTab(nextTab.id)
      nextTab.focus()
    } else {
      const previousTab = (activeTabIndex - 1) >= 0
        ? tabs[activeTabIndex - 1]
        : tabs[tabs.length - 1]
      setActiveTab(previousTab.id)
      previousTab.focus()
    }
  }
</script>

<!-- TODO tab styles aren't great on mobile, can they be replaced with a select? -->
<style>
  .tabs {
    --colorActive: var(--colorHighlight);
    --pixelOffset: calc(3 * var(--pixelSize));

    width: 100%;
    display: flex;
    flex-direction: column;
    margin: var(--padding) 0;
  }

  /* global makes it into the shadow <slot />s  */
  :global {
    /* [1] that's usually how to make svelte components, */
    /* so apply `data-no-js` so you don't need the tabs */
    & [data-no-js] {
      & tablist {
        display: none !important;
      }

      & panel {
        display: block !important;

        &:before {
          display: none;
        }

        &:not(:last-child) {
          margin-block-end: var(--padding);
        }
      }
    }

    & tablist {
      display: flex;
      gap: calc(0.25 * var(--padding));
      padding-block-start: var(--pixelOffset);
      position: relative;
      z-index: 1;
      overflow: hidden;
    }

    & tab {
      flex: 1;
      display: block;
      padding: calc(0.75 * var(--padding)) var(--padding);
      padding-block-end: calc(var(--padding) + var(--pixelOffset));
      margin-block-end: calc((-0.5 * var(--padding)) - var(--pixelOffset));
      position: relative;
      inset-block-start: 0;
      transition: var(--transitionSpeed);
      white-space: nowrap;
      line-height: 0;
      cursor: pointer;

      &::before {
        content: '';
        display: block;
        position: absolute;
        color: var(--colorPrimary);
        background: var(--pixelBorder);
        inset: 0;
        z-index: -1;
      }

      &:hover,
      &:focus {
        outline: none;
        text-decoration: underline;
        text-decoration-thickness: var(--pixelSize);
        inset-block-start: calc(-0.5 * var(--pixelOffset));
      }
    }

    & rf-tabs:not([data-active-tab]) tab:nth-of-type(1),
    & rf-tabs[data-active-tab] tab.active,
    & .tabs:not([data-active-tab]) tab:nth-of-type(1),
    & .tabs[data-active-tab] tab.active,
    & tab.active {
      color: var(--colorBackground);

      &::before {
        color: var(--colorActive);
        background: var(--pixelBorderFill);
      }
    }

    & panel {
      width: 100%;
      display: none;
      padding: var(--padding);
      position: relative;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
      }

      &:before {
        background: var(--colorBackground);
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-inline-end: 0;
        block-size: calc(var(--padding) - var(--pixelSize));
        border-block-start: var(--pixelSize) solid var(--colorActive);
        border-inline-start: var(--pixelSize) solid var(--colorActive);
        border-inline-end: var(--pixelSize) solid var(--colorActive);
        z-index: 1;
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        inset: 0;
        color: var(--colorActive);
        background: var(--pixelBorder);
        pointer-events: none;
      }

      & > * {
        position: relative;
        z-index: 2;
      }
    }

    & rf-tabs:not([data-active-tab]) panel:nth-of-type(1),
    & rf-tabs[data-active-tab] panel.active,
    & .tabs:not([data-active-tab]) panel:nth-of-type(1),
    & .tabs[data-active-tab] panel.active,
    & panel.active {
      display: block;
    }
  }
</style>

<div
  class='tabs'
  bind:this={component}
  id={groupId}
>
  <slot name='tablist' />
  <slot />
</div>