describe('404 page', () => {
  beforeEach(() => {
    cy.visit(`/not-a-real-route`, {failOnStatusCode: false})
    cy.injectAxe()
  })

  it('renders correctly', () => {
    // cy.title().should('eq', 'Error - 404 | ryanfiller.com')
    cy.get('h1').contains('404 Not Found', { matchCase: false })
    cy.get('#content ul').within(() => {
      cy.get('li').eq(0).get('a')
        .contains('Go home')
        .should('have.attr', 'href', '/')
      cy.get('li').eq(1).get('a')
        .contains('Go back')
        .should('have.attr', 'href', 'javascript:void(0)')
      cy.get('li').eq(2).get('a')
        .contains('Read some blogs')
        .should('have.attr', 'href', '/blog')
      cy.get('li').eq(3).get('a')
        .contains('Contact Me')
        .should('have.attr', 'href', '/#contact')
    })
    cy.checkA11y('#content')
  })
})