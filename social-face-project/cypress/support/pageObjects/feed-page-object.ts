export class FeedPageObject {
    feedPageContainer = '[data-feed-page-container]';
    postSectionContainer = '[data-posts-section-container]';
    postId = '#post-container-';
    adId = '#ad-container-';


    public userIsOnTheFeedScreen(): void {
        cy.get(this.feedPageContainer).should('be.visible');
    }

    public userShouldSeePost(): void {
        cy.get(this.postSectionContainer).should('be.visible');
        cy.get(this.postSectionContainer).then((postsSection: JQuery<HTMLElement>) => {
            cy.wrap(postsSection).find(`${this.postId}0`).should('be.visible');
        });
    }

    public userShouldSeeAd(): void {
        cy.get(this.postSectionContainer).should('be.visible');
        cy.get(this.postSectionContainer).then((postsSection: JQuery<HTMLElement>) => {
            cy.wrap(postsSection).find(`${this.adId}4`).should('be.visible');
        });
    }
}