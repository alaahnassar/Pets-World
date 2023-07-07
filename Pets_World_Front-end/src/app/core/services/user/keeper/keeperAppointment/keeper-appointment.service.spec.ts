import { TestBed } from '@angular/core/testing';

import { KeeperAppointmentService } from './keeper-appointment.service';

describe('KeeperAppointmentService', () => {
  let service: KeeperAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeeperAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
