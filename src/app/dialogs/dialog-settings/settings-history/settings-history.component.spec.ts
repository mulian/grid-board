import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHistoryComponent } from './settings-history.component';

describe('SettingsHistoryComponent', () => {
  let component: SettingsHistoryComponent;
  let fixture: ComponentFixture<SettingsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
