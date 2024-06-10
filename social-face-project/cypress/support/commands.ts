import { LoginPageObjects } from "./pageObjects/login-page-objects";

Cypress.Commands.add('loginUser', () => {
    const loginPO = new LoginPageObjects();
    loginPO.userEntersLoginCredentials();
    loginPO.clickLoginButton();
});