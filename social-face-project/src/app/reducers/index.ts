import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { AppState, userReducer } from './user-store/user.reducer';
import { FeedState, feedReducer } from './feed-store/feed.reducer';

import { isDevMode } from '@angular/core';

export interface State {
  user: AppState,
  feed: FeedState,
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  feed: feedReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
