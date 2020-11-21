import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

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

Cypress.Commands.add('fillOutContactForm', () => {
  cy.get('form#contact').within(() => {
    cy.get('input[name="name"]').type('Philip')
    cy.get('input[name="email"]').type('fry@planetexpress.com')
    cy.get('textarea[name="message"]').type('What if that thing I said?')
    cy.get('button[type="submit"]').click()
  })
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