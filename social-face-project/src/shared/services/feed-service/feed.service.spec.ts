import { FeedService } from './feed.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subscription } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('FeedService', () => {
  let service: FeedService;
  let sub: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchPosts', () => {
    it('should fetch posts', (done: DoneFn) => {
      spyOn(service, 'fetchPosts').and.returnValue([]);
      sub = service.fetchPosts('1').subscribe((response: any) => {
        expect(response).toEqual([]);
        done();
      });
    });

    it('should return an error', (done: DoneFn) => {
      const errorMessage = 'Error fetching posts';
      spyOn(service, 'fetchPosts').and.callThrough();
      spyOn(service['httpClient'], 'get').and.returnValue(new Error(errorMessage));
      sub = service.fetchPosts('1').subscribe((response: any) => {
        expect(response.message).toEqual(errorMessage);
        done();
      });
    });
  });
});
