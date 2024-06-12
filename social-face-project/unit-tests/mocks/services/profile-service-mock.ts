import { Profile } from "../../../src/shared/interfaces/profile.interface";
import { of } from "rxjs";

class ProfileServiceMock {
    private profile: Profile = {
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        bio: '',
        profilePicture: '',
        userId: '123',
    };
    getProfileData: jasmine.Spy = jasmine.createSpy('getProfileData').and.returnValue(of(this.profile));
}

export default ProfileServiceMock;