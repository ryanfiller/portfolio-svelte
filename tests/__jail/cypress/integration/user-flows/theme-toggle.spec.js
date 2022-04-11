const LS_KEY = 'user-color-scheme'

describe('user color scheme', () => {
  beforeEach(() => {
    cy.visit('/')
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

  it('toggles the theme back and forth', async () => {
    const getOpposite = (mode = 'dark') => mode === 'dark' ? 'light' : 'dark'
    const getTheme = async () => {
      let theme
      await cy.get('.color-scheme-toggle')
        .then(button => {
          theme = button[0].title.match(/toggle (.+) mode/)[1]
          console.log('theme?', theme)
      })
      return theme
    }

    const originalTheme = await getTheme()

    cy.get('.color-scheme-toggle').click()
    const newTheme = await getTheme()
    expect(newTheme).to.equal(getOpposite(originalTheme))
    
    cy.get('.color-scheme-toggle').click()
    const newerTheme = await getTheme()
    expect(newerTheme).to.equal(originalTheme)
  })
})