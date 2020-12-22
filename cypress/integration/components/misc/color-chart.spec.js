import { colors } from '../../../../src/styles.js'

describe('<ColorChart /> component', () => {
  // actual functionality is tested in the npm package
  
  beforeEach(() => {
    cy.visit('/styles')
    cy.get('#colors').scrollIntoView()
  })

  afterEach(() => {
    // refresh the page, reset the theme colors
    cy.reload()
  })
  
  describe('rendering', () => {
    it('renders all correctly', () => {
      cy.get('section.color-chart').within(() => {
        cy.get('#show-all-colors').click()
        cy.get('table').should('exist')
        cy.get('tr').should('have.length', Object.entries(colors).length)
      })
    })
  })

  context('light theme', () => {
    beforeEach(() => {
      cy.setColorScheme('light')
    })

    it('renders the light colors', () => {
      cy.get('#colors').within(() => {
        cy.wait(500) // wait for scroll animation to finish
        cy.get('table').matchImageSnapshot()
      })
    })
  })

  context('dark theme', () => {
    beforeEach(() => {
      cy.setColorScheme('dark')
    })

    it('renders the dark colors', () => {
      cy.get('#colors').within(() => {
        cy.wait(500) // wait for scroll animation to finish
        cy.get('table').matchImageSnapshot()
      })
    })
  })

  it('correctly shows all colors', () => {
    cy.get('#colors').within(() => {
      cy.get('#show-all-colors').click()
      cy.wait(500) // wait for scroll animation to finish
      cy.get('table').matchImageSnapshot()
    })
  })

  it('correctly sets new colors', () => {
    cy.get('section.color-chart').within(() => {
      cy.get('input[type=color]').eq(0)
        .invoke('val', '#00ff00')
        .trigger('input')
      // annoying that it converts hex to rgb, but whatever...
      cy.get('tr').eq(0).should('have.css', 'background-color', 'rgb(0, 255, 0)')
    })
  })
})
