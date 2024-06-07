import * as FeedActions from "./feed.actions";

import { createReducer, on } from "@ngrx/store";

import { Ad } from "../../../shared/interfaces/ad.interface";
import { IError } from "../../../shared/interfaces/error.interface";
import { Post } from "../../../shared/interfaces/post.interface";

export interface FeedState {
    posts: Post[];
    error: IError | null;
    ads: Ad | null;
}

export const feedState: FeedState = {
    posts: [],
    ads: null,
    error: null,
};

export const feedReducer = createReducer(
    feedState,
    on(FeedActions.fetchPosts, (state) => {
        return {
            ...state,
        };
    }),
    on(FeedActions.fetchPostsSuccess, (state, { posts }) => {
        return {
            ...state,
            posts,
        };
    }),
    on(FeedActions.fetchPostsFailure, (state, { error }) => {
        return {
            ...state,
            error
        };
    }),
    on(FeedActions.fetchAds, (state) => {
        return {
            ...state,
        };
    }),
    on(FeedActions.fetchAdsSuccess, (state, { ads }) => {
        return {
            ...state,
            ads,
        };
    }),
    on(FeedActions.fetchAdsFailure, (state, { error }) => {
        return {
            ...state,
            error
        };
    }),
);