import { AppState, userState } from '../reducers/user-store/user.reducer';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('FeedComponent', () => {
  let actions$: ReplaySubject<any>;
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let initialState: AppState = userState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedComponent],
      providers: [
        provideRouter(routes),
        provideMockActions(() => actions$),
        provideMockStore<AppState>({ initialState }),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
