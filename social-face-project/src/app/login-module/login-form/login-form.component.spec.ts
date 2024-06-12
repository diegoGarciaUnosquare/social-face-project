import { AppState, userState } from '../../reducers/user-store/user.reducer';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReplaySubject, Subscription, of } from 'rxjs';
import { loginUserFailure, loginUserSuccess } from '../../reducers/user-store/user.actions';

import { IError } from '../../../shared/interfaces/error.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { LoginFormComponent } from './login-form.component';
import { NgZone } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from '../../../shared/services/snack-bar/snackbar.service';
import SnackbarServiceMock from '../../../../unit-tests/mocks/services/snackbar-service-mocks';
import { getUser } from '../../reducers/user-store/user.selectors';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('LoginFormComponent', () => {
  let actions$ = new ReplaySubject<any>();
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let initialState: AppState = userState;
  let spySnackbarService: jasmine.SpyObj<SnackbarService>;
  let sub: Subscription;
  let ngZone: NgZone;

  const user: IUser = {
    username: '',
    email: '',
    birthDate: new Date(),
    firstName: '',
    lastName: '',
    id: '',
    notificationPreference: true,
    password: '',
    role: 0,
    token: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, NoopAnimationsModule],
      providers: [
        provideRouter(routes),
        provideMockActions(() => actions$),
        provideMockStore<AppState>({
          initialState,
          selectors: [
            { selector: getUser, value: user },
          ]
        }),
        {
          provide: SnackbarService,
          useClass: SnackbarServiceMock,
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    spySnackbarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
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
    it('should call handleLoginError and handleLoginSuccess', () => {
      spyOn(component, 'handleLoginError' as any).and.returnValue(of());
      spyOn(component, 'handleLoginSuccess' as any).and.returnValue(of());
      component.ngOnInit();
      expect(component['handleLoginError']).toHaveBeenCalled();
      expect(component['handleLoginSuccess']).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should call store dispatch when form is valid', () => {
      component.formGroup.setValue({
        username: 'test@test.com',
        password: '123asd2d',
      });

      component.onSubmit();
      expect(component.isLoading()).toBeTrue();
    });

    it('should not call store dispatch when form is invalid', () => {
      component.formGroup.setValue({
        username: '',
        password: '',
      });
      component.onSubmit();
      expect(component.isLoading()).toBeFalse();
    });
  });

  describe('onShowPassword', () => {
    it('should toggle hidePassword', () => {
      component.onShowPassword(new MouseEvent('click'));
      expect(component.hidePassword()).toBeFalse();
    });
  });

  describe('handleLoginError', () => {
    it('should call open snackbar and call signal open method', (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(loginUserFailure({ error: { message: 'Error login' } as IError }));

      sub = component['handleLoginError']().subscribe(() => {
        expect(component.isLoading()).toBeFalse();
        expect(spySnackbarService.openSnackBar).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('handleLoginSuccess', () => {
    it('should call router navigate and loading should be false', (done: DoneFn) => {
      actions$ = new ReplaySubject(1);
      actions$.next(loginUserSuccess({ user: user }));

      spyOn(component, 'navigateToPostsPage' as any).and.callThrough();

      sub = component['handleLoginSuccess']().subscribe(() => {
        expect(component['navigateToPostsPage']).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('navigateToPostsPage', () => {
    it('should navigate to posts page', fakeAsync(() => {
      ngZone.run(() => {
        spyOn(component['router'], 'navigate').and.callThrough();
        spyOn(component, 'isLoading').and.callThrough();
        component['navigateToPostsPage']();
        tick(2000);
        expect(component.isLoading()).toBeFalse();
        expect(component['router'].navigate).toHaveBeenCalled();
      });
    }));
  });
});
