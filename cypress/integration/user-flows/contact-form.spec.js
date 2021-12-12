describe('<Form /> component', () => {
  function fillOutContactForm()  {
    cy.get(' form')
      .scrollIntoView()
      .wait(500) // wait for animation
      .within(() => {
        cy.get('input[name="name"]').type('Philip')
        cy.get('input[name="email"]').type('fry@planetexpress.com')
        cy.get('textarea[name="message"]').type('What if that thing I said?')
        cy.get('button[type="submit"]').click({force: true})
      })
  }
  
  context('contact form', () => {
    before(() => {
      cy.visit('/')
      cy.injectAxe()
    })
    
    it('renders correctly', () => {
      cy.get('.form').within(() => {
        cy.get('input[name="name"][type="text"][required]').should('exist')
        cy.get('input[name="email"][type="email"][required]').should('exist')
        cy.get('textarea[name="message"][required]').should('exist')
        cy.get('button[type="submit"]').should('exist')
      })
      cy.checkA11y('.form')
    })

    context('sent state', () => {
      before(() => {
        cy.visit('/', {onBeforeLoad (win) {
          cy.spy(win, 'fetch').as('fetch')
        }})
        fillOutContactForm()
      })
      
      it('shows sent message, resets, and clears data', () => {
        cy.get("@fetch").should(fetch => {
          expect(fetch.getCall(0).args).to.deep.equal([
            "/",
            {
              "method": "POST",
              "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              "body": "form-name=contact&name=Philip&email=fry%40planetexpress.com&message=What%20if%20that%20thing%20I%20said%3F&location="
            }
          ])
        })

        cy.get('.form[data-state="form"]').should('not.exist')
        cy.get('.form[data-state="sent"]').within(() => {
          cy.get('button[type="reset"]').click({force: true})
        })
        cy.get('.form').should('exist')
        cy.get('input[name="name"]').should('have.value', '')
      })
    })

    context('error state', () => {
      before(() => {
        cy.visit('/', {onBeforeLoad (win) {
          cy.stub(win, 'fetch').returns(Promise.reject()).as('fetch')
        }})
        fillOutContactForm()
      })

      it('shows failure message, resets, and does not clear data', () => {
        cy.get('.form[data-state="form"]').should('not.exist')
        cy.get('.form[data-state="error"]').within(() => {
          cy.get('button[type="reset"]').click({force: true})
        })
        cy.get('.form').should('exist')
        cy.get('input[name="name"]').should('have.value', 'Philip')
      })
    })
  })
})