import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../../shared/modules/material-components.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialComponentsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent {
  public password: FormControl = new FormControl('', Validators.required);
  public username: FormControl = new FormControl('', Validators.required);
  public formGroup: FormGroup = new FormGroup({
    password: this.password,
    username: this.username
  });
  public isLoading = signal(false);

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading.update(() => true);
    }
  }
}
