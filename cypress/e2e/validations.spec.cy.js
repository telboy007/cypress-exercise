import standard from '../fixtures/standard_user.json'

describe('End to end user purchase journey', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('standard user gets validation warning for missing surname', () => {
    cy.login(standard.username, standard.password)
    cy.contains(standard.single_purchase).parent('div').click()
    cy.contains('Add to cart').click()
    cy.assert_cart_items(1)
    cy.get('.shopping_cart_link').click()
    cy.checkout_with_error(
        standard.firstname,
        '',
        standard.postcode,
        standard.single_purchase
    )
    cy.get('[data-test=error]').should('have.text', 'Error: Last Name is required')
  })

  it('standard user gets validation warning for missing postal code', () => {
    cy.login(standard.username, standard.password)
    cy.contains(standard.single_purchase).parent('div').click()
    cy.contains('Add to cart').click()
    cy.assert_cart_items(1)
    cy.get('.shopping_cart_link').click()
    cy.checkout_with_error(
        standard.firstname,
        standard.surname,
        '',
        standard.single_purchase
    )
    cy.get('[data-test=error]').should('have.text', 'Error: Postal Code is required')
  })
})