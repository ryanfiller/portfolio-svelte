context('<Change /> component', () => {
  beforeEach(() => {
    cy.visit('/changes')
    cy.injectAxe()
  })
  
  it('renders correctly', () => {
    cy.get('section.change').within(() => {
      cy.get('h2 > a').should('exist')
      cy.get('div').should('exist')
      cy.get('summary').should('exist')
    })
    cy.checkA11y()
  })

  it('should be closed by default', () => {
    cy.get('section.change > details[open]').should('not.exist')
    cy.get('details > ul').should('not.be.visible')
  })

  it('should open when the toggle clicked', () => {
    cy.get('section.change').first().within(() => {
      cy.get('summary').click()
      cy.get('details[open]').should('exist')
      cy.get('details > ul').should('be.visible')
    })
    cy.checkA11y()
  })
})