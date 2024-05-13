import { Observable, catchError, map, of, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
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
}
