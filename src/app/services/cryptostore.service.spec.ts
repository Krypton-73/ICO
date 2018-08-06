import { TestBed, inject } from '@angular/core/testing';

import { CryptostoreService } from './cryptostore.service';

describe('CryptostoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptostoreService]
    });
  });

  it('should be created', inject([CryptostoreService], (service: CryptostoreService) => {
    expect(service).toBeTruthy();
  }));
});
