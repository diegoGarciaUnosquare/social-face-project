import { of } from "rxjs";

class FeedServiceMock {
    
    fetchPosts: jasmine.Spy = jasmine.createSpy('fetchPosts').and.returnValue(of([]));
    fetchAds: jasmine.Spy = jasmine.createSpy('fetchAds').and.returnValue(of({}));
    likePost: jasmine.Spy = jasmine.createSpy('likePost').and.returnValue(of([]));
    addComment: jasmine.Spy = jasmine.createSpy('addComment').and.returnValue(of([]));
}

export default FeedServiceMock;