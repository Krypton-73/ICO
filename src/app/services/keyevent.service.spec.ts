import { TestBed, inject } from '@angular/core/testing';

import { KeyeventService } from './keyevent.service';

describe('KeyeventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyeventService]
    });
  });

  it('should be created', inject([KeyeventService], (service: KeyeventService) => {
    expect(service).toBeTruthy();
  }));
});
