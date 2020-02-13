context('<PostPreview /> component', () => {
  beforeEach(() => {
    cy.visit('/blog')
    cy.injectAxe()
  })
  
  it('renders correctly', () => {
    cy.get('article.post').within(() => {
      cy.get('header > a').should('exist')
      cy.get('time').should('exist')
      cy.get('ul.meta__categories').should('exist')
      cy.get('ul.meta__tags').should('exist')
      cy.get('a.post__link').should('exist')
    })
    cy.checkA11y()
  })
})