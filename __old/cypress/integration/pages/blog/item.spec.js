// import { site } from '../../../../src/config.js'

describe('blog item', () => {
  const postInfo = {}

  before(() => {
    cy.visit(`/blog`)
    cy.get('.post-preview')
      .then((preview) => {
        // convert to an array
        return preview.toArray()
      })
      .then((previews) => {
        // get a random one
        const random = Math.floor(Math.random() * previews.length)

        // get its post info
        cy.get('.post-preview').eq(random).find('.header').invoke('text').then(text => postInfo.title = text)
        cy.get('.post-preview').eq(random).find('.excerpt').invoke('text').then(text => postInfo.excerpt = text)

        postInfo.keywords = []
        cy.get('ul.categories').eq(random).within(() => {
          cy.get('li').each(li => postInfo.keywords.push(li.text()))
        })
        cy.get('ul.tags').eq(random).within(() => {
          cy.get('li').each(li => postInfo.keywords.push(li.text()))
        })

        // click it
        cy.get('.post-preview').eq(random).find('a').eq(0)
          .should('have.attr', 'href')
          .then((href) => cy.visit(href))

        console.log('POST INFO', postInfo)
      })

    cy.injectAxe()
  })

  it('is accessible', () => {
    cy.checkA11y()
  })

  describe('<SEO />', () => {
    it('has the social media tags', () => {
      cy.title().then(title => {
        title.includes(`${postInfo.title} | ryanfiller.com`)
      })

      cy.document().get('head').within(() => {
        cy.get('meta[name="description"]')
          .should('have.attr', 'content', postInfo.excerpt)
          
        cy.get('meta[name="keywords"]')
          .should('have.attr', 'content', postInfo.keywords.join(', '))

        // social media
        cy.get('meta[name="twitter:site"]').should('exist')
        cy.get('meta[name="twitter:creator"]').should('exist')
        cy.get('meta[name="twitter:url"]').should('exist')
        cy.get('meta[name="twitter:title"]').should('exist')
        cy.get('meta[name="twitter:description"]').should('exist')
        cy.get('meta[name="twitter:card"]').should('exist')
        cy.get('meta[name="twitter:image"]').should('exist')
        cy.get('meta[name="twitter:image"]').should('exist')
        cy.get('meta[property="og:locale"]').should('exist')
        cy.get('meta[property="og:site_name"]').should('exist')
        cy.get('meta[property="og:title"]').should('exist')
        cy.get('meta[property="og:description"]').should('exist')
        cy.get('meta[property="og:url"]').should('exist')
        cy.get('meta[property="og:type"]').should('exist')
        cy.get('meta[property="og:image"]').should('exist')
        cy.get('meta[property="og:image"]').should('exist')
        cy.get('meta[property="og:image"]').should('exist')
        cy.get('meta[property="og:image"]').should('exist')
        cy.get('meta[property="og:type"]').should('exist')
      })
    })
  })

  it('renders layout correctly', () => {
    cy.checkHeaderElements([
      '.logo',
      '.nav',
      '.options',
      '.date',
      '.tag-list',
      'figure'
    ])
    cy.checkFooterElements([
      '.text',
      '.social-list',
      '.nav'
    ])
  })

  context('when a post has been updated', () => {
    before(() => {
      cy.visit('blog/automatic-social-share-images')
    })

    it('renders two! <time>s!', () => {
      cy.get('time.initial').should('have.attr', 'datetime')
      cy.get('time.updated').should('have.attr', 'datetime')
    })
  })

  describe('<SeriesNavigator /> component', () => {
    context('when it should not exist', () => {
      before(() => {
        cy.visit('/blog/fighting-with-git-lfs')
      })
  
      it('does not render', () => {
        cy.get('.series-navigator.title').should('not.exist')
        cy.get('.series-navigator.buttons').should('not.exist')
      })
    })
  
    context('when it should exist', () => {
      before(() => {
        cy.visit('/blog/series')
        // navigate to the first post
        cy.get('.post-preview-list').find('a').eq(0)
          .should('have.attr', 'href')
          .then((href) => cy.visit(href))
      })
  
      it('renders correctly', () => {
        cy.get('.series-navigator.title').contains('This is post 1 of')
        cy.get('.series-navigator.buttons').within(() => {
          cy.get('.previous').should('not.exist')
          cy.get('.next').should('exist')
        })
      })
    
      it('navigates forward and backwards', () => {
        cy.get('.series-navigator.buttons').within(() => {
          cy.get('.next').click({force: true})
        })
        cy.reload() // why???
        cy.get('.series-navigator.title').scrollIntoView()
        cy.get('.series-navigator.title').contains('This is post 2 of')
        cy.get('.series-navigator.buttons').within(() => {
          cy.get('.previous').should('exist')
          cy.get('.previous').click({force: true})
        })
        cy.reload() // why???
        cy.get('.series-navigator.title').scrollIntoView()
        cy.get('.series-navigator.title').contains('This is post 1 of')
      })
    })
  })
})