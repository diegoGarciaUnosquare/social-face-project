import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from './snackbar.service';
import { TestBed } from '@angular/core/testing';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [MatSnackBarModule],
    });
    service = TestBed.inject(SnackbarService);
  });

  describe('openSnackBar', () => {
    it('should open a snackbar', () => {
      spyOn(service['snackBar'], 'open').and.callThrough();
      service.openSnackBar('test message');
      expect(service['snackBar'].open).toHaveBeenCalled();
    });
  });
});
