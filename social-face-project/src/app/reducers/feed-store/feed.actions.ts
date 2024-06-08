import { createAction, props } from "@ngrx/store";

import { Ad } from "../../../shared/interfaces/ad.interface";
import { IError } from "../../../shared/interfaces/error.interface";
import { Post } from "../../../shared/interfaces/post.interface";

export const fetchPosts = createAction(
    '[Feed page] Fetch Posts',
    props<{ userId: string }>()
);

export const fetchPostsSuccess = createAction(
    '[Feed page] Fetch Posts Success',
    props<{ posts: Post[] }>()
);

export const fetchPostsFailure = createAction(
    '[Feed page] Fetch Posts Failure',
    props<{ error: IError }>()
);

export const fetchAds = createAction(
    '[Feed page] Fetch Ads'
);

export const fetchAdsSuccess = createAction(
    '[Feed page] Fetch Ads Success',
    props<{ ads: Ad }>()
);

export const fetchAdsFailure = createAction(
    '[Feed page] Fetch Ads Failure',
    props<{ error: IError }>()
);

export const likePost = createAction(
    '[Feed page] Like Post',
    props<{ postId: string }>()
);

export const likePostSuccess = createAction(
    '[Feed page] Like Post Success',
    props<{ posts: Post[] }>()
);

export const likePostFailure = createAction(
    '[Feed page] Like Post Failure',
    props<{ error: IError }>()
);

export const addComment = createAction(
    '[Feed page] Add Comment',
    props<{ postId: string, content: string, userId: string }>()
);

export const addCommentSuccess = createAction(
    '[Feed page] Add Comment Success',
    props<{ posts: Post[] }>()
);

export const addCommentFailure = createAction(
    '[Feed page] Add Comment Failure',
    props<{ error: IError }>()
);