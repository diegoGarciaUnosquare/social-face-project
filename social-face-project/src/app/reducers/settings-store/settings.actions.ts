import { createAction, props } from "@ngrx/store";

export const getSettings = createAction(
    '[Settings page] Get Settings',
    props<{ userId: string}>()
);

export const getSettingsSuccess = createAction(
    '[Settings page] Get Settings Success',
    props<{ settings: any }>()
);

export const getSettingsFailure = createAction(
    '[Settings page] Get Settings Failure',
    props<{ error: any }>()
);