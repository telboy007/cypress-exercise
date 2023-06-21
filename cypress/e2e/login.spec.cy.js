
import standard from '../fixtures/standard_user.json'
import locked from '../fixtures/locked_out_user.json'
import problem from '../fixtures/problem_user.json'
import perf from '../fixtures/performance_glitch_user.json'

describe('Check user log in', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('standard user can log in', () => {
    cy.login(standard.username, standard.password)
    cy.get('.app_logo').should('include.text', 'Swag Labs')
  })

  it('locked out user sees an error message', () => {
    cy.login(locked.username, locked.password)
    cy.get('[data-test=error]').should('include.text', 'Epic sadface')
  })

  it('problem user can log in', () => {
    cy.login(problem.username, problem.password)
    cy.get('.app_logo').should('include.text', 'Swag Labs')
  })

  it('perf user can log in and gets flagged as a slow test', () => {
    cy.login(perf.username, perf.password)
    cy.get('.app_logo').should('include.text', 'Swag Labs')
  })
})