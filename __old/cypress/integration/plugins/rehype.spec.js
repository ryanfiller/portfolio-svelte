describe('rehype transformers', () => {
  const timeout = 15000

  describe('rehype iframe', () => {
    before(() => {
      cy.visit('/styles/media', { timeout: timeout })
      cy.injectAxe()
    })
    
    it('renders the iframes and at the correct sizes', () => {
      cy.get('#iframes', { timeout: timeout })
        .scrollIntoView()
        .within(() => {
          cy.get('.embed[data-aspect-ratio="full"]')
          .scrollIntoView()
          .should('have.css', 'padding-top', '627px')
          .get('iframe').should('exist')
      
          cy.get('.embed[data-aspect-ratio="16/9"]')
          .scrollIntoView()
          .should('have.css', 'padding-top', '384.75px')
          .get('iframe').should('exist')
      
          cy.get('.embed[data-aspect-ratio="4/3"]')
          .scrollIntoView()
          .should('have.css', 'padding-top', '513px')
          .get('iframe').should('exist')
      
          cy.checkA11y('#iframes')
        })
    })
  })
  
  describe('rehype twitter', () => {
    before(() => {
      cy.visit('/styles/markdown', { timeout: 15000 })
      cy.injectAxe()
    })
    
    it('renders twitter embeds correctly', () => {
      cy.get('#blockquotes', { timeout: timeout })
        .scrollIntoView()
        .within(() => {        
          cy.get('div.twitter-tweet').within(() => {        
            cy.get('.avatar')
              .should('have.attr', 'href', 'https://twitter.com/ryanfiller_')
              .get('img').should('exist')
            cy.get('.text').find('a').eq(0).should('have.text', 'Ryan Filler')
            cy.get('.text').find('a').eq(1).should('have.text', '@ryanfiller_')
            cy.get('.twitter-logo').should('exist')
            cy.get('.tweet').should('exist')
            cy.get('.date').should('have.text', 'May 10, 2020')
            cy.get('.info').find('svg').should('exist')
            cy.checkA11y('#blockquotes .twitter-tweet')
          })
      })
    })
  })
})