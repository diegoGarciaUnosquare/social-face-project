import { createAction, props } from "@ngrx/store";

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