context('<ColorChart /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })

  // actual functionality is tested in the npm package
  
  context('default chart', () => {
    it('renders correctly', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('table').should('exist')
        cy.get('tr').should('have.length', 4)
      })
      cy.checkA11y()
    })
  })

  context('editable chart', () => {
    it('renders correctly', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('input[type="color"]').should('have.length', 4)
      })
      cy.checkA11y()
    })

    it('correctly sets new colors', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('input').eq(0)
          // trigger color change
          .as('color')
          .invoke('val', '#639639')
          .trigger('change')
          .should('have.value', '#639639')
      })
      
      // refresh the page, reset the theme colors
      cy.reload()
    })
  })
})