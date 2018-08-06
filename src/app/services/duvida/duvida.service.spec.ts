import { TestBed, inject } from '@angular/core/testing';

import { DuvidaService } from './duvida.service';

describe('DuvidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DuvidaService]
    });
  });

  it('should be created', inject([DuvidaService], (service: DuvidaService) => {
    expect(service).toBeTruthy();
  }));
});
