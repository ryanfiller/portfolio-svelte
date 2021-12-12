import { site } from '../../../src/config.js'

describe('homepage', () => {
  before(() => {
    cy.visit(`/`)
    cy.injectAxe()
  })

  it('is accessible', () => {
    cy.checkA11y()
  })

  describe('<SEO />', () => {
    it('contains the generic info', () => {
      cy.title().should('eq', site.title)
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
      '.options'
    ], [
      '#page-banner'
    ])
    cy.checkFooterElements([
      '.text',
      '.social-list',
      '.nav'
    ])
  })

  describe('temp bio', () => {
    it('is there', () => {
      cy.get('.temp-bio').should('exist')
      cy.get('.temp-bio h1').should('exist')
    })
  })

  describe('<List />', () => {
    describe('post list', () => {
      it('renders the list correctly', () => {
        const list = cy.get('.content-list').eq(0)
        list.within(() => {
          cy.get('h2.title').contains('Recent Posts')
          cy.get('.post-preview').length <= 3
          cy.get('.button')
            .contains('See More')
            .should('have.attr', 'href', '/blog')
          })
      })

      it('renders the <PostPreview />', () => {
        cy.get('.post-preview')
          .then((preview) => {
            // convert to an array
            return preview.toArray()
          })
          .then((previews) => {
            // get a random one
            const random = Math.floor(Math.random() * previews.length)
            cy.get('.post-preview').eq(random).within(() => {
              cy.get('h3.header').should('exist')
              cy.get('.date').should('exist')
              cy.get('.excerpt').should('exist')
              cy.get('.tag-list').within(() => {
                cy.get('.categories').should('exist')
                cy.get('.tags').should('exist')
              })
              cy.get('a').should('exist')
            })
          })
      })
    })

    describe('series list', () => {
      it('renders the list correctly', () => {
        const list = cy.get('.content-list').eq(1)
        list.within(() => {
          cy.get('h2').contains('Recent Series')
          cy.get('.series-preview').length <= 3
          cy.get('.button')
            .contains('See More')
            .should('have.attr', 'href', '/blog/series')
          })
      })

      it('renders the <SeriesPreview />', () => {
        cy.get('.series-preview')
          .then((preview) => {
            // convert to an array
            return preview.toArray()
          })
          .then((previews) => {
            // get a random one
            const random = Math.floor(Math.random() * previews.length)
            cy.get('.series-preview').eq(random).within(() => {
              cy.get('h3.header').should('exist')
              cy.get('.date').should('not.exist')
              cy.get('.excerpt').should('exist')
              cy.get('.tag-list').should('not.exist')
              cy.get('.post-preview-list').should('not.exist')
              cy.get('a').should('exist')
            })
          })
      })
    })
  })

  describe('<ContactForm />', () => {
    it('renders', () => {
      cy.get('.form').should('exist')
    })
  })
})