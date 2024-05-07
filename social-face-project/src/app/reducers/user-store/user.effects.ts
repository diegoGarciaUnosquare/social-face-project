import * as UserActions from './user.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { UserService } from '../../../shared/services/user-service.service';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService) { }

    createUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.createUser),
        map(action => action.userData),
        switchMap(userData => this.userService.createUser(userData).pipe(
            map(createdUser => UserActions.createUserSuccess({ createdUser })),
        )),
        catchError(error => {
            UserActions.createUserFailure(error);
            return of(error);
        })),
    );
}
