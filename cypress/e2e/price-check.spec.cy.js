import standard from '../fixtures/standard_user.json'

describe('Check listed price of products', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const item1 = 'Sauce Labs Bolt T-Shirt'
  const item2 = 'Sauce Labs Fleece Jacket'

  it(`${item1} is priced correctly`, () => {
    cy.login(standard.username, standard.password)
    cy.assert_product_price(item1) // $15.99
  })

  it(`${item2} is priced correctly`, () => {
    cy.login(standard.username, standard.password)
    cy.assert_product_price(item2) // $49.99
  })
})