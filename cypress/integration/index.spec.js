// index.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Index Page testing", () => {
  describe("Application page load", () => {
    it("should load the page.", () => {
      cy.visit("./index.html");
    });
  });

  describe("Game details form", () => {
    it("should contain default value for bank balance.", () => {
      cy.get("#totalAmount").should("have.value", 20580);
    });

    it("should contain default value for player balance.", () => {
      cy.get("#playerBalance").should("have.value", 1500);
    });

    it("should show error for less than 2 players", () => {
      // input no of player as 1
      cy.get("#noOfPlayers").clear().type(1);

      cy.get("#btnSubmitGameDetails").click();

      cy.get("#noOfPlayers").should(
        "have.css",
        "background-color",
        "rgb(253, 0, 0)"
      );
    });

    it("should show error for more than 8 players", () => {
      // input no of player as 9
      cy.get("#noOfPlayers").clear().type(9);

      cy.get("#btnSubmitGameDetails").click();

      cy.get("#noOfPlayers").should(
        "have.css",
        "background-color",
        "rgb(253, 0, 0)"
      );
    });

    it("should not show error for 8 players", () => {
      // input no of player as 8
      cy.get("#noOfPlayers").clear().type(8);

      cy.get("#btnSubmitGameDetails").click();

      cy.get("#noOfPlayers").should(
        "not.have.css",
        "background-color",
        "rgb(253, 0, 0)"
      );
    });

    it("should not show error for 2 players", () => {
      // input no of player as 2
      cy.get("#noOfPlayers").clear().type(2);

      cy.get("#btnSubmitGameDetails").click();

      cy.get("#noOfPlayers").should(
        "not.have.css",
        "background-color",
        "rgb(253, 0, 0)"
      );
    });
  });

  describe("Player names form", () => {
    it("should should error for missing names", () => {
      cy.get("#player_1").focus();
      cy.get("#player_2").focus();

      cy.get("#btnPlayerNameSubmit").click();

      cy.get("#player_1").should(
        "have.css",
        "background-color",
        "rgb(253, 0, 0)"
      );
      cy.get("#player_2").should(
        "have.css",
        "background-color",
        "rgb(253, 0, 0)"
      );
    });

    it("should navigate to banker page with valid player names", () => {
      cy.get("#player_1").type("PlayerOne");
      cy.get("#player_2").type("PlayerTwo");

      cy.get("#btnPlayerNameSubmit").click();

      cy.location('pathname').should('include', 'banker.html')
    });
  });
});
