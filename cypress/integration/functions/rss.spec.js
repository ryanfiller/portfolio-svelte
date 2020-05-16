context('rss feed', () => {
  context('blog, #code', () => {
    it('has the correct metadata', () => {
      const metaTags = [
        'title',
        'description',
        'link',
        'lastBuildDate',
        'siteTitle',
        'siteUrl',
        'author',
        'headshot',
        'description',
        'about'
      ]
      cy.request('/blog/code.rss.xml')
      .then(({body}) => {
        metaTags.map(tag => {
          expect(body).to.have.string(`<${tag}>`)
          expect(body).to.have.string(`</${tag}>`)
        })
      })
    })

    it('has the correct items', () => {
      // TODO makes sure rss posts don't contain frontmatter
      const itemTags = [
        'title',
        'link',
        'category',
        'pubDate',
        'excerpt',
        'content:encoded'
      ]
      cy.request('/blog/code.rss.xml')
      .then(({body}) => {
        const items = body.match(/<item>(.|\n)*?<\/item>/g)
        expect(items).to.have.length.of.at.most(12)
        items.map(item => {
          itemTags.map(tag => {
            expect(item).to.have.string(`<${tag}>`)
            expect(item).to.have.string(`</${tag}>`)
          })
        })
      })
    })
  })
})