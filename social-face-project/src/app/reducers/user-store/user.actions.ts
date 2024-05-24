import { createAction, props } from '@ngrx/store';

import { IError } from '../../../shared/interfaces/error.interface';
import { IUser } from '../../../shared/interfaces/user.interface';

export const createUser = createAction(
  '[Sign up page] Create User',
  props<{ userData: IUser }>()
);
export const createUserSuccess = createAction(
  '[Sign up page] Create User Success',
  props<{ createdUser: IUser }>()
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