// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { General } from "./mapper"
import "cypress-real-events";

//Log in user and verify successful login by URL check
Cypress.Commands.add("login", (username, password) => {
  cy.url().should("include", Cypress.env("loginSuffix"));

  cy.get(General.LoginPage.usePasswordButton).click()
  cy.get(General.LoginPage.email).type(username, {log:false})
  cy.get(General.LoginPage.password).type(password, {log:false})
  cy.get(General.LoginPage.logInButton).click()

  cy.url().should("include", Cypress.env("feedSuffix"));

  cy.log("Log in successful.")
});

//Create post and return generated ID
Cypress.Commands.add("createPost", (header, body) => {
  cy.get(General.FeedPage.createPostInput).click()
  selectDropdownByValue(General.FeedPage.createPostHeaderInput, header, General.FeedPage.getCreatePostOptionSelector)
  cy.get(General.FeedPage.createPostBodyInput).click().realType(body)

  cy.intercept("POST", Cypress.env("postCreateApi")).as("apiCall");

  cy.get(General.FeedPage.postButton).click()

  //intercept POST to retrieve generated port ID
  cy.wait("@apiCall").then((interception) => {
    let responseBody = interception.response.body;
    let generatedId = responseBody.post.id;
    
    cy.log("Post created with header: " + header + ", body: " + body + ", ID: " + generatedId);
    return cy.wrap(generatedId);
  });
});

//Delete post with provided ID, confirm deletion
Cypress.Commands.add("deletePostById", (id) => {
  cy.get(General.FeedPage.getPostById(id) + General.FeedPage.Post.X_postOptions).click()
  cy.get(General.FeedPage.Post.postDeleteButton).first().click()
  cy.on('window:confirm', () => true);
});

//--------------------------------------------------------------//
//general actions implementation, split to separate file if needed

//function to select value from a dropdown
function selectDropdownByValue(selector, value, optionSelectFunction){
  cy.get(selector).type(value)
  cy.get(optionSelectFunction(value)).should('be.visible').click()
  cy.get(General.FeedPage.selectedPostHeader).should('have.text', value)
  cy.get(optionSelectFunction(value)).should('not.exist')
}
