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

  // set focus when element is created, if its focusable
  element.focus()

  // do this in a function so it can check for new elements every run
  let focusableElements = []
  function getFocusableElements() {
    // get all the elements inside
    return focusableElements = [...element.querySelectorAll(elements.join(', '))]
      // ... but not the disabled or tab-hidden ones
      .filter(element => !(
        element.hasAttribute('disabled')
        || element.type === 'hidden'
        || element.tabIndex === -1
        || element.dataset.skipFocusTrap === 'true'
      ))
      // .map(el => {
      //   console.log(el)
      //   return el
      // })
  }

  element.addEventListener('focusin', event => {
    // make sure a keypress didn't change the list of elements
    focusableElements = getFocusableElements()
    // console.log(focusableElements)
    // bail if this wasn't supposed to get into this state
    if (event.target.dataset.skipFocusTrap === 'true') {
      focusableElements[0].focus()
    }
  })
  
  element.addEventListener('keydown', event => {
    // check this as often as possible
    focusableElements = getFocusableElements()
    
    // bail if this isn't suppose to do anything extra
    if (event.target.dataset.skipFocusTrap === 'true') return

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
