import { Component, WritableSignal, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
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
  public showUpdatePasswordForm: WritableSignal<boolean> = signal(false);

  constructor() {
  }

  /**
   * This method is used to handle the email validation output event.
   * If the email is valid, it will show the update password form.
   * @param isValid: This parameter is used to check if the email entered is valid.
   * @returns void
   */
  public onEmailValidated(isValid: boolean): void {
    if (isValid) {
      this.showUpdatePasswordForm.update(() => true);
    }
  }
}
