import * as SettingsActions from "./settings.actions";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { IError } from "../../../shared/interfaces/error.interface";
import { Injectable } from "@angular/core";
import { Settings } from "../../../shared/interfaces/settings.interface";
import { SettingsService } from "../../../shared/services/settings-service/settings.service";

@Injectable()
export class SettingsEffects {
    private url: string = `https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-feed-user-mock-backend/`;

    constructor(
        private actions$: Actions,
        private settingsService: SettingsService,
    ) { }

    getSettings$ = createEffect(() => this.actions$.pipe(
        ofType(SettingsActions.getSettings),
        switchMap(() => this.settingsService.getSettings().pipe(
            map((settings: Settings) => SettingsActions.getSettingsSuccess({ settings })),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}settings`,
                };
                return of(SettingsActions.getSettingsFailure({ error }));
            })
        )),
    ));

    updateSettings$ = createEffect(() => this.actions$.pipe(
        ofType(SettingsActions.updateSettings),
        switchMap(({ settings }) => this.settingsService.updateSettings(settings).pipe(
            map(() => SettingsActions.updateSettingsSuccess({ settings })),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}settings`,
                };
                return of(SettingsActions.updateSettingsFailure({ error }));
            })
        )),
    ));
}