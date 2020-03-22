context('<DefaultBanner /> component', () => {  
  beforeEach(() => {
    cy.injectAxe()
  })

  it('renders an h1 and the metadata', () => {
    cy.visit('/workshop')
    cy.get('article.post').eq(0).find('header > a').click()
    cy.get('.banner').within(() => {
      cy.get('h1').should('exist')
      cy.get('.meta.banner__tags').should('exist')
    })
  })
})