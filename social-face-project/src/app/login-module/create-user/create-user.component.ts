import {AsyncPipe, CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {BreakpointObserver} from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { IUser } from '../../../shared/interfaces/user.interface';
import { MaterialComponentsModule } from '../../../shared/modules/material-components.module';
import {Observable} from 'rxjs';
import { RouterModule } from '@angular/router';
import {StepperOrientation} from '@angular/material/stepper';
import { UserService } from '../../../shared/services/user-service.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialComponentsModule, AsyncPipe, RouterModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  stepperOrientation: Observable<StepperOrientation>;
  public email: FormControl = new FormControl('', Validators.required);
  public firstName: FormControl = new FormControl('', Validators.required);
  public lastName: FormControl = new FormControl('', Validators.required);
  public password: FormControl = new FormControl('', Validators.required);
  public username: FormControl = new FormControl('', Validators.required);
  public birthDate: FormControl = new FormControl('', Validators.required);
  public notificationPreference: FormControl = new FormControl(false);

  public createAccountFormGroup:FormGroup = new FormGroup({
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    password: this.password,
    username: this.username,
    birthDate: this.birthDate,
    notificationPreference: this.notificationPreference,
  });
  

  constructor(
    public breakpointObserver: BreakpointObserver,
    private userService: UserService 
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  public onSubmit(): void {
    if (this.createAccountFormGroup.valid) {
      const payload: IUser = {
        email: this.email.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        password: this.password.value,
        username: this.username.value,
        birthDate: this.birthDate.value,
        notificationPreference: this.notificationPreference.value
      }
      this.userService.createUser(payload).subscribe();
    }
  }
}
