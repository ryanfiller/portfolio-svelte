describe('<Footer /> component', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })
  
  it('renders the components', () => {
    cy.get('footer#site-footer').within(() => {
      // TODO this test could be more robust
      cy.get('nav').should('exist')
    })
    
    cy.checkA11y('footer#site-footer')
  })
})
