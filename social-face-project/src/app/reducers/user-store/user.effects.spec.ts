import { ReplaySubject, Subscription, of } from 'rxjs';
import { createUser, updatePassword, validateEmail } from './user.actions';

import { IUser } from '../../../shared/interfaces/user.interface';
import { TestBed } from '@angular/core/testing';
import { UserEffects } from './user.effects';
import { UserService } from '../../../shared/services/user-service/user-service.service';
import UserServiceMock from '../../../../unit-tests/mocks/services/user-service-mock';
import { provideMockActions } from '@ngrx/effects/testing';

describe('UserEffects', () => {
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
      birthDate: new Date('1991-01-01'),
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
          type: '[Sign up page] Create User Success'
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

  });

deja   describe('updatePassword - Effect', () => {
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
  });
});
