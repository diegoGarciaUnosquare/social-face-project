export class NavbarPageObject {
    private navbarContainer ='[data-navbar-container]';
    private feedOptionButton = '[data-navbar-option-feed]';
    private settingsOptionButton = '[data-navbar-option-settings]';
    private profileMenuButton = '[data-navbar-profile]';
    private profileOptionButton = '[data-menu-navigate-profile]';
    private logoutOptionButton = '[data-menu-navigate-logout]';

    public userClickSettingsOption(): void {
        cy.get(this.navbarContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.settingsOptionButton).click();
        });
    }

    public userClickProfileMenu(): void {
        cy.get(this.navbarContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.profileMenuButton).click();
        });
    }

    public userClickProfileOption(): void {
        cy.get(this.profileOptionButton).click();
    }

    public userClickLogoutOption(): void {
        cy.get(this.logoutOptionButton).click();
    }

    public userClickFeedOption(): void {
        cy.get(this.navbarContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.feedOptionButton).click();
        });
    }
}