import { of } from "rxjs";

class SettingsServiceMock {
    getSettings: jasmine.Spy = jasmine.createSpy('getSettings').and.returnValue(of({}));
}

export default SettingsServiceMock;