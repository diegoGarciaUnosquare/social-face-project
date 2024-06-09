import { ReplaySubject, Subscription, of, throwError } from "rxjs";

import { Ad } from "../../../shared/interfaces/ad.interface";
import { FeedEffects } from "./feed.effects";
import { FeedService } from "../../../shared/services/feed-service/feed.service";
import FeedServiceMock from "../../../../unit-tests/mocks/services/feed-service-mock";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TestBed } from "@angular/core/testing";
import { fetchPosts } from "./feed.actions";
import { provideMockActions } from "@ngrx/effects/testing";

describe('Feed - Effect', () => {
    let actions$: ReplaySubject<any>;
    let spyFeedService: jasmine.SpyObj<FeedService>;
    let effects: FeedEffects;
    let sub: Subscription;
    const url = 'https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-project-mock-server/';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            providers: [
                FeedEffects,
                provideMockActions(() => actions$),
                {
                    provide: FeedService,
                    useClass: FeedServiceMock,
                }
            ]
        });

        effects = TestBed.inject(FeedEffects);
        spyFeedService = TestBed.inject(FeedService) as jasmine.SpyObj<FeedService>;
    });

    afterEach(() => {
        if (sub) {
            sub.unsubscribe();
        }
    });

    describe('fetchPosts - Effect', () => {
        it('should return a fetchPostsSuccess action, with the posts, on success', (done: DoneFn) => {
            actions$ = new ReplaySubject(1);
            actions$.next(fetchPosts({ userId: '1' }));

            sub = effects.fetchPosts$.subscribe((result) => {
                expect(result).toEqual({
                    type: '[Feed page] Fetch Posts Success',
                    posts: []
                });
                done();
            });
        });

        it('should return a fetchPostsFailure action, with the error, on failure', (done: DoneFn) => {
            spyFeedService.fetchPosts.and.returnValue(throwError(() => new Error('Error')));

            actions$ = new ReplaySubject(1);
            actions$.next(fetchPosts({ userId: '1' }));

            sub = effects.fetchPosts$.subscribe((result) => {
                expect(result).toEqual({
                    type: '[Feed page] Fetch Posts Failure',
                    error: {
                        message: 'Error',
                        status: 500,
                        url: `${url}social-post`,
                    }
                });
                done();
            });
        });
    });

    describe('fetchAds - Effect', () => {
        it('should return a fetchAdsSuccess action, with the ads, on success', (done: DoneFn) => {
            actions$ = new ReplaySubject(1);
            actions$.next({ type: '[Feed page] Fetch Ads' });

            sub = effects.fetchAds$.subscribe((result) => {
                expect(result).toEqual({
                    type: '[Feed page] Fetch Ads Success',
                    ads: {} as Ad
                });
                done();
            });
        });

        it('should return a fetchAdsFailure action, with the error, on failure', (done: DoneFn) => {
            spyFeedService.fetchAds.and.returnValue(throwError(() => new Error('Error')));

            actions$ = new ReplaySubject(1);
            actions$.next({ type: '[Feed page] Fetch Ads' });

            sub = effects.fetchAds$.subscribe((result) => {
                expect(result).toEqual({
                    type: '[Feed page] Fetch Ads Failure',
                    error: {
                        message: 'Error',
                        status: 500,
                        url: 'http://localhost:3000/ads',
                    }
                });
                done();
            });
        });
    });

    describe('likePost - Effect', () => {
        it('should return a likePostSuccess action, with the posts, on success', (done: DoneFn) => {
            actions$ = new ReplaySubject(1);
            actions$.next({ type: '[Feed page] Like Post', postId: '1' });

            sub = effects.likePost$.subscribe((result) => {
                expect(result).toEqual({
                    type: '[Feed page] Like Post Success',
                    posts: []
                });
                done();
            });
        });

        it('should return a likePostFailure action, with the error, on failure', (done: DoneFn) => {
            spyFeedService.likePost.and.returnValue(throwError(() => new Error('Error')));

            actions$ = new ReplaySubject(1);
            actions$.next({ type: '[Feed page] Like Post', postId: '1' });

            sub = effects.likePost$.subscribe((result) => {
                expect(result).toEqual({
                    type: '[Feed page] Like Post Failure',
                    error: {
                        message: 'Error',
                        status: 500,
                        url: `${url}social-post`,
                    }
                });
                done();
            });
        });
    });
    
    describe('addComment - Effect', () => {
        it('should return a addCommentSuccess action, with the posts, on success', (done: DoneFn) => {
            actions$ = new ReplaySubject(1);
            actions$.next({ type: '[Feed page] Add Comment', postId: '1', content: 'content', userId: '1' });

            sub = effects.addCommentPost$.subscribe((result) => {
                expect(result).toEqual({
                    type: '[Feed page] Add Comment Success',
                    posts: []
                });
                done();
            });
        });

        it('should return a addCommentFailure action, with the error, on failure', (done: DoneFn) => {
            spyFeedService.addComment.and.returnValue(throwError(() => new Error('Error')));

            actions$ = new ReplaySubject(1);
            actions$.next({ type: '[Feed page] Add Comment', postId: '1', content: 'content', userId: '1' });

            sub = effects.addCommentPost$.subscribe((result) => {
                expect(result).toEqual({
                    type: '[Feed page] Add Comment Failure',
                    error: {
                        message: 'Error',
                        status: 500,
                        url: `${url}social-post`,
                    }
                });
                done();
            });
        });
    });
});