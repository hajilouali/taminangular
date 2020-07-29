import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiketcontentComponent } from './tiketcontent.component';

describe('TiketcontentComponent', () => {
  let component: TiketcontentComponent;
  let fixture: ComponentFixture<TiketcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiketcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiketcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
