export class ProfilePageObject {
    private profileContainer = '[data-profile-section]';
    private postId = '#post-container-';


    public userIsOnProfilePage(): void {
        cy.get(this.profileContainer).should('be.visible');
    }

    public userShouldSeePost(): void {
        cy.get(this.profileContainer).within((profileSection: JQuery<HTMLElement>) => {
            cy.wrap(profileSection).find(`${this.postId}0`).should('be.visible');
        });
    }
}