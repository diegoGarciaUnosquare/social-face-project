import { Observable, catchError, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) { }

  public createUser(userData: IUser): Observable<IUser> {
    return this.httpService.post('http://localhost:3000/users', userData).pipe(
      map((response: any) => { 
        const createdUser: IUser = JSON.parse(response);
        return createdUser;
      }),
      catchError(error => {
        throw new Error(error);
      })
    );
  }
}
