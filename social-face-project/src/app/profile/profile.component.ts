import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { getUserId, getUserProfile } from '../reducers/user-store/user.selectors';

import { CommonModule } from '@angular/common';
import { Post } from '../../shared/interfaces/post.interface';
import { PostComponent } from '../../shared/components/post/post.component';
import { Profile } from '../../shared/interfaces/profile.interface';
import { Store } from '@ngrx/store';
import { getProfile } from '../reducers/user-store/user.actions';
import { getRecentPosts } from '../reducers/feed-store/feed.selectors';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {
  public postsSubject: Subject<Post[]> = new Subject<Post[]>();
  public posts: WritableSignal<Post[]> = signal<Post[]>([]);
  public profileData: WritableSignal<Profile | null> = signal<Profile | null>(null);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.handlePosts();
    this.getProfileData().subscribe();
    this.getPosts().subscribe();
    this.getProfile().subscribe();
  }

  private getPosts(): Observable<void> {
    return this.store.select(getRecentPosts).pipe(
      map((posts: Post[]) => {
        posts && posts.length > 0 ? this.postsSubject.next(posts) : this.postsSubject.next([]);
      }),
    );
  }

  private getProfile(): Observable<void> {
    return this.store.select(getUserProfile).pipe(
      map((profile: Profile | null) => {
        if (profile) {
          this.profileData.set(profile);
        }
      }),
    );
  }

  private handlePosts(): void {
    this.postsSubject.subscribe((posts: Post[]) => {
      this.posts.update(() => posts);
    });
  }

  private getProfileData(): Observable<void> {
    return this.store.select(getUserId).pipe(
      map((userId: string | null | undefined) => {
        if (userId) {
          this.store.dispatch(getProfile({ userId }));
        }
      }),
    );
  }
}
