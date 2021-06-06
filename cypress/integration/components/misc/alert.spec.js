describe('<Alert /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.get('#Alert').scrollIntoView()
    cy.injectAxe()
    cy.get('#Alert').within(() => {
      cy.get('button').click()
    })
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
      cy.get('label').click()
    })
    cy.get('dialog.alert').should('not.exist')
  })

  it('should close with the escape key', () => {
    cy.get('dialog.alert').type('{esc}')
    cy.get('dialog.alert').should('not.exist')
  })

  it('should close with the button', () => {
    cy.get('dialog.alert').within(() => {
      cy.get('button').click()
    })
    cy.get('dialog.alert').should('not.exist')
  })

  it('should close when the background is clicked', () => {
    cy.get('body').click(0, 0)
    cy.get('dialog.alert').should('not.exist')
  })
})