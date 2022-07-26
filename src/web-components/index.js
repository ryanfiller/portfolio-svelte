// use `customElements.define()` in this file,
// because `<svelte:options tag='...' />` won't stop throwing a warning

import Note from './note.svelte'
customElements.define('rf-note', Note)

import Tabs from './tabs.svelte'
customElements.define('rf-tabs', Tabs)

// https://www.colorglare.com/svelte-components-as-web-components-b400d1253504

// customElements.define('rf-NAME',
//   class extends HTMLElement {
//     constructor() {
//       super()
//       const shadowRoot = this.attachShadow({ mode: 'open' })
//       this._element = new COMPONENT({
//         target: shadowRoot,
//         props: {
//           something: this.getAttribute('innerText')
//         }
//       })
//     }
//     disconnectedCallback() {
//       if (this._element && this._element.$destroy) {
//         this._element.$destroy()
//       }
//     }
//   }
// )
