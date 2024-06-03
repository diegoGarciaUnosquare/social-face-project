import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

import { ForgotPasswordPageObject } from "../../support/pageObjects/forgot-password-page-object";
import { LoginPageObjects } from "../../support/pageObjects/login-page-objects";

const forgotPasswordPO = new ForgotPasswordPageObject(); 

Given("the user is on the forgot password screen", () => {
    forgotPasswordPO.clickForgotPasswordButton();
    forgotPasswordPO.isOnForgotPasswordPage();
})

When("the user clicks on the forgot password button", () => {
    forgotPasswordPO.clickForgotPasswordButton();
})

When("the user enters an email address", () => {
    forgotPasswordPO.enterEmail();
})

Then("then user should navigate to the forgot password screen", () => {
    forgotPasswordPO.isOnForgotPasswordPage();
})

Then("the user clicks on the submit button", () => {
    forgotPasswordPO.clickValidateEmailButton();
})

Then("the user should navigate to the update password screen", () => {
    forgotPasswordPO.isOnUpdatePasswordPage();
})

When("the user enters a new password", () => {
    forgotPasswordPO.enterNewPassword();
})

Then("the user clicks on the update password button", () => {
    forgotPasswordPO.clickUpdatePasswordButton();
})

When("the user should navigate to the login screen", () => {
    const loginPO = new LoginPageObjects();
    cy.wait(2000);
    loginPO.userIsOnTheLoginScreen();
})