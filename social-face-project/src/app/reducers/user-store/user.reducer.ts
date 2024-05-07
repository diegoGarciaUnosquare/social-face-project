import { createReducer, on } from '@ngrx/store';
import { createUser, createUserFailure, createUserSuccess } from './user.actions';

import { IError } from '../../../shared/interfaces/error.interface';
import { IUser } from '../../../shared/interfaces/user.interface';

export interface AppState {
    user: IUser | null;
    error: IError | null;
}

export const userState:AppState = {
    user: null,
    error: null,
};

export const userReducer = createReducer(
    userState,
    on(createUser, (state) => {
        return {
            ...state,
        };
    }),
    on(createUserSuccess, (state, { createdUser }) => {
        return {
            ...state,
            user: createdUser,
        };
    }),
    on(createUserFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
);