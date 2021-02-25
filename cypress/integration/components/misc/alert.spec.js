describe('<Alert /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.get('#alert').scrollIntoView()
    cy.injectAxe()
  })
  
  it('renders correctly', () => {
    cy.get('aside.alert').within(() => {
      cy.get('header').should('exist')
      cy.get('.alert__content').should('exist')
    })
    cy.checkA11y('aside.alert')
  })

  it('should close with the x', () => {
    cy.get('aside.alert').within(() => {
      cy.get('header button').click()
    })
    cy.get('aside.alert').should('not.exist')
  })
})