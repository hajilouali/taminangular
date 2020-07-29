import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDiskComponent } from './print-disk.component';

describe('PrintDiskComponent', () => {
  let component: PrintDiskComponent;
  let fixture: ComponentFixture<PrintDiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintDiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
