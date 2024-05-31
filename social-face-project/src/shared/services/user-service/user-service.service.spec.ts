import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Subscription, of } from 'rxjs';

import { IUser } from '../../interfaces/user.interface';
import { Roles } from '../../enums/roles.enum';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user-service.service';

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;
  let sub: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if(sub) {
      sub.unsubscribe();
    }
  });

  describe('createUser', () => {
    const mockUser: IUser = {
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: new Date(),
      notificationPreference: false,
      role: Roles.user,
      token: '',
    };

    it('should create a user', (done: DoneFn) => {
      spyOn(service, 'createUser').and.returnValue(of(mockUser));
      sub = service.createUser(mockUser).subscribe((response) => {
        expect(response).toEqual(mockUser);
        done();
      });
    });

    it('should return an error', (done: DoneFn) => {
      const errorMessage = 'Error creating user';
      spyOn(service, 'createUser').and.callThrough();
      spyOn(service['httpService'], 'post').and.returnValue(of(new Error(errorMessage)));
      sub = service.createUser(mockUser).subscribe((response: any) => {
        expect(response.message).toEqual(errorMessage);
        done();
      });
    });
  });

  describe('validateEmail', () => {
    const email = 'test@test.com';

    it('should return false if email is invalid', (done: DoneFn) => {
      spyOn(service, 'validateEmail').and.returnValue(of(false));
      sub = service.validateEmail(email).subscribe((response) => {
        expect(response).toBeFalse();
        done();
      });
    });

    it('should return true if email is valid', (done: DoneFn) => {
      spyOn(service, 'validateEmail').and.returnValue(of(true));
      sub = service.validateEmail(email).subscribe((response) => {
        expect(response).toBeTrue();
        done();
      });
    });

    it('should return an error', (done: DoneFn) => {
      const errorMessage = 'Error validating email';
      spyOn(service, 'validateEmail').and.callThrough();
      spyOn(service['httpService'], 'post').and.returnValue(of(new Error(errorMessage)));
      sub = service.validateEmail(email).subscribe((response: any) => {
        expect(response.message).toEqual(errorMessage);
        done();
      });
    });
  });

  describe('updatePassword', () => {
    const password = '120930';

    it('should update the password', (done: DoneFn) => {
      spyOn(service, 'updatePassword').and.returnValue(of(password));
      sub = service.updatePassword(password).subscribe((response: string) => {
        expect(response).toEqual(password);
        done();
      });
    });

    it('should return an error', (done: DoneFn) => {
      const errorMessage = 'Error updating password';
      spyOn(service, 'updatePassword').and.callThrough();
      spyOn(service['httpService'], 'put').and.returnValue(of(new Error(errorMessage)));
      sub = service.updatePassword(password).subscribe((response: any) => {
        expect(response.message).toEqual(errorMessage);
        done();
      });
    });

  });
});
