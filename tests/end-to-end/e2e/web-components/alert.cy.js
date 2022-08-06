const componentId = 'alert-examples'

const expectedContent = [
  'ul',
  'table'
]

describe('<Alert />, <rf-alert>', () => {
  ['svelte component', 'web component'].forEach((domComponent, componentIndex) => {
    context(`the ${domComponent} version`, () => {
      beforeEach(() => {
        cy.visit('/')
        cy.get(`#${componentId} > tablist > tab`).as('topLevelTabs')
        // why so many clicks??
        cy.get('@topLevelTabs').eq(componentIndex).click().click().click()

        // have to open the alert
        cy.get(`#${componentId} > panel`).eq(componentIndex).find('.columns > button').click()

        if (domComponent === 'svelte component') {
          cy.get(`#${componentId} > panel`).eq(componentIndex).find('.columns > [role="alert"]').as('component')
          cy.get('@component').then(component => component.find('dialog')).as('dialog')
          cy.get('@dialog').then(component => component.find('.note')).as('note')
          cy.get('@note').then(note => note.find('header')).as('header')
          cy.get('@note').then(note => note.find('.content')).as('content')
          cy.get('@content').then(content => content.find('[slot="actions"]')).as('actions')
        }
        

        if (domComponent === 'web component') {
          // reassign some aliases because shadow dom is... complicated...
          cy.get(`#${componentId} > panel`).eq(componentIndex).find('.columns > rf-alert').shadow().then(shadow => {
            // woof
            cy.wrap([...shadow.children()].find(child => (
              [...child.attributes].find(child => (
                child.nodeName === 'role' && child.nodeValue === 'alert'
              )
            )))).as('component')
            cy.wrap(shadow[0].querySelectorAll('dialog')[0]).as('dialog')

            cy.get('@dialog').then(component => component.find('rf-note')).then(shadow => {
              cy.wrap([...shadow[0].shadowRoot.children].find(child => child.tagName === 'SECTION')).as('note')
            })
          })

          cy.get('@note').then(note => note.find('header')).as('header')
          cy.get('@note').then(note => note.find('.content')).as('content')
          // another woof
          cy.get('@content').then(content => (
            content.children()[0].assignedElements().find(element => (
              element.name === 'actions'
            )).assignedElements()
          )).then(actions => cy.wrap(actions).as('actions'))
        }
      })

      it('opens', () => {
        cy.get('@dialog').should('have.attr', 'open')
      })

      it('does not have any glaring a11y issues', () => {
        cy.injectAxe()
        cy.get('@component').then(component => {
          cy.checkA11y(component)
        })
      })

      it('renders the attributes correctly', () => {
        // most attributes are already tested in the note, just check the ids and assume the rest works
        cy.get('@dialog').invoke('attr', 'aria-labelledby').as('label')
        cy.get('@note').invoke('attr', 'id').should('match', /a-(svelte|web-component)-alert/)
        cy.get('@header').invoke('attr', 'id').should('match', /a-(svelte|web-component)-alert-alert-title/)
        cy.get('@content').invoke('attr', 'id').should('match', /a-(svelte|web-component)-alert-alert-content/)
      })

      it('shows all the child content', () => {
        cy.get('@header')
        if (domComponent === 'web component') {
          // a third woof
          cy.get('@content').then(content => {
            expectedContent.forEach(element => {
              content.children()[0].assignedElements().find(element => (
                // get the default slot
                element.tagName === 'SLOT' && !element.name
              )).assignedElements().find(node => node.tagName === element.toUpperCase())
            })
          })
        } else {
          cy.get('@content').within(() => {
            expectedContent.forEach(element => {
              cy.get(element)
            })
          })
        }
        cy.get('@actions').find('button')
      })

      describe.only('trapping focus', () => {
        const numberOfTimesToTab = 5
        beforeEach(() => {
          if (domComponent === 'web component') {
            cy.get('@content').then(content => {
              cy.wrap(content.children()[0].assignedElements().find(element => (
                // get the default slot
                element.tagName === 'SLOT' && !element.name
              )).assignedElements()).as('children')
              cy.get('@children').find('li a').eq(0).as('link')
            })
          } else {
            cy.get('@content').find('li a').eq(0).as('link')

          }
        })

        it('traps forwards', () => {
          cy.get('@link').focus()
          new Array(numberOfTimesToTab).forEach(time => cy.focused().tab())

          cy.focused().then((focused) => {
            cy.get('@link').should('have.text', focused[0].innerText)
          })
        })

        it('traps backwards', () => {
          cy.get('@link').focus()
          new Array(numberOfTimesToTab).forEach(time => cy.focused().tab({ shift: true }))

          cy.focused().then((focused) => {
            cy.get('@link').should('have.text', focused[0].innerText)
          })
        })
      })

      describe('closing the alert', () => {
        describe('using a mouse', () => {
          it('closes with the X button', () => {
            cy.get('@component').find('button[title="close"]').click()
            cy.get('@dialog').should('not.have.attr', 'open')
          })

          it('closes with the backdrop', () => {
            cy.get('@component').find('.backdrop').click({ force: true })
            cy.get('@dialog').should('not.have.attr', 'open')
          })
        })

        describe('using a keyboard', () => {
          it('closes with the escape key', () => {
            cy.get('body').type('{esc}')
            cy.get('@dialog').should('not.have.attr', 'open')
          })
        })
      })
    })
  })

  // context('without javascript', () => {
  //   beforeEach(() => {
  //     cy.visitWithNoJS('/')
  //     cy.get('#no-js-alert').as('component')
  //   })

  //   it('does not have any glaring a11y issues', () => {
  //     cy.injectAxe()
  //     cy.get('@component').then(component => {
  //       cy.checkA11y(component)
  //     })
  //   })

  //   it('opens', () => {
  //     cy.get('@component').within(() => {
  //       cy.get('#no-js-alert-alert')
  //     })
  //   })
    
  //   it('closes', () => {
  //     cy.get('@component').within(() => {
  //       cy.get('label').click({ force: true })
  //     })
  //     expect(Cypress.dom.isVisible(cy.get('#no-js-alert-alert'))).to.eq(false)
  //   })
  // })
})