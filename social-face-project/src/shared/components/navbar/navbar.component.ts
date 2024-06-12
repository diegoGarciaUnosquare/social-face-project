import { Actions, ofType } from '@ngrx/effects';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { loginUserFailure, logoutUser, logoutUserSuccess } from '../../../app/reducers/user-store/user.actions';

import { BreakpointObserver } from '@angular/cdk/layout';
import { IError } from '../../interfaces/error.interface';
import { MaterialComponentsModule } from '../../modules/material-components.module';
import { SnackbarService } from '../../services/snack-bar/snackbar.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialComponentsModule, AsyncPipe, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(
    private actions$: Actions,
    private breakpointObserver: BreakpointObserver,
    private ngZone: NgZone,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.handleLogoutFailure().subscribe();
    this.handleLogoutSuccess().subscribe();
  }

  /**
   *  Method in charge of determining if the menu should be displayed
   * based of the window width
   * @returns Observable<boolean>
   */
  public shouldDisplayMenu(): Observable<boolean> {
    return this.breakpointObserver
      .observe('(max-width: 800px)')
      .pipe(map(({ matches }) => (matches ? true : false)));
  }

  public navigateTo(route: string): void {
    this.ngZone.run(() => {
      this.router.navigate([route]);
    });
  }

  public logout(): void {
    this.store.dispatch(logoutUser());
  }

  private handleLogoutFailure(): Observable<void> {
    return this.actions$.pipe(
      ofType(loginUserFailure),
      map((loginError: { error: IError, type: string}) => {
        this.snackbarService.openSnackBar(loginError.error.message);
      })
    );
  
  }

  private handleLogoutSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(logoutUserSuccess),
      map(() => {
        this.navigateTo('/login');
      })
    );
  }
}
