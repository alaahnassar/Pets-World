import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetBookingComponent } from './vet-booking.component';

describe('VetBookingComponent', () => {
  let component: VetBookingComponent;
  let fixture: ComponentFixture<VetBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VetBookingComponent]
    });
    fixture = TestBed.createComponent(VetBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
