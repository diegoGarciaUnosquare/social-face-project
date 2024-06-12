import { Actions, ofType } from '@ngrx/effects';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Router, RouterModule } from '@angular/router';
import { createUser, createUserFailure, createUserSuccess } from '../../reducers/user-store/user.actions';
import { map, take } from 'rxjs/operators';

import { AppState } from '../../reducers/user-store/user.reducer';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IError } from '../../../shared/interfaces/error.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { MaterialComponentsModule } from '../../../shared/modules/material-components.module';
import { Observable } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snack-bar/snackbar.service';
import { Store } from '@ngrx/store';
import { passwordRegex } from '../../../shared/constants/regex';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialComponentsModule, AsyncPipe, RouterModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {
  public email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public firstName: FormControl = new FormControl('', Validators.required);
  public lastName: FormControl = new FormControl('', Validators.required);
  public password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(passwordRegex)
  ]);
  public username: FormControl = new FormControl('', Validators.required);
  public birthDate: FormControl = new FormControl('', Validators.required);
  public notificationPreference: FormControl = new FormControl('1');
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
    private snackbarService: SnackbarService,
    private store: Store<AppState>,
    private ngZone: NgZone,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.handleUserCreationError().subscribe();
    this.handleUserCreationSuccess().subscribe();
  }

  /**
   * This method is used to handle the form submission.
   * It will check if the form is valid and dispatch the create user action.
   * @returns void
   */
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

  /**
   * This method is used to determine the orientation of the stepper.
   * If the screen is greater than 800px, the stepper will be horizontal.
   * Otherwise, it will be vertical.
   * @returns Observable<StepperOrientation>
   */
  public stepperOrientation(): Observable<StepperOrientation> {
    return this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
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
   * This method is used to handle the user creation error.
   * If creation fails, it will display an error message.
   * @returns Observable<void>
   */
  private handleUserCreationError(): Observable<void> {
    return this.actions$.pipe(
      ofType(createUserFailure),
      take(1),
      map((userCreationError: { error: IError, type: string}) => {
        const { error } = userCreationError;
        this.snackbarService.openSnackBar(error.message);
      })
    );
  }

  /**
   * This method is used to handle the user creation success.
   * If creation is successful it will move the stepper to the next step.
   * @returns Observable<void>
   */
  private handleUserCreationSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(createUserSuccess),
      take(1),
      map(() => {
        if(this.createUserStepper) {
          this.createUserStepper.next();
        }
      })
    );
  }
}
