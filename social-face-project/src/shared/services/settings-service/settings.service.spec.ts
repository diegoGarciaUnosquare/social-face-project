import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Subscription, of } from 'rxjs';

import { NotificationPreference } from '../../enums/notification-preference.enum';
import { Settings } from '../../interfaces/settings.interface';
import { SettingsService } from './settings.service';
import { TestBed } from '@angular/core/testing';

describe('SettingsService', () => {
  let service: SettingsService;
  let httpMock: HttpTestingController;
  let sub: Subscription;
  const setting: Settings = {
    notificationsPreference: NotificationPreference.browser,
    phone: '1234567890',
    profileVisibility: true,
    username: 'test',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(SettingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  describe('getSettings', () => {
    it('should fetch the settings of a user', (done: DoneFn) => {
      spyOn(service, 'getSettings').and.returnValue(of(setting));
      sub = service.getSettings().subscribe((response: Settings) => {
        expect(response).toEqual(setting);
        done();
      });
    });

    it('should return an error', (done: DoneFn) => {
      sub = service.getSettings().subscribe({
        next: () => {
          fail('Error liking post');
        },
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      })

      const req = httpMock.expectOne(`${service['url']}settings`);
      req.flush('error', { status: 500, statusText: 'Error liking post' });
    });
  });

  describe('updateSettings', () => {
    it('should update the settings of a user', (done: DoneFn) => {
      spyOn(service, 'updateSettings').and.returnValue(of(setting));
      sub = service.updateSettings(setting).subscribe((response: Settings) => {
        expect(response).toEqual(setting);
        done();
      });
    });

    it('should return an error', (done: DoneFn) => {
      sub = service.updateSettings(setting).subscribe({
        next: () => {
          fail('Error liking post');
        },
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      })

      const req = httpMock.expectOne(`${service['url']}settings`);
      req.flush('error', { status: 500, statusText: 'Error liking post' });
    });
  });
});
