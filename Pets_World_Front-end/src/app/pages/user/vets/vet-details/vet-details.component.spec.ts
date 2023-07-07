import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetDetailsComponent } from './vet-details.component';

describe('VetDetailsComponent', () => {
  let component: VetDetailsComponent;
  let fixture: ComponentFixture<VetDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VetDetailsComponent]
    });
    fixture = TestBed.createComponent(VetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
