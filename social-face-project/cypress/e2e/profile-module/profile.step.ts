import { NavbarPageObject } from "../../support/pageObjects/navbar-page-object";
import { ProfilePageObject } from "../../support/pageObjects/profile-page-objects";
import { Then } from "@badeball/cypress-cucumber-preprocessor";

const navbarPageObject = new NavbarPageObject();
const profilePageObject = new ProfilePageObject();

Then("the user clicks the profile option on the navbar", () => {
    navbarPageObject.userClickProfileMenu();
    navbarPageObject.userClickProfileOption();
})

Then("the user should be redirected to the profile page", () => {
    profilePageObject.userIsOnProfilePage();
});