import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, map, take } from 'rxjs';
import { fetchAds, fetchPosts } from '../../reducers/feed-store/feed.actions';
import { getAd, getPosts } from '../../reducers/feed-store/feed.selectors';

import { Ad } from '../../../shared/interfaces/ad.interface';
import { AdComponent } from '../../../shared/components/ad/ad.component';
import { CommonModule } from '@angular/common';
import { FeedState } from '../../reducers/feed-store/feed.reducer';
import { Post } from '../../../shared/interfaces/post.interface';
import { PostComponent } from '../../../shared/components/post/post.component';
import { Store } from '@ngrx/store';
import { getUserId } from '../../reducers/user-store/user.selectors';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostComponent, AdComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  public postList: WritableSignal<Post[]> = signal([]);
  public posts: Subject<Post[]> = new Subject<Post[]>();
  public ad: WritableSignal<Ad | null> = signal(null);

  constructor(private store$: Store<FeedState>) {}

  ngOnInit(): void {
    this.fetchPosts().subscribe();
    this.fetchAd();
    this.getPost().subscribe();
    this.getAd().subscribe();
    this.handlePosts();
  }

  /**
   * This method is responsible for fetching the posts from the store
   * @returns Observable<void>
   */
  private fetchPosts(): Observable<void> {
    return this.store$.select(getPosts).pipe(
      map((posts: Post[]) => {
        posts && posts.length > 0 ? this.posts.next(posts) : this.posts.next([]);
      }),
    );
  }

  /**
   *  This method is responsible for dispatching the fetchPosts action
   * and get ads from backend
   * @returns void
   */
  private fetchAd(): void {
    this.store$.dispatch(fetchAds());
  }

  /**
   *  This method is responsible for subscribing to the Subject and updating
   * the postList signal.
   * @returns void
   */
  private handlePosts(): void {
    this.posts.subscribe((posts: Post[]) => {
      this.postList.update(() => posts);
    });
  }

  /**
   *  This method is responsible of getting the userId from the store
   * and dispatching the fetchPosts action to get posts from backend
   * @returns Observable<void>
   */
  private getPost(): Observable<void> {
    return this.store$.select(getUserId).pipe(
      take(1),
      map((userId: string | null | undefined) => {
        if (userId && userId !== '') {
          this.store$.dispatch(fetchPosts({ userId: userId }));
        }
      }),
    );
  }

  /**
   *  This method is responsible for getting the ad from the store
   * and updating the ad signal
   * @returns Observable<void>
   */
  private getAd(): Observable<void> {
    return this.store$.select(getAd).pipe(
      take(1),
      map((ad: Ad | null) => {
        if (ad) {
          this.ad.update(() => ad);
        }
      }),
    );
  }
}
