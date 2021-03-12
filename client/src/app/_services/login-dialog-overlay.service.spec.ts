import { TestBed } from '@angular/core/testing';

import { LoginDialogOverlayService } from './login-dialog-overlay.service';

describe('LoginDialogOverlayService', () => {
  let service: LoginDialogOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginDialogOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
