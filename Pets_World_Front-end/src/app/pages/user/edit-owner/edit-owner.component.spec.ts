import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOwnerComponent } from './edit-owner.component';

describe('EditOwnerComponent', () => {
  let component: EditOwnerComponent;
  let fixture: ComponentFixture<EditOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOwnerComponent]
    });
    fixture = TestBed.createComponent(EditOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
