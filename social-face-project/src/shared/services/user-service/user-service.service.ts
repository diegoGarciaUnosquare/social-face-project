import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

import { IUser } from '../../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-project-mock-server/';

  constructor(private httpService: HttpClient) { }

  public createUser(userData: IUser): Observable<IUser> {
    return this.httpService.post(`${this.url}create-user`, userData).pipe(
      map((response: any) => {
        const createdUser: IUser = response;
        return createdUser;
      }),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  public validateEmail(email: string): Observable<boolean> {
    return this.httpService.post(`${this.url}validate-email`, {
      email
    }).pipe(
      map((validEmail: any) => {
        return validEmail ? true : false;
      }),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  public updatePassword(password: string): Observable<string> {
    return this.httpService.post(`${this.url}update-password`, { password }).pipe(
      map((updatedPassword: any) => updatedPassword),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }
}
