export class ProfilePageObject {
    private profileContainer = '[data-profile-section]';


    public userIsOnProfilePage(): void {
        cy.get(this.profileContainer).should('be.visible');
    }
}