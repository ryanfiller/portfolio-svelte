describe('<PostPreview /> component', () => {
  beforeEach(() => {
    cy.visit('/blog')
    cy.injectAxe()
  })
  
  it('renders correctly', () => {
    cy.get('article.post-preview').within(() => {
      cy.get('.header').should('exist')
      cy.get('time').should('exist')
      cy.get('ul.categories').should('exist')
      cy.get('ul.tags').should('exist')
      cy.get('a').should('exist')
    })
    cy.checkA11y('article.post-preview')
  })

  context('when it should be an h2', () => {
    beforeEach(() => {
      cy.visit('/blog')
    })

    it('renders an h2', () => {
      cy.get('.content-list').eq(0).find('h2.header').should('exist')
    })
  })

  context('when it should be an h3', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('renders an h3', () => {
      cy.get('.content-list').eq(0).find('h3.header').should('exist')
    })
  })
})