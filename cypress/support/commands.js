// ***********************************************
// Helper functions:
// - login
// - checkout
// - checkout ending in error
// - assert cart item(s)
// - assert product price
// - assert checkout sub total
// - assert checkout grand total
// - maths function to sum strings
// ***********************************************

const prices = require('../fixtures/prices.json')

// -- LOG IN --
Cypress.Commands.add('login', (username, password) => {
    cy.get('#user-name').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
})

// -- CHECKOUT --
Cypress.Commands.add('checkout', (firstname, surname, postcode, item) => {
    cy.get('#checkout').click()
    cy.get('#first-name').type(firstname)
    cy.get('#last-name').type(surname)
    cy.get('#postal-code').type(postcode)
    cy.contains('Continue').click()
    // check for correct subtotal 
    cy.assert_product_price(item)
    // check for correct grand total
    cy.assert_grand_total(item)
    cy.contains('Finish').click()
})

// -- CHECKOUT WITH ERROR --
Cypress.Commands.add('checkout_with_error', (firstname, surname, postcode, item) => {
    cy.get('#checkout').click()
    if (firstname != '') {
        cy.get('#first-name').type(firstname)
      }
      if (surname != '') {
        cy.get('#last-name').type(surname)
      }
      if (postcode != '') {
        cy.get('#postal-code').type(postcode)
      }
    cy.contains('Continue').click()
})

// -- ASSERT CART ITEM COUNT --
Cypress.Commands.add('assert_cart_items', (number) => {
    cy.get('.shopping_cart_link').scrollIntoView()
    cy.get('.shopping_cart_link').should('have.text', number)
})

// -- ASSERT PRODUCT PRICE --
Cypress.Commands.add('assert_product_price', (item) => {
  cy.contains(item).parent().parent().find('.inventory_item_price')
  .invoke('text')
  .then((price) => {
    expect(price).to.contain(prices[item])
  })
})

// -- ASSERT SUBTOTAL PRICE --
Cypress.Commands.add('assert_subtotal', (item) => {
  cy.get('.summary_subtotal_label')
  .invoke('text')
  .then((price) => {
    expect(price).to.contain(prices[item])
  })
})

// -- ASSERT GRAND TOTAL --
Cypress.Commands.add('assert_grand_total', (item) => {
  cy.get('.summary_total_label')
  .invoke('text')
  .then((price) => {
    // grab item price from fixture and tax value from config
    const check_value = sum_strings(prices[item], Cypress.env('tax'))
    expect(`Total: $${check_value}`).to.contain(price)
  })
})

// -- MATHS: Convert strings to int and sum --
function sum_strings(a, b) {
  return Number(a.replace('$', '')) + Number(b.replace('$', ''))
}