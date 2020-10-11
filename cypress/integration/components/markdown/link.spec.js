context('remark anchors', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.get('#text').scrollIntoView()
    cy.injectAxe()
  })

  context('an internal relative link', () => {    
    it('renders correctly', () => {
      cy.get('#text').within(() => {        
        cy.get('a').eq(0)
        .should('have.attr', 'href', '/')
        .should('have.attr', 'title', 'https://www.ryanfiller.com')
        cy.checkA11y()
      })
    })
  })

  context('an internal absolute link', () => {    
    it('renders correctly', () => {
      cy.get('#text').within(() => {        
        cy.get('a').eq(1)
        .should('have.attr', 'href', '/blog')
        .should('have.attr', 'title', 'https://www.ryanfiller.com/blog')
        cy.checkA11y()
      })
    })
  })

  context('an external link', () => {    
    it('renders correctly', () => {
      cy.get('#text').within(() => {        
        cy.get('a').eq(2)
        .should('have.attr', 'href', 'https://sapper.svelte.dev')
        .should('have.attr', 'title', 'https://sapper.svelte.dev')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener')
        cy.checkA11y()
      })
    })
  })

  context('a subdomain link', () => {    
    it('renders correctly', () => {
      cy.get('#text').within(() => {        
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
