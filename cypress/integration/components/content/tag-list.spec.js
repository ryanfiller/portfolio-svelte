describe('<TagList /> component', () => {
  context('where categories are used', () => {
    beforeEach(() => {
      cy.visit('/blog')
      cy.injectAxe()
    })

    it('renders categories', () => {
      cy.get('.tag-list ul.categories').get('li').its('length').should('be.gt', 0)
    })
  })

  context('where tags are used', () => {
    beforeEach(() => {
      cy.visit('/blog')
      cy.injectAxe()
    })

    it('renders tags', () => {
      cy.get('.tag-list ul.categories').get('li').its('length').should('be.gt', 0)
    })
  })
})
