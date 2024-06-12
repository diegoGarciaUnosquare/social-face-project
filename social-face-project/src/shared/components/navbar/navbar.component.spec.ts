import { AppState, userState } from '../../../app/reducers/user-store/user.reducer';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject, Subscription, of } from 'rxjs';
import { loginUserFailure, logoutUserSuccess } from '../../../app/reducers/user-store/user.actions';

import { BreakpointState } from '@angular/cdk/layout';
import { NavbarComponent } from './navbar.component';
import { NgZone } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from '../../services/snack-bar/snackbar.service';
import SnackbarServiceMock from '../../../../unit-tests/mocks/services/snackbar-service-mocks';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app/app.routes';

describe('NavbarComponent', () => {
  let actions$: ReplaySubject<any>;
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let sub: Subscription;
  let spySnackbarService: jasmine.SpyObj<SnackbarService>;
  let ngZone: NgZone;
  let initialState: AppState = userState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, NoopAnimationsModule],
      providers: [
        provideRouter(routes),
        {
          provide: SnackbarService,
          useClass: SnackbarServiceMock
        },
        provideMockActions(() => actions$),
        provideMockStore<AppState>({ initialState}),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    ngZone = TestBed.inject(NgZone);
    spySnackbarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('shouldDisplayMenu', () => {
    it('should return true', () => {
      const matches: BreakpointState = { breakpoints: { '(max-width: 800px)': true }, matches: true };
      spyOn(component['breakpointObserver'], 'observe').and.returnValue(of(matches));
      sub = component.shouldDisplayMenu().subscribe((result) => {
        expect(result).toBeTrue();
      });
    });

    it('should return false', () => {
      const matches: BreakpointState = { breakpoints: { '(max-width: 800px)': false }, matches: false };
      spyOn(component['breakpointObserver'], 'observe').and.returnValue(of(matches));
      sub = component.shouldDisplayMenu().subscribe((result) => {
        expect(result).toBeFalse();
      });
    });
  });

  describe('navigateTo', () => {
    it('should navigate to the route', () => {
      ngZone.run(() => {
        spyOn(component['router'], 'navigate').and.callThrough();
        component.navigateTo('test');
        expect(component['router'].navigate).toHaveBeenCalledWith(['test']);
      });
    });
  });

  describe('logout', () => {
    it('should dispatch logoutUser', () => {
      spyOn(component['store'], 'dispatch').and.callThrough();
      component.logout();
      expect(component['store'].dispatch).toHaveBeenCalled();
    });
  });

  describe('handleLogoutFailure', () => {
    it('should open snackbar', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(loginUserFailure({ error: { message: 'test', url: '', status: 400 } }));
      sub = component['handleLogoutFailure']().subscribe(() => {
        expect(spySnackbarService.openSnackBar).toHaveBeenCalledWith('test');
      });
    });
  });

  describe('handleLogoutSuccess', () => {
    it('should navigate to login', () => {
      actions$ = new ReplaySubject(1);
      actions$.next(logoutUserSuccess());
      spyOn(component, 'navigateTo').and.callThrough();
      sub = component['handleLogoutSuccess']().subscribe(() => {
        expect(component.navigateTo).toHaveBeenCalledWith('/login');
      });
    });
  });
});
