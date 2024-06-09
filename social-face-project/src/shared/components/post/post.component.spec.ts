import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedState, feedState } from '../../../app/reducers/feed-store/feed.reducer';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Post } from '../../interfaces/post.interface';
import { PostComponent } from './post.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('PostComponent', () => {
  let component: PostComponent;
  let initialState: FeedState = feedState;
  let fixture: ComponentFixture<PostComponent>;
  const post: Post = {
    id: '1',
    userId: '1',
    content: 'content',
    likes: 1,
    imageUrl: '',
    createdAt: '',
    comments: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<FeedState>({ initialState})
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set likes and commentsAmount', () => {
      component.post = post;
      component.ngOnInit();
      expect(component.likes()).toBe(1);
      expect(component.commentsAmount()).toBe(0);
    });

    it('should not set likes and commentsAmount', () => {
      component.ngOnInit();
      expect(component.likes()).toBe(0);
      expect(component.commentsAmount()).toBe(0);
    });
  });

  describe('onSubmit', () => {

    it('should dispatch addComment', () => {
      component.addCommentField.setValue('comment');
      component.post = post;

      spyOn(component, 'onAddComment').and.callThrough();
      spyOn(component['store'], 'dispatch').and.callThrough();
      component.onSubmit();
      expect(component['store'].dispatch).toHaveBeenCalled();
      expect(component.onAddComment).toHaveBeenCalled();
    });

    it('should not dispatch addComment', () => {
      spyOn(component['store'], 'dispatch').and.callThrough();
      component.onSubmit();
      expect(component['store'].dispatch).not.toHaveBeenCalled();
    });
  });

  describe('onLike', () => {
    it('should dispatch likePost', () => {
      component.post = post;
      spyOn(component['store'], 'dispatch').and.callThrough();
      component.onLike();
      expect(component['store'].dispatch).toHaveBeenCalled();
    });
  });

  describe('onAddComment', () => {
    it('should update showCommentsForm', () => {
      spyOn(component.showCommentsForm, 'update').and.callThrough();
      component.onAddComment();
      expect(component.showCommentsForm.update).toHaveBeenCalled();
    });
  });
});
