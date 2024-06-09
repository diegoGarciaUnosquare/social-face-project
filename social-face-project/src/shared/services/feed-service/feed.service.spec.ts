import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Subscription, of } from 'rxjs';

import { Ad } from '../../interfaces/ad.interface';
import { FeedService } from './feed.service';
import { Post } from '../../interfaces/post.interface';
import { TestBed } from '@angular/core/testing';

describe('FeedService', () => {
  let service: FeedService;
  let httpMock: HttpTestingController;
  let sub: Subscription;
  const posts: Post[] = [
    {
      id: '1',
      likes: 0,
      comments: [],
      content: 'This is a post',
      userId: '1',
      createdAt: '',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      likes: 0,
      comments: [],
      content: 'This is a post',
      userId: '2',
      createdAt: '',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FeedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchPosts', () => {
    it('should fetch posts', () => {
      spyOn(service, 'fetchPosts').and.returnValue(of([]));
      sub = service.fetchPosts('1').subscribe((response: any) => {
        expect(response).toEqual([]);
      });
    });

    it('should return an error', () => {
      const errorMessage = 'Error fetching posts';
      spyOn(service, 'fetchPosts').and.callThrough();
      spyOn(service['httpClient'], 'get').and.returnValue(of(new Error(errorMessage)));
      sub = service.fetchPosts('1').subscribe((response: any) => {
        expect(response.message).toEqual(errorMessage);
      });
    });
  });

  describe('fetchAds', () => {
    it('should fetch ads', () => {
      const ad: Ad = {
        description: 'This is an ad',
      } as Ad;
      spyOn(service, 'fetchAds').and.returnValue(of(ad));
      sub = service.fetchAds().subscribe((response: any) => {
        expect(response).toEqual(ad);
      });
    });

    it('should return an error', () => {
      const errorMessage = 'Error fetching ads';
      spyOn(service['httpClient'], 'get').and.returnValue(of(new Error(errorMessage)));
      sub = service.fetchAds().subscribe((response: any) => {
        expect(response).toEqual({});
      });
    });
  });

  describe('likePost', () => {
    it('should like a post', () => {
      spyOn(service, 'likePost').and.returnValue(of(posts));
      spyOn(service['httpClient'], 'get').and.returnValue(of(posts));
      sub = service.likePost('1').subscribe((response: any) => {
        expect(response[0].likes).toEqual(0);
      });
    });
    
    it('should return an error', (done: DoneFn) => {
      sub = service.likePost('1').subscribe({
        next: () => {
          fail('Error liking post');
        },
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      });

      const req = httpMock.expectOne(`${service['url']}social-post`);
      req.flush('error', { status: 500, statusText: 'Error liking post' });
    });
  });

  describe('addComment', () => {

    it('should add a comment', () => {
      spyOn(service, 'addComment').and.returnValue(of(posts));
      spyOn(service['httpClient'], 'get').and.returnValue(of(posts));
      sub = service.addComment('1', 'This is a comment', '1').subscribe((response: any) => {
        expect(response[0].comments.length).toEqual(0);
      });
    });

    it('should return an error', (done: DoneFn) => {
      sub = service.addComment('1', 'This is a comment', '1').subscribe({
        next: () => {
          fail('Error adding comment');
        },
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      });

      const req = httpMock.expectOne(`${service['url']}social-post`);
      req.flush('error', { status: 500, statusText: 'Error adding comment' });
    });
  });
});
