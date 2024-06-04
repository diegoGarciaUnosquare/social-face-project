import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/reducers/user-store/user.reducer';
import { map, take } from 'rxjs';
import { getUser } from '../../app/reducers/user-store/user.selectors';
import { IUser } from '../interfaces/user.interface';

export const authUserGuard: CanActivateFn = () => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(getUser).pipe(
    take(1),
    map((user: IUser | null) => {
      console.log('guard');
      console.log(user);
      if (user && user.token !== '') {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
