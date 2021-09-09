describe('lab list', () => {
  before(() => {
    cy.visit(`/lab`)
    cy.injectAxe()
  })

  it('is accessible', () => {
    cy.checkA11y()
  })

  describe('<SEO />', () => {
    // TODO
  })

  it('renders layout correctly', () => {
    cy.checkHeaderElements([
      '.logo',
      '.nav',
      '.options'
    ])
    cy.checkFooterElements([
      '.text',
      '.social-list',
      '.nav'
    ])
  })

  describe('<List />', () => {
    describe('post list', () => {
      it('renders the list correctly', () => {
        const list = cy.get('.content-list').eq(0)
        list.within(() => {
          cy.get('h2.title').should('not.exist')
          cy.get('.button').should('not.exist')
      })

      it('renders the <PostPreview />', () => {
        cy.get('.post-preview')
          .then((preview) => {
            // convert to an array
            return preview.toArray()
          })
          .then((previews) => {
            // get a random one
            const random = Math.floor(Math.random() * previews.length)
            cy.get('.post-preview').eq(random).within(() => {
              cy.get('h2.header').should('exist')
              cy.get('.date').should('exist')
              cy.get('.excerpt').should('exist')
              cy.get('.tag-list').within(() => {
                cy.get('.categories').should('exist')
                cy.get('.tags').should('exist')
              })
              cy.get('a').should('exist')
            })
          })
        })
      })
    })
  })

  describe('/lab modal', () => {
    it('shows the modal the first time, but not the second time', () => {
      cy.clearLocalStorage()
      cy.visit(`/lab`)
      cy.get('article.post-preview').eq(0).find('.header > a')
        .should('have.attr', 'href').then((href) => cy.visit(href))
      // cy.wait(500)
      cy.get('dialog.alert').should('exist')
      // click agree
      cy.get('dialog.alert').find('button').eq(0).click()
      // go back
      cy.visit(`/lab`)
      cy.get('article.post-preview').eq(1).find('.header > a')
        .should('have.attr', 'href').then((href) => cy.visit(href))
      // cy.wait(500)
      cy.get('dialog.alert').should('not.exist')
    })
  })
})