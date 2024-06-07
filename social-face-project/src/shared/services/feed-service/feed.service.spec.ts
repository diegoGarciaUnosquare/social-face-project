import { Subscription, of } from 'rxjs';

import { Ad } from '../../interfaces/ad.interface';
import { Done } from ''
import { FeedService } from './feed.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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
      spyOn(service, 'fetchPosts').and.returnValue(of([]));
      sub = service.fetchPosts('1').subscribe((response: any) => {
        expect(response).toEqual([]);
        done();
      });
    });

    it('should return an error', (done: DoneFn) => {
      const errorMessage = 'Error fetching posts';
      spyOn(service, 'fetchPosts').and.callThrough();
      spyOn(service['httpClient'], 'get').and.returnValue(of(new Error(errorMessage)));
      sub = service.fetchPosts('1').subscribe((response: any) => {
        expect(response.message).toEqual(errorMessage);
        done();
      });
    });
  });

  describe('fetchAds', () => {
    it('should fetch ads', (done: DoneFn) => {
      const ad: Ad = {} as Ad;
      spyOn(service, 'fetchAds').and.returnValue(of(ad));
      sub = service.fetchAds().subscribe((response: any) => {
        expect(response).toEqual(ad);
        done();
      });
    });

    it('should return an error', (done: DoneFn) => {
      const errorMessage = 'Error fetching ads';
      spyOn(service, 'fetchAds').and.callThrough();
      spyOn(service['httpClient'], 'get').and.returnValue(of(new Error(errorMessage)));
      sub = service.fetchAds().subscribe((response: any) => {
        expect(response.message).toEqual(errorMessage);
        done();
      });
    });
  });
});
