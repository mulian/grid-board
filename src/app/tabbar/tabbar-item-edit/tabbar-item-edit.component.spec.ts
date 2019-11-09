import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbarItemEditComponent } from './tabbar-item-edit.component';

describe('TabbarItemEditComponent', () => {
  let component: TabbarItemEditComponent;
  let fixture: ComponentFixture<TabbarItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbarItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbarItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
