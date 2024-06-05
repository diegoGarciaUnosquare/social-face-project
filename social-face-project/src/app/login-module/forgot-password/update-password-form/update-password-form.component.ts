import { Actions, ofType } from '@ngrx/effects';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { updatePassword, updatePasswordFailure, updatePasswordSuccess } from '../../../reducers/user-store/user.actions';

import { AppState } from '../../../reducers/user-store/user.reducer';
import { CommonModule } from '@angular/common';
import { IError } from '../../../../shared/interfaces/error.interface';
import { MaterialComponentsModule } from '../../../../shared/modules/material-components.module';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/services/snack-bar/snackbar.service';
import { Store } from '@ngrx/store';
import { passwordRegex } from '../../../../shared/constants/regex';

@Component({
  selector: 'app-update-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialComponentsModule],
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.scss'
})
export class UpdatePasswordFormComponent implements OnInit {
  public newPassword: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(passwordRegex)
  ]);
  public confirmPassword: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public isLoading: WritableSignal<boolean> = signal(false);
  public formGroup: FormGroup;

  constructor(private store: Store<AppState>,
    private actions$: Actions,
    private router: Router,
    private snackbarService: SnackbarService) {
    this.formGroup = new FormGroup({
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    });
  }

  ngOnInit(): void {
    this.handleUpdatePasswordSuccess().subscribe();
    this.handleUpdatePasswordFailure().subscribe();
  }

  /**
   * This getter is used to check if the password matches the confirm password.
   * @returns boolean
   */
  public get passwordMatches(): boolean {
    if (this.newPassword.value === '' || this.confirmPassword.value === '') {
      return false;
    }
    return this.newPassword.value === this.confirmPassword.value;
  }

  /**
   * This method is used to handle the form submission.
   * It will check if the form is valid and dispatch the update password action.
   * @returns void
   */
  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading.update(() => true);
      this.store.dispatch(updatePassword({ password: this.newPassword.value }));
    }
  }

  /**
   * This method is used to handle the update password success.
   * It will set the loading state to false and display a success message.
   * It will also navigate to the login screen after 2 seconds.
   * @returns Observable<void>
   */
  private handleUpdatePasswordSuccess(): Observable<void> { 
    return this.actions$.pipe(
      ofType(updatePasswordSuccess),
      map(() => {
        this.isLoading.update(() => false);
        this.snackbarService.openSnackBar('Password updated successfully. You will be redirected to login screen.');
        this.navigateToLogin();
      })
    );
  }

  /**
   * This method is used to handle the update password failure.
   * It will set the loading state to false and display an error message.
   * @returns Observable<void>
   */
  private handleUpdatePasswordFailure(): Observable<void> {
    return this.actions$.pipe(
      ofType(updatePasswordFailure),
      map((updatePasswordError: { error: IError, type: string}) => {
        this.isLoading.update(() => false);
        const { error } = updatePasswordError;
        this.snackbarService.openSnackBar(error.message);
      })
    );
  }

  /**
   * This method is used to navigate to the login screen after the password is updated successfully.
   */  
  private navigateToLogin(): void {
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2000);
  }
}
