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

  private fetchPosts(): Observable<void> {
    return this.store$.select(getPosts).pipe(
      map((posts: Post[]) => {
        posts && posts.length > 0 ? this.posts.next(posts) : this.posts.next([]);
      }),
    );
  }

  private fetchAd(): void {
    this.store$.dispatch(fetchAds());
  }

  private handlePosts(): void {
    this.posts.subscribe((posts: Post[]) => {
      this.postList.update(() => posts);
    });
  }

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
