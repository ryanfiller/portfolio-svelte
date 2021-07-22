// const COLOR_SCHEME_LS_KEY = 'user-color-scheme'

describe('<Markdown /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })
  
  it('renders the markdown components', () => {
    cy.get('#content').scrollIntoView()

    cy.get('#content').within(() => {
      cy.get('#text').within(() => {
        cy.checkA11y('#text')
        // links
        cy.get('a').should('exist')
        cy.get('a[target="_blank"]').should('exist')
      })

      cy.get('#headings').within(() => {
        cy.checkA11y('#headings')
        cy.get('h1#heading-level-1').should('exist')
        cy.get('h2#heading-level-2').should('exist')
        cy.get('h3#heading-level-3').should('exist')
        cy.get('h4#heading-level-4').should('exist')
        cy.get('h5#heading-level-5').should('exist')
        cy.get('h6#heading-level-6').should('exist')
      })

      cy.get('#blockquotes').within(() => {
        cy.checkA11y('#blockquotes')
        cy.get('div.twitter-tweet').should('exist')
      })

      cy.get('#tables').within(() => {  
        cy.checkA11y('#tables')
      })

      cy.get('#images').within(() => {
        cy.checkA11y('#images')
        cy.get('img[data-align="full"]').should('exist')
        cy.get('img[data-align="left"]').should('exist')
        cy.get('img[data-align="right"]').should('exist')
        cy.get('img[data-align="center"]').should('exist')
        cy.get('img[data-small="true"]').should('exist')
      })

      cy.get('#figures').within(() => {
        cy.get('figure[data-align="full"]').should('exist')
        cy.get('figure[data-align="left"]').should('exist')
        cy.get('figure[data-align="right"]').should('exist')
        cy.get('figure[data-align="center"]').should('exist')
        cy.get('figure[data-small="true"]').should('exist')
      })

      cy.get('#iframes').within(() => {
        cy.checkA11y('#iframes')
        cy.get('.embed[data-aspect-ratio="full"]').should('exist')
        cy.get('.embed[data-aspect-ratio="16/9"]').should('exist')
        cy.get('.embed[data-aspect-ratio="4/3"]').should('exist')
      })  

      cy.get('#videos').within(() => {
        cy.checkA11y('#videos')
        cy.get('figure[data-align="full"]').get('video').should('exist')
        cy.get('video[data-align="left"]').should('exist')
        cy.get('video[data-align="right"]').should('exist')
        cy.get('video[data-align="center"]').should('exist')
        cy.get('video[data-small="true"]').should('exist')
      })
    })
  })

  // context('light theme code blocks', () => {
  //   beforeEach(() => {
  //     cy.setLocalStorage(COLOR_SCHEME_LS_KEY, 'light')
  //   })

  //   it('renders light code blocks', () => {
  //     cy.checkA11y('#code') // this blows up with focusable, scrollable text for some reason
  //     cy.get('#code').matchImageSnapshot()
  //   })
  // })

  // context('dark theme code blocks', () => {
  //   beforeEach(() => {
  //     cy.setLocalStorage(COLOR_SCHEME_LS_KEY, 'dark')
  //   })

  //   it('renders dark code blocks', () => {
  //     cy.checkA11y('#code') // this blows up with focusable, scrollable text for some reason
  //     cy.get('#code').matchImageSnapshot()
  //   })
  // })
})
