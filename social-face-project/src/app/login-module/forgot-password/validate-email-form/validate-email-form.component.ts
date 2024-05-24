import { Actions, ofType } from '@ngrx/effects';
import { Component, EventEmitter, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { validateEmail, validateEmailFailure, validateEmailSuccess } from '../../../reducers/user-store/user.actions';

import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../../../shared/modules/material-components.module';
import { SnackbarService } from '../../../../shared/services/snack-bar/snackbar.service';
import { Store } from '@ngrx/store';

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
  public validateEmailField: FormControl = new FormControl('', Validators.required);

  constructor(
    private store$: Store,
    private actions$: Actions,
    private snackService: SnackbarService
  ) {
    this.formGroup = new FormGroup({
      validateEmailField: this.validateEmailField,
    });
  }

  ngOnInit(): void {
    this.handleValidateEmailSuccess().subscribe();
    this.handleValidateEmailError().subscribe();
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading.update(() => true);
      this.store$.dispatch(validateEmail({ email: this.validateEmailField.value }));
    }
  }

  public handleValidateEmailSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(validateEmailSuccess),
      map(() => {
        console.log('Email validated');
        this.isLoading.update(() => false);
        this.emailValidated.emit(true);
      })
    );
  }

  public handleValidateEmailError(): Observable<void> {
    return this.actions$.pipe(
      ofType(validateEmailFailure),
      map((validateEmailError: any) => {
        this.isLoading.update(() => false);
        if(validateEmailError) {
          const { error } = validateEmailError;
          this.snackService.openSnackBar(error.message);
        }
      })
    );
  }
}
