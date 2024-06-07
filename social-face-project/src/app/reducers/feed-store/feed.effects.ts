import * as FeedActions from "./feed.actions";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { Ad } from "../../../shared/interfaces/ad.interface";
import { FeedService } from "../../../shared/services/feed-service/feed.service";
import { IError } from "../../../shared/interfaces/error.interface";
import { Injectable } from "@angular/core";
import { Post } from "../../../shared/interfaces/post.interface";

@Injectable()
export class FeedEffects {
    constructor(private actions$: Actions, private feedService: FeedService) {}

    fetchPosts$ = createEffect(() => this.actions$.pipe(
        ofType(FeedActions.fetchPosts),
        map(action => action.userId),
        switchMap((userId: string) => {
            console.log('festPosts effect');
            console.log(userId);
            return this.feedService.fetchPosts(userId).pipe(
                map((postsFetched: Post[]) => FeedActions.fetchPostsSuccess({ posts: postsFetched })),
                catchError((errorData: Error) => {
                    const error: IError = {
                        message: errorData.message,
                        status: 500,
                        url: 'http://localhost:3000/posts',
                    };
                    return of(FeedActions.fetchPostsFailure({ error }));
                })
            );
        }),
    ));

    fetchAds$ = createEffect(() => this.actions$.pipe(
        ofType(FeedActions.fetchAds),
        switchMap(() => {
            console.log('fetchAds effect');
            return this.feedService.fetchAds().pipe(
                map((adsFetched: Ad) => FeedActions.fetchAdsSuccess({ ads: adsFetched })),
                catchError((errorData: Error) => {
                    const error: IError = {
                        message: errorData.message,
                        status: 500,
                        url: 'http://localhost:3000/ads',
                    };
                    return of(FeedActions.fetchAdsFailure({ error }));
                })
            );
        }),
    ));
}