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

When("the user enters their account information", () => {
    createUserPageObjects.enterUserDataInForm();
});

Then("the next button should be enabled", () => {
    createUserPageObjects.nextButtonIsEnabled();
})

When("the user taps on the next button", () => {
    createUserPageObjects.clickNextButton();
});

Then("the user should be taken to the login screen", () => {
    loginPageObjects.userIsOnTheLoginScreen();
});

Then("the user is taken account creation success screen", () => {
    createUserPageObjects.userIsOnTheAccountCreatedScreen();
});

Then("the user taps the navigate to login screen button", () => {
    createUserPageObjects.clickNavigateToLoginButton();
});