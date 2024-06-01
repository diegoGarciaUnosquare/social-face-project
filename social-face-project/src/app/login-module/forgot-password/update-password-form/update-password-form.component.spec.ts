import { AppState, userState } from '../../../reducers/user-store/user.reducer';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReplaySubject, Subscription, of } from 'rxjs';
import { RouterModule, provideRouter } from '@angular/router';
import { updatePasswordFailure, updatePasswordSuccess } from '../../../reducers/user-store/user.actions';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from '../../../../shared/services/snack-bar/snackbar.service';
import SnackbarServiceMock from '../../../../../unit-tests/mocks/services/snackbar-service-mocks';
import { UpdatePasswordFormComponent } from './update-password-form.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { routes } from '../../../app.routes';

describe('UpdatePasswordFormComponent', () => {
  let component: UpdatePasswordFormComponent;
  let actions$: ReplaySubject<any>;
  let spySnackbarService: jasmine.SpyObj<SnackbarService>;
  let fixture: ComponentFixture<UpdatePasswordFormComponent>;
  let sub: Subscription;
  const initialState = userState;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePasswordFormComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<AppState>({ initialState }),
        provideMockActions(() => actions$),
        provideRouter(routes),
        {
          provide: SnackbarService,
          userClass: SnackbarServiceMock,
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePasswordFormComponent);
    spySnackbarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  describe('ngOnInit', () => {
    it('should call handleUpdatePasswordSuccess and handleUpdatePasswordFailure', () => {
      spyOn(component, 'handleUpdatePasswordSuccess' as any).and.returnValue(of());
      spyOn(component, 'handleUpdatePasswordFailure' as any).and.returnValue(of());
      component.ngOnInit();
      expect(component['handleUpdatePasswordSuccess']).toHaveBeenCalled();
      expect(component['handleUpdatePasswordFailure']).toHaveBeenCalled();
    });
  });

  describe(' get passwordMatches', () => {
    it('should return true if newPassword matches confirmPassword', () => {
      component.newPassword.setValue('password');
      component.confirmPassword.setValue('password');
      expect(component.passwordMatches).toBeTrue();
    });

    it('should return false if newPassword is empty', () => {
      component.newPassword.setValue('');
      component.confirmPassword.setValue('password');
      expect(component.passwordMatches).toBeFalse();
    });

    it('should return false if newPassword does not match confirmPassword', () => {
      component.newPassword.setValue('password');
      component.confirmPassword.setValue('password1');
      expect(component.passwordMatches).toBeFalse();
    });
  });

  describe('onSubmit', () => {
    it('should call store.dispatch and isLoading.update if password is valid', () => {
      spyOn(component['store'], 'dispatch').and.callThrough();
      component.formGroup.setValue({ newPassword: 'a9yhd7s1', confirmPassword: 'a9yhd7s1' });
      component.onSubmit();
      expect(component.isLoading()).toBeTrue();
      expect(component['store'].dispatch).toHaveBeenCalled();
    });

    it('should not call store.dispatch if formGroup is invalid', () => {
      spyOn(component['store'], 'dispatch').and.callThrough();
      component.formGroup.setValue({ newPassword: '', confirmPassword: '' });
      component.onSubmit();
      expect(component.isLoading()).toBeFalse();
      expect(component['store'].dispatch).not.toHaveBeenCalled();
    });
  });

  describe('handleUpdatePasswordFailure', () => {
    it('should call snackService.openSnackBar when updatePasswordFailure is dispatched', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(updatePasswordFailure({ error: { message: 'test', status: 400, url: 'test'}}));
      spyOn(spySnackbarService, 'openSnackBar').and.callThrough();
      sub = component['handleUpdatePasswordFailure']().subscribe(() => {
        expect(component.isLoading()).toBeFalse();
        expect(spySnackbarService.openSnackBar).toHaveBeenCalled();
      });
    });
  })

  describe('navigateToLogin', () => {
    it('should navigate to login after 2 seconds', fakeAsync (() => {
      spyOn(component['router'], 'navigate').and.callThrough();
      component['navigateToLogin']();
      tick(2000);
      expect(component['router'].navigate).toHaveBeenCalled();
    }));
  })
});
