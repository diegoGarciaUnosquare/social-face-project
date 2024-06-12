import { ReplaySubject, Subscription, of, throwError } from 'rxjs';
import { createUser, getProfile, loginUser, updatePassword, validateEmail } from './user.actions';

import { IUser } from '../../../shared/interfaces/user.interface';
import LocalStorageMockService from '../../../../unit-tests/mocks/services/local-storage-service-mock';
import { LocalStorageService } from '../../../shared/services/local-storage-service/local-storage.service';
import { ProfileService } from '../../../shared/services/profile-service/profile.service';
import ProfileServiceMock from '../../../../unit-tests/mocks/services/profile-service-mock';
import { TestBed } from '@angular/core/testing';
import { UserEffects } from './user.effects';
import { UserService } from '../../../shared/services/user-service/user-service.service';
import UserServiceMock from '../../../../unit-tests/mocks/services/user-service-mock';
import { provideMockActions } from '@ngrx/effects/testing';

describe('UserEffects', () => {
  let actions$: ReplaySubject<any>;
  let spyUserService: jasmine.SpyObj<UserService>;
  let spyLocalStorageService: jasmine.SpyObj<LocalStorageService>;
  let spyProfileService: jasmine.SpyObj<ProfileService>;
  let effects: UserEffects;
  let sub: Subscription;
  const url: string = 'https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-project-mock-server/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
        {
          provide: LocalStorageService,
          useClass: LocalStorageMockService,
        },
        {
          provide: ProfileService,
          useClass: ProfileServiceMock,
        }
      ]
    });

    effects = TestBed.inject(UserEffects);
    spyUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    spyProfileService = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    spyLocalStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
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

    it('should return createUserSuccess action and call createUser', (done: DoneFn) => {
      userData.birthDate = new Date();
      actions$ = new ReplaySubject(1);
      actions$.next(createUser({ userData }));

      sub = effects.createUser$.subscribe((result) => {
        expect(result).toEqual({
          type: '[Sign up page] Create User Success'
        });
        expect(spyUserService.createUser).toHaveBeenCalled();
        done();
      });
    });

    it('should return createUserFailure if error', (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(createUser({ userData }));

      spyUserService.createUser.and.returnValue(throwError(() => new Error('Error creating user')));
      sub = effects.createUser$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Error creating user',
            status: 500,
            url: `${url}create-user`
          },
          type: '[Sign up page] Create User Failure'
        });
        expect(spyUserService.createUser).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('validateEmail - Effect', () => {
    it('should return validateEmailSuccess action and call validateEmail', (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(validateEmail({ email: '' }));

      spyUserService.validateEmail.and.returnValue(of(true));
      sub = effects.validateEmail$.subscribe((result) => {
        expect(result).toEqual({
          type: '[Forgot password page] Validate Email Success'
        });
        expect(spyUserService.validateEmail).toHaveBeenCalled();
        done();
      });
    });

    it('should return validateEmailFailure if email is invalid', (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(validateEmail({ email: '' }));

      spyUserService.validateEmail.and.returnValue(of(false));
      sub = effects.validateEmail$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Invalid email',
            status: 400,
            url: `${url}validate-email`
          },
          type: '[Forgot password page] Validate Email Failure'
        });
        expect(spyUserService.validateEmail).toHaveBeenCalled();
        done();
      });
    });

    it('should return validateEmailFailure if error', (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(validateEmail({ email: '' }));

      spyUserService.validateEmail.and.returnValue(throwError(() => new Error('Error validating email')));
      sub = effects.validateEmail$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Error validating email',
            status: 500,
            url: `${url}validate-email`
          },
          type: '[Forgot password page] Validate Email Failure'
        });
        expect(spyUserService.validateEmail).toHaveBeenCalled();
        done();
      });
    });

  });

  describe('updatePassword - Effect', () => {
    const password = 'test9323r9';

    it('should return updatePasswordSuccess action and call updatePassword', (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(updatePassword({ password }));

      spyUserService.updatePassword.and.returnValue(of(password));
      sub = effects.updatePassword$.subscribe((result) => {
        expect(result).toEqual({
          type: '[Forgot password page] Update Password Success'
        });
        done();
      });
    });

    it('should return updatePasswordFailure if error', (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(updatePassword({ password }));

      spyUserService.updatePassword.and.returnValue(throwError(() => new Error('Error updating password')));
      sub = effects.updatePassword$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Error updating password',
            status: 500,
            url: `${url}update-password`
          },
          type: '[Forgot password page] Update Password Failure'
        });
        done();
      });
    });
  });

  describe('login - Effect', () => {
    const username = 'testUser';
    const password = '123123';

    it('should return loginUserSuccess action and call login', (done: DoneFn) => {
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

      actions$ = new ReplaySubject(1);
      actions$.next(loginUser({ username, password }));
      spyUserService.login.and.returnValue(of(userData));

      sub = effects.loginUser$.subscribe((result) => {
        expect(result).toEqual({
          user: userData,
          type: '[Login page] Login Users Success'
        });
        expect(spyUserService.login).toHaveBeenCalled();
        done();
      });
    });

    it('should return loginUserFailure if error', (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(loginUser({ username, password }));

      spyUserService.login.and.returnValue(throwError(() => new Error('Error logging in')));
      sub = effects.loginUser$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Error logging in',
            status: 500,
            url: `${url}login-user`
          },
          type: '[Login page] Login Users Failure'
        });
        done();
      });
    });
  });

  describe("userProfile - Effect", () => {
    it("should return getProfileSuccess action and call getProfileData", (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(getProfile({ userId: '123' }));
      
      spyProfileService.getProfileData.and.returnValue(of({
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        bio: '',
        profilePicture: '',
        userId: '123',
      }));
      sub = effects.userProfile$.subscribe((result) => {
        expect(result).toEqual({
          type: '[Profile page] Get Profile Success',
          profile: {
            id: '123',
            firstName: 'John',
            lastName: 'Doe',
            bio: '',
            profilePicture: '',
            userId: '123',
          }
        });
        done();
      });
    });

    it("should return getProfileFailure if error", (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(getProfile({ userId: '123' }));

      spyProfileService.getProfileData.and.returnValue(throwError(() => new Error('Error getting profile')));
      sub = effects.userProfile$.subscribe((result) => {
        expect(result).toEqual({
          error: {
            message: 'Error getting profile',
            status: 500,
            url: `${url}get-profile`
          },
          type: '[Profile page] Get Profile Failure'
        });
        done();
      });
    });
  });
});
