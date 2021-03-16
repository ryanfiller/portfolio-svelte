describe('<Date /> component', () => {  
  context('only one date', () => {
    beforeEach(() => {
      cy.visit('/blog')
      cy.injectAxe()
    })

    it('renders a <time>', () => {
      cy.get('time.date')
        .contains(/\w+ +\d{0,2}, +\d{0,4}/) // match January 30, 2020
        .should('have.attr', 'datetime')
        // /\d{0,4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/ 
        // match 2020-01-30T06:00:00.000Z
        // cypress can't regex match attributes yet
      cy.checkA11y('time.date')
    })
  })

  context('when a post has been updated', () => {
    beforeEach(() => {
      cy.visit('blog/automatic-social-share-images')
      cy.injectAxe()
    })

    it('renders two! <time>s!', () => {
      cy.get('time.date__initial')
        .contains(/\w+ +\d{0,2}, +\d{0,4}/) // match January 30, 2020
        .should('have.attr', 'datetime')
      cy.get('time.date__updated')
        .contains(/\w+ +\d{0,2}, +\d{0,4}/) // match January 30, 2020
        .should('have.attr', 'datetime')
      cy.checkA11y('div.date')
    })
  })
})
