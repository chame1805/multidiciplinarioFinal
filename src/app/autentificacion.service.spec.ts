import { TestBed } from '@angular/core/testing';

import { AutentificacionService } from './service/autentificacion.service';

describe('AutentificacionService', () => {
  let service: AutentificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
