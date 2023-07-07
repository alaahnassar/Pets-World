import { TestBed } from '@angular/core/testing';

import { VetAppointmentService } from './vet-appointment.service';

describe('VetAppointmentService', () => {
  let service: VetAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
