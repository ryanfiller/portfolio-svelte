context('<ColorChart /> component', () => {
  // actual functionality is tested in the npm package
  
  context('default chart', () => {
    beforeEach(() => {
      cy.visit('/styles')
      cy.get('#colors').scrollIntoView()
      cy.injectAxe()
    })

    it('renders correctly', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('table').should('exist')
        cy.get('tr').should('have.length', 4)
      })
      cy.checkA11y()
    })
  })

  context('editable chart', () => {
    beforeEach(() => {
      cy.visit('/lab/color-contrast-table')
      cy.injectAxe()
    })

    it('renders correctly', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('input[type="color"]').should('have.length', 4)
      })
      cy.checkA11y()
    })

    it('correctly sets new colors', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('input[type=color]').eq(0)
          .invoke('val', '#00ff00')
          .trigger('input')
        // annoying that it converts hex to rgb, but whatever...
        cy.get('tr').eq(0).should('have.css', 'background-color', 'rgb(0, 255, 0)')
      })
      
      // refresh the page, reset the theme colors
      cy.reload()
    })
  })
})
