context('<DefaultBanner /> component', () => {  
  beforeEach(() => {
    cy.injectAxe()
  })

  it('renders an h1', () => {
    cy.visit('/about')
    cy.get('.banner').find('h1').should('exist')
  })
})
