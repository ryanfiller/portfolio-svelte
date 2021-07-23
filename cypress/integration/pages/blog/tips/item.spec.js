describe('blog tips item', () => {
  before(() => {
    cy.visit(`/blog/tips`)
    cy.injectAxe()
  })

  it('is accessible', () => {
    cy.checkA11y()
  })

  describe('<SEO />', () => {
    // TODO
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
})