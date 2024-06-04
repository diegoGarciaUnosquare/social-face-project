import { IUser } from "../../src/shared/interfaces/user.interface";

export class Utility {
    public generateUser(): IUser {
        return {
            email: 'test@test.com',
            password: 'a9yhd7s1',
            firstName: 'jon',
            lastName: 'doe',
            birthDate: new Date('1991-01-01'),
            username: 'testUser',
            notificationPreference: false,
            role: 0,
            token: ''
        };
    }

}