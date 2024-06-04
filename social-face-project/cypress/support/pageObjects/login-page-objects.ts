export class LoginPageObjects {
    loginPageContainer = '[data-login-page-container]';
    createAccountButton = '[data-create-account-btn]';
    forgotPasswordButton = '[data-forgot-password-btn]';
    usernameInputField = '[data-username-field]';
    passwordInputField = '[data-password-field]';
    loginButton = '[data-login-btn]';

    public userIsOnTheLoginScreen(): void {
        cy.get(this.loginPageContainer).should('be.visible');
    }

    public clickCreateAccountButton(): void {
        cy.get(this.loginPageContainer).find(this.createAccountButton).then((button: JQuery<HTMLElement>) => {
            cy.wrap(button).should('be.visible');
            cy.wrap(button).click();
        });
    }

    public clickLoginButton(): void {
        cy.get(this.loginPageContainer).find(this.loginButton).then((button: JQuery<HTMLElement>) => {
            cy.wrap(button).should('be.visible');
            cy.wrap(button).click();
        });
    }

    public userEntersLoginCredentials(): void {
        cy.get(this.loginPageContainer).then((container: JQuery<HTMLElement>) => {
            cy.wrap(container).find(this.usernameInputField).type('testUser');
            cy.wrap(container).find(this.passwordInputField).type('a9yhd7s1');
        });
    }
}