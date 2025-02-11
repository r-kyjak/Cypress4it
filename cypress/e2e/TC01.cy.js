/// <reference types="cypress" />

import { General } from "../support/mapper";

describe("TC01 - manage creation and deletion of posts", () => {
  
  let postId = undefined

  it("Access webpage login page", () => {
    cy.visit(Cypress.config("baseUrl") + Cypress.env("loginSuffix"));
  })

  it("Log in", () => {
    cy.login(Cypress.env("EMAIL"),Cypress.env("PASSWORD"))
  })

  it("Create post", () => {
    cy.createPost(Cypress.env("COMMUNITY"), Cypress.env("POST_BODY")).then((id)=> {
      postId = id;
    });
  })

  it("Verify post created + verify body text", () => {
    cy.get(General.FeedPage.getPostById(postId)).should('exist')
    cy.get(General.FeedPage.getPostById(postId) + General.FeedPage.Post.X_postBodyText).should('have.text', Cypress.env("POST_BODY"))
  })

  it("Delete post", () => {
    cy.deletePostById(postId)
  })

  it("Verify post deleted", () => {
    cy.get(General.FeedPage.getPostById(postId)).should('not.exist')
  })
})