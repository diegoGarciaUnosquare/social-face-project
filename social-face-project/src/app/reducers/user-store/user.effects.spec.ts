import { ReplaySubject, Subscription, of } from 'rxjs';
import { createUser, updatePassword, validateEmail } from './user.actions';

import { IUser } from '../../../shared/interfaces/user.interface';
import { TestBed } from '@angular/core/testing';
import { UserEffects } from './user.effects';
import { UserService } from '../../../shared/services/user-service/user-service.service';
import UserServiceMock from '../../../../unit-tests/mocks/services/user-service-mock';
import { provideMockActions } from '@ngrx/effects/testing';

describe('AppEffects', () => {
  let actions$: ReplaySubject<any>;
  let spyUserService: jasmine.SpyObj<UserService>;
  let effects: UserEffects;
  let sub: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: UserService,
          useClass: UserServiceMock
        }
      ]
    });

    effects = TestBed.inject(UserEffects);
    spyUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  describe('createUser - Effect', () => {
    const userData: IUser = {
      email: 'test@test.com',
      password: '123123',
      firstName: 'jon',
      lastName: 'doe',
      birthDate: new Date(),
      username: 'testUser',
      notificationPreference: false,
      role: 0,
      token: ''
    };

    it('should return createUserSuccess action and call createUser', () => {
      userData.birthDate = new Date();
      actions$ = new ReplaySubject(1);
      actions$.next(createUser({ userData }));

      sub = effects.createUser$.subscribe((result) => {
        expect(result).toEqual({
          createdUser: userData,
          type: '[Sign up page] Create User Success'
        });
        expect(spyUserService.createUser).toHaveBeenCalled();
      });
    });
    
    it('should return createUserFailure if user creation fails', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(createUser({ userData }));

      spyUserService.createUser.and.throwError('Error creating user');
      sub = effects.createUser$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Error creating user',
            status: 500,
            url: 'http://localhost:3000/users'
          },
          type: '[Sign up page] Create User Failure'
        });
        expect(spyUserService.createUser).toHaveBeenCalled();
      });
    });
  });

  describe('validateEmail - Effect', () => {
    it('should return validateEmailSuccess action and call validateEmail', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(validateEmail({ email: '' }));

      spyUserService.validateEmail.and.returnValue(of(true));
      sub = effects.validateEmail$.subscribe((result) => {
        expect(result).toEqual({
          type: '[Forgot password page] Validate Email Success'
        });
        expect(spyUserService.validateEmail).toHaveBeenCalled();
      });
    });

    it('should return validateEmailFailure if email is invalid', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(validateEmail({ email: '' }));

      spyUserService.validateEmail.and.returnValue(of(false));
      sub = effects.validateEmail$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Invalid email',
            status: 400,
            url: 'http://localhost:3000/validate-email'
          },
          type: '[Forgot password page] Validate Email Failure'
        });
        expect(spyUserService.validateEmail).toHaveBeenCalled();
      });
    });

    it('should return validateEmailFailure if an error occurs', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(validateEmail({ email: '' }));

      spyUserService.validateEmail.and.throwError('Error validating email');
      sub = effects.validateEmail$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Error validating email',
            status: 500,
            url: 'http://localhost:3000/validate-email'
          },
          type: '[Forgot password page] Validate Email Failure'
        });
        expect(spyUserService.validateEmail).toHaveBeenCalled();
      });
    });
  });

  describe('updatePassword - Effect', () => {
    const password = 'test9323r9';

    it('should return updatePasswordSuccess action and call updatePassword', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(updatePassword({ password }));

      spyUserService.updatePassword.and.returnValue(of(password));
      sub = effects.updatePassword$.subscribe((result) => {
        expect(result).toEqual({
          type: '[Forgot password page] Update Password Success'
        });
      });
    });

    it('should return updatePasswordFailure if an error occurs', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(updatePassword({ password }));

      spyUserService.updatePassword.and.throwError('Error updating password');
      sub = effects.updatePassword$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Error updating password',
            status: 500,
            url: 'http://localhost:3000/user/1/password'
          },
          type: '[Forgot password page] Update Password Failure'
        });
        expect(spyUserService.updatePassword).toHaveBeenCalled();
      });
    });
  });
});
