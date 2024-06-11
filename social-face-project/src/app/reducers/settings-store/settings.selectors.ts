import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SettingsState } from "./settings.reducer";

export const selectSettingsState = createFeatureSelector<SettingsState>('settings');

export const getUserSettings = createSelector(
    selectSettingsState,
    (state: SettingsState) => state.settings ? state.settings : null,
);