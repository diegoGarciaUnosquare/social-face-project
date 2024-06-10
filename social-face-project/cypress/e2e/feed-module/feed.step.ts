import '../../support/commands';

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

import { FeedPageObject } from "../../support/pageObjects/feed-page-object";

const feedPO = new FeedPageObject();

Given("the user is logged in social face", () => {
    cy.loginUser();
});

When("the user is on the feed page", () => {
    feedPO.userIsOnTheFeedScreen();    
});

Then("the user should see posts on the feed page", () => {
    feedPO.userShouldSeePost();
});

Then("the user should see an ad on the feed page", () => {
    feedPO.userShouldSeeAd();
});