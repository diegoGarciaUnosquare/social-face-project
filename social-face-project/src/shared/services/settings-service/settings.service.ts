import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { Settings } from '../../interfaces/settings.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private url: string = `https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-feed-user-mock-backend/`;

  constructor(private httpClient: HttpClient) { }

  /**
   * This methods fetches the settings from the server
   * @returns Observable<Settings>
   */
  public getSettings(): Observable<Settings> {
    return this.httpClient.get(`${this.url}settings`).pipe(
      map((response: any) => {
        return response[0];
      }),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  /**
   *  This method updates the settings on the server
   *  Since the server is a mock server, it does not actually update the settings and put endpoint doesn't exist
   * So we "fake" the request and simply return the settings object
   * @param settings Settings
   * @returns Observable<Settings>
   */
  public updateSettings(settings: Settings): Observable<Settings> {
    return this.httpClient.get(`${this.url}settings`).pipe(
      map(() => settings),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }
}
