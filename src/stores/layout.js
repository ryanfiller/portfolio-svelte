import { writable } from 'svelte/store'

export const right = writable({
  naviconOpen: false,
  // navAction: 'contact'
  navAction: undefined
})