import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsKeyboardComponent } from './settings-keyboard.component';

describe('SettingsKeyboardComponent', () => {
  let component: SettingsKeyboardComponent;
  let fixture: ComponentFixture<SettingsKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
