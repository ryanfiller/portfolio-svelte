describe('<SEO /> component', () => {
  it('renders the default info', () => {
    cy.visit('/')
    cy.title().should('eq', 'ryanfiller.com')
    cy.document()
    .get('head meta[name="author"]')
      .should('have.attr', 'content', '@ryanfiller_')
    cy.document().get('head meta[name="description"]')
      .should('have.attr', 'content', 'I am a designer, developer, illustrator, and maker living and working in Memphis, Tennessee. This is my blog and portfolio.')
  })

  it('renders the 404 page correctly', () => {
    cy.visit('/404', { failOnStatusCode: false })
      cy.title().should('eq', 'Error - 404 | ryanfiller.com')
    cy.document().get('head meta[name="description"]')
      .should('have.attr', 'content', 'I am a designer, developer, illustrator, and maker living and working in Memphis, Tennessee. This is my blog and portfolio.')
  })

  it('renders a root page correctly', () => {
    cy.visit('/about')
      cy.title().should('eq', 'About | ryanfiller.com')
      
    cy.document().get('head meta[name="description"]')
      .should('have.attr', 'content', 'I am a designer, developer, illustrator, and maker living and working in Memphis, Tennessee. This is my blog and portfolio.')
  })

  it('renders the post information', () => {
    cy.visit('/blog')
    
    const posts = []

    cy.get('article.post').each((article, index) => {
      const obj = {}
      cy.get('.post__header').eq(index).invoke('text').then(text => obj.title = text)
      cy.get('.post__excerpt').eq(index).invoke('text').then(text => obj.excerpt = text)
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

      cy.get('article.post').eq(random).find('header > a')
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

  // TODO - need to test twitter / og images whenever that gets sorted
})
