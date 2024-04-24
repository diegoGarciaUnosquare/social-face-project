import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialComponentsModule } from '../../shared/modules/material-components.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialComponentsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public password: FormControl = new FormControl('');
  public username: FormControl = new FormControl('');
  public formGroup: FormGroup = new FormGroup({
    password: this.password,
    username: this.username
  });
}
