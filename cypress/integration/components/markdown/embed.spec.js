context('<Embed /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })
  
  it('renders the iframes and at the correct sizes', () => {
    cy.get('.embed[data-aspect-ratio="full"]')
    .should('have.css', 'padding-top', '627px')
    .get('iframe').should('exist')

    cy.get('.embed[data-aspect-ratio="16/9"]')
    .should('have.css', 'padding-top', '411.75px')
    .get('iframe').should('exist')

    cy.get('.embed[data-aspect-ratio="4/3"]')
    .should('have.css', 'padding-top', '549px')
    .get('iframe').should('exist')

    cy.checkA11y()
  })
})
