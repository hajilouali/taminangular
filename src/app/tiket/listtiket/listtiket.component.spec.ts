import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtiketComponent } from './listtiket.component';

describe('ListtiketComponent', () => {
  let component: ListtiketComponent;
  let fixture: ComponentFixture<ListtiketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtiketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtiketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
