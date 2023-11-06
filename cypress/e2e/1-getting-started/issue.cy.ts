/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Issue tests", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000/issues/new");
  });

  it("create a Issue and test if it exits in dashboard", () => {
    cy.intercept("POST", "/api/issues").as("createIssue");
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get("[data-cy='add-issue-title-input']").type("Testandooo");

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
    cy.get("[data-cy='add-issue-description-input']").type(
      "Test Issue Description ddescfiskldskjskldjfkl"
    );

    cy.get("[data-cy='add-issue-submit-button']").click();

    cy.wait("@createIssue").then((interception) => {
      const issue = interception.response!.body;
      expect(interception.response!.statusCode).to.equal(201);
      cy.visit("http://localhost:3000/dashboard");
      cy.get(`[data-cy='${issue.id}']`).contains(issue.title);
    });
  });
});
