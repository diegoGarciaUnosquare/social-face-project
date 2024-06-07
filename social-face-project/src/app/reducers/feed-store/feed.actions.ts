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