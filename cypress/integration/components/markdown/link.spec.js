context('remark anchors', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })

  context('an internal relative link', () => {    
    it('renders correctly', () => {
      cy.get('div#text').within(() => {        
        cy.get('a').eq(0)
        .should('have.attr', 'href', '/')
        .should('have.attr', 'title', 'ryanfiller.com')
        cy.checkA11y()
      })
    })
  })

  context('an internal absolute link', () => {    
    it('renders correctly', () => {
      cy.get('div#text').within(() => {        
        cy.get('a').eq(1)
        .should('have.attr', 'href', '/blog')
        .should('have.attr', 'title', 'ryanfiller.com/blog')
        cy.checkA11y()
      })
    })
  })

  context('an external link', () => {    
    it('renders correctly', () => {
      cy.get('div#text').within(() => {        
        cy.get('a').eq(2)
        .should('have.attr', 'href', 'https://www.gatsbyjs.org')
        .should('have.attr', 'title', 'https://www.gatsbyjs.org')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener')
        cy.checkA11y()
      })
    })
  })

  context('a subdomain link', () => {    
    it('renders correctly', () => {
      cy.get('div#text').within(() => {        
        cy.get('a').eq(3)
        .should('have.attr', 'href', 'https://colors.ryanfiller.com')
        .should('have.attr', 'title', 'https://colors.ryanfiller.com')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener')
        cy.checkA11y()
      })
    })
  })
})
