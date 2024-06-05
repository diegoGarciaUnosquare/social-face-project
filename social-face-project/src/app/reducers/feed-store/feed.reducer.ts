import * as FeedActions from "./feed.actions";

import { createReducer, on } from "@ngrx/store";

import { IError } from "../../../shared/interfaces/error.interface";
import { Post } from "../../../shared/interfaces/post.interface";

export interface FeedState {
    posts: Post[];
    error: IError | null;
}

export const feedState: FeedState = {
    posts: [],
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
);