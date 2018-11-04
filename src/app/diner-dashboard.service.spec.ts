import { TestBed } from '@angular/core/testing';

import { DinerDashboardService } from './diner-dashboard.service';

describe('DinerDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DinerDashboardService = TestBed.get(DinerDashboardService);
    expect(service).toBeTruthy();
  });
});
