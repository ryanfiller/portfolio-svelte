context('<Banner /> component', () => {  
  it('does not render a banner on the homepage', () => {
    cy.visit('/')
    cy.get('.banner').should('not.exist')
  })

  it('renders the default page banner on subpages', () => {
    cy.visit('/about')
    cy.get('.banner--default').should('exist')
  })

  it('renders the blog banner on blog pages', () => {
    cy.visit('/blog')
    cy.get('article.post').eq(0).find('header > a').click()
    cy.get('.banner--blog').should('exist')
  })
})
