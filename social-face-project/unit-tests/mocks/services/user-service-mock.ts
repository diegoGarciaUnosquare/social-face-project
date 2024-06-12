import { IUser } from "../../../src/shared/interfaces/user.interface";
import { Roles } from "../../../src/shared/enums/roles.enum";
import { of } from "rxjs";

class UserServiceMock {
    private mockUser: IUser = {
        email: 'test@test.com',
        username: 'testUser',
        password: '123123',
        firstName: 'jon',
        lastName: 'doe',
        birthDate: new Date(),
        notificationPreference: false,
        role: Roles.user,
        token: '',
    }

    createUser: jasmine.Spy = jasmine.createSpy('createUser').and.returnValue(of(this.mockUser));
    validateEmail: jasmine.Spy = jasmine.createSpy('validateEmail').and.returnValue(of(false));
    updatePassword: jasmine.Spy = jasmine.createSpy('updatePassword').and.returnValue(of('12341'));
    login: jasmine.Spy = jasmine.createSpy('login').and.returnValue(of(this.mockUser));
    logout: jasmine.Spy = jasmine.createSpy('logout').and.returnValue(of());
}

export default UserServiceMock;