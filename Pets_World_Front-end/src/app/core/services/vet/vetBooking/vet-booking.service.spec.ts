import { TestBed } from '@angular/core/testing';

import { VetBookingService } from './vet-booking.service';

describe('VetBookingService', () => {
  let service: VetBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
