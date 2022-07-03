import { defaultData } from '../../../src/stores/user.js'

const themeCombinations = [
  ['light', 'no-preference'],
  ['dark', 'no-preference'],
  ['light', 'more'],
  ['dark', 'more']
]

const autoCombinations = [
  ['auto', 'no-preference'],
  ['auto', 'more']
]

function stubMatchMedia(window, theme, contrast) {
  cy.stub(window, 'matchMedia')
    .withArgs('(prefers-color-scheme: dark)')
    .returns({
      matches: theme === 'dark',
      addEventListener: () => {}
    })
    .withArgs('(prefers-contrast: more)')
    .returns({
      matches: contrast === 'more',
      addEventListener: () => {}
    })
}

describe('theme controls', () => {
  // TODO needs-js
  // describe('no-js', () => { })

  describe('the @html <script/>', () => {
    it('has the expected stuff', () => {
      cy.visit('/')

      cy.get('[data-theme-controls-js]').then(script => {
        const text = script.text()
        expect(text).to.match(/THEME_ATTR =/)
        expect(text).to.match(/CONTRAST_ATTR =/)
        expect(text).to.match(/waitForLocalStorage =/)
        expect(text).to.match(/resolveInitialUserTheme =/)
        expect(text).to.match(/user =/)
      })
    })
  })

  describe('getting from OS preferences', () => {
    themeCombinations.forEach(([ theme, contrast ]) => {
      it(`theme: ${theme} \n contrast: ${contrast}`, () => {
        cy.visit('/', {
          onBeforeLoad(window) {
            stubMatchMedia(window, theme, contrast)
          }
        })

        cy.get(`html[data-user-theme=${theme}]`)
        cy.get(`html[data-user-contrast=${contrast}]`)
      })
    })
  })

  describe('getting from local storage', () => {
    [
      ...themeCombinations,
      ...autoCombinations
    ].forEach(([ theme, contrast ]) => {
      it(`theme: ${theme} \n contrast: ${contrast}`, () => {
        cy.visit('/', {
          onBeforeLoad(window) {
            const user = {
              ...defaultData,
              theme: theme,
              contrast: contrast
            }
            window.localStorage.setItem('user', JSON.stringify(user))
          }
        })

        cy.get(`html[data-user-theme=${theme}]`)
        cy.get(`html[data-user-contrast=${contrast}]`)
      })
    })
  })
  
  describe('user setting', () => {
    [
      ...themeCombinations,
      ...autoCombinations
    ].forEach(([ theme, contrast ]) => {
      it(`theme: ${theme} \n contrast: ${contrast}`, () => {
        cy.visit('/', {
          onBeforeLoad(window) {
            window.localStorage.setItem('user', JSON.stringify(defaultData))
          }
        })
        
        cy.get('#theme-controls').within(() => {
          // this test fails a lot because inputs are disabled
          cy.wait(100)

          cy.get('select#theme').select(theme)

          if(contrast === 'more') {
            cy.get('input#contrast').check()
          }
        })
        cy.get(`html[data-user-theme=${theme}]`)
        cy.get(`html[data-user-contrast=${contrast}]`)
      })
    })
  })
})
