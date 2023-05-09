// TODO implement 'svelte-local-storage-store' (also add to changelog)

import { writable } from 'svelte/store'

export const user = writable({})

// check for localStorage, this won't run on SSR
if (typeof localStorage !== 'undefined') {
  user.set(JSON.parse(localStorage.getItem('user')) || {} )
  user.subscribe(value => {
    localStorage.setItem('user', JSON.stringify(value))
  })
}