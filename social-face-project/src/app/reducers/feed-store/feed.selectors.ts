import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FeedState } from "./feed.reducer";

export const selectFeedState = createFeatureSelector<FeedState>('feed');

export const getPosts = createSelector(
    selectFeedState,
    (state: FeedState) => state.posts ? state.posts : [],
);

export const getAd = createSelector(
    selectFeedState,
    (state: FeedState) => state.ads ? state.ads : null,
);