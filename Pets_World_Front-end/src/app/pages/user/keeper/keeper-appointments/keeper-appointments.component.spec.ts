import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeeperAppointmentsComponent } from './keeper-appointments.component';

describe('KeeperAppointmentsComponent', () => {
  let component: KeeperAppointmentsComponent;
  let fixture: ComponentFixture<KeeperAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeeperAppointmentsComponent]
    });
    fixture = TestBed.createComponent(KeeperAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
