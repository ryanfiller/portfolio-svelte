describe('rehype transformers', () => {
  const timeout = 15000
  
  beforeEach(() => {
    cy.injectAxe()
  })

  describe('remark blockquote', () => {
    before(() => {
      cy.visit('/styles/markdown', { timeout: 15000 })
    })

    it('renders markdown quotes correctly', () => {
      cy.get('#blockquotes', { timeout: timeout })
        .scrollIntoView()
        .within(() => {        
          cy.get('blockquote').eq(0)
          .get('cite').should('exist')
          .get('hr').should('not.exist')
          .get('a').should('exist')
        })
      cy.checkA11y('#blockquotes')
    })
  })

  describe('remark code', () => {
    before(() => {
      cy.visit('/styles/markdown', { timeout: 15000 })
    })

    it('renders markdown code correctly', () => {
      cy.get('#code', { timeout: timeout })
        .scrollIntoView()
        .matchImageSnapshot()
      cy.checkA11y('#code')
    })
  })

  describe('remark headings', () => {
    before(() => {
      cy.visit('/styles/markdown', { timeout: 15000 })
    })

    it('renders all headings correctly', () => {
      cy.get('#headings', { timeout: timeout })
        .scrollIntoView()
        .within(() => {
          // cy.get('h1#heading-level-1').should('exist')
          // .get('a[href="#heading-level-1"]').should('exist')
      
          cy.get('h2#heading-level-2').should('exist')
            .get('a[href="#heading-level-2"]').should('exist')
      
          cy.get('h3#heading-level-3').should('exist')
            .get('a[href="#heading-level-3"]').should('exist')
      
          cy.get('h4#heading-level-4').should('exist')
            .get('a[href="#heading-level-4"]').should('exist')
      
          cy.get('h5#heading-level-5').should('exist')
            .get('a[href="#heading-level-5"]').should('exist')
      
          cy.get('h6#heading-level-6').should('exist')
            .get('a[href="#heading-level-6"]').should('exist')
          })
      cy.checkA11y('#headings')
    })
  })

  describe('remark images', () => {
    before(() => {
      cy.visit('/styles/media', { timeout: 15000 })
    })
  
    it('renders the correct attributes', () => {
      cy.get('#images', { timeout: timeout })
        .scrollIntoView()
        .within(() => {
          cy.get('img').eq(0)
          .should('have.attr', 'alt', 'alt')
          .should('have.attr', 'title', 'title')
        })
  
      cy.get('#figures', { timeout: timeout })
        .scrollIntoView()
        .within(() => {
        cy.get('figure').eq(0).find('img')
          .should('have.attr', 'alt', 'alt')
          .should('have.attr', 'title', 'title')
        })
  
      cy.checkA11y('#images')
    })
  
    describe('image transformations', () => {
      it('adds query params to images', () => {
        cy.get('#images', { timeout: timeout })
          .scrollIntoView()
          .within(() => {
            cy.get('img').eq(0)
            .should('have.attr', 'src', '/placeholders/jpeg.jpg?nf_resize=fit&w=500')
            .should('have.attr', 'srcset', '/placeholders/jpeg.jpg?nf_resize=fit&w=500 500w, /placeholders/jpeg.jpg?nf_resize=fit&w=800 800w')
          })
  
        cy.get('#figures', { timeout: timeout })
          .scrollIntoView()
          .within(() => {
            cy.get('figure').eq(0).find('img')
            .should('have.attr', 'src', '/placeholders/jpeg.jpg?nf_resize=fit&w=500')
            .should('have.attr', 'srcset', '/placeholders/jpeg.jpg?nf_resize=fit&w=500 500w, /placeholders/jpeg.jpg?nf_resize=fit&w=800 800w')
          })
      })
  
      it('does not add query params to gifs', () => {
        cy.get('#gifs', { timeout: timeout })
          .scrollIntoView()
          .within(() => {
            cy.get('img').eq(0).should('have.attr', 'src', '/placeholders/gif.gif')
          })
      })
    })
  
    describe('render sizes and alignments', () => {
      context('at smaller screen sizes', () => {
        before(() => {
          cy.visit('/styles/media', { timeout: 15000 })
          cy.viewport(550, 600)
        })
    
        it('renders imgs', () => {
          cy.get('#images', { timeout: timeout })
            .scrollIntoView()
            .within(() => {
              // full
              cy.get('img[data-align="full"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
              // left
              cy.get('img[data-align="left"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
              // right
              cy.get('img[data-align="right"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
              // center
              cy.get('img[data-align="center"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
              // left small
              cy.get('img[data-align="left"][data-small="true"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
              // right small
              cy.get('img[data-align="right"][data-small="true"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
              // center small
              cy.get('img[data-align="center"][data-small="true"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
            })
          cy.checkA11y('#images')
        })
  
        it('renders figures', () => {
          cy.get('#figures', { timeout: timeout })
            .scrollIntoView()
            .within(() => {
              // full
              cy.get('figure[data-align="full"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
                .find('figcaption').contains('this is a full width image')
              // left
              cy.get('figure[data-align="left"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
                .find('figcaption').contains('this is a left aligned image')
              // right
              cy.get('figure[data-align="right"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
                .find('figcaption').contains('this is a right aligned image')
              // center
              cy.get('figure[data-align="center"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
                .find('figcaption').contains('this is a center aligned image')
              // left small
              cy.get('figure[data-align="left"][data-small="true"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
                .find('figcaption').contains('this is a left aligned, small image')
              // right small
              cy.get('figure[data-align="right"][data-small="true"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
                .find('figcaption').contains('this is a right aligned, small image')
              // center small
              cy.get('figure[data-align="center"][data-small="true"]')
                .should(() => { 'have.css', 'width', '526px' || 'have.css', 'width', '511px' })
                .find('figcaption').contains('this is a center aligned, small image')
            })
          cy.checkA11y('#figures')
        })
      })
    
      context('at larger screen sizes', () => {
        before(() => {
          cy.visit('/styles/media', { timeout: 15000 })
          cy.viewport(1000, 600)
        })
    
        it('renders imgs', () => {
          cy.get('#images', { timeout: timeout })
            .scrollIntoView()
            .within(() => {
              // full
              cy.get('img[data-align="full"]')
                .should('have.css', 'width', '684px')
              // left
              cy.get('img[data-align="left"]')
                .should('have.css', 'width', '342px', 'float', 'left')
              // right
              cy.get('img[data-align="right"]')
                .should('have.css', 'width', '342px', 'float', 'right')
              // center
              cy.get('img[data-align="center"]')
                .should('have.css', 'width', '342px', 'margin-left', '222px', 'margin-right', '222px')
              // left small
              cy.get('img[data-align="left"][data-small="true"]')
                .should('have.css', 'width', '180px')
              // right small
              cy.get('img[data-align="right"][data-small="true"]')
                .should('have.css', 'width', '180px')
              // center small
              cy.get('img[data-align="center"][data-small="true"]')
                .should('have.css', 'width', '180px', 'margin-left', '222px', 'margin-right', '222px')
            })
          cy.checkA11y('#images')
        })
  
        it('renders figures', () => {
          cy.get('#figures', { timeout: timeout })
            .scrollIntoView()
            .within(() => {
              // full
              cy.get('figure[data-align="full"]')
                .should('have.css', 'width', '684px')
                .find('figcaption').contains('this is a full width image')
              // left
              cy.get('figure[data-align="left"]')
                .should('have.css', 'width', '342px', 'float', 'left')
                .find('figcaption').contains('this is a left aligned image')
              // right
              cy.get('figure[data-align="right"]')
                .should('have.css', 'width', '342px', 'float', 'right')
                .find('figcaption').contains('this is a right aligned image')
              // center
              cy.get('figure[data-align="center"]')
                .should('have.css', 'width', '342px', 'margin-left', '222px', 'margin-right', '222px')
                .find('figcaption').contains('this is a center aligned image')
              // left small
              cy.get('figure[data-align="left"][data-small="true"]')
                .should('have.css', 'width', '180px')
                .find('figcaption').contains('this is a left aligned, small image')
              // right small
              cy.get('figure[data-align="right"][data-small="true"]')
                .should('have.css', 'width', '180px')
                .find('figcaption').contains('this is a right aligned, small image')
              // center small
              cy.get('figure[data-align="center"][data-small="true"]')
                .should('have.css', 'width', '180px', 'margin-left', '222px', 'margin-right', '222px')
                .find('figcaption').contains('this is a center aligned, small image')
            })
          cy.checkA11y('#figures')
        })
      })
    })  
  })

  describe('remark anchors', () => {
    before(() => {
      cy.visit('/styles/markdown', { timeout: 15000 })
    })

    it('renders correctly', () => {
      cy.get('#text', { timeout: timeout })
        .scrollIntoView()
        .within(() => {
          // internal relative link
          cy.get('a').eq(0)
            .should('have.attr', 'href', '/')
            .should('have.attr', 'title', 'https://www.ryanfiller.com')
          // internal absolute link
          cy.get('a').eq(1)
            .should('have.attr', 'href', '/blog')
            .should('have.attr', 'title', 'https://www.ryanfiller.com/blog')
          // external link
          cy.get('a').eq(2)
            .should('have.attr', 'href', 'https://sapper.svelte.dev')
            .should('have.attr', 'title', 'https://sapper.svelte.dev')
            .should('have.attr', 'target', '_blank')
            .should('have.attr', 'rel', 'noopener')
          // subdomain link
          cy.get('a').eq(3)
            .should('have.attr', 'href', 'https://colors.ryanfiller.com')
            .should('have.attr', 'title', 'https://colors.ryanfiller.com')
            .should('have.attr', 'target', '_blank')
            .should('have.attr', 'rel', 'noopener')
        })
      cy.checkA11y('#text')
    })
  })

  describe('remark videos', () => {
    before(() => {
      cy.visit('/styles/media', { timeout: 15000 })
    })
    
    it('renders the correct attributes', () => {
      cy.get('#videos', { timeout: timeout })
        .scrollIntoView()
        .within(() => {
          cy.get('video').eq(0).should('have.attr', 'title', 'title')
          cy.checkA11y('#videos')
        })
    })
    
    it('render sizes and alignments', () => {
      // just look for the attributes, the css is thoroughly tested in the image test
      cy.get('#videos', { timeout: timeout })
        .scrollIntoView()
        .within(() => {
          // full
          cy.get('figure[data-align="full"]').get('video').should('exist')
          // left
          cy.get('video[data-align="left"]').should('exist')
          // right
          cy.get('video[data-align="right"]').should('exist')
          // center
          cy.get('video[data-align="center"]').should('exist')
          // small
          cy.get('video[data-small="true"]').should('exist')
        })
    })  
  })  
})