Feature: Forgot Password feature

    As a user i want to be able to reset my password if i forget it so that i can access my account again.

    Scenario: User navigates to the forgot password page
        Given the user is on the login screen
        When the user clicks on the forgot password button
        Then then user should navigate to the forgot password screen

    Scenario: User validates email address
        Given the user is on the forgot password screen
        When the user enters an email address
        And the user clicks on the submit button
        Then the user should navigate to the update password screen
       