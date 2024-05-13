import { Actions, ofType } from '@ngrx/effects';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { createUser, createUserSuccess } from '../../reducers/user-store/user.actions';
import { map, take } from 'rxjs/operators';

import { AppState } from '../../reducers/user-store/user.reducer';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IUser } from '../../../shared/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialComponentsModule } from '../../../shared/modules/material-components.module';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getErrors } from '../../reducers/user-store/user.selectors';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialComponentsModule, AsyncPipe, RouterModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {
  public stepperOrientation: Observable<StepperOrientation>;
  public email: FormControl = new FormControl('', Validators.required);
  public firstName: FormControl = new FormControl('', Validators.required);
  public lastName: FormControl = new FormControl('', Validators.required);
  public password: FormControl = new FormControl('', Validators.required);
  public username: FormControl = new FormControl('', Validators.required);
  public birthDate: FormControl = new FormControl('', Validators.required);
  public notificationPreference: FormControl = new FormControl(false);
  public isLoading: boolean = false;
  @ViewChild('createUserStepper') createUserStepper: MatStepper | undefined;


  public createAccountFormGroup: FormGroup = new FormGroup({
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
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.handleUserCreationError().subscribe();
    this.handleUserCreationSuccess().subscribe();
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
      this.store.dispatch(createUser({ userData: payload }));
    }
  }

  private handleUserCreationError(): Observable<void> {
    return this.store.select(getErrors).pipe(
      take(1),
      map((error) => {
        if (error) {
          this.snackBar.open(error.message, 'Close', { duration: 5000 });
        }
      })
    );
  }

  private handleUserCreationSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(createUserSuccess),
      map(() => {
        if(this.createUserStepper) {
          this.createUserStepper.next();
        }
      })
    );
  }
}
