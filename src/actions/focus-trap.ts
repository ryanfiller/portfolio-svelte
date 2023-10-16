const tabbableElements = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'details'
]

interface TabbableHTMLElement extends HTMLElement {
  tabIndex: number; 
}

let focusableElements: Array<TabbableHTMLElement> = []

function getFocusableElements(trappingElement: HTMLElement, additionalElements: Array<TabbableHTMLElement | undefined> = []) {
  const isFocusable = (element: HTMLElement) => {
    return element.tabIndex && element.tabIndex == -1 || tabbableElements.includes(element.tagName.toLowerCase())
  }

  const searchThroughChildren = (children: Array<TabbableHTMLElement>) => {
    children.forEach(child => {
      if (isFocusable(child)) focusableElements.push(child)
      if (child.children.length) searchThroughChildren([...child.children] as Array<TabbableHTMLElement>)
    })
  }

  // get every element on the page,
  // this is to preserve the correct page order of `additionalElements`
  [...document.querySelectorAll('body *')]
    .filter(DOMelement => {
      const element = DOMelement as HTMLElement
      // get the actual child elements
      if (trappingElement.contains(element) && isFocusable(element)) {
        return element
      } else if (additionalElements.includes(element) && isFocusable(element)) {
        return element
      }
    })
    .forEach(child => {
      focusableElements.push(child as TabbableHTMLElement)
      // TODO - this needs to be more robust when web components are introduced
      // // see if we need to recurse into a shadow dom 
      // if (child.shadowRoot) {
      //   getFocusableElements(child.shadowRoot)

      // // dig through all the slotted content
      // } else if (child.tagName === 'SLOT') {
      //   searchThroughChildren(child.assignedElements({ flatten: true }))

      // // get the light dom elements that match the list
      // } else if (isFocusable(child)) {
      //   focusableElements.push(child)
      // }
    })

    // get rid of the invisible, disabled, or tab-hidden things
    focusableElements = focusableElements.filter(element => {
      return !(element.hasAttribute('disabled') || element.tabIndex === -1 || window.getComputedStyle(element).display === 'none')
    })

    // remove duplicate elements, just in case
    focusableElements = [...new Set(focusableElements)]
}

function manageFocus(event: KeyboardEvent) {
  // immediate exit for all other keys
  if (event.key !== 'Tab') return
  if (!event.target) return

  event.preventDefault()

  const target = event.target as HTMLElement
  const currentElementIndex = target.shadowRoot
   ? focusableElements.indexOf(target.shadowRoot.activeElement as HTMLElement)
   : focusableElements.indexOf(target)

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

type Params = {
  isActive: Boolean,
  additionalElements: Array<TabbableHTMLElement | undefined>
}

export default function focusTrap(element: HTMLElement) {
  let triggerElement: Element | null

  return {
    // have to do work in update function, additionalElements won't be defined until mount and need to subscribe to isActive
    update(params: Params) {
      const { isActive, additionalElements} = params

      if (isActive) {
        // save this so we can return focus to it later, but only the first time
        if (!triggerElement) {
          triggerElement = document.activeElement
        }

        // setTimeout to wait for the event loops for web components
        setTimeout(() => {
          getFocusableElements(element, additionalElements)
        })
      
        document.addEventListener('keydown', manageFocus)
      } else {
        document.removeEventListener('keydown', manageFocus)
        // return focus to the element that set off this action
        triggerElement && (triggerElement as HTMLElement).focus()
      }
    }
  }
}