import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Subscription, of } from 'rxjs';

import { Profile } from '../../interfaces/profile.interface';
import { ProfileService } from './profile.service';
import { TestBed } from '@angular/core/testing';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;
  let sub: Subscription;
  const profile: Profile = {
    bio: 'test',
    firstName: 'test',
    lastName: 'test',
    profilePicture: 'test',
    id: 'test',
    userId: 'test',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProfileData', () => {
    it('should fetch the profile data of a user', (done: DoneFn) => {
      spyOn(service, 'getProfileData').and.returnValue(of(profile));
      sub = service.getProfileData('123').subscribe((response: Profile) => {
        expect(response).toEqual(profile);
        done();
      });
    });

    it('should return an error', (done: DoneFn) => {
      sub = service.getProfileData('123').subscribe({
        next: () => {
          fail('Error fetching profile data');
        },
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      })

      const req = httpMock.expectOne(`${service['url']}profile`);
      req.flush('error', { status: 500, statusText: 'Error fetching profile data' });
    });
  });
});
