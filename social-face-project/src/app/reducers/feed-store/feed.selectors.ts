import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FeedState } from "./feed.reducer";
import { Post } from "../../../shared/interfaces/post.interface";

export const selectFeedState = createFeatureSelector<FeedState>('feed');

export const getPosts = createSelector(
    selectFeedState,
    (state: FeedState) => state.posts ? state.posts : [],
);

export const getAd = createSelector(
    selectFeedState,
    (state: FeedState) => state.ads ? state.ads : null,
);

export const getRecentPosts = createSelector(
    selectFeedState,
    (state: FeedState) => state.posts ? getMostRecentPost(state.posts) : [],
);
/**
 * This method is in charge of sorting the posts and returning the 3 most recent posts
 * In this method we first destruct the posts array to avoid any mutation of the original array.
 * Then we sort the posts by the createdAt date in descending order.
 * Finally we return the first 3 posts from the sorted array.
 * @param posts[] Array of posts to sort
 * @returns Array of post with the 3 most recent posts
 */
const getMostRecentPost = (posts: Post[]): Post[] => {
    const post = [...posts];
    const sortedPosts = post.sort((firstPost: Post, NextPost: Post) => new Date(NextPost.createdAt).getTime() - new Date(firstPost.createdAt).getTime());
    return sortedPosts.slice(0, 3);
};