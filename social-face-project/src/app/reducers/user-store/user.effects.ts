import * as UserActions from './user.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { IError } from '../../../shared/interfaces/error.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Profile } from '../../../shared/interfaces/profile.interface';
import { ProfileService } from '../../../shared/services/profile-service/profile.service';
import { UserService } from '../../../shared/services/user-service/user-service.service';

@Injectable()
export class UserEffects {
    private url: string = 'https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-project-mock-server/';

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private profileService: ProfileService,
    ) { }

    createUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.createUser),
        map(action => action.userData),
        switchMap((userData: IUser) => this.userService.createUser(userData).pipe(
            map(() => UserActions.createUserSuccess()),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}create-user`,
                };
                return of(UserActions.createUserFailure({ error }));
            })
        )),
    ));

    validateEmail$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.validateEmail),
        map(action => action.email),
        switchMap((email: string) => this.userService.validateEmail(email).pipe(
            map((validEmail: boolean) => {
                if (validEmail) {
                    return UserActions.validateEmailSuccess();
                }
                const error: IError = {
                    message: 'Invalid email',
                    status: 400,
                    url: `${this.url}validate-email`,
                };
                return UserActions.validateEmailFailure({ error});
            }),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}validate-email`,
                };
                return of(UserActions.validateEmailFailure({ error }));
            })
        )),
    ));

    updatePassword$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updatePassword),
        map(action => action.password),
        switchMap((password: string) => this.userService.updatePassword(password).pipe(
            map(() => UserActions.updatePasswordSuccess()),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}update-password`,
                };
                return of(UserActions.updatePasswordFailure({ error }));
            })
        )),
    ));

    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loginUser),
        map(action => action),
        switchMap(({ username, password }) => this.userService.login(username, password).pipe(
            map((user: IUser) => UserActions.loginUserSuccess({ user })),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}login-user`,
                };
                return of(UserActions.loginUserFailure({ error }));
            })
        )),
    ));

    userProfile$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.getProfile),
        map(action => action.userId),
        switchMap((userId: string) => this.profileService.getProfileData(userId).pipe(
            map((profile: Profile) => UserActions.getProfileSuccess({ profile })),
            catchError((errorData: Error) => {
                const error: IError = {
                    message: errorData.message,
                    status: 500,
                    url: `${this.url}get-profile`,
                };
                return of(UserActions.getProfileFailure({ error }));
            })
        )),
    ));

    logoutUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.logoutUser),
        map(() => UserActions.logoutUserSuccess()),
        catchError((errorData: Error) => {
            const error: IError = {
                message: errorData.message,
                status: 500,
                url: `${this.url}logout-user`,
            };
            return of(UserActions.logoutUserFailure({ error }));
        })
    ));
}
