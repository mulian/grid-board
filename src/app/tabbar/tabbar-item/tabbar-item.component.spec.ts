import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbarItemComponent } from './tabbar-item.component';

describe('TabbarItemComponent', () => {
  let component: TabbarItemComponent;
  let fixture: ComponentFixture<TabbarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
