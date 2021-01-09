describe('/blog/series.json route', () => {
  beforeEach(() => {
    cy.request(`/blog/series.json`).as('series')
  })

  it('creates objects with the correct data shape', () => {
    cy.get('@series').should((response) => {
      expect(response.body[0]).to.have.property('posts')
      expect(response.body[0]).to.have.property('title')
      expect(response.body[0]).to.have.property('slug')
      expect(response.body[0]).to.have.property('excerpt')
    })
  })

  it('sorts correctly', () => {
    // it sorts the posts by date
    cy.get('@series').should((response) => {
      const posts = response.body[0].posts
      const dates = posts.map(post => post.meta.date)
      dates.forEach((date, index) => {
        if (index > 0) {
          date = new Date(date).getTime()
          const previousDate = new Date(dates[index - 1]).getTime()
          expect(date < previousDate).to.be.true
        }
      })
    })
    
    // it sorts the series by latest post
    // TODO 
  })
})