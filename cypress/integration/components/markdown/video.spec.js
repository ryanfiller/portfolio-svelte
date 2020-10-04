context('remark videos', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })

  it('renders the correct attributes', () => {
    cy.get('div#videos').within(() => {
      cy.get('video').eq(0)
      .should('have.attr', 'title', 'title')
  
      cy.checkA11y()
    })
  })


  it('render sizes and alignments', () => {
    // just look for the attributes, the css is thoroughly tested in the image test
    cy.get('div#videos').within(() => {
      // full
      cy.get('figure[data-align="full"]').get('video').should('exist')
      // left
      cy.get('video[data-align="left"]').should('exist')
      // right
      cy.get('video[data-align="right"]').should('exist')
      // center
      cy.get('video[data-align="center"]').should('exist')
      // small
      cy.get('video[data-small="true"]').should('exist')
    })
  })  
})
