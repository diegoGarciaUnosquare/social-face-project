import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

import { NavbarPageObject } from "../../support/pageObjects/navbar-page-object";
import { SettingsPageObject } from "../../support/pageObjects/settings-page-object";

const navbarPageObject = new NavbarPageObject();
const settingsPageObject = new SettingsPageObject();

Then("the user clicks the settings option on the navbar", () => {
    navbarPageObject.userClickSettingsOption();
});

Then("the user should be redirected to the settings page", () => {
    settingsPageObject.userIsOnSettingsPage();
});

Then("the user should see the export to csv button", () => {
    settingsPageObject.userShouldSeeExportToCsvButton();
});

Then("the user should be able to click the export button", () => {
    settingsPageObject.clickExportToCsvButton();
});

Then("the user should see the update settings button", () => {
    settingsPageObject.userShouldSeeUpdateSettingsButton();
});

Then("the user should be able to click the update settings button", () => {
    settingsPageObject.clickUpdateSettingsButton();
});

Then("the user should see the update settings form", () => {
    settingsPageObject.userShouldSeeUpdateSettingsForm();
});

When("the user clicks the submit settings button", () => {
    settingsPageObject.clickSubmitSettingsButton();
});

Then("the user should see the settings info updated", () => {
    settingsPageObject.userShouldNotSeeUpdateSettingsForm();
})
