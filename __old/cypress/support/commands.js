require('@cypress/snapshot').register()
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'
import 'cypress-localstorage-commands'

function checkElementForChildren(element, included = [], excluded = []) {
  cy.get(element).scrollIntoView()
  cy.get(element).within(() => {
    included.map(child => {
      cy.get(child).should('exist')
    })
    excluded.map(child => {
      cy.get(child).should('not.exist')
    })
  })
} 

Cypress.Commands.add('checkHeaderElements', (included, excluded) => {
  checkElementForChildren('#site-header', included, excluded)
})

Cypress.Commands.add('checkFooterElements', (included, excluded) => {
  checkElementForChildren('#site-footer', included, excluded)
})

Cypress.Commands.add('inputChange', (input, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  ).set
  
  const changeInputValue = inputToChange => newValue => {
    nativeInputValueSetter.call(inputToChange[0], newValue)
    inputToChange[0].dispatchEvent(new Event('change', { newValue, bubbles: true }))
  }

  return cy.get(input).then(input => changeInputValue(input)(value))
})

addMatchImageSnapshotCommand({
  failureThreshold: 0.00,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.0 },
  capture: 'viewport',
})

Cypress.Commands.add("setResolution", (size) => {
  if (Cypress._.isArray(size)) {
     cy.viewport(size[0], size[1])
   } else {
    cy.viewport(size);
  }
})

Cypress.Commands.add('setColorScheme', (theme) => {
  cy.get('html').then(html => html[0].setAttribute('data-user-color-scheme', theme))
})

Cypress.Commands.add('closeAlert', () => {
  cy.get('dialog.alert', { timeout: 2000 }).find('button').eq(0).click()
})