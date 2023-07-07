import { TestBed } from '@angular/core/testing';

import { KeeperBookingService } from './keeper-booking.service';

describe('KeeperBookingService', () => {
  let service: KeeperBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeeperBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
