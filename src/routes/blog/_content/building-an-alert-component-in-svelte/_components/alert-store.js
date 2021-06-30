// weird ESM fix...
import * as svelteLocalStorage from 'svelte-local-storage-store'
const { writable } = svelteLocalStorage

export const alert = writable('alertBlogExample', {
  title: 'One Of My Favorite Quotes:',
  content: `<blockquote>
  <b>Time</b> is the <b>fire</b> in which we burn.
  <br>
  <br>
  <cite>
    - Dr. Tolian Soran (Delmore Schwartz)
  </cite>
<blockquote>`,
  id: ''
})