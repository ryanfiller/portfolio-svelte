context('<ColorChart /> component', () => {
  // actual functionality is tested in the npm package
  
  context('default chart', () => {
    beforeEach(() => {
      cy.visit('/styles')
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
      cy.visit('/workshop/color-contrast-table')
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
        cy.get('input').eq(0).then(input => {
          cy.inputChange(input, '#00ff00')
        })
        // annoying that it converts hex to rgb, but whatever...
        cy.get('tr').eq(0).should('have.css', 'background-color', 'rgb(0, 255, 0)')
      })
      
      // refresh the page, reset the theme colors
      cy.reload()
    })
  })
})