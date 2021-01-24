describe('<List /> component', () => {  
  afterEach(() => {
    cy.injectAxe()
    cy.checkA11y('.content-list')
  })

  it('renders', () => {
    cy.visit('/blog')
    cy.get('.content-list').within(() => {
      cy.get('ul').within(() => {
        cy.get('li').should('exist')
      })
    })
  })

  it('renders headers and elements', () => {
    cy.visit('/')
    cy.get('.content-list').eq(0).within(() => {
      cy.get('h2').should('exist')
      cy.get('a.button').should('exist')
      cy.get('ul').within(() => {
        cy.get('li').within(() => {
          cy.get('h3').should('exist')
        })
      })
    })
  })

  it('renders different list components', () => {
    cy.visit('/')
    cy.get('.content-list').eq(0).within(() => {
      cy.get('article.post-preview').should('exist')
    })

    cy.get('.content-list').eq(1).within(() => {
      cy.get('article.series-preview').should('exist')
    })
  })
})