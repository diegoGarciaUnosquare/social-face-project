import * as UserActions from './user.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { IError } from '../../../shared/interfaces/error.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { Injectable } from '@angular/core';
import { UserService } from '../../../shared/services/user-service.service';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService) { }

    createUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.createUser),
        map(action => action.userData),
        switchMap((userData: IUser) => this.userService.createUser(userData).pipe(
                map(createdUser => UserActions.createUserSuccess({ createdUser })),
        )),
        catchError(errorData => { 
            const error: IError = {
                message: errorData.message,
                status: 500,
                url: 'http://localhost:3000/users',
            };
            return of(UserActions.createUserFailure({ error }));
        })
        ),
    );
}
