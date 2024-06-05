import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

import { IUser } from '../../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Roles } from '../../enums/roles.enum';

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
      map((validEmail: any) => validEmail ? true : false),
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

  public login(username: string, password: string): Observable<IUser> {
    return this.httpService.post(`${this.url}login-user`, { username, password }).pipe(
      map(() => {
        // since json-placeholder returns mock data. We manually create the user object
        return {
          id: '1',
          email: 'test@test.com',
          password: 'a9yhd7s1',
          firstName: 'jon',
          lastName: 'doe',
          birthDate: new Date('1991-01-01'),
          username: 'testUser',
          notificationPreference: false,
          role: Roles.user,
          token: 'iuhasd87tasiunds87g'
        } as IUser;
      }),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }
}
