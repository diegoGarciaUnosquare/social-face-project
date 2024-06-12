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

  /**
   *  This method is used to navigate the user to a different route
   * based on the option selected on the navbar
   * @param route a path to redirect the user to
   * @returns void
   */
  public navigateTo(route: string): void {
    this.ngZone.run(() => {
      this.router.navigate([route]);
    });
  }

  /**
   *  This method is used to log the user out of the application
   * @returns void
   */
  public logout(): void {
    this.store.dispatch(logoutUser());
  }

  /**
   *  This method is used to handle the logout failure scenario.
   * If the logout fails, a snackbar is displayed with the error message.
   * @returns Observable<void>
   */
  private handleLogoutFailure(): Observable<void> {
    return this.actions$.pipe(
      ofType(loginUserFailure),
      map((loginError: { error: IError, type: string}) => {
        this.snackbarService.openSnackBar(loginError.error.message);
      })
    );
  
  }

  /**
   *  This method is used to handle the logout success scenario.
   * If the logout is successful, the user is redirected to the login page.
   * @returns Observable<void>
   */
  private handleLogoutSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(logoutUserSuccess),
      map(() => {
        this.navigateTo('/login');
      })
    );
  }
}
