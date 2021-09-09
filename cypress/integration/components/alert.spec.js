describe('<Alert /> component', () => {
  const timeout = 15000
 
  beforeEach(() => {
    cy.visit('/styles/components', { timeout: timeout })
    cy.get('#alert', { timeout: timeout })
      .scrollIntoView()
      .find('button').click({ force: true})
    cy.injectAxe()
  })

  it('runs a dummy test to keep cypress from exploding', () => {
    cy.wait(100)
  })
  
  it('renders correctly', () => {
    cy.checkA11y('dialog.alert')
  })

  it('traps focus', () => {
    cy.get('dialog.alert').should('have.focus')
    cy.get('body').tab()
    cy.get('dialog.alert label').should('have.focus')
    
    // loop forwards
    cy.get('dialog.alert button').focus()
    cy.get('body').tab()
    cy.get('dialog.alert label').should('have.focus')

    // loop backwards
    cy.get('dialog.alert label').focus()
    cy.get('body').tab({ shift: true })
    cy.get('dialog.alert button').should('have.focus')
  })

  it('should close with the x', () => {
    cy.get('dialog.alert').within(() => {
      cy.get('label').click({ force: true})
    })
    cy.get('dialog.alert').should('not.exist')
  })

  it('should close with the escape key', () => {
    cy.get('dialog.alert').type('{esc}')
    cy.get('dialog.alert').should('not.exist')
  })

  it('should close with the button', () => {
    cy.get('dialog.alert').within(() => {
      cy.get('button').click({ force: true})
    })
    cy.get('dialog.alert').should('not.exist')
  })

  it('should close when the background is clicked', () => {
    cy.get('body').click(0, 0)
    cy.get('dialog.alert').should('not.exist')
  })
})
