class LocalStorageMockService {
    setItem: jasmine.Spy = jasmine.createSpy('setItem');
    getItem: jasmine.Spy = jasmine.createSpy('getItem');
}

export default LocalStorageMockService;