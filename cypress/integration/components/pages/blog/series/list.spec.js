describe('blog series list', () => {
  before(() => {
    cy.visit(`/blog/series`)
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
    describe('series list', () => {
      it('renders the list correctly', () => {
        cy.get('.content-list').within(() => {
          cy.get('h2.title').should('not.exist')
          cy.get('.button').should('not.exist')
        })
      })

      it('renders the <SeriesPreview />', () => {
        cy.get('.series-preview')
          .then((preview) => {
            // convert to an array
            return preview.toArray()
          })
          .then((previews) => {
            // get a random one
            const random = Math.floor(Math.random() * previews.length)
            cy.get('.series-preview').eq(random).within(() => {
              cy.get('h3.header').should('exist')
              cy.get('.date').should('exist')
              cy.get('.excerpt').should('exist')
              cy.get('.tag-list').should('exist')
              cy.get('.post-preview-list').should('exist')
              cy.get('a').should('exist')
            })
          })
      })
    })
  })
})

// describe('/blog/series.json route', () => {
//   beforeEach(() => {
//     cy.request(`/blog/series.json`).as('series')
//   })

//   it('creates objects with the correct data shape', () => {
//     cy.get('@series').should((response) => {
//       expect(response.body[0]).to.have.property('posts')
//       expect(response.body[0]).to.have.property('title')
//       expect(response.body[0]).to.have.property('slug')
//       expect(response.body[0]).to.have.property('excerpt')
//     })
//   })

//   it('sorts correctly', () => {
//     // it sorts the posts by date
//     cy.get('@series').should((response) => {
//       const posts = response.body[0].posts
//       const dates = posts.map(post => post.meta.date)
//       dates.forEach((date, index) => {
//         if (index > 0) {
//           date = new Date(date).getTime()
//           const previousDate = new Date(dates[index - 1]).getTime()
//           expect(date > previousDate).to.be.true
//         }
//       })
//     })
    
//     // it sorts the series by latest post
//     // TODO 
//   })
// })