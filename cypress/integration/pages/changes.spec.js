import { site } from '../../../src/config.js'

describe('/changes', () => {
  before(() => {
    cy.visit(`/changes`)
    cy.injectAxe()
  })

  it('is accessible', () => {
    cy.checkA11y()
  })

  describe('<SEO />', () => {
    it('contains the generic info', () => {
      cy.title().should('eq', `Changelog | ${site.title}`)
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
      'figure',
      'h1'
    ])
    cy.checkFooterElements([
      '.text',
      '.social-list',
      '.nav'
    ])
  })

  describe('<Change />', () => {
    it('renders correctly', () => {
      cy.get('section.change').within(() => {
        cy.get('h2 > a').should('exist')
        cy.get('div').should('exist')
        cy.get('summary').should('exist')
      })
    })
  })  
})