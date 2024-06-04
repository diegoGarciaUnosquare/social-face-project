Feature: Login

    As a user i want to test the login workflow

    Scenario: the user logs into the app
        Given the user is on the login screen
        When the user enters his user credentials
        And the user clicks on the login button
        Then the user should be redirected to the feed screen