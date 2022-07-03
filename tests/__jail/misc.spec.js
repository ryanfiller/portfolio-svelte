import { colors, themes } from '../../src/styles/config.js'
import { capitalize } from '../../src/helpers/index.js'

describe('random stuff', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('removes the data-no-js class from the body', () => {
    cy.get('.data-no-js').should('not.exist')
  })

  it('has all the cash money stuff', () => {
    cy.get('[data-goatcounter]').should('exist')
    cy.get('[name="monetization"]').should('exist')
    cy.get('[rel="webmention"]').should('exist')
    cy.get('[rel="pingback"]').should('exist')
  })
})

describe('css', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('sets the css color variables', () => {
    cy.document().then(document => {
      Object.entries(colors).map(color => {
        const [ name, value ] = color
        const cssVar = getComputedStyle(document.documentElement).getPropertyValue(`--color${capitalize(name)}`)
        expect(cssVar).to.have.string(value)
      })
    })
  })
  
  it('sets the theme variables', () => {
    // TODO - it would be cool to make sure that this works with both themes maybe?
    cy.document().then(document => {
      Object.keys(themes.light).map(color => {
        const cssVar = getComputedStyle(document.documentElement).getPropertyValue(`--color${capitalize(color)}`)
        expect(cssVar).to.not.equal('')
      })
    })
  })
})
