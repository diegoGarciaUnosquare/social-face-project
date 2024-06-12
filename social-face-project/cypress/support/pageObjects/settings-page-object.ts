export class SettingsPageObject {
    private settingsSection = '[data-settings-section]';
    private settingsContainer = '[data-settings-container]';
    private settingsUpdateForm = '[data-update-settings-form]';
    private exportToCsvButton = '[data-export-csv-btn]';
    private updateSettingsButton = '[data-update-settings-btn]';
    private submitSettingsButton = '[data-submit-settings-btn]';

    public userIsOnSettingsPage(): void {
        cy.get(this.settingsSection).should('be.visible');
    }

    public userShouldSeeExportToCsvButton(): void {
        cy.get(this.settingsContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.exportToCsvButton).should('be.visible');
        });
    }

    public clickExportToCsvButton(): void {
        cy.get(this.settingsContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.exportToCsvButton).click();
        });
    }

    public userShouldSeeUpdateSettingsButton(): void {
        cy.get(this.settingsContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.updateSettingsButton).should('be.visible');
        });
    }

    public clickUpdateSettingsButton(): void {
        cy.get(this.settingsContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.updateSettingsButton).click();
        });
    }

    public clickSubmitSettingsButton(): void {
        cy.get(this.settingsContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.submitSettingsButton).click();
        });
    }

    public userShouldSeeUpdateSettingsForm(): void {
        cy.get(this.settingsContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.settingsUpdateForm).should('be.visible');
        });
    }

    public userShouldNotSeeUpdateSettingsForm(): void {
        cy.get(this.settingsContainer).within((elem: JQuery<HTMLElement>) => {
            cy.wrap(elem).find(this.settingsUpdateForm).not('be.visible');
        });
    }
}