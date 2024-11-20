import { TestBed } from '@angular/core/testing';

import { RegistroRutaService } from './service/registro-ruta.service';

describe('RegistroRutaService', () => {
  let service: RegistroRutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroRutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
