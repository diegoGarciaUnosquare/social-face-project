import { createAction, props } from '@ngrx/store';

import { IError } from '../../../shared/interfaces/error.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { Profile } from '../../../shared/interfaces/profile.interface';

export const createUser = createAction(
  '[Sign up page] Create User',
  props<{ userData: IUser }>()
);
export const createUserSuccess = createAction(
  '[Sign up page] Create User Success',
);
export const createUserFailure = createAction(
  '[Sign up page] Create User Failure',
  props<{ error: IError }>()
);

export const validateEmail = createAction(
  '[Forgot password page] Validate Email',
  props<{ email: string }>()
);
export const validateEmailSuccess = createAction(
  '[Forgot password page] Validate Email Success',
);
export const validateEmailFailure = createAction(
  '[Forgot password page] Validate Email Failure',
  props<{ error: IError }>()
);

export const updatePassword = createAction(
  '[Forgot password page] Update Password',
  props<{ password: string }>()
);
export const updatePasswordSuccess = createAction(
  '[Forgot password page] Update Password Success',
);
export const updatePasswordFailure = createAction(
  '[Forgot password page] Update Password Failure',
  props<{ error: IError }>()
);

export const loginUser = createAction(
  '[Login page] Login Users',
  props<{ username: string, password: string }>()
);

export const loginUserSuccess = createAction(
  '[Login page] Login Users Success',
  props<{ user: IUser }>()
);

export const loginUserFailure = createAction(
  '[Login page] Login Users Failure',
  props<{ error: IError }>()
);

export const getProfile = createAction(
  '[Profile page] Get Profile',
  props<{ userId: string }>()
);

export const getProfileSuccess = createAction(
  '[Profile page] Get Profile Success',
  props<{ profile: Profile }>()
);

export const getProfileFailure = createAction(
  '[Profile page] Get Profile Failure',
  props<{ error: IError }>()
);

export const logoutUser = createAction(
  '[Logout page] Logout User',
);

export const logoutUserSuccess = createAction(
  '[Logout page] Logout User Success',
);

export const logoutUserFailure = createAction(
  '[Logout page] Logout User Failure',
  props<{ error: IError }>()
);