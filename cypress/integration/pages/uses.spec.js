describe('uses page', () => {
  beforeEach(() => {
    cy.visit(`/uses`)
    cy.injectAxe()
  })

  it('needs a better test', () => {
    expect(true).to.eq(true)
  })
})