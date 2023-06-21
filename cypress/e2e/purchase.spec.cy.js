import standard from '../fixtures/standard_user.json'

describe('End to end user purchase journey', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('standard user can purchase a single item and checkout successfully', () => {
    cy.login(standard.username, standard.password)
    cy.contains(standard.single_purchase).parent('div').click()
    cy.contains('Add to cart').click()
    cy.assert_cart_items(1)
    cy.get('.shopping_cart_link').click()
    cy.checkout(
        standard.firstname,
        standard.surname,
        standard.postcode,
        standard.single_purchase
    )
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
  })
})