import { createAction, props } from "@ngrx/store";

import { IError } from "../../../shared/interfaces/error.interface";
import { Settings } from "../../../shared/interfaces/settings.interface";

export const getSettings = createAction(
    '[Settings page] Get Settings',
    props<{ userId: string}>()
);

export const getSettingsSuccess = createAction(
    '[Settings page] Get Settings Success',
    props<{ settings: Settings }>()
);

export const getSettingsFailure = createAction(
    '[Settings page] Get Settings Failure',
    props<{ error: IError }>()
);

export const updateSettings = createAction(
    '[Settings page] Update Settings',
    props<{ settings: Settings }>()
);

export const updateSettingsSuccess = createAction(
    '[Settings page] Update Settings Success',
    props<{ settings: Settings }>()
);

export const updateSettingsFailure = createAction(
    '[Settings page] Update Settings Failure',
    props<{ error: IError }>()
);