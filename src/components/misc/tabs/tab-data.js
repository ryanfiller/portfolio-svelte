import { writable } from 'svelte/store'

export const tabData = writable({
  groupName: '',
  tabs: [],
  active: ''
})