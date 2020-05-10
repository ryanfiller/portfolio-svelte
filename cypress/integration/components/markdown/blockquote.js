context('<Embed /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })
  
  it('renders markdown quotes correctly', () => {
    cy.get('div#quotes').within(() => {        
      cy.get('blockquote').eq(0)
      .get('cite').should('exist')
      .get('a').should('exist')
      cy.checkA11y()
    })
  })

  it('renders html quotes correctly', () => {
    cy.get('div#quotes').within(() => {        
      cy.get('blockquote').eq(1)
      .get('cite').should('exist')
      cy.checkA11y()
    })
  })

  it('renders twitter embeds correctly', () => {
    cy.get('div#quotes').within(() => {        
      cy.get('a.blockquote__flag').should('exist')
      cy.get('blockquote.twitter-tweet').eq(0)
      .get('p').should('exist')
      .get('a.link').should('exist')
      cy.checkA11y()
    })
  })
})
