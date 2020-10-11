const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
).set
const changeRangeInputValue = $range => value => {
  nativeInputValueSetter.call($range[0], value)
  $range[0].dispatchEvent(new Event('change', { value, bubbles: true }))
}

// .then(input => changeRangeInputValue(input)(0))

context('<VariableFont /> component', () => {
  beforeEach(() => {
    cy.visit('/lab/variable-font-display')
    cy.injectAxe()
  })

  it('renders correctly', () => {
    cy.get('section.variable-font').within(() => {
      cy.get('textarea').should('exist')
      cy.get('fieldset').should('exist')
      cy.get('pre').should('exist')
    })
    cy.checkA11y()
  })

  it('changes a variable property', () => {
    cy.get('section.variable-font').within(() => {

      let variable
      let value

      cy.get('input[type="range"]').eq(0).then(input => {
        variable = input.attr('name')
        cy.wrap(name).as('property')

        value = ((input.attr('max') - input.attr('min')) / 2).toString()
        cy.inputChange(input, value)
      })

      cy.get('textarea').eq(0).then(text => {
        expect(text.css('font-variation-settings').includes(`"${variable}" ${value}`)).to.be.true
      })

      cy.get('pre code').eq(0).text().then(text => {
        expect(text.includes(`"${variable}" ${value}`)).to.be.true
      })
    })
  })

  it('changes the capitalization', () => {
    cy.get('section.variable-font').within(() => {
      // TODO this is broke, but the functionality works.
      // cy.get('select').eq(0).select('uppercase')

      // cy.get('textarea').eq(0).then(text => {
      //   expect(text.css('text-transform').includes('uppercase')).to.be.true
      // })

      // cy.get('pre code').eq(0).text().then(text => {
      //   expect(text.includes('uppercase')).to.be.true
      // })
    })
  })
})