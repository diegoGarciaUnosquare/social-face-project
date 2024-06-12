import { Actions, ofType } from '@ngrx/effects';
import { Component, NgZone, OnInit, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { loginUser, loginUserFailure, loginUserSuccess } from '../../reducers/user-store/user.actions';

import { AppState } from '../../reducers/user-store/user.reducer';
import { CommonModule } from '@angular/common';
import { IError } from '../../../shared/interfaces/error.interface';
import { MaterialComponentsModule } from '../../../shared/modules/material-components.module';
import { SnackbarService } from '../../../shared/services/snack-bar/snackbar.service';
import { Store } from '@ngrx/store';
import { passwordRegex } from '../../../shared/constants/regex';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialComponentsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent implements OnInit {
  public password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(passwordRegex),
  ]);
  public username: FormControl = new FormControl('', Validators.required);
  public formGroup: FormGroup = new FormGroup({
    password: this.password,
    username: this.username
  });
  public isLoading: WritableSignal<boolean> = signal(false);
  public hidePassword: WritableSignal<boolean> = signal(true);

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private snackbarService: SnackbarService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.handleLoginError().subscribe();
    this.handleLoginSuccess().subscribe();
  }

  /**
   * On Submit
   * Description: This method is called when the form is submitted. It validates the form and dispatches the loginUser action
   * @returns void
   */
  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading.update(() => true);
      this.store.dispatch(loginUser({
        username: this.username.value,
        password: this.password.value
      }));
    }
  }

  /**
   * On Show Password
   * Description: This method is called when the show password icon is clicked. It toggles the visibility of the password
   * @param event: MouseEvent
   * @returns void
   */
  public onShowPassword(event: MouseEvent): void {
    this.hidePassword.update((value) => !value);
    event.stopPropagation();
  }

  /**
   * Handle Login Error
   * Description: This method handles the login error and displays a snackbar with the error message
   * @returns Observable<void>
   */
  private handleLoginError(): Observable<void> {
    return this.actions$.pipe(
      ofType(loginUserFailure),
      map((loginFailure: { error: IError, type: string }) => {
        this.isLoading.update(() => false);
        this.snackbarService.openSnackBar(loginFailure.error.message);
      })
    );
  }

  /**
   * Handle Login Success
   * Description: This method handles the login success and navigates to the feed page
   * @returns Observable<void>
   */
  private handleLoginSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(loginUserSuccess),
      map(() => {
        this.isLoading.update(() => false);
        this.navigateToPostsPage();
      })
    );
  }

  private navigateToPostsPage(): void {
    this.ngZone.run(() => {
      setTimeout(() => {
        this.router.navigate(['/feed/posts']);
        }, 2000);
    });
  }
}
