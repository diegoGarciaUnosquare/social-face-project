import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject, Subscription, of } from 'rxjs';
import { SettingsState, settingsState } from '../reducers/settings-store/settings.reducer';
import { updateSettingsFailure, updateSettingsSuccess } from '../reducers/settings-store/settings.actions';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationPreference } from '../../shared/enums/notification-preference.enum';
import { Settings } from '../../shared/interfaces/settings.interface';
import { SettingsComponent } from './settings.component';
import { getUserId } from '../reducers/user-store/user.selectors';
import { getUserSettings } from '../reducers/settings-store/settings.selectors';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('SettingsComponent', () => {
  let actions$: ReplaySubject<any>;
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let initialState: SettingsState = settingsState;
  let sub: Subscription;
  const setting = {
    notificationsPreference: NotificationPreference.email,
    phone: '1234567890',
    profileVisibility: true,
    username: 'test',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<SettingsState>(
        {
          initialState,
          selectors: [
            {
              selector: getUserSettings,
              value: setting
            },
            { selector: getUserId, value: '123asd' },
          ]
        }),
        provideMockActions(() => actions$),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call fetchSettings, getSettings, handleOnUpdateSuccess, and handleOnUpdateFailure', () => {
      spyOn(component, 'fetchSettings' as any).and.returnValue(of());
      spyOn(component, 'getSettings' as any).and.returnValue(of());
      spyOn(component, 'handleOnUpdateSuccess' as any).and.returnValue(of());
      spyOn(component, 'handleOnUpdateFailure' as any).and.returnValue(of());
      component.ngOnInit();
      expect(component['fetchSettings']).toHaveBeenCalled();
      expect(component['getSettings']).toHaveBeenCalled();
      expect(component['handleOnUpdateSuccess']).toHaveBeenCalled();
      expect(component['handleOnUpdateFailure']).toHaveBeenCalled();
    });
  });

  describe('getNotificationPreference', () => {
    it('should return the email notification preference', () => {
      component.settings.set(setting);
      expect(component.getNotificationPreference()).toEqual('Email notifications');
    });

    it('should return the browser notification preference', () => {
      const settingBrowser: Settings = {
        notificationsPreference: NotificationPreference.browser,
        phone: '1234567890',
        profileVisibility: true,
        username: 'test',
      };
      component.settings.set(settingBrowser);
      expect(component.getNotificationPreference()).toEqual('Browser notifications');
    });
  });

  describe('getProfileVisibility', () => {
    it('should return public', () => {
      component.settings.set(setting);
      expect(component.getProfileVisibility()).toEqual('Public');
    });

    it('should return private', () => {
      const settingPrivate: Settings = {
        notificationsPreference: NotificationPreference.email,
        phone: '1234567890',
        profileVisibility: false,
        username: 'test',
      };
      component.settings.set(settingPrivate);
      expect(component.getProfileVisibility()).toEqual('Private');
    });
  });

  describe('updateSettings', () => {
    it('should call isEdit.update and formGroup.patchValue when updateSettings is called', () => {
      component.settings.set(setting);
      spyOn(component.isEditing, 'update').and.callThrough();
      spyOn(component.formGroup, 'patchValue').and.callThrough();
      component.updateSettings();
      expect(component.isEditing.update).toHaveBeenCalled();
      expect(component.formGroup.patchValue).toHaveBeenCalled();
    });
  });

  describe('exportToCSV', () => {
    it('should return if settings is null', () => {
      component.settings.set(null);
      spyOn(component, 'getNotificationPreference').and.callThrough();
      spyOn(component, 'getProfileVisibility').and.callThrough();
      spyOn(component, 'escapeCsvValue' as any).and.callThrough();
      spyOn(component, 'anchorTagAndDownload' as any).and.callThrough();
      component.exportToCSV();
      expect(component.getNotificationPreference).not.toHaveBeenCalled();
      expect(component.getProfileVisibility).not.toHaveBeenCalled();
      expect(component['escapeCsvValue']).not.toHaveBeenCalled();
      expect(component['anchorTagAndDownload']).not.toHaveBeenCalled();
    });

    it('should call anchorTagAndDownload method', () => {
      component.settings.set(setting);
      spyOn(component, 'anchorTagAndDownload' as any).and.callThrough();
      component.exportToCSV();
      expect(component['anchorTagAndDownload']).toHaveBeenCalled();
    });
  });

  describe("SaveSettings", () => {
    it("should dispatch the updateSettings action if form is valid", () => {
      component.formGroup.setValue({
        notificationPreference: '1',
        profileVisibility: true,
        username: 'test',
        phone: '1234567890',
      });
      spyOn(component['store'], 'dispatch').and.callThrough();
      spyOn(component.isLoading, 'update').and.callThrough();

      component.saveSettings();
      expect(component['store'].dispatch).toHaveBeenCalled();
      expect(component.isLoading()).toBeTrue();
    });

    it("should not dispatch the updateSettings action if form is invalid", () => {
      component.formGroup.patchValue({
        notificationPreference: '1',
        profileVisibility: true,
        username: null,
        phone: '1234567890',
      });
      spyOn(component['store'], 'dispatch').and.callThrough();
      spyOn(component.isLoading, 'update').and.callThrough();

      component.saveSettings();
      expect(component['store'].dispatch).not.toHaveBeenCalled();
      expect(component.isLoading()).toBeFalse();
    });
  });

  describe("escapeCsvValue", () => {
    it("should return the value if it does not contain a comma", () => {
      expect(component['escapeCsvValue']('test')).toEqual('test');
    });

    it("should return the value in quotes if it contains a comma", () => {
      expect(component['escapeCsvValue']('test,')).toEqual('"test,"');
    });

    it("should return the value in quotes if it contains a new line", () => {
      expect(component['escapeCsvValue']('test\n')).toEqual('"test\n"');
    });

    it("should return empty string if value is null", () => {
      expect(component['escapeCsvValue'](null)).toEqual('');
    });
  });

  describe("handleOnUpdateSuccess", () => {
    it("should call isLoading, isEditing update method if update is succesful", () => {
      actions$ = new ReplaySubject(1);
      actions$.next(updateSettingsSuccess({ settings: setting }));
      spyOn(component.isLoading, 'update').and.callThrough();
      spyOn(component.isEditing, 'update').and.callThrough();

      sub = component['handleOnUpdateSuccess']().subscribe(() => {
        expect(component.isLoading()).toBeFalse();
        expect(component.isEditing()).toBeFalse();
      });
    });
  });

  describe("handleOnUpdateFailure", () => {
    it("should call isLoading update method if update fails", () => {
      actions$ = new ReplaySubject(1);
      actions$.next(updateSettingsFailure({ error: { message: 'Error', status: 500, url: 'url' }}));
      spyOn(component.isLoading, 'update').and.callThrough();

      sub = component['handleOnUpdateFailure']().subscribe(() => {
        expect(component.isLoading()).toBeFalse();
      });
    });
  });
});
