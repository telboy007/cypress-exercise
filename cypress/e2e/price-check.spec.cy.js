import standard from '../fixtures/standard_user.json'

describe('Check listed price of products', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('product is priced correctly', () => {
    cy.login(standard.username, standard.password)
    const item = 'Sauce Labs Bolt T-Shirt'
    // check the right price is being charged
    cy.assert_product_price(item) // $15.99
  })

  it('product is priced correctly', () => {
    cy.login(standard.username, standard.password)
    const item = 'Sauce Labs Fleece Jacket'
    // check the right price is being charged
    cy.assert_product_price(item) // $49.99
  })
})