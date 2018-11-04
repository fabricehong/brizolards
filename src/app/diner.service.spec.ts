import { TestBed } from '@angular/core/testing';

import { DinerService } from './diner.service';

describe('DinerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DinerService = TestBed.get(DinerService);
    expect(service).toBeTruthy();
  });
});
