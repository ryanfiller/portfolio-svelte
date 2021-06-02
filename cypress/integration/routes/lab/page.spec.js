describe('a page in /lab', () => {
  it('shows the modal the first time, but not the second time', () => {
    cy.visit(`/lab`)
    cy.get('article.post-preview').eq(0).find('.post-preview__header > a').click()
    cy.get('dialog.alert').should('exist')
    // click agree
    cy.get('dialog.alert').find('button').eq(0).click()
    // go back
    cy.visit(`/lab`)
    cy.get('article.post-preview').eq(1).find('.post-preview__header > a').click()
    cy.get('dialog.alert').should('not.exist')
  })
})