context('<LabBanner /> component', () => {  
  beforeEach(() => {
    cy.injectAxe()
  })

  it('renders an h1 and the metadata', () => {
    cy.visit('/lab')
    cy.get('article.post').eq(0).find('header > a').invoke('attr', 'href')
      .then(href => cy.visit(href))
    cy.get('.banner').within(() => {
      cy.get('h1').should('exist')
      cy.get('.meta__tags').should('exist')
    })
  })
})