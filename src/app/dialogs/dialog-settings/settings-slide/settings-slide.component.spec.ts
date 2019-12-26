import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSlideComponent } from './settings-slide.component';

describe('SettingsSlideComponent', () => {
  let component: SettingsSlideComponent;
  let fixture: ComponentFixture<SettingsSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
