import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription, of } from 'rxjs';

import { BreakpointState } from '@angular/cdk/layout';
import { NavbarComponent } from './navbar.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app/app.routes';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let sub: Subscription;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter(routes)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
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
});
