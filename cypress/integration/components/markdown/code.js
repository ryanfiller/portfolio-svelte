describe('remark code', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.get('#code').scrollIntoView()
    cy.injectAxe()
  })
  
  it('renders markdown quotes correctly', () => {
    cy.get('#code').matchImageSnapshot()
    cy.checkA11y('#code')
  })
})
