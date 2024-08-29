import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginprotectedGuard } from './loginprotected.guard';

describe('loginprotectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginprotectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
