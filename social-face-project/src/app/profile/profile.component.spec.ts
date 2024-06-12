import { AppState, userState } from '../reducers/user-store/user.reducer';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject, Subscription, of } from 'rxjs';
import { getUserId, getUserProfile } from '../reducers/user-store/user.selectors';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Profile } from '../../shared/interfaces/profile.interface';
import { ProfileComponent } from './profile.component';
import { getRecentPosts } from '../reducers/feed-store/feed.selectors';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('ProfileComponent', () => {
  let actions$: ReplaySubject<any>;
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let initialState: AppState = userState;
  let sub: Subscription;
  const profile: Profile = {
    bio: 'This is a bio',
    firstName: 'John',
    lastName: 'Doe',
    id: '123',
    profilePicture: 'https://www.profile.com',
    userId: '123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, NoopAnimationsModule],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore<AppState>({ 
          initialState,
          selectors: [
            { selector: getRecentPosts, value: [] },
            { selector: getUserId, value: '123' },
            { selector: getUserProfile, value: profile}
          ]
        }),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should call handlePosts, getProfileData, getPosts, and getProfile", () => {
      spyOn(component, 'handlePosts' as any).and.callThrough();
      spyOn(component, 'getProfileData' as any).and.returnValue(of());
      spyOn(component, 'getPosts' as any).and.returnValue(of());
      spyOn(component, 'getProfile' as any).and.returnValue(of(profile));
      component.ngOnInit();
      expect(component['handlePosts']).toHaveBeenCalled();
      expect(component['getProfileData']).toHaveBeenCalled();
      expect(component['getPosts']).toHaveBeenCalled();
      expect(component['getProfile']).toHaveBeenCalled();
    });
  });

  describe("getPosts", () => {
    it("should set postsSubject to posts", () => {
      spyOn(component['postsSubject'], 'next').and.callThrough();
      sub = component['getPosts']().subscribe(() => {
        expect(component.postsSubject.next).toHaveBeenCalled();
      });
    });
  });

  describe("getProfile", () => {
    it("should set profileData to profile", () => {
      spyOn(component.profileData, 'set').and.callThrough();
      sub = component['getProfile']().subscribe(() => {
        expect(component.profileData.set).toHaveBeenCalled();
      });
    });
  });

  describe("handlePosts", () => {
    it("should set posts to postsSubject", () => {
      spyOn(component.posts, 'update').and.callThrough();
      sub = component.postsSubject.subscribe(() => {
        expect(component.posts.update).toHaveBeenCalled();
      });
      component.postsSubject.next([]);
    });
  });

  describe("getProfileData", () => {
    it("should call getProfile", () => {
      spyOn(component['store'], 'dispatch').and.callThrough();
      sub = component['getProfileData']().subscribe(() => {
        expect(component['store'].dispatch).toHaveBeenCalled();
      });
    });
  });
});
