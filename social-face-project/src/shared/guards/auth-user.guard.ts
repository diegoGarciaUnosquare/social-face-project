import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/reducers/user-store/user.reducer';
import { map, take } from 'rxjs';
import { getUser } from '../../app/reducers/user-store/user.selectors';
import { IUser } from '../interfaces/user.interface';
import { LocalStorageService } from '../services/local-storage-service/local-storage.service';

/**
 * Guard to check if user is authenticated (counts with a token).
 * If user is not authenticated, it will be redirected to login page.
 * @returns boolean
 */
export const authUserGuard: CanActivateFn = () => {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  return store.select(getUser).pipe(
    take(1),
    map((user: IUser | null) => {
      console.log('auth-guard');
      console.log('user', user);
      const localStorageToken = localStorageService.getItem('loginToken');
      console.log('token', localStorageToken);
      if (localStorageToken) {
        return true;
      }

      if (user && user.token !== '') {
        return true;
      } else {
        // Redirect to login page. We create a closure to access the router constant
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
