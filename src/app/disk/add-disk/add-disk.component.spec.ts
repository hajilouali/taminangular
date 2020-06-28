import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiskComponent } from './add-disk.component';

describe('AddDiskComponent', () => {
  let component: AddDiskComponent;
  let fixture: ComponentFixture<AddDiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
