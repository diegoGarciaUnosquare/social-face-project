import { AppState, userState } from '../../reducers/user-store/user.reducer';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('ForgotPasswordComponent', () => {
  let actions$: ReplaySubject<any>;
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  const initialState = userState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<AppState>({ initialState }),
        provideMockActions(() => actions$)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onEmailValidated', () => {
    it('should set showUpdatePasswordForm to true when email is valid', () => {
      component.onEmailValidated(true);
      expect(component.showUpdatePasswordForm()).toBe(true);
    });

    it('should set showUpdatePasswordForm to false when email is invalid', () => {
      component.onEmailValidated(false);
      expect(component.showUpdatePasswordForm()).toBe(false);
    });
  });
});
