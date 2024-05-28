import { AppState, userState } from '../../../reducers/user-store/user.reducer';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject, Subscription, of } from 'rxjs';
import { validateEmailFailure, validateEmailSuccess } from '../../../reducers/user-store/user.actions';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from '../../../../shared/services/snack-bar/snackbar.service';
import SnackbarServiceMock from '../../../../../unit-tests/mocks/services/snackbar-service-mocks';
import { ValidateEmailFormComponent } from './validate-email-form.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('ValidateEmailFormComponent', () => {
  let actions$: ReplaySubject<any>;
  let component: ValidateEmailFormComponent;
  let fixture: ComponentFixture<ValidateEmailFormComponent>;
  let spySnackService: jasmine.SpyObj<SnackbarService>;
  let sub: Subscription;
  const initialState = userState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateEmailFormComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<AppState>({ initialState }),
        provideMockActions(() => actions$),
        {
          provide: SnackbarService,
          useClass: SnackbarServiceMock
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidateEmailFormComponent);
    spySnackService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  describe('ngOnInit', () => {
    it('should call handleValidateEmailSuccess and handleValidateEmailError', () => {
      spyOn(component, 'handleValidateEmailSuccess').and.returnValue(of());
      spyOn(component, 'handleValidateEmailError').and.returnValue(of());
      component.ngOnInit();
      expect(component.handleValidateEmailSuccess).toHaveBeenCalled();
      expect(component.handleValidateEmailError).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should dispatch validateEmail when formGroup is valid', () => {
      component.formGroup.setValue({ validateEmailField: 'test@test.com'});
      spyOn(component['store$'], 'dispatch').and.callThrough();
      component.onSubmit();
      expect(component.isLoading()).toBeTrue();
      expect(component['store$'].dispatch).toHaveBeenCalled();
    });
  });

  describe('handleValidateEmailSuccess', () => {
    it('should emit emailValidated when validateEmailSuccess is dispatched', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(validateEmailSuccess());
      spyOn(component.emailValidated, 'emit').and.callThrough();
      sub = component.handleValidateEmailSuccess().subscribe(() => {
        expect(component.isLoading()).toBeFalse();
        expect(component.emailValidated.emit).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('handleValidateEmailError', () => {
    it('should call snackService.openSnackBar when validateEmailFailure', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(validateEmailFailure({ error: { message: 'test', status: 400, url: 'test'}}));
      sub = component.handleValidateEmailError().subscribe(() => {
        expect(component.isLoading()).toBeFalse();
        expect(spySnackService.openSnackBar).toHaveBeenCalled();
      });
    });
  });
});
