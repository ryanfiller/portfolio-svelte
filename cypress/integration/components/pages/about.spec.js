import { site } from '../../../src/config.js'

describe('/about', () => {
  before(() => {
    cy.visit(`/about`)
    cy.injectAxe()
  })

  it('is accessible', () => {
    cy.checkA11y()
  })

  describe('<SEO />', () => {
    it('contains the generic info', () => {
      cy.title().should('eq', `About | ${site.title}`)
      cy.document()
      .get('head meta[name="author"]')
        .should('have.attr', 'content', site.author)
      cy.document().get('head meta[name="description"]')
        .should('have.attr', 'content', site.about)
    })
  })

  it('renders layout correctly', () => {
    cy.checkHeaderElements([
      '.logo',
      '.nav',
      '.options',
      'h1'
    ], [
      'figure'
    ])
    cy.checkFooterElements([
      '.text',
      '.social-list',
      '.nav'
    ])
  })
})