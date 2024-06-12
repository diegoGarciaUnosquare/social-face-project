import * as SettingsActions from "./settings.actions";

import { createReducer, on } from "@ngrx/store";

import { IError } from "../../../shared/interfaces/error.interface";
import { Settings } from "../../../shared/interfaces/settings.interface";

export interface SettingsState {
    settings: Settings | null;
    error: IError | null;
}

export const settingsState: SettingsState = {
    settings: null,
    error: null,
};

export const settingsReducer = createReducer(
    settingsState,
    on(SettingsActions.getSettings, (state) => {
        return {
            ...state,
        };
    }),
    on(SettingsActions.getSettingsSuccess, (state, { settings }) => {
        return {
            ...state,
            settings,
        };
    }),
    on(SettingsActions.getSettingsFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
    on(SettingsActions.updateSettings, (state) => {
        return {
            ...state,
        };
    }),
    on(SettingsActions.updateSettingsSuccess, (state, { settings }) => {
        return {
            ...state,
            settings,
        };
    }),
    on(SettingsActions.updateSettingsFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
);