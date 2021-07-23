describe('lab item', () => {
  const postInfo = {}

  before(() => {
    cy.visit(`/lab`)
    cy.get('.post-preview')
      .then((preview) => {
        // convert to an array
        return preview.toArray()
      })
      .then((previews) => {
        // get a random one
        const random = Math.floor(Math.random() * previews.length)

        // get its post info
        cy.get('.post-preview').eq(random).find('.header').invoke('text').then(text => postInfo.title = text)
        cy.get('.post-preview').eq(random).find('.excerpt').invoke('text').then(text => postInfo.excerpt = text)

        postInfo.keywords = []
        cy.get('ul.categories').eq(random).within(() => {
          cy.get('li').each(li => postInfo.keywords.push(li.text()))
        })
        cy.get('ul.tags').eq(random).within(() => {
          cy.get('li').each(li => postInfo.keywords.push(li.text()))
        })

        // click it
        cy.get('.post-preview').eq(random).find('a').eq(0)
          .should('have.attr', 'href')
          .then((href) => cy.visit(href))

        console.log('POST INFO', postInfo)
      })

    cy.injectAxe()
  })

  it('is accessible', () => {
    cy.checkA11y()
  })

  describe('<SEO />', () => {
    it('has the social media tags', () => {
      cy.title().then(title => {
        title.includes(`${postInfo.title} | ryanfiller.com`)
      })

      cy.document().get('head').within(() => {
        cy.get('meta[name="description"]')
          .should('have.attr', 'content', postInfo.excerpt)
          
        cy.get('meta[name="keywords"]')
          .should('have.attr', 'content', postInfo.keywords.join(', '))

        // social media
        // cy.get('meta[name="twitter:site"]').should('exist')
        // cy.get('meta[name="twitter:creator"]').should('exist')
        // cy.get('meta[name="twitter:url"]').should('exist')
        // cy.get('meta[name="twitter:title"]').should('exist')
        // cy.get('meta[name="twitter:description"]').should('exist')
        // cy.get('meta[name="twitter:card"]').should('exist')
        // cy.get('meta[name="twitter:image"]').should('exist')
        // cy.get('meta[name="twitter:image"]').should('exist')
        // cy.get('meta[property="og:locale"]').should('exist')
        // cy.get('meta[property="og:site_name"]').should('exist')
        // cy.get('meta[property="og:title"]').should('exist')
        // cy.get('meta[property="og:description"]').should('exist')
        // cy.get('meta[property="og:url"]').should('exist')
        // cy.get('meta[property="og:type"]').should('exist')
        // cy.get('meta[property="og:image"]').should('exist')
        // cy.get('meta[property="og:image"]').should('exist')
        // cy.get('meta[property="og:image"]').should('exist')
        // cy.get('meta[property="og:image"]').should('exist')
        // cy.get('meta[property="og:type"]').should('exist')
      })
    })
  })

  it('renders layout correctly', () => {
    cy.checkHeaderElements([
      '.logo',
      '.nav',
      '.options',
      '.tag-list',
    ], [
      '.date',
      'figure'
    ])
    cy.checkFooterElements([
      '.text',
      '.social-list',
      '.nav'
    ])
  })
})