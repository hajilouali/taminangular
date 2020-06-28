import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisklistComponent } from './disklist.component';

describe('DisklistComponent', () => {
  let component: DisklistComponent;
  let fixture: ComponentFixture<DisklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
