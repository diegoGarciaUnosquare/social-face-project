import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { IUser } from '../../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Roles } from '../../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-project-mock-server/';

  constructor(private httpService: HttpClient) { }

  /**
   * This method is in charge of creating a new user and sending the date to a mocked backend
   * @param userData Payload to create a new user
   * @returns Observable<IUser>
   */
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

  /**
   * This method is used to validate if an email exists in the database
   * @param email Email to validate
   * @returns Observable<boolean>
   */
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

  /**
   * This method is used to update the password of a given user
   * @param username Username to validate
   * @returns Observable<boolean>
   */
  public updatePassword(password: string): Observable<string> {
    return this.httpService.post(`${this.url}update-password`, { password }).pipe(
      map((updatedPassword: any) => updatedPassword),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  /**
   * This method is used to login a user
   * @param username Username to login
   * @param password Password to login
   * @returns Observable<IUser>
   */
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

  /**
   *  This method is used to logout a user. It sends a request to a mocked backend
   * and based on the response we will determine if the user was logged out successfully.
   * @returns Observable<boolean>
   */
  public logout(): Observable<boolean> {
    return this.httpService.post('https://my-json-server.typicode.com/diegoGarciaUnosquare/social-face-feed-user-mock-backend/logout-user', {}).pipe(
      map(() => {
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }
}
