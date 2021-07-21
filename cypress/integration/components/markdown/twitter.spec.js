describe('rehype twitter', () => {
  beforeEach(() => {
    cy.visit('/styles', { timeout: 15000 })
    cy.get('#blockquotes').scrollIntoView()
    cy.injectAxe()
  })

  it('renders twitter embeds correctly', () => {
    cy.get('#blockquotes').within(() => {        
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