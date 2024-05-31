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
    dateOfBirthInputField = '[data-date-of-birth-field]';
    emailNotificationInputField = '[data-notification-email-field]';
    browserNotificationInputField = '[data-notification-browser-field]';
    loadingSpinner = '[data-spinner]';
    nextButton = '[data-next-button]';
    accountCreatedTitle = '[data-account-created-title]';
    navigateToLoginBtn = '[data-navigate-login-button]';

    public userIsOnTheCreateUserScreen(): void {
        cy.get(this.createUserContainer).should('be.visible');
    }
}