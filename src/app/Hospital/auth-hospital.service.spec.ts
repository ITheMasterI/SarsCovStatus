import { TestBed } from '@angular/core/testing';

import { AuthHospitalService } from './auth-hospital.service';

describe('AuthHospitalService', () => {
  let service: AuthHospitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHospitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
