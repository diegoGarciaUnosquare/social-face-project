import { Component, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Actions } from '@ngrx/effects';
import { AppState } from '../../../reducers/user-store/user.reducer';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../../../shared/modules/material-components.module';
import { SnackbarService } from '../../../../shared/services/snack-bar/snackbar.service';
import { Store } from '@ngrx/store';
import { passwordRegex } from '../../../../shared/constants/regex';
import { updatePassword } from '../../../reducers/user-store/user.actions';

@Component({
  selector: 'app-update-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialComponentsModule],
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.scss'
})
export class UpdatePasswordFormComponent {
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
    private snackbarService: SnackbarService) {
    this.formGroup = new FormGroup({
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    });
  }

  public get passwordMatches(): boolean {
    return this.newPassword.value === this.confirmPassword.value;
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading.update(() => true);
      this.store.dispatch(updatePassword({ password: this.newPassword.value }));
    }
  }
}
