Feature: Feed - Page
    
    As a user i want to be able to see posts on the feed page.

    Scenario: User is on the feed page
        Given the user is logged in social face
        When the user is on the feed page
        Then the user should see posts on the feed page

    Scenario: User sees an ad on the feed page
        Given the user is logged in social face
        When the user is on the feed page
        Then the user should see an ad on the feed page