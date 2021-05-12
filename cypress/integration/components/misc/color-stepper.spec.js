describe('<ColorStepper /> component', () => {
  
  beforeEach(() => {
    cy.visit('/lab/color-stepper')
    cy.injectAxe()
    cy.get('.color-stepper').scrollIntoView()
  })

  it('renders the defaults', () => {
    cy.get('.color-stepper').matchImageSnapshot()
    cy.checkA11y('.color-stepper')
  })

  it('renders changes', () => {
    cy.get('.color-stepper').within(()=> {
      cy.get("#variable-prefix").clear().type('prefix')
      cy.get("#light-prefix").clear().type('light')
      cy.get("#dark-prefix").clear().type('dark')
      cy.get("#transparency-prefix").clear().type('trans')
      cy.get("#colors").clear().type('--purp: #663399;')
      cy.get("#transparency-variants").then(input => cy.inputChange(input, '15'))
      cy.get("#color-variants").then(input => cy.inputChange(input, '15'))
    })
    cy.get('.color-stepper').matchImageSnapshot()
  })
})