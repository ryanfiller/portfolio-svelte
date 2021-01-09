describe('<SeriesPreview /> component', () => {
  beforeEach(() => {
    cy.visit('/blog/series')
    cy.injectAxe()
  })
  
  it('renders correctly', () => {
    cy.get('article.series-preview').within(() => {
      cy.get('.post-preview__header').should('exist')
      cy.get('.post-preview__excerpt').should('exist')
    })
    cy.checkA11y('article.series-preview')
  })

  context('shows posts', () => {
    beforeEach(() => {
      cy.visit('/blog/series')
    })

    it('shows posts', () => {
      cy.get('article.series-preview').within(() => {
        cy.get('ul.post-preview-list').should('exist')
        // this currently catches the button in the post, needs to change up css for this to work
        // cy.get('a.post-preview__link').should('not.exist')
      })
    })
  })

  context('hides posts', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('hides posts', () => {
      cy.get('article.series-preview').within(() => {
        cy.get('ul.post-preview-list').should('not.exist')
        cy.get('a.post-preview__link').should('exist')
      })
    })
  })

  context('when it should be an h2', () => {
    beforeEach(() => {
      cy.visit('/blog/series')
    })

    it('renders an h2', () => {
      cy.get('.content-list').eq(0).find('h2.post-preview__header').should('exist')
    })
  })

  context('when it should be an h3', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('renders an h3', () => {
      cy.get('.content-list').eq(1).find('h3.post-preview__header').should('exist')
    })
  })
})
