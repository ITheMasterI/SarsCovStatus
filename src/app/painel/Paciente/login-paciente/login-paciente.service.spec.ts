import { TestBed } from '@angular/core/testing';

import { LoginPacienteService } from './login-paciente.service';

describe('LoginPacienteService', () => {
  let service: LoginPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
