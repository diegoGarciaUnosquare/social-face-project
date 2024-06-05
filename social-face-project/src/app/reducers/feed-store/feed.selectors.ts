import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FeedState } from "./feed.reducer";

export const selectFeedState = createFeatureSelector<FeedState>('feed');

export const getPosts = createSelector(
    selectFeedState,
    (state: FeedState) => state.posts ? state.posts : [],
);