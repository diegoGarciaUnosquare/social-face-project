export class LoginPageObjects {
    createAccountButton = '[data-create-account-btn]';
    forgotPasswordButton = '[data-forgot-password-btn]';
    loginButton = '[data-login-btn]';
    loginPageContainer = '[data-login-page-container]';

    public userIsOnTheLoginScreen(): void {
        cy.get(this.loginPageContainer).should('be.visible');
    }

    public clickCreateAccountButton(): void {
        cy.get(this.loginPageContainer).find(this.createAccountButton).then((button: JQuery<HTMLElement>) => {
            cy.wrap(button).should('be.visible');
            cy.wrap(button).click();
        });
    }
}