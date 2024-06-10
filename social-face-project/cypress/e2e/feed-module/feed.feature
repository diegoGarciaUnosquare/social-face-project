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

    Scenario: User clicks on like button of a post
        Given the user is logged in social face
        When the user is on the feed page
        Then the user should be able to click the like button of a post

    Scenario: User adds a comment to a post
        Given the user is logged in social face
        When the user is on the feed page
        When the user clicks the add comment button of a post
        Then the user should see the add comment field
        Then the user should be able to add a comment to the post
