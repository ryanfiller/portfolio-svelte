context('<DefaultBanner /> component', () => {  
  beforeEach(() => {
    cy.injectAxe()
  })

  it('renders an h1 and the metadata', () => {
    cy.visit('/blog')
    cy.get('article.post').eq(0).find('header > a').click()
    cy.get('.banner').within(() => {
      cy.get('h1').should('exist')
      cy.get('.meta.banner__date').should('exist')
      cy.get('.meta.banner__tags').should('exist')
    })
  })

  it('renders the grid layout at large size', () => {
    cy.viewport(1000, 600)
    cy.get('.banner').find('.banner__content').eq(0)
      .should('have.css', 'display')
      .and('match', /grid/) 
  })
})
