import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from "./user.reducer";

export const selectAuthState = createFeatureSelector<AppState>('user');

export const getErrors = createSelector(
    selectAuthState,
    (state: AppState) => state.error ? state.error : null,
);

export const getUser = createSelector(
    selectAuthState,
    (state: AppState) => state.user ? state.user : null,
);