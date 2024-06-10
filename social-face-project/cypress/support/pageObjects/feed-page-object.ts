export class FeedPageObject {
    feedPageContainer = '[data-feed-page-container]';
    postSectionContainer = '[data-posts-section-container]';
    postId = '#post-container-';
    adId = '#ad-container-';
    commentField = '[data-add-comment-field]';
    likeBtn = '[data-post-like-btn]';
    commentBtn = '[data-post-comment-btn]';


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

    public clickLikeButton(): void {
        cy.get(this.postSectionContainer).then((postsSection: JQuery<HTMLElement>) => {
            const likeBtn = cy.wrap(postsSection).find(`${this.postId}0`).find(this.likeBtn);
            likeBtn.should('be.visible');
            likeBtn.click();
        });
    }

    public clickAddCommentButton(): void {
        cy.get(this.postSectionContainer).then((postsSection: JQuery<HTMLElement>) => {
            const commentBtn = cy.wrap(postsSection).find(`${this.postId}0`).find(this.commentBtn);
            commentBtn.should('be.visible');
            commentBtn.click();
        });
    }

    public userShouldSeeAddCommentField(): void {
        cy.get(this.postSectionContainer).then((postsSection: JQuery<HTMLElement>) => {
            cy.wrap(postsSection).find(`${this.postId}0`).find(this.commentField).should('be.visible');
        });
    }

    public addCommentToPost(): void {
        cy.get(this.postSectionContainer).then((postsSection: JQuery<HTMLElement>) => {
            const commentField = cy.wrap(postsSection).find(`${this.postId}0`).find(this.commentField);
            commentField.type('This is a test comment', { force: true });
            commentField.type('{enter}');
        });
    }
}