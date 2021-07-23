import { mainNav, secondaryNav, socialLinks } from '../../src/config.js'

describe('common components', () => {
  describe('<Nav />', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.injectAxe()
    })

    context('in the header', () => {
      it('renders all the links', () => {
        cy.get('header#site-header').find('nav').find('li a').should('have.length', mainNav.length)
        cy.checkA11y('header#site-header nav')
      })
    })

    context('in the footer', () => {
      it('renders all the links', () => {
        cy.get('footer#site-footer').find('nav').find('li a').should('have.length', secondaryNav.length)
        cy.checkA11y('footer#site-footer nav')
      })
    })
    
    context('different data shapes', () => {
      it('renders with only a name', () => {
        cy.get('footer#site-footer').find('nav').find('a').eq(1)
        .contains('styles')
        .should('have.attr', 'href', '/styles')
      })

      it('renders with only a name and href', () => {
        cy.get('footer#site-footer').find('nav').find('a').eq(0)
        .contains('changelog')
        .should('have.attr', 'href', '/changes')
      })

      // it('renders an external link', () => {
      //   cy.get('footer#site-footer').find('nav').find('a').eq(2)
      //   .contains('analytics')
      //   .should('have.attr', 'target', '_blank')
      // })
    })
  })

  describe('<SocialLinks />', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.injectAxe()
    })
    
    it('renders all the link', () => {
      cy.get('ul.social-list').find('li').should('have.length', socialLinks.length)
      cy.checkA11y('ul.social-list')
    })
  })

})
