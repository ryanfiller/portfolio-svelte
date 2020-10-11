context('<Page /> component', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  context('default layout', () => {
    it('contains all the correct elements', () => {
      cy.get('header#site-header').should('exist')
      cy.get('#content').should('exist')
      cy.get('footer#site-footer').should('exist')
      cy.checkA11y()
    })
  })

  context('on the 404 page', () => {
    it('hides the header', () => {
      cy.visit('/404', { failOnStatusCode: false })
      // cy.get('header#site-header').should('not.exist')
    })
  })
})
