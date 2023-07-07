import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeeperListComponent } from './keeper-list.component';

describe('HomeComponent', () => {
  let component: KeeperListComponent;
  let fixture: ComponentFixture<KeeperListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeeperListComponent]
    });
    fixture = TestBed.createComponent(KeeperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
