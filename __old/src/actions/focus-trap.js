const elements = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'details',
  '[tabindex]'
]

export default function focusTrap(element) {
  
  // set focus when element is created
  element.focus()

  // get all the elements inside
  const focusableElements = [...element.querySelectorAll(elements.join(', '))]
    // ... but not the disabled or tab-hidden ones
    .filter(element => !(element.hasAttribute('disabled') || element.tabIndex === -1))

  element.addEventListener('keydown', event => {
    if (!(event.key === 'Tab' || event.keyCode === 9)) {
      // immediate exit for all other keys
      return
    } else {
      const currentElementIndex = focusableElements.indexOf(document.activeElement)
      event.preventDefault()

      
      if (event.shiftKey) { // shift + tab
        // if at the start, go to end
        currentElementIndex === 0
          ? focusableElements[focusableElements.length - 1].focus()
          : focusableElements[currentElementIndex - 1].focus()
      } else { // just tab
        // if at the end, go to start
        currentElementIndex === focusableElements.length - 1
          ? focusableElements[0].focus()
          : focusableElements[currentElementIndex + 1].focus()
      }
    }
  })
}

// TODO return a `destroy` here that returns focus to the last clicked element
