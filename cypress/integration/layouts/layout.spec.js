describe('_layout', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('removes the data-no-js class from the body', () => {
    // I really should test what it does when this IS on...
    cy.get('.data-no-js').should('not.exist')
  })

  it('has all the cash money stuff', () => {
    cy.get('[data-goatcounter]').should('exist')
    cy.get('[name="monetization"]').should('exist')
    cy.get('[rel="webmention"]').should('exist')
    cy.get('[rel="pingback"]').should('exist')
  })

  // TODO with 0.28 - make sure segments are correct
})
