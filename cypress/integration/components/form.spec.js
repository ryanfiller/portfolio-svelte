describe('<Form /> component', () => {
  context('contact form', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.injectAxe()
    })
    
    it('renders correctly', () => {
      cy.get('form#contact').within(() => {
        cy.get('input[name="name"][type="text"][required]').should('exist')
        cy.get('input[name="email"][type="email"][required]').should('exist')
        cy.get('textarea[name="message"][required]').should('exist')
        cy.get('button[type="submit"]').should('exist')
      })
      cy.checkA11y('form#contact')
    })

    context('success state', () => {
      beforeEach(() => {
        cy.visit('/', {onBeforeLoad (win) {
          cy.spy(win, 'fetch').as('fetch')
        }})
        
        cy.fillOutContactForm()
      })
      
      it('shows success message, resets, and clears data', () => {
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

        cy.get('form#contact').should('not.exist')
        cy.get('.form__success').within(() => {
          cy.get('button[type="reset"]').click()
        })
        cy.get('form#contact').should('exist')
        cy.get('input[name="name"]').should('have.value', '')
      })
    })

    context('error state', () => {
      beforeEach(() => {
        cy.visit('/', {onBeforeLoad (win) {
          cy.stub(win, 'fetch').returns(Promise.reject()).as('fetch')
        }})

        cy.fillOutContactForm()
      })

      it('shows failure message, resets, and does not clear data', () => {
        cy.get('form#contact').should('not.exist')
        cy.get('.form__error').within(() => {
          cy.get('button[type="reset"]').click()
        })
        cy.get('form#contact').should('exist')
        cy.get('input[name="name"]').should('have.value', 'Philip')
      })
    })
  })
})