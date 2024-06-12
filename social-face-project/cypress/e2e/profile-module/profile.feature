Feature: Profile Module

    As a user i want to be able to see my profile information

    Scenario: User is on the profile page
        Given the user is logged in social face
        When the user is on the feed page
        And the user clicks the profile option on the navbar
        Then the user should be redirected to the profile page
    
    Scenario: User is on the profile page and can see posts
        Given the user is logged in social face
        When the user is on the feed page
        And the user clicks the profile option on the navbar
        Then the user should be redirected to the profile page
        Then the user should see post on his profile