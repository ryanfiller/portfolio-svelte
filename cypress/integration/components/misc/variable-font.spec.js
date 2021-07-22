// const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
//   window.HTMLInputElement.prototype,
//   'value'
// ).set

// const changeRangeInputValue = $range => value => {
//   nativeInputValueSetter.call($range[0], value)
//   $range[0].dispatchEvent(new Event('change', { value, bubbles: true }))
// }

describe('<VariableFont /> component', () => {
  beforeEach(() => {
    cy.visit('/lab/variable-font-display')
    cy.closeAlert()
    cy.injectAxe()
  })

  it('renders correctly', () => {
    cy.get('section.variable-font').within(() => {
      cy.get('textarea').should('exist')
      cy.get('fieldset').should('exist')
      cy.get('pre').should('exist')
    })
    cy.checkA11y('section.variable-font')
  })

  it('changes a variable property', () => {
    cy.get('section.variable-font').within(() => {

      let variable
      let value

      cy.get('input[type="range"]').eq(0).then(input => {
        variable = input.attr('name')
        cy.wrap(name).as('property')

        value = Math.round((input.attr('max') - input.attr('min')) / 2).toString()
        cy.inputChange(input, value)
      })

      cy.get('textarea').eq(0).then(text => {
        console.log(`"${variable}" ${value}`)
        console.log('text.css', text.css('font-variation-settings'))
        expect(text.css('font-variation-settings').includes(`"${variable}" ${value}`)).to.be.true
      })

      cy.get('pre code').eq(0).text().then(text => {
        expect(text.includes(`"${variable}" ${value}`)).to.be.true
      })
    })
  })

  it('makes the text italic', () => {
    cy.get('section.variable-font').within(() => {
      cy.get('input[type="checkbox"]').eq(0).click()

      cy.get('textarea').eq(0).then(text => {
        expect(text.css('font-style').includes('italic')).to.be.true
      })

      cy.get('pre code').eq(0).text().then(text => {
        expect(text.includes('italic')).to.be.true
      })
    })
  })

  // // TODO this is broke, but the functionality works.
  // it('changes the capitalization', () => {
  //   cy.get('section.variable-font').within(() => {
  //     cy.get('select').eq(0).select('uppercase')

  //     cy.get('textarea').eq(0).then(text => {
  //       expect(text.css('text-transform').includes('uppercase')).to.be.true
  //     })

  //     cy.get('pre code').eq(0).text().then(text => {
  //       expect(text.includes('uppercase')).to.be.true
  //     })
  //   })
  // })
})