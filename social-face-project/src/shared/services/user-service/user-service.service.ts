import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

import { IUser } from '../../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) { }

  public createUser(userData: IUser): Observable<IUser> {
    return this.httpService.post('http://localhost:3000/user', userData).pipe(
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
    return this.httpService.post(`http://localhost:3000/validate-email`, {
      email
    }).pipe(
      map((validEmail: any) => {
        console.log(validEmail);
        return validEmail;
      }),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }

  public updatePassword(password: string): Observable<string> {
    return this.httpService.put('http://localhost:3000/user/1/password', { password }).pipe(
      map((updatedPassword: any) => updatedPassword),
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.message);
      })
    );
  }
}
