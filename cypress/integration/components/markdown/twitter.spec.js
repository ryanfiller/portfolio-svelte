context('rehype twitter', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })

  it('renders twitter embeds correctly', () => {
    cy.get('div#quotes').within(() => {        
      cy.get('div.twitter-tweet').within(() => {        
        cy.get('.account__avatar')
          .should('have.attr', 'href', 'https://twitter.com/ryanfiller_')
          .get('img').should('exist')
        cy.get('.account__text').find('a').eq(0).should('have.text', 'Ryan Filler')
        cy.get('.account__text').find('a').eq(1).should('have.text', '@ryanfiller_')
        cy.get('.twitter-logo').should('exist')
        cy.get('.tweet').should('exist')
        cy.get('.meta__date').should('have.text', 'May 10, 2020')
        cy.get('.meta__info').find('svg').should('exist')
        cy.checkA11y()
      })
    })
  })
})