// use `customElements.define()` in this file,
// because `<svelte:options tag='...' />` won't stop throwing a warning

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
