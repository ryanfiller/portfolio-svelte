context('<Markdown /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })
  
  it('renders the MDX components', () => {
    cy.get('main#content').within(() => {
      // <Link />
      cy.get('a').should('exist')
      cy.get('a[target="_blank"]').should('exist')

      // <Heading />
      cy.get('h1#heading-level-1').should('exist')
      cy.get('h2#heading-level-2').should('exist')
      cy.get('h3#heading-level-3').should('exist')
      cy.get('h4#heading-level-4').should('exist')
      cy.get('h5#heading-level-5').should('exist')
      cy.get('h6#heading-level-6').should('exist')
      
      // <Embed />
      cy.get('.embed[data-aspect-ratio="full"]').should('exist')
      cy.get('.embed[data-aspect-ratio="16/9"]').should('exist')
      cy.get('.embed[data-aspect-ratio="4/3"]').should('exist')

      // <Image />
      cy.get('img.image--full').should('exist')
      cy.get('img.image--left').should('exist')
      cy.get('img.image--right').should('exist')
      cy.get('img.image--center').should('exist')
      cy.get('img.image--left.image--small').should('exist')
      cy.get('img.image--right.image--small').should('exist')
      cy.get('img.image--center.image--small').should('exist')

      cy.get('figure.image--full').should('exist')
      cy.get('figure.image--left').should('exist')
      cy.get('figure.image--right').should('exist')
      cy.get('figure.image--center').should('exist')
      cy.get('figure.image--left.image--small').should('exist')
      cy.get('figure.image--right.image--small').should('exist')
      cy.get('figure.image--center.image--small').should('exist')
    })
    
    cy.checkA11y()
  })
})
