export class FeedPageObject {
    feedPageContainer = '[data-feed-page-container]';


    public userIsOnTheFeedScreen(): void {
        cy.get(this.feedPageContainer).should('be.visible');
    }
}