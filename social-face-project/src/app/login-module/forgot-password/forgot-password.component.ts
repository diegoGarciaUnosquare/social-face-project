import { Component, Signal, WritableSignal, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdatePasswordFormComponent } from './update-password-form/update-password-form.component';
import { ValidateEmailFormComponent } from './validate-email-form/validate-email-form.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [UpdatePasswordFormComponent, ValidateEmailFormComponent, RouterModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  public formGroup: FormGroup;
  public showUpdatePasswordForm: WritableSignal<boolean>  = signal(false);

  constructor() {
    this.formGroup = new FormGroup({});
  }

  public onEmailValidated(isValid: boolean): void {
    if (isValid) {
      this.showUpdatePasswordForm.update(() => true);
    }
  }
}
