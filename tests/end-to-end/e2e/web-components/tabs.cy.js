const componentId = 'tabs-examples'

const expectedContent = [
  'blockquote',
  'a',
  'pre'
]

describe('<Tabs />, <rf-tabs>', () => {
  ['svelte component', 'web component'].forEach((domComponent, componentIndex) => {
    context(`the ${domComponent} version`, () => {
      beforeEach(() => {
        cy.visit('/')
        cy.get(`#${componentId} > tablist > tab`).as('topLevelTabs')
        // why so many clicks??
        cy.get('@topLevelTabs').eq(componentIndex).click().click().click()
        
        // get whatever content is immediately inside the tab panel
        cy.get(`#${componentId} > panel`).eq(componentIndex).find('.columns > *').as('component')

        cy.get('@component').then(component => component.find('tablist')).as('tablist')
        cy.get('@component').then(component => component.find('tab')).as('tabs')
        cy.get('@component').then(component => component.find('panel')).as('panels')
      })

      context('with javascript', () => {
        it('does not have any glaring a11y issues', () => {
          cy.injectAxe()
          cy.get('@component').then(component => {
            cy.checkA11y(component)
          })
        })

        it('adds all the correct aria attributes', () => {
          if (domComponent === 'web component') {
            // reassign some aliases because shadow dom is... complicated...
            cy.get('@component').shadow().then(shadow => {
              cy.wrap([...shadow.children()].find(child => child.tagName === 'DIV')).as('component')
            })
          }

          cy.get('@component').invoke('attr', 'aria-label').should('eq', `${domComponent} tabs`)
          
          cy.get('@tablist').invoke('attr', 'role').should('eq', 'tablist')
          cy.get('@tablist').invoke('attr', 'tabindex').should('eq', '-1')
          
          cy.get('@tabs').each((tab, index) => {
            cy.wrap(tab).invoke('attr', 'type').should('eq', 'button')
            cy.wrap(tab).invoke('attr', 'role').should('eq', 'tab')

            if (index === 0) {
              // only the first should be tabbable
              cy.wrap(tab).invoke('attr', 'tabindex').should('eq', '0')
              cy.wrap(tab).should('have.class', 'active')
            } else {
              cy.wrap(tab).invoke('attr', 'tabindex').should('eq', '-1')
              cy.wrap(tab).should('not.have.class', 'active')
            }
          })

          cy.get('@panels').each((panel, index) => {
            cy.wrap(panel).invoke('attr', 'role').should('eq', 'tabpanel')
            cy.wrap(panel).invoke('attr', 'aria-labelledby').then(label => {
              // expect each panel to be labeled by the correct tab
              cy.get('@tabs').eq(index).invoke('attr', 'id').then(tabId => {
                expect(label).to.equal(tabId)
              })
            })

            if (index === 0) {
              cy.wrap(panel).should('have.class', 'active')
            } else {
              cy.wrap(panel).should('not.have.class', 'active')
            }
          })
        })

        it('shows all the child content', () => {
          cy.get('@component').find('panel').each((panel, index) => {
            cy.wrap(panel).within(() => {
              cy.get(expectedContent[index])
            })
          })
        })

        describe('using a mouse', () => {
          it('clicks through the tabs', () => {
            cy.get('@tabs').each((_tab, index) => {
              cy.get('@tabs').eq(index).click()
              cy.get('@tabs').eq(index).should('have.class', 'active')
              cy.get('@panels').eq(index).should('have.class', 'active')
            })
          })
        })

        describe('using a keyboard', () => {
          beforeEach(() => {
            cy.get('@tabs').eq(0).as('firstTab')
          })

          it('cycles through the tabs using the arrow keys', () => {
            // loop through one way
            cy.get('@tablist').focus().type('{rightArrow}{rightArrow}{rightArrow}')
            cy.get('@firstTab').text().then(text => {
              cy.focused().text().should('eq', text)
            })

            // loop through the other way
            cy.get('@tablist').focus().type('{leftArrow}{leftArrow}{leftArrow}')
            cy.get('@firstTab').text().then(text => {
              cy.focused().text().should('eq', text)
            })
          })
        })
      })

      context('without javascript', () => {
        beforeEach(() => {
          cy.visitWithNoJS('/')
        })

        it('does not have any glaring a11y issues', () => {
          cy.injectAxe()
          // get whatever content is immediately inside the tab panel
          cy.get('@component').then(component => {
            cy.checkA11y(component)
          })
        })

        it('does not add all the aria attributes', () => {
          cy.get('@component').invoke('attr', 'aria-label').should('be.undefined')

          cy.get('@component').within(() => {
            cy.get('tablist[role="tablist"]').should('not.exist')
            cy.get('tablist[tabindex="-1"]').should('not.exist')

            cy.get('tab[tabindex]').should('not.exist')
            cy.get('tab[type]').should('not.exist')
            cy.get('tab[role]').should('not.exist')
            
            cy.get('panel[role]').should('not.exist')
            cy.get('panel[aria-labelledby]').should('not.exist')
          })
        })

        it('shows all the child content', () => {
          cy.get('@component').find('panel').each((panel, index) => {
            cy.wrap(panel).within(() => {
              cy.get(expectedContent[index])
            })
          })
        })
      })
    })
  })
})