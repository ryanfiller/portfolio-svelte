const LS_KEY = 'user-color-scheme'

describe('<ColorSchemeToggle /> component', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })
  
  it('renders correctly', () => {
    cy.checkA11y('.color-scheme-toggle-button')
  })

  context('when a user does not have an existing preference', () => {
    beforeEach(() => {
      cy.clearLocalStorage()
      cy.visit('/')
    })

    it('sets a data attribute', () => {
      cy.get('[data-user-color-scheme]').should('exist')
    })
  })

  context('when a user does have an existing preference', () => {
    context('light theme', () => {
      beforeEach(() => {
        cy.setLocalStorage(LS_KEY, 'light')
        cy.visit('/')
      })

      it('renders light mode', () => {
        cy.document().then(document => {
          const theme = document.documentElement.attributes['data-user-color-scheme'].value
          expect(theme).to.equal('light')
          const style = document.documentElement.attributes['style'].value
          expect(style).to.equal('--user-color-scheme:light;')
        })
      })
    })

    context('dark theme', () => {
      beforeEach(() => {
        cy.setLocalStorage(LS_KEY, 'dark')
        cy.visit('/')
      })

      it('renders dark mode', () => {
        cy.document().then(document => {
          const theme = document.documentElement.attributes['data-user-color-scheme'].value
          expect(theme).to.equal('dark')
          const style = document.documentElement.attributes['style'].value
          expect(style).to.equal('--user-color-scheme:dark;')
        })
      })
    })
  })

  it('toggles the theme back and forth', () => {
    const getOpposite = (mode = 'dark') => mode === 'dark' ? 'light' : 'dark'
    let originalTheme
    let newTheme
    cy.get('.color-scheme-toggle-button')
      .then(button => {
        originalTheme = button[0].title.match(/toggle (.+) mode/)[1]
        button.click()
      })
      .then(button => {
        newTheme = button[0].title.match(/toggle (.+) mode/)[1]
        expect(newTheme).to.equal(getOpposite(originalTheme))
        button.click()
      })
      .then(button => {
        newTheme = button[0].title.match(/toggle (.+) mode/)[1]
        expect(newTheme).to.equal(originalTheme)
      })
  })
})