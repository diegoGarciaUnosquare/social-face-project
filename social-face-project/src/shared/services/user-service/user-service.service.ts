import { Observable, catchError, map, of, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IUser } from '../../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) { }

  public createUser(userData: IUser): Observable<IUser> {
    return this.httpService.post('http://localhost:3000/user', userData).pipe(
      switchMap((response: any) => {
        const createdUser: IUser = response;
        return of(createdUser);
      }),
      catchError(error => of(error))
    );
  }

  public validateEmail(email: string): Observable<boolean> {
    return this.httpService.post(`http://localhost:3000/validate-email`, {
      email
    }).pipe(
      map((validEmail: any) => {
        return validEmail.valid;
      }),
      catchError(error => of(error))
    );
  }

  public updatePassword(password: string): Observable<void> {
    return this.httpService.put('http://localhost:3000/user/1/password', { password }).pipe(
      map((updatedPassword: any) => updatedPassword),
      catchError(error => of(error))
    );
  }
}
