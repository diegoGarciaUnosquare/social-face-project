import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

import { CreateUserPageObject } from "../../support/pageObjects/create-user-page-object";
import { LoginPageObjects } from "../../support/pageObjects/login-page-objects";

const loginPageObjects = new LoginPageObjects();
const createUserPageObjects = new CreateUserPageObject();

Given("the user is on the login screen", () => {
    loginPageObjects.userIsOnTheLoginScreen();
});

When("the user taps on the create account button", () => {
    loginPageObjects.clickCreateAccountButton();
});

Then("the user is taken to the create account screen", () => {
    createUserPageObjects.userIsOnTheCreateUserScreen();
});