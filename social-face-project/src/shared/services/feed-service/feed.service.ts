import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { Ad } from '../../interfaces/ad.interface';
import { Comment } from '../../interfaces/comment.interface';
import { Injectable } from '@angular/core';
import { Post } from '../../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private url: string = 'https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-project-mock-server/';

  constructor(private httpClient: HttpClient) { }

  /**
   * This method is used to fetch all the posts from the server.
   * @param userId: This parameter is not used in this method.
   * @returns Observable<Post[]>
   */
  public fetchPosts(userId: string): Observable<Post[]> {
    return this.httpClient.get(`${this.url}social-post`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  /**
   * This method is used to fetch the ads from the server.
   * @returns Observable<Ad>
   */
  public fetchAds(): Observable<Ad> {
    return this.httpClient.get(`https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-feed-user-mock-backend/ad`).pipe(
      map((response: any) => {
        if (response.length > 0) {
          return response[0];
        }
        return {} as Ad;
      }),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  } 

  /**
   *  This method is used to retrieve all posts from server and then increase the amount of likes
   * from a given post based on the id.
   *  This is done locally because json-placeholder doesn't allow to update the data.
   * @param postId: This parameter is used to identify the post to like.
   * @returns Observable<Post[]>
   */
  public likePost(postId: string): Observable<Post[]> {
    return this.httpClient.get(`${this.url}social-post`).pipe(
      map((response: any) => response.map((post: Post) => {
          return post.id === postId ? { ...post, likes: this.increaseLike(post.likes) } : post;
        }
      )),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  /**
   * This method is used to add a comment to a post.
   * @param postId: This parameter is used to identify the post to add the comment.
   * @param content: This parameter is used to store the comment content.
   * @param userId: This parameter is used to store the user id.
   * @returns Observable<Post[]>
   */
  public addComment(postId: string, content: string, userId: string): Observable<Post[]> {
    return this.httpClient.get(`${this.url}social-post`).pipe(
      map((response: any) => response.map((post: Post) => {
        const newComment: Comment = {
          content,
          userId,
          createdAt: new Date().toISOString(),
          postId,
          id: `${post.comments.length + 1}`
        };
        return post.id === postId ? { ...post, comments: [ ...post.comments, newComment ] } : post;
      }
      )),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  /**
   * This function receives an amount and returns a new amount increased by 1.
   * This is a pure function because it doesn't have side effects, and it always returns the same output for the same input.
   * @param currentAmount: This parameter is used to store the current amount of likes.
   * @returns number
   */
  private increaseLike(currentAmount: number): number {
    return currentAmount + 1;
  }
}
