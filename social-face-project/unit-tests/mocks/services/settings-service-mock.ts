import { NotificationPreference } from "../../../src/shared/enums/notification-preference.enum";
import { Settings } from "../../../src/shared/interfaces/settings.interface";
import { of } from "rxjs";

class SettingsServiceMock {
    private setting: Settings = {
        notificationsPreference: NotificationPreference.email,
        phone: '1234567890',
        profileVisibility: true,
        username: 'test',
    
    };
    getSettings: jasmine.Spy = jasmine.createSpy('getSettings').and.returnValue(of(this.setting));
    updateSettings: jasmine.Spy = jasmine.createSpy('updateSettings').and.returnValue(of(this.setting));
}

export default SettingsServiceMock;