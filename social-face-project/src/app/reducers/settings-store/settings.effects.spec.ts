import { ReplaySubject, Subscription, throwError } from "rxjs";

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NotificationPreference } from "../../../shared/enums/notification-preference.enum";
import { Settings } from "../../../shared/interfaces/settings.interface";
import { SettingsEffects } from "./settings.effects";
import { SettingsService } from "../../../shared/services/settings-service/settings.service";
import SettingsServiceMock from "../../../../unit-tests/mocks/services/settings-service-mock";
import { TestBed } from "@angular/core/testing";
import { getSettings } from "./settings.actions";
import { provideMockActions } from "@ngrx/effects/testing";

describe('SettingsEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: SettingsEffects;
  let spySettingsService: jasmine.SpyObj<SettingsService>;
  let sub: Subscription;
  const url = 'https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-feed-user-mock-backend/';
	const setting: Settings = {
		notificationsPreference: NotificationPreference.email,
		phone: '1234567890',
		profileVisibility: true,
		username: 'test',

};

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [NoopAnimationsModule],
			providers: [
				SettingsEffects,
				{
					provide: SettingsService,
					useClass: SettingsServiceMock,
				},
				provideMockActions(() => actions$)
			]
    });

		effects = TestBed.inject(SettingsEffects);
		spySettingsService = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
  });

	afterEach(() => {
		if (sub) {
			sub.unsubscribe();
		}
	});

	describe('getSettings - Effect', () => {
		it('should return a getSettingsSuccess action, with the settings, on success', (done: DoneFn) => {
			actions$ = new ReplaySubject(1);
			actions$.next(getSettings({ userId: '1' }));

			sub = effects.getSettings$.subscribe((result) => {
				expect(result).toEqual({
					type: '[Settings page] Get Settings Success',
					settings: setting
				});
				done();
			});
		});

		it('should return a getSettingsFailure action, with the error, on failure', (done: DoneFn) => {
			spySettingsService.getSettings.and.returnValue(throwError(() => new Error('Error')));

			actions$ = new ReplaySubject(1);
			actions$.next(getSettings({ userId: '1' }));

			sub = effects.getSettings$.subscribe((result) => {
				expect(result).toEqual({
					type: '[Settings page] Get Settings Failure',
					error: {
						message: 'Error',
						status: 500,
						url: `${url}settings`,
					}
				});
				done();
			});
		});
	});

	describe('updateSettings - Effect', () => {
		it('should return an updateSettingsSuccess action, with the settings, on success', (done: DoneFn) => {
			actions$ = new ReplaySubject(1);
			actions$.next(getSettings({ userId: '1' }));

			sub = effects.getSettings$.subscribe((result) => {
				expect(result).toEqual({
					type: '[Settings page] Get Settings Success',
					settings: setting
				});
				done();
			});
		});

		it('should return an updateSettingsFailure action, with the error, on failure', (done: DoneFn) => {
			spySettingsService.getSettings.and.returnValue(throwError(() => new Error('Error')));

			actions$ = new ReplaySubject(1);
			actions$.next(getSettings({ userId: '1' }));

			sub = effects.getSettings$.subscribe((result) => {
				expect(result).toEqual({
					type: '[Settings page] Get Settings Failure',
					error: {
						message: 'Error',
						status: 500,
						url: `${url}settings`,
					}
				});
				done();
			});
		});
	});
});
