Feature: Create User

    As a user, I want to be able to create an account so that I log into the social-face app.

    Scenario: User navigates to the create account screen
        Given the user is on the login screen
        When the user taps on the create account button
        Then the user is taken to the create account screen

    Scenario: User creates an account
        Given the user is on the login screen
        When the user taps on the create account button
        Then the user is taken to the create account screen
        When the user enters their account information
        Then the next button should be enabled
        When the user taps on the next button
        Then the user is taken account creation success screen
        When the user taps the navigate to login screen button
        Then the user should be taken to the login screen

