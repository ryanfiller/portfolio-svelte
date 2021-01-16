import { colors, themes } from '../../../../src/styles.js'
import { capitalize, getCustomProperty } from '../../../../src/helpers/index.js'

describe('<Styles /> component', () => {
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
