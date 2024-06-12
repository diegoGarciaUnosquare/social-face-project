import { Actions, ofType } from '@ngrx/effects';
import { Component, EventEmitter, NgZone, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { validateEmail, validateEmailFailure, validateEmailSuccess } from '../../../reducers/user-store/user.actions';

import { CommonModule } from '@angular/common';
import { IError } from '../../../../shared/interfaces/error.interface';
import { MaterialComponentsModule } from '../../../../shared/modules/material-components.module';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/services/snack-bar/snackbar.service';
import { Store } from '@ngrx/store';
import { emailRegex } from '../../../../shared/constants/regex';

@Component({
  selector: 'app-validate-email-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialComponentsModule],
  templateUrl: './validate-email-form.component.html',
  styleUrl: './validate-email-form.component.scss'
})
export class ValidateEmailFormComponent implements OnInit {
  @Output() emailValidated = new EventEmitter<boolean>();
  public formGroup: FormGroup;
  public isLoading: WritableSignal<boolean> = signal(false);
  public validateEmailField: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private store$: Store,
    private actions$: Actions,
    private snackService: SnackbarService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      validateEmailField: this.validateEmailField,
    });
  }

  ngOnInit(): void {
    this.handleValidateEmailSuccess().subscribe();
    this.handleValidateEmailError().subscribe();
  }

  /**
   * This method is used to submit the email to validate.
   * If the form is valid, it will dispatch the validateEmail action.
   * @returns void
   */
  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading.update(() => true);
      this.store$.dispatch(validateEmail({ email: this.validateEmailField.value }));
    }
  }

  /**
   * This method is used to navigate to the login page.
   * @returns void
   */
  public navigateToLogin(): void {
    this.ngZone.run(() => {
      this.router.navigate(['/login']);
    });
  }

  /**
   * Method to handle the validateEmailSuccess action.
   * This method will update the isLoading signal to false and emit the emailValidated event.
   * @returns Observable<void>
   */
  private handleValidateEmailSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(validateEmailSuccess),
      map(() => {
        this.isLoading.update(() => false);
        this.emailValidated.emit(true);
      })
    );
  }

  /**
   * Method to handle the validateEmailFailure action.
   * This method will update the isLoading signal to false and display the error message.
   * @returns Observable<void>
   */
  private handleValidateEmailError(): Observable<void> {
    return this.actions$.pipe(
      ofType(validateEmailFailure),
      map((validateEmailError: { error: IError, type: string}) => {
        this.isLoading.update(() => false);
        const { error } = validateEmailError;
        this.snackService.openSnackBar(error.message);
      })
    );
  }
}
