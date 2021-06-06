describe('/blog/rss.xml', () => {
  context('no filter', () => {
    it('has the correct <channel> tags', () => {
      const metaTags = [
        'lastBuildDate',
        'title',
        'description',
        'link',
        'managingEditor',
        'webMaster',
        'image',
          'url',
          'title',
          'link',
        'generator',
        'atom:link'
      ]
      cy.request('/blog/rss.xml')
        .then(({body}) => {
          metaTags.map(tag => {
            expect(body).to.have.string(`<${tag}`) // intentionally don't close this tag here
            expect(body).to.have.string(`</${tag}>`)
          })
        })
    })

    it('has the correct <item> tags', () => {
      const itemTags = [
        'title',
        'enclosure',
        'link',
        'guid',
        'pubDate',
        'category',
        'author',
        'description',
        'content:encoded'
      ]
      cy.request('/blog/rss.xml')
        .then(({body}) => {
          console.log('body', body)
          const items = body.match(/<item>(.|\n)*?<\/item>/g)
          console.log('items', items)
          expect(items).to.have.length.of.at.most(12)
          items.map(item => {
            itemTags.map(tag => {
              expect(item).to.have.string(`<${tag}`) // intentionally don't close this tag here
              expect(item).to.have.string(`</${tag}>`)
            })
          })
        })
    })
  })

  // this doesn't work right now
  // context('?category filter', () => {
  //   it('renders a <category> tag and filters posts', () => {
  //     cy.request('/blog/rss.xml?category=drawing')
  //       .then(({body}) => {
  //         expect(body).to.have.string(`<category>drawing</category>`)
  //         const items = body.match(/<item>(.|\n)*?<\/item>/g)
  //         items.map(item => {
  //           console.log(item)
  //           expect(item).to.have.string(`<category>drawing</category>`)
  //         })
  //       })
  //   })
  // })

  // context('when the post is part of a series', () => { })
})