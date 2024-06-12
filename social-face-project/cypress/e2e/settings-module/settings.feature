Feature: Settings Module

    As a user i want to be able to see my settings

    Scenario: User is on the profile page
        Given the user is logged in social face
        When the user is on the feed page
        And the user clicks the settings option on the navbar
        Then the user should be redirected to the settings page

    Scenario: User clicks export to csv button
        Given the user is logged in social face
        When the user is on the feed page
        And the user clicks the settings option on the navbar
        Then the user should be redirected to the settings page
        Then the user should see the export to csv button
        And the user should be able to click the export button

    Scenario: User clicks update settings button and see form
        Given the user is logged in social face
        When the user is on the feed page
        And the user clicks the settings option on the navbar
        Then the user should be redirected to the settings page
        Then the user should see the update settings button
        And the user should be able to click the update settings button
        And the user should see the update settings form
        When the user clicks the submit settings button
        Then the user should see the settings info updated