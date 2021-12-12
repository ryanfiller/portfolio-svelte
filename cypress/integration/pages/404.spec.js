describe('404 page', () => {
  before(() => {
    cy.visit(`/not-a-real-route`, {failOnStatusCode: false})
    cy.injectAxe()
  })

  it('is accessible', () => {
    cy.checkA11y()
  })

  describe('<SEO />', () => {
    it('renders the error in the title', () => {
      cy.title().should('eq', 'Error - 404 | ryanfiller.com')
    })
  })

  it('renders layout correctly', () => {
    cy.checkHeaderElements([
      '.logo',
      '.nav',
      '.options'
    ])
    cy.checkFooterElements([
      '.text',
      '.social-list',
      '.nav'
    ])
  })

  it('renders content correctly', () => {
    cy.get('h1').contains('404 Not Found', { matchCase: false })
    cy.get('#content ul').within(() => {
      cy.get('li').eq(0).get('a')
        .contains('Go home')
        .should('have.attr', 'href', '/')
      cy.get('li').eq(1).get('a')
        .contains('Go back')
        .should('not.have.attr', 'href')
      cy.get('li').eq(2).get('a')
        .contains('Read some blogs')
        .should('have.attr', 'href', '/blog')
      cy.get('li').eq(3).get('a')
        .contains('Contact Me')
        .should('have.attr', 'href', '/.form')
    })
  })
})