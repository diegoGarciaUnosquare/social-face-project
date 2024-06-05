import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

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
}
