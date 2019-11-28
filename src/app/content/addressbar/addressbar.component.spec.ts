import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressbarComponent } from './addressbar.component';

describe('AddressbarComponent', () => {
  let component: AddressbarComponent;
  let fixture: ComponentFixture<AddressbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
