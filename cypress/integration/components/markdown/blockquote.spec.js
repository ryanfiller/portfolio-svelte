describe('remark blockquote', () => {
  beforeEach(() => {
    cy.visit('/styles', { timeout: 15000 })
    cy.get('#blockquotes').scrollIntoView()
    cy.injectAxe()
  })
  
  it('renders markdown quotes correctly', () => {
    cy.get('#blockquotes').within(() => {        
      cy.get('blockquote').eq(0)
      .get('cite').should('exist')
      .get('hr').should('not.exist')
      .get('a').should('exist')
      cy.checkA11y('#blockquotes')
    })
  })
})
