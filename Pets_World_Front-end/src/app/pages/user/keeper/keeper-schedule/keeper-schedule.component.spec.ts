import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeeperScheduleComponent } from './keeper-schedule.component';

describe('KeeperScheduleComponent', () => {
  let component: KeeperScheduleComponent;
  let fixture: ComponentFixture<KeeperScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeeperScheduleComponent]
    });
    fixture = TestBed.createComponent(KeeperScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
