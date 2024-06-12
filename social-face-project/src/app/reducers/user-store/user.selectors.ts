import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from "./user.reducer";

export const selectUserState = createFeatureSelector<AppState>('user');

export const getErrors = createSelector(
    selectUserState,
    (state: AppState) => state.error ? state.error : null,
);

export const getUser = createSelector(
    selectUserState,
    (state: AppState) => state.user ? state.user : null,
);

export const getUserId = createSelector(
    selectUserState,
    (state: AppState) => state.user ? state.user.id : null,
);

export const getUserProfile = createSelector(
    selectUserState,
    (state: AppState) => state.profile ? state.profile : null,
);