import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsJsinjectionsComponent } from './settings-jsinjections.component';

describe('SettingsJsinjectionsComponent', () => {
  let component: SettingsJsinjectionsComponent;
  let fixture: ComponentFixture<SettingsJsinjectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsJsinjectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsJsinjectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
