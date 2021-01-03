import { socialLinks } from '../../../../src/config.js'

describe('<SocialLinks /> component', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })
  
  it('renders all the link', () => {
    cy.get('ul.social-list').find('li').should('have.length', socialLinks.length)
    cy.checkA11y('ul.social-list')
  })
})
