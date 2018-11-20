import { TestBed, inject } from '@angular/core/testing';

import { CocinaService } from './cocina.service';

describe('CocinaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CocinaService]
    });
  });

  it('should be created', inject([CocinaService], (service: CocinaService) => {
    expect(service).toBeTruthy();
  }));
});
