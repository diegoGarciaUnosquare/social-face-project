import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedState, feedState } from '../../reducers/feed-store/feed.reducer';
import { ReplaySubject, Subscription, of } from 'rxjs';
import { getAd, getPosts } from '../../reducers/feed-store/feed.selectors';

import { Ad } from '../../../shared/interfaces/ad.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PostsComponent } from './posts.component';
import { getUserId } from '../../reducers/user-store/user.selectors';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('PostsComponent', () => {
  let actions$ = new ReplaySubject<any>();
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let initialState: FeedState = feedState;
  let sub: Subscription;
  const mockAd: Ad = {
    description: 'This is an ad',
    title: 'Ad title',
    imgUrl: 'https://www.ad.com',
    id: '1',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<FeedState>(
          {
            initialState,
            selectors: [
              { selector: getPosts, value: [] },
              { selector: getUserId, value: '123asd' },
              { selector: getAd, value:  mockAd }
            ]
          }),
        provideMockActions(() => actions$),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should call fetchPosts, fetchAd, getPost, and handlePosts", () => {
      spyOn(component, 'fetchPosts' as any).and.returnValue(of([]));
      spyOn(component, 'fetchAd' as any).and.returnValue(of(mockAd));
      spyOn(component, 'getPost' as any).and.returnValue(of());
      spyOn(component, 'handlePosts' as any).and.callThrough();
      component.ngOnInit();
      expect(component['fetchPosts']).toHaveBeenCalled();
      expect(component['fetchAd']).toHaveBeenCalled();
      expect(component['getPost']).toHaveBeenCalled();
      expect(component['handlePosts']).toHaveBeenCalled();
    });
  });

  describe("fetchPosts", () => {
    it("should return an observable", (done: DoneFn) => {
      sub = component['fetchPosts']().subscribe((result) => {
        expect(result).toEqual();
        done();
      });
    });
  });

  describe('fetchAd', () => {
    it('should return an ad', () => {
      spyOn(component['store$'], 'dispatch').and.callThrough();
      component['fetchAd']();
      expect(component['store$'].dispatch).toHaveBeenCalled();
    });
  });

  describe('handlePosts', () => {
    it('should update postList with posts', () => {
      spyOn(component['posts'], 'subscribe').and.callThrough();
      component['handlePosts']();
      expect(component['posts'].subscribe).toHaveBeenCalled();
    });
  });

  describe('getPost', () => {
    it('should dispatch fetchPosts action', (done: DoneFn) => {
      spyOn(component['store$'], 'dispatch').and.callThrough();
      sub = component['getPost']().subscribe(() => {
        expect(component['store$'].dispatch).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('getAd', () => {
    it('should update ad with ad', (done: DoneFn) => {
      spyOn(component['store$'], 'select').and.callThrough();
      sub = component['getAd']().subscribe(() => {
        expect(component['store$'].select).toHaveBeenCalled();
        done();
      });
    });
  });
});
