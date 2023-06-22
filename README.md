# cypress-exercise

> Disclaimer: I came across an issue with the cypress app (npx cypress open) where the tests will not run due to the cy.visit('/') timing out when used in the beforeEach hook even though it loads the page correctly.  Running the test suite via the two scripts configured in package.json (which use npx cypress run) will run the tests without issue.

### Setup

* Clone repo
* cd into repo
* run `npm install`

From here there are two choices:

* run `npm run test`
* run `npm run test:headed`

### Improvements

* Wider scope of tests (debugging issue with cypress app was a time sink)
* Utilise husky to setup linting and test runs in pre-commit github hooks
