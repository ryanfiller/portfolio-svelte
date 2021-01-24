import { meta } from '../../../../src/config.js'

describe('<SEO /> component', () => {
  it('renders the default info', () => {
    cy.visit('/')
    cy.title().should('eq', 'ryanfiller.com')
    cy.document()
    .get('head meta[name="author"]')
      .should('have.attr', 'content', '@ryanfiller_')
    cy.document().get('head meta[name="description"]')
      .should('have.attr', 'content', meta.about)
  })

  it('renders the 404 page correctly', () => {
    cy.visit('/404', { failOnStatusCode: false })
      // cy.title().should('eq', 'Error - 404 | ryanfiller.com')
    cy.document().get('head meta[name="description"]')
      .should('have.attr', 'content', meta.about)
  })

  it('renders a root page correctly', () => {
    cy.visit('/about')
      cy.title().should('eq', 'About | ryanfiller.com')
      
    cy.document().get('head meta[name="description"]')
      .should('have.attr', 'content', meta.about)
  })

  it('renders the post information', () => {
    cy.visit('/blog')
    
    const posts = []

    cy.get('article.post-preview').each((_article, index) => {
      const obj = {}
      cy.get('.post-preview__header').eq(index).invoke('text').then(text => obj.title = text)
      cy.get('.post-preview__excerpt').eq(index).invoke('text').then(text => obj.excerpt = text)
      obj.keywords = []
      cy.get('ul.categories').eq(index).within(() => {
        cy.get('li').each(li => obj.keywords.push(li.text()))
      })
      cy.get('ul.tags').eq(index).within(() => {
        cy.get('li').each(li => obj.keywords.push(li.text()))
      })
      posts.push(obj)
    }).then(() => {
      const random = Math.floor(Math.random() * posts.length)

      cy.get('article.post-preview').eq(random).find('.post-preview__header > a')
      .should('have.attr', 'href')
      .then((href) => cy.visit(href))

      cy.title()
        .should('eq', `${posts[random].title} | ryanfiller.com`)
      cy.document().get('head meta[name="description"]')
        .should('have.attr', 'content', posts[random].excerpt)

      cy.document().get('head meta[name="keywords"]')
      .should('have.attr', 'content', posts[random].keywords.join(', '))
      
    })
  })

  describe('social media tags', () => {
    context('regular pages', () => {
      beforeEach(() => {
        cy.visit('/about')
      })

      it('renders the correct tags', () => {
        cy.get('head').snapshot()
      })
    })

    context('pages with images', () => {
      beforeEach(() => {
        cy.visit('/blog/automatic-social-share-images')
      })

      it('renders the correct tags', () => {
        cy.get('head').snapshot()
      })
    })
  })
})
