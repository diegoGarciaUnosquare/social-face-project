import { Utility } from "../utility";

export class CreateUserPageObject {
    createUserContainer = '[data-create-user-container]';
    createUserStepper = '[data-create-user-stepper]';
    createUserForm = '[data-create-user-form]';
    usernameInputField = '[data-username-field]';
    usernameErrorField = '[data-username-error-field]';
    passwordInputField = '[data-password-field]';
    passwordErrorField = '[data-password-error-field]';
    emailInputField = '[data-email-field]';
    emailErrorField = '[data-email-error-field]';
    firstNameInputField = '[data-first-name-field]';
    firstNameErrorField = '[data-first-name-error-field]';
    lastNameInputField = '[data-last-name-field]';
    lastNameErrorField = '[data-last-name-error-field]';
    dateOfBirthInputField = '[data-birth-date-field]';
    emailNotificationInputField = '[data-notification-email-field]';
    browserNotificationInputField = '[data-notification-browser-field]';
    loadingSpinner = '[data-spinner]';
    nextButton = '[data-next-button]';
    accountCreatedTitle = '[data-account-created-title]';
    navigateToLoginBtn = '[data-navigate-login-button]';
    returnToLoginButton = '[data-return-to-login-btn]';

    public enterUserDataInForm(): void {
        cy.get(this.createUserForm).then((form: JQuery<HTMLElement>) => {
            const utility = new Utility();
            const user = utility.generateUser();
            cy.wrap(form).find(this.usernameInputField).type(user.username);
            cy.wrap(form).find(this.passwordInputField).type(user.password);
            cy.wrap(form).find(this.emailInputField).type(user.email);
            cy.wrap(form).find(this.firstNameInputField).type(user.firstName, { force: true });
            cy.wrap(form).find(this.lastNameInputField).type(user.lastName, { force: true });
            cy.wrap(form).find(this.dateOfBirthInputField).type('2023-01-07');
            cy.wrap(form).find(this.emailNotificationInputField).click();
        });
    }

    public clickNextButton(): void {
        cy.get(this.createUserForm).find(this.nextButton).click();
    }

    public clickNavigateToLoginButton(): void {
        cy.get(this.createUserStepper).find(this.navigateToLoginBtn).click();
    }


    public userIsOnTheCreateUserScreen(): void {
        cy.get(this.createUserContainer).should('be.visible');
    }

    public nextButtonIsEnabled(): void { 
        cy.get(this.createUserForm).find(this.nextButton).should('be.enabled');
    }

    public userIsOnTheAccountCreatedScreen(): void {
        cy.get(this.createUserStepper).then((stepper: JQuery<HTMLElement>) => {
            cy.wrap(stepper).find(this.accountCreatedTitle).should('be.visible');
            cy.wrap(stepper).find(this.navigateToLoginBtn).should('be.visible');
        });
    }

    public clickReturnToLoginButton(): void {
        cy.get(this.createUserStepper).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.returnToLoginButton).should('be.visible');
            cy.wrap(elem).find(this.returnToLoginButton).click();
        });
    }
}