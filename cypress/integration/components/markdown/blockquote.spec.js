context('remark blockquote', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.get('#quotes').scrollIntoView()
    cy.injectAxe()
  })
  
  it('renders markdown quotes correctly', () => {
    cy.get('#quotes').within(() => {        
      cy.get('blockquote').eq(0)
      .get('cite').should('exist')
      .get('hr').should('not.exist')
      .get('a').should('exist')
      cy.checkA11y()
    })
  })
})
