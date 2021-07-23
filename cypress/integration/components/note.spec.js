describe('<Note /> component', () => {
  const timeout = 15000

  beforeEach(() => {
    cy.visit('/styles/components', { timeout: timeout })
    cy.get('#note', { timeout: timeout }).scrollIntoView()
    cy.injectAxe()
  })
  
  it('renders correctly', () => {
    cy.get('section.note').within(() => {
      cy.get('header').should('exist')
      cy.get('.content').should('exist')
    })
    cy.checkA11y('section.note')
  })

  it('should close with the x', () => {
    cy.get('section.note').within(() => {
      cy.get('label').click({ force: true })
    })
    cy.get('section.note').should('not.exist')
  })
})