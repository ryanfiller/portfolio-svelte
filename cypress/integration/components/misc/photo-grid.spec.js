describe('<PhotoGrid /> component', () => {
  
  beforeEach(() => {
    cy.visit('/blog/inktober-2020')
    cy.get('.photo-grid').scrollIntoView()
    cy.injectAxe()
  })
  
  it('renders initial images correctly', () => {
    cy.get('.photo-grid').within(() => {
      cy.get('figure').eq(0).should('not.have.class', 'active')
    })
    cy.checkA11y('.photo-grid')
  })

  it('opens and closes the lightbox', () => {
    cy.get('.photo-grid').within(() => {
      cy.get('figure').eq(0).find('button').eq(0).find('img').scrollIntoView().click() // button that wraps image
      cy.get('figure').eq(0).should('have.class', 'active')
      cy.checkA11y('figure')
      cy.get('figure').eq(0).find('button').eq(1).scrollIntoView().click() // close button
      cy.get('figure').eq(0).should('not.have.class', 'active')
      cy.checkA11y('figure')
    })
  })
})
