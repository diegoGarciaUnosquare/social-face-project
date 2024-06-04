import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

import { FeedPageObject } from "../../support/pageObjects/feed-page-object";
import { LoginPageObjects } from "../../support/pageObjects/login-page-objects";

const loginPO = new LoginPageObjects();

When("the user enters his user credentials", () => {
    loginPO.userEntersLoginCredentials();
})

Then("the user clicks on the login button", () => {
    loginPO.clickLoginButton();
})

Then("the user should be redirected to the feed screen", () => {
    const feedPO = new FeedPageObject();
    feedPO.userIsOnTheFeedScreen();
});