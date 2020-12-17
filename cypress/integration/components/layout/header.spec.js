context('<Header /> component', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })
  
  it('renders the components', () => {
    cy.get('header#site-header').within(() => {
      cy.get('a.logo')
        .should('exist')
        .click()
        cy.url().should('eq', 'http://localhost:3000/')
      cy.get('nav').should('exist')
      cy.get('.options').should('exist')
    })
    
    cy.checkA11y('header#site-header')
  })
})
