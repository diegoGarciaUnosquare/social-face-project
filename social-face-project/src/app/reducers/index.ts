import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { AppState, userReducer } from './user-store/user.reducer';

import { isDevMode } from '@angular/core';

export interface State {
  user: AppState,
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
