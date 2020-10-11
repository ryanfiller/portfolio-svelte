context('<Markdown /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })
  
  it('renders the markdown components', () => {
    cy.get('#content').scrollIntoView()
    cy.get('#content').within(() => {
      // links
      cy.get('a').should('exist')
      cy.get('a[target="_blank"]').should('exist')

      // text?

      // headings
      cy.get('h1#heading-level-1').should('exist')
      cy.get('h2#heading-level-2').should('exist')
      cy.get('h3#heading-level-3').should('exist')
      cy.get('h4#heading-level-4').should('exist')
      cy.get('h5#heading-level-5').should('exist')
      cy.get('h6#heading-level-6').should('exist')

      // blockquotes
      cy.get('div.twitter-tweet').should('exist')

      // tables

      // images
      cy.get('img[data-align="full"]').should('exist')
      cy.get('img[data-align="left"]').should('exist')
      cy.get('img[data-align="right"]').should('exist')
      cy.get('img[data-align="center"]').should('exist')
      cy.get('img[data-small="true"]').should('exist')

      // iframes
      cy.get('.embed[data-aspect-ratio="full"]').should('exist')
      cy.get('.embed[data-aspect-ratio="16/9"]').should('exist')
      cy.get('.embed[data-aspect-ratio="4/3"]').should('exist')

      cy.get('figure[data-align="full"]').should('exist')
      cy.get('figure[data-align="left"]').should('exist')
      cy.get('figure[data-align="right"]').should('exist')
      cy.get('figure[data-align="center"]').should('exist')
      cy.get('figure[data-small="true"]').should('exist')

      // videos
      cy.get('figure[data-align="full"]').get('video').should('exist')
      cy.get('video[data-align="left"]').should('exist')
      cy.get('video[data-align="right"]').should('exist')
      cy.get('video[data-align="center"]').should('exist')
      cy.get('video[data-small="true"]').should('exist')
    })
    
    cy.checkA11y()
  })
})
