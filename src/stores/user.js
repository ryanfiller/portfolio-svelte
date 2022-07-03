import { writable } from 'svelte/store'

const defaultData = {
  theme: 'auto',
  contrast: 'no-preference'
}

const user = writable({...defaultData})

// check for localStorage, this won't run on SSR
if (typeof localStorage !== 'undefined') {
  user.set(JSON.parse(localStorage.getItem('user')) || defaultData )
  user.subscribe(value => {
    localStorage.setItem('user', JSON.stringify(value))
  })
}

export default user
export { defaultData }
