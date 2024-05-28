import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, NoopAnimationsModule],
      providers: [
        provideRouter(routes),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onSubmit', () => {
    it('should call store dispatch when form is valid', () => {
      component.formGroup.setValue({
        username: 'test@test.com',
        password: 'password',
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
});
