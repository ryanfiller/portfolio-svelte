import slugify from '../../../../src/helpers/slugify'

const componentId = 'note-examples'

const expectedContent = [
  'p',
  'blockquote',
  'pre'
]

describe('<Note />, <rf-note>', () => {
  ['svelte component', 'web component'].forEach((domComponent, componentIndex) => {
    context(`the ${domComponent} version`, () => {
      beforeEach(() => {
        cy.visit('/')
        cy.get(`#${componentId} > tablist > tab`).as('topLevelTabs')
        // why so many clicks??
        cy.get('@topLevelTabs').eq(componentIndex).click().click().click()
        
        // get whatever content is immediately inside the tab panel
        cy.get(`#${componentId} > panel`).eq(componentIndex).find('.columns > *').as('component')

        cy.get('@component').then(component => component.find('header')).as('header')
        cy.get('@component').then(component => component.find('div').eq(0)).as('content')
      })

      context('with javascript', () => {
        beforeEach(() => {
          if (domComponent === 'web component') {
            // reassign some aliases because shadow dom is... complicated...
            cy.get(`#${componentId} > panel`).eq(componentIndex).find('.columns > *').shadow().then(shadow => {
              cy.wrap([...shadow.children()].find(child => child.tagName === 'SECTION')).as('component')

              cy.wrap(shadow[0].querySelectorAll('header')[0]).as('header')
              cy.wrap(shadow[0].querySelectorAll('.content')[0]).as('content')
            })
          }
        })

        it('does not have any glaring a11y issues', () => {
          cy.injectAxe()
          cy.get('@component').then(component => {
            cy.checkA11y(component)
          })
        })

        it('renders the attributes correctly', () => {
          cy.get('@component').invoke('attr', 'aria-labelledby').as('label')
          cy.get('@component').invoke('attr', 'id').should('match', /a-(svelte|web-component)-note/)
          cy.get('@header').invoke('attr', 'id').should('match', /a-(svelte|web-component)-note-title/)
          cy.get('@content').invoke('attr', 'id').should('match', /a-(svelte|web-component)-note-content/)
        })

        it('shows all the child content', () => {
          cy.get('@header')
          if (domComponent === 'web component') {
            cy.get('@content').find('slot').then(slot => {
              expectedContent.forEach(element => {
                cy.get(slot[0].assignedElements().find(node => node.tagName === element.toUpperCase()))
              })
            })
          } else {
            cy.get('@content').within(() => {
              expectedContent.forEach(element => {
                cy.get(element)
              })
            })
          }
        })
      })

      context('without javascript', () => {
        beforeEach(() => {
          cy.intercept('GET', '/web-components.js', { statusCode: 404 })
          cy.visitWithNoJS('/')
        })

        it('does not have any glaring a11y issues', () => {
          cy.injectAxe()
          // get whatever content is immediately inside the tab panel
          cy.get('@component').then(component => {
            cy.checkA11y(component)
          })
        })

        // if (domComponent === 'web component') {
        //   // it('should render the markdown with no JS, but I do not know why it still is the whole component')
        // }
      })
    })
  })
})
