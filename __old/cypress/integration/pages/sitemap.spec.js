// test this
describe('sitemap', () => {
  beforeEach(() => {
    cy.request(`/sitemap.xml`)
  })

  it('needs a better test', () => {
    expect(true).to.eq(true)
  })
})