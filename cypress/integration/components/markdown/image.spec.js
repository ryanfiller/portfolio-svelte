context('<Image /> component', () => {
  beforeEach(() => {
    cy.visit('/styles')
    cy.injectAxe()
  })

  it('renders the correct attributes', () => {
    cy.get('img.image').eq(0)
    .should('have.attr', 'alt', 'alt')
    .should('have.attr', 'title', 'title')

    cy.get('figure.image').eq(0).find('img')
    .should('have.attr', 'alt', 'alt')
    .should('have.attr', 'title', 'title')

    cy.checkA11y()
  })

  context('image transformations', () => {
    it('adds query params to images', () => {
      cy.get('img.image').eq(0)
      .should('have.attr', 'src', '/images/uploads/_placeholder.jpg?nf_resize=fit&w=1000')
      .should('have.attr', 'srcSet', '/images/uploads/_placeholder.jpg?nf_resize=fit&w=500 500w, /images/uploads/_placeholder.jpg?nf_resize=fit&w=800 800w')

      cy.get('figure.image').eq(0).find('img')
      .should('have.attr', 'src', '/images/uploads/_placeholder.jpg?nf_resize=fit&w=1000')
      .should('have.attr', 'srcSet', '/images/uploads/_placeholder.jpg?nf_resize=fit&w=500 500w, /images/uploads/_placeholder.jpg?nf_resize=fit&w=800 800w')
    })

    it('does not add query params to gifs', () => {
      cy.get('div#gifs').within(() => {
        cy.get('img').eq(0).should('have.attr', 'src', '/images/uploads/_placeholder.gif')
      })
    })
  })

  context('render sizes and alignments', () => {
    context('at smaller screen sizes', () => {
      beforeEach(() => {
        cy.viewport(550, 600)
      })
  
      it('renders imgs', () => {
        cy.get('div#imgs').within(() => {
          // full
          cy.get('img.image--full').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          // left
          cy.get('img.image--left').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          // right
          cy.get('img.image--right').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          // center
          cy.get('img.image--center').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          // left small
          cy.get('img.image--left.image--small').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          // right small
          cy.get('img.image--right.image--small').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          // center small
          cy.get('img.image--center.image--small').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
        })
      })

      it('renders figures', () => {
        cy.get('div#figures').within(() => {
          // full
          cy.get('figure.image--full').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          .find('figcaption').contains('this is a full width image')
          // left
          cy.get('figure.image--left').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          .find('figcaption').contains('this is a left aligned image')
          // right
          cy.get('figure.image--right').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          .find('figcaption').contains('this is a right aligned image')
          // center
          cy.get('figure.image--center').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          .find('figcaption').contains('this is a center aligned image')
          // left small
          cy.get('figure.image--left.image--small').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          .find('figcaption').contains('this is a left aligned, small image')
          // right small
          cy.get('figure.image--right.image--small').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          .find('figcaption').contains('this is a right aligned, small image')
          // center small
          cy.get('figure.image--center.image--small').should(() => {
            'have.css', 'width', '526px' || 'have.css', 'width', '511px'
          })
          .find('figcaption').contains('this is a center aligned, small image')
        })
      })
    })
  
    context('at larger screen sizes', () => {
      beforeEach(() => {
        cy.viewport(1000, 600)
      })
  
      it('renders imgs', () => {
        cy.get('div#imgs').within(() => {
          // full
          cy.get('img.image--full').should('have.css', 'width', '732px')
          // left
          cy.get('img.image--left').should('have.css', 'width', '366px', 'float', 'left')
          // right
          cy.get('img.image--right').should('have.css', 'width', '366px', 'float', 'right')
          // center
          cy.get('img.image--center').should('have.css', 'width', '366px', 'margin-left', '222px', 'margin-right', '222px')
          // left small
          cy.get('img.image--left.image--small').should('have.css', 'width', '180px')
          // right small
          cy.get('img.image--right.image--small').should('have.css', 'width', '180px')
          // center small
          cy.get('img.image--center.image--small').should('have.css', 'width', '180px', 'margin-left', '222px', 'margin-right', '222px')
        })
        cy.checkA11y()
      })

      it('renders figures', () => {
        cy.get('div#figures').within(() => {
          // full
          cy.get('figure.image--full').should('have.css', 'width', '732px')
          .find('figcaption').contains('this is a full width image')
          // left
          cy.get('figure.image--left').should('have.css', 'width', '366px', 'float', 'left')
          .find('figcaption').contains('this is a left aligned image')
          // right
          cy.get('figure.image--right').should('have.css', 'width', '366px', 'float', 'right')
          .find('figcaption').contains('this is a right aligned image')
          // center
          cy.get('figure.image--center').should('have.css', 'width', '366px', 'margin-left', '222px', 'margin-right', '222px')
          .find('figcaption').contains('this is a center aligned image')
          // left small
          cy.get('figure.image--left.image--small').should('have.css', 'width', '180px')
          .find('figcaption').contains('this is a left aligned, small image')
          // right small
          cy.get('figure.image--right.image--small').should('have.css', 'width', '180px')
          .find('figcaption').contains('this is a right aligned, small image')
          // center small
          cy.get('figure.image--center.image--small').should('have.css', 'width', '180px', 'margin-left', '222px', 'margin-right', '222px')
          .find('figcaption').contains('this is a center aligned, small image')
        })
      })
    })
  })  
})
