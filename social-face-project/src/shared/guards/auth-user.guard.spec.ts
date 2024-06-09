import { CanActivateFn } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { authUserGuard } from './auth-user.guard';

describe('authUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
