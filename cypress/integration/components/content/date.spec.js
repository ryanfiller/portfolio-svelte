describe('<Date /> component', () => {  
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
