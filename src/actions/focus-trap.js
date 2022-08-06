const tabbableElements = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'details'
]

let focusableElements = []

function findFocusableElements(element) {
  const isFocusable = (element) => {
    return element.tabIndex || tabbableElements.includes(element.tagName.toLowerCase())
  }

  const searchThroughChildren = (children) => {
    children.forEach(child => {
      if (isFocusable(child)) focusableElements.push(child)
      if (child.children.length) searchThroughChildren([...child.children])
    })
  }

  // get EVERY element
  element.querySelectorAll('*')
    .forEach(child => {
      // see if we need to recurse into a shadow dom 
      if (child.shadowRoot) {
        findFocusableElements(child.shadowRoot)
        
      // dig through all the slotted content
      } else if (child.tagName === 'SLOT') {
        searchThroughChildren(child.assignedElements({ flatten: true }))
        
      // get the light dom elements that match the list
      } else if (isFocusable(child)) {
        focusableElements.push(child)
      }
    })
}

function manageFocus(event) {
  // immediate exit for all other keys
  if (!(event.key === 'Tab' || event.keyCode === 9)) return

  event.preventDefault()

  const currentElementIndex = event.target.shadowRoot
   ? focusableElements.indexOf(event.target.shadowRoot.activeElement)
   : focusableElements.indexOf(event.target)

  const focusNotInsideTrap = currentElementIndex === -1
  const last = focusableElements.length - 1

  if (event.shiftKey) {
    // if at the start, go to end
    (currentElementIndex === 0 || currentElementIndex === -1)
      ? focusableElements[last].focus()
      : focusableElements[currentElementIndex - 1].focus()
  } else {
    (currentElementIndex === last || focusNotInsideTrap)
      ? focusableElements[0].focus()
      : focusableElements[currentElementIndex + 1].focus()
  }
}

export default function focusTrap(element) {
  let triggerElement

  return {
    // subscribe to the action param
    update(isActive) {
      if (isActive) {

        // save this so we can return focus to it later, but only the first time
        if (!triggerElement) {
          triggerElement = document.activeElement
        }

        // setTimeout to wait for the event loops for web components
        setTimeout(() => {
          // get the focusable stuff
          findFocusableElements(element)
          // get rid of the disabled or tab-hidden things
          focusableElements = focusableElements.filter(element => !(element.hasAttribute('disabled') || element.tabIndex === -1))
          // remove duplicate elements
          focusableElements = [...new Set(focusableElements)]
        })

      
        document.addEventListener('keydown', manageFocus)
      } else {
        document.removeEventListener('keydown', manageFocus)
        triggerElement && triggerElement.focus()
      }
    }
  }
}
