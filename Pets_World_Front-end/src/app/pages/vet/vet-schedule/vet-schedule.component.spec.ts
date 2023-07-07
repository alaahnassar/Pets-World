import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetScheduleComponent } from './vet-schedule.component';

describe('VetScheduleComponent', () => {
  let component: VetScheduleComponent;
  let fixture: ComponentFixture<VetScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VetScheduleComponent]
    });
    fixture = TestBed.createComponent(VetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
