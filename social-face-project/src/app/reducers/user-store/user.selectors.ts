import { AppState } from "./user.reducer";
import { createSelector } from "@ngrx/store";

export const state = (state: AppState) => state;

export const getErrors = createSelector(
    state,
    (state: AppState) => state.error ? state.error : null,
);