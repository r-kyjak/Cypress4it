// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'

//clear session, storage and cache before test start
before(() => {
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearCookies();
});
  
//after each step check status, if failed stop runner to prevent further step execution
afterEach(function() {
    if (this.currentTest.state === "failed") {
        cy.log("Failed step detected, stopping execution.");
        Cypress.runner.stop()
    }
});

//close after test run - optional
after(() => {
    //Cypress.runner.stop();
});