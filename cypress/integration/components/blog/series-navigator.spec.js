describe('<SeriesNavigator /> component', () => {
  context('when it should not exist', () => {
    beforeEach(() => {
      cy.visit('/blog/fighting-with-git-lfs')
    })

    it('does not render', () => {
      cy.get('.series-navigator.title').should('not.exist')
      cy.get('.series-navigator.buttons').should('not.exist')
    })
  })

  context('when it should exist', () => {
    beforeEach(() => {
      cy.visit('/blog/series')
      // navigate to the first post
      cy.get('.post-preview-list').find('a').eq(0)
        .should('have.attr', 'href')
        .then((href) => cy.visit(href))
      cy.injectAxe()
    })

    it('renders correctly', () => {
      cy.get('.series-navigator.title').contains('This is post 1 of')
      cy.get('.series-navigator.buttons').within(() => {
        cy.get('.previous').should('not.exist')
        cy.get('.next').should('exist')
      })
      // cy.checkA11y('.series-navigator.title')
      // cy.checkA11y('.series-navigator.buttons')
    })
  
    it('navigates forward and backwards', () => {
      cy.get('.series-navigator.buttons').within(() => {
        cy.get('.next').click()
      })
      cy.reload() // why???
      cy.get('.series-navigator.title').contains('This is post 2 of')
      cy.get('.series-navigator.buttons').within(() => {
        cy.get('.previous').should('exist')
        cy.get('.previous').click()
      })
      cy.reload() // why???
      cy.get('.series-navigator.title').contains('This is post 1 of')
    })
  })
})