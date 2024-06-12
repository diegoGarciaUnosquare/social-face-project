import * as UserActions from './user.actions';

import { createReducer, on } from '@ngrx/store';

import { IError } from '../../../shared/interfaces/error.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { Profile } from '../../../shared/interfaces/profile.interface';

export interface AppState {
    user: IUser | null;
    profile: Profile | null;
    error: IError | null;
}

export const userState: AppState = {
    user: null,
    profile: null,
    error: null,
};

export const userReducer = createReducer(
    userState,
    on(UserActions.createUser, (state) => {
        return {
            ...state,
        };
    }),
    on(UserActions.createUserSuccess, (state) => {
        return {
            ...state,
        };
    }),
    on(UserActions.createUserFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
    on(UserActions.validateEmail, (state) => { return { ...state }; }),
    on(UserActions.validateEmailSuccess, (state) => { return { ...state }; }),
    on(UserActions.validateEmailFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
    on(UserActions.updatePassword, (state) => { return { ...state }; }),
    on(UserActions.updatePasswordSuccess, (state) => { return { ...state }; }),
    on(UserActions.updatePasswordFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
    on(UserActions.loginUser, (state) => { return { ...state }; }),
    on(UserActions.loginUserSuccess, (state, { user }) => {
        return {
            ...state,
            user,
        };
    }),
    on(UserActions.loginUserFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
    on(UserActions.getProfile, (state) => { return { ...state }; }),
    on(UserActions.getProfileSuccess, (state, { profile }) => {
        return {
            ...state,
            profile,
        };
    }),
    on(UserActions.getProfileFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
    on(UserActions.logoutUser, (state) => {
        return {
            ...state,
        };
    }),
    on(UserActions.logoutUserSuccess, (state) => {
        return {
            ...state,
            user: null,
        };
    }),
    on(UserActions.logoutUserFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
);