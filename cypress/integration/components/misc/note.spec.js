describe('<Note /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.get('#note').scrollIntoView()
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
      cy.get('label').click()
    })
    cy.get('section.note').should('not.exist')
  })
})