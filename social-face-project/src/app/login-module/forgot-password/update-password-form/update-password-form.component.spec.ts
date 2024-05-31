import { AppState, userState } from '../../../reducers/user-store/user.reducer';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaySubject } from 'rxjs';
import { UpdatePasswordFormComponent } from './update-password-form.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('UpdatePasswordFormComponent', () => {
  let component: UpdatePasswordFormComponent;
  let actions$: ReplaySubject<any>;
  let fixture: ComponentFixture<UpdatePasswordFormComponent>;
  const initialState = userState;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePasswordFormComponent, NoopAnimationsModule],
      providers: [
        provideMockStore<AppState>({ initialState }),
        provideMockActions(() => actions$),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
