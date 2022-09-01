const componentId = 'image-gallery-examples'

describe('<ImageGallery />, <rf-image-gallery>', () => {
  ['svelte component', 'web component'].forEach((domComponent, componentIndex) => {
    context(`the ${domComponent} version`, () => {
      beforeEach(() => {
        cy.visit('/styles/components')
        cy.get(`#${componentId} > tablist > tab`).as('topLevelTabs')
        // why so many clicks??
        cy.get('@topLevelTabs').eq(componentIndex).click().click().click()
        
        // get whatever content is immediately inside the tab panel
        cy.get(`#${componentId} > panel`).eq(componentIndex).find('> *').as('component')

        cy.get('@component').then(component => component.find('.grid').find('> img')).as('images')
        cy.get('@component').then(component => component.find('.grid').find('> figure')).as('figures')

        // sleep for a second, sometimes the web-component code doesn't load fast enough
        cy.wait(100)
      })

      context('with javascript', () => {
        beforeEach(() => {
          if (domComponent === 'web component') {
            // reassign some aliases because shadow dom is... complicated...
            cy.get(`#${componentId} > panel`).eq(componentIndex).find('*').shadow().then(shadow => {
              cy.wrap([...shadow.children()].find(child => child.tagName === 'SECTION')).as('component')

              cy.get('@component').find('slot').then(slot => {
                cy.get(slot[0].assignedElements()).then(nodes => {
                  cy.wrap([[...nodes].filter(node => node.tagName === 'IMG')][0]).as('images')
                  cy.wrap([[...nodes].filter(node => node.tagName === 'FIGURE')][0]).as('figures')
                })
              })
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
          cy.get('@component').invoke('attr', 'id').should('match', /a-(svelte|web-component)-image-gallery/)
        })

        it('renders the open image correctly', () => {
          cy.get('@images').then(images => {
            images[0].click()
            cy.get('@component').find('dialog[open]').within(() => {
              cy.get('img')
            })
            cy.get('@component').find('dialog[open]').type('{esc}')
          })

          cy.get('@figures').then(figures => {
            figures[0].click()
            cy.get('@component').find('dialog[open]').within(() => {
              cy.get('figure').within(() => {
                cy.get('img')
                cy.get('figcaption')
              })
            })
            cy.get('@component').find('dialog[open]').type('{esc}')
          })
        })

        describe('interactive with the thumbnails', () => {
          const thumbnails = []

          beforeEach(() => {
            cy.then(() => {
              cy.get('@images').then(images => {
                Array.from(images).forEach(image => thumbnails.push(image))
              })
  
              cy.get('@figures').then(figures => {
                Array.from(figures).forEach(figure => thumbnails.push(figure))
              })
            })
            .then(() => {
              // test a random different one every time
              cy.wrap(thumbnails[Math.floor(Math.random() * thumbnails.length)]).as('thumbnail')
            })
          })

          it('works using a mouse', () => {
            cy.get('@component').find('dialog[open]').should('not.exist')

            // it opens
            cy.get('@thumbnail').click()
            cy.get('@component').find('dialog[open]').should('exist')

            let currentActiveImage
            cy.get('@component').find('dialog[open]').find('img').then(img => {
              currentActiveImage = img[0].src
            })

            // it navigates forwards
            Array(thumbnails.length).fill(null).forEach(() => {
              cy.get('@component').find('dialog[open]').find('button[title="next"]').click()
            })
            cy.get('@component').find('dialog[open]').find('img').then(img => {
              expect(img[0].src === currentActiveImage)
            })

            // it navigates backwards
            Array(thumbnails.length).fill(null).forEach(() => {
              cy.get('@component').find('dialog[open]').find('button[title="previous"]').click()
            })
            cy.get('@component').find('dialog[open]').find('img').then(img => {
              expect(img[0].src === currentActiveImage)
            })

            // it closes
            cy.get('@component').find('dialog[open]').within(() => {
              cy.get('button[title="close"]').click()
            })
            cy.get('@component').find('dialog[open]').should('not.exist')
          })
  
          it('works using a keyboard', () => {
            cy.get('@component').find('dialog[open]').should('not.exist')

            // it opens
            cy.get('@thumbnail').focus().type('{enter}')
            cy.get('@component').find('dialog[open]').should('exist')

            let currentActiveImage
            cy.get('@component').find('dialog[open]').find('img').then(img => {
              currentActiveImage = img[0].src
            })

            // it navigates forwards
            Array(thumbnails.length).fill(null).forEach(() => {
              cy.get('@component').find('dialog[open]').type('{rightArrow}')
            })
            cy.get('@component').find('dialog[open]').find('img').then(img => {
              expect(img[0].src === currentActiveImage)
            })

            // it navigates backwards
            Array(thumbnails.length).fill(null).forEach(() => {
              cy.get('@component').find('dialog[open]').type('{leftArrow}')
            })
            cy.get('@component').find('dialog[open]').find('img').then(img => {
              expect(img[0].src === currentActiveImage)
            })

            // it closes
            cy.get('@component').find('dialog[open]').within(() => {
              cy.get('@component').find('dialog[open]').type('{esc}')
            })
            cy.get('@component').find('dialog[open]').should('not.exist')
          })
        })

      })

      context('without javascript', () => {
        beforeEach(() => {
          cy.intercept('GET', '/web-components.js', { statusCode: 404 })
          cy.visitWithNoJS('/styles/components')
        })

        it('does not have any glaring a11y issues', () => {
          cy.injectAxe()
          // get whatever content is immediately inside the tab panel
          cy.get('@component').then(component => {
            cy.checkA11y(component)
          })
        })

        it('shows the full content', () => {
          cy.get('@component').find('figcaption').then(captions => {
            // these should NOT be `display: none;`
            expect(captions.length).to.be.at.least(1)
          })
        })
      })
    })
  })
})
