import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPetsComponent } from './owner-pets.component';

describe('OwnerPetsComponent', () => {
  let component: OwnerPetsComponent;
  let fixture: ComponentFixture<OwnerPetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerPetsComponent]
    });
    fixture = TestBed.createComponent(OwnerPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
