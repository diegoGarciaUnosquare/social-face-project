import * as UserActions from './user.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { IError } from '../../../shared/interfaces/error.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { Injectable } from '@angular/core';
import { UserService } from '../../../shared/services/user-service/user-service.service';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService) { }

    createUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.createUser),
        map(action => action.userData),
        switchMap((userData: IUser) => this.userService.createUser(userData).pipe(
            map((createdUser: IUser) => UserActions.createUserSuccess({ createdUser })),
        )),
        catchError((errorData: any) => {
            const error: IError = {
                message: errorData.message,
                status: 500,
                url: 'http://localhost:3000/users',
            };
            return of(UserActions.createUserFailure({ error }));
        })
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
                    url: 'http://localhost:3000/validate-email',
                };
                return UserActions.validateEmailFailure({ error});
            }),
        )),
        catchError((errorData: any) => {
            const error: IError = {
                message: errorData.message,
                status: 500,
                url: 'http://localhost:3000/validate-email',
            };
            return of(UserActions.validateEmailFailure({ error }));
        })
    ));

    updatePassword$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updatePassword),
        map(action => action.password),
        switchMap((password: string) => this.userService.updatePassword(password).pipe(
            map(() => UserActions.updatePasswordSuccess()),
        )),
        catchError((errorData: any) => {
            const error: IError = {
                message: errorData.message,
                status: 500,
                url: 'http://localhost:3000/user/1/password',
            };
            return of(UserActions.updatePasswordFailure({ error }));
        })
    ));
}
