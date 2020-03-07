context('<Heading /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })
  
  it('renders all headings correctly', () => {
    cy.get('div#headings')
    .within(() => {
      cy.get('h1#heading-level-1')
      .should('exist')
      .get('a[href="#heading-level-1"]')
      .click({force: true})
      cy.url().should('include', '#heading-level-1')
  
      cy.get('h2#heading-level-2')
      .should('exist')
      .get('a[href="#heading-level-2"]')
      .click({force: true})
      cy.url().should('include', '#heading-level-2')
  
      cy.get('h3#heading-level-3')
      .should('exist')
      .get('a[href="#heading-level-3"]')
      .click({force: true})
      cy.url().should('include', '#heading-level-3')
  
      cy.get('h4#heading-level-4')
      .should('exist')
      .get('a[href="#heading-level-4"]')
      .click({force: true})
      cy.url().should('include', '#heading-level-4')
  
      cy.get('h5#heading-level-5')
      .should('exist')
      .get('a[href="#heading-level-5"]')
      .click({force: true})
      cy.url().should('include', '#heading-level-5')
  
      cy.get('h6#heading-level-6')
      .should('exist')
      .get('a[href="#heading-level-6"]')
      .click({force: true})
      cy.url().should('include', '#heading-level-6')
    })
    
    cy.checkA11y()
  })
})
