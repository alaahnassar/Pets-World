import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetAppointmentsComponent } from './vet-appointments.component';

describe('VetAppointmentsComponent', () => {
  let component: VetAppointmentsComponent;
  let fixture: ComponentFixture<VetAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VetAppointmentsComponent]
    });
    fixture = TestBed.createComponent(VetAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
