import { writable } from 'svelte/store'

// TODO - this store needs to be reworked somehow into an SSR-able thing
// currently pages that rely on this get nothing without clientside JS
export const markdown = writable({})

export const colorScheme = writable('')