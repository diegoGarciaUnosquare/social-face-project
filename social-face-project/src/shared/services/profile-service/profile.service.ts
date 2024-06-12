import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { Profile } from '../../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url: string = `https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-feed-user-mock-backend/`;

  constructor(private httpClient: HttpClient) { }

  /**
   * This method is in charge of fetching the profile data from the server
   * @returns Observable<Profile>
   */
  public getProfileData(userId: string): Observable<Profile> {
    return this.httpClient.get(`${this.url}profile`).pipe(
      map((response: any) => response[0]),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }
}
