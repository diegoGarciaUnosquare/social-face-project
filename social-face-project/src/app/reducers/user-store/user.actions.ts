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
