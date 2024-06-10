export class ForgotPasswordPageObject {
    forgotPasswordContainer = '[data-forgot-password-container]';
    forgotPasswordForm = '[data-validate-email-form]';
    updatePasswordForm = '[data-update-password-form]';
    emailInputField = '[data-validate-email-field]';
    newPasswordInputField = '[data-new-password-field]';
    confirmPasswordInputField = '[data-confirm-password-field]';
    validateEmailButton = '[data-validate-email-btn]';
    updatePasswordButton = '[data-update-password-btn]';
    forgotPasswordButton = '[data-forgot-password-btn]';

    public clickForgotPasswordButton(): void {
        cy.get(this.forgotPasswordButton).click();
    }

    public isOnForgotPasswordPage(): void {
        cy.get(this.forgotPasswordContainer).should('be.visible');
        cy.get(this.forgotPasswordContainer).then((container: JQuery<HTMLElement>) => {
            cy.wrap(container).find(this.forgotPasswordForm).should('be.visible');
        });
    }

    public isOnUpdatePasswordPage(): void {
        cy.get(this.forgotPasswordContainer).should('be.visible');
        cy.get(this.forgotPasswordContainer).then((container: JQuery<HTMLElement>) => {
            cy.wrap(container).find(this.updatePasswordForm).should('be.visible');
        });
    }

    public enterEmail(): void {
        cy.get(this.forgotPasswordForm).then((form: JQuery<HTMLElement>) => {
            cy.wrap(form).find(this.emailInputField).type('jon@test.com', { force: true });
        });
    }

    public clickValidateEmailButton(): void {
        cy.get(this.forgotPasswordForm).then((form: JQuery<HTMLElement>) => {
            cy.wrap(form).find(this.validateEmailButton).click();
        });
    }

    public enterNewPassword(): void {
        cy.get(this.forgotPasswordContainer).find(this.updatePasswordForm).then((form: JQuery<HTMLElement>) => {
            cy.wrap(form).find(this.newPasswordInputField).type('a9yhd7s1', { force: true });
            cy.wrap(form).find(this.confirmPasswordInputField).type('a9yhd7s1', { force: true });
        });
    }

    public clickUpdatePasswordButton(): void {
        cy.get(this.updatePasswordForm).find(this.updatePasswordButton).then((button: JQuery<HTMLElement>) => {
            cy.wrap(button).should('be.enabled');
            cy.wrap(button).click();
        });
    }
}