import { AppState, userState } from '../../reducers/user-store/user.reducer';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject, Subscription, of } from 'rxjs';
import { createUserFailure, createUserSuccess } from '../../reducers/user-store/user.actions';

import { CreateUserComponent } from './create-user.component';
import { NgZone } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from '../../../shared/services/snack-bar/snackbar.service';
import SnackbarServiceMock from '../../../../unit-tests/mocks/services/snackbar-service-mocks';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let actions$: ReplaySubject<any>;
  let fixture: ComponentFixture<CreateUserComponent>;
  let initialState: AppState = userState;
  let spySnackService: jasmine.SpyObj<SnackbarService>;
  let sub: Subscription;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<AppState>({ initialState }),
        provideMockActions(() => actions$),
        {
          provide: SnackbarService,
          useClass: SnackbarServiceMock
        },
        provideRouter(routes)
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    spySnackService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
    ngZone = TestBed.inject(NgZone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  describe('ngOnInit', () => {
    it('should call handleUserCreationError', () => {
      spyOn(component, 'handleUserCreationError' as any).and.returnValue(of());
      spyOn(component, 'handleUserCreationSuccess' as any).and.returnValue(of());
      component.ngOnInit();
      expect(component['handleUserCreationError']).toHaveBeenCalled();
      expect(component['handleUserCreationSuccess']).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should call store dispatch when form is valid', () => {
      spyOn(component['store'], 'dispatch').and.callThrough();
      component.createAccountFormGroup.setValue({
        email: 'test@test.com',
        firstName: 'jon',
        lastName: 'doe',
        password: '123asd2d',
        username: 'testUser',
        birthDate: new Date(),
        notificationPreference: false,
      });
      component.onSubmit();
      expect(component['store'].dispatch).toHaveBeenCalled();
    });

    it('should not call store dispatch when form is invalid', () => {
      spyOn(component['store'], 'dispatch').and.callThrough();
      component.createAccountFormGroup.patchValue({
        email: '',
      });
      component.onSubmit();
      expect(component['store'].dispatch).not.toHaveBeenCalled();
    });

  });

  describe('handleUserCreationError', () => {
    it('should call openSnackBar if theres an error', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(createUserFailure({ error: { message: 'error', url: '', status: 400 } }));
      sub = component['handleUserCreationError']().subscribe(() => {
        expect(spySnackService.openSnackBar).toHaveBeenCalled();
      });
    });
  });

  describe('handleUserCreationSuccess', () => {
    it('should call next on stepper when user is created', () => {
      component['createUserStepper'] = {
        next: jasmine.createSpy('next')
      } as any;

      actions$ = new ReplaySubject(1);
      actions$.next(createUserSuccess());
      sub = component['handleUserCreationSuccess']().subscribe(() => {
        expect(component['createUserStepper']!.next).toHaveBeenCalled();
      });
    });
  });

  describe('navigateToLogin', () => {
    it('should navigate to login page', () => {
      ngZone.run(() => {
        spyOn(component['router'], 'navigate').and.callThrough();
        component.navigateToLogin();
        expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
      })
    });
  });
});
