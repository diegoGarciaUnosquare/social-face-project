import * as FeedActions from "./feed.actions";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { Ad } from "../../../shared/interfaces/ad.interface";
import { FeedService } from "../../../shared/services/feed-service/feed.service";
import { IError } from "../../../shared/interfaces/error.interface";
import { Injectable } from "@angular/core";
import { Post } from "../../../shared/interfaces/post.interface";
import { SnackbarService } from "../../../shared/services/snack-bar/snackbar.service";

@Injectable()
export class FeedEffects {
    private url: string = 'https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-project-mock-server/';

    constructor(
        private actions$: Actions, 
        private feedService: FeedService, 
        private snackbarService: SnackbarService
    ) { }

    fetchPosts$ = createEffect(() => this.actions$.pipe(
        ofType(FeedActions.fetchPosts),
        map(action => action.userId),
        switchMap((userId: string) => this.feedService.fetchPosts(userId).pipe(
            map((postsFetched: Post[]) => FeedActions.fetchPostsSuccess({ posts: postsFetched })),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}social-post`,
                }; 
                this.snackbarService.openSnackBar(error.message);
                return of(FeedActions.fetchPostsFailure({ error }));
            })
        )),
    ));

    fetchAds$ = createEffect(() => this.actions$.pipe(
        ofType(FeedActions.fetchAds),
        switchMap(() => this.feedService.fetchAds().pipe(
            map((adsFetched: Ad) => FeedActions.fetchAdsSuccess({ ads: adsFetched })),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: 'http://localhost:3000/ads',
                };
                this.snackbarService.openSnackBar(error.message);
                return of(FeedActions.fetchAdsFailure({ error }));
            })
        )),
    ));

    likePost$ = createEffect(() => this.actions$.pipe(
        ofType(FeedActions.likePost),
        map(action => action.postId),
        switchMap((postId: string) => this.feedService.likePost(postId).pipe(
            map((postsFetched: Post[]) => FeedActions.likePostSuccess({ posts: postsFetched })),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}social-post`,
                };
                this.snackbarService.openSnackBar(error.message);
                return of(FeedActions.likePostFailure({ error }));
            })
        )),
    ));

    addCommentPost$ = createEffect(() => this.actions$.pipe(
        ofType(FeedActions.addComment),
        map(action => action),
        switchMap(({ postId, content, userId }) => this.feedService.addComment(postId, content, userId).pipe(
            map((postsFetched: Post[]) => FeedActions.addCommentSuccess({ posts: postsFetched })),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}social-post`,
                };
                this.snackbarService.openSnackBar(error.message);
                return of(FeedActions.addCommentFailure({ error }));
            })
        )),
    ));
}