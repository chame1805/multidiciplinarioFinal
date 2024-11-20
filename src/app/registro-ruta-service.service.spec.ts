import { TestBed } from '@angular/core/testing';

import { RegistroRutaServiceService } from './service/registro-ruta-service.service';

describe('RegistroRutaServiceService', () => {
  let service: RegistroRutaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroRutaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
