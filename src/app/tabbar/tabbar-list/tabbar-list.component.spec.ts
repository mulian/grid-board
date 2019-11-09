import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbarListComponent } from './tabbar-list.component';

describe('TabbarComponent', () => {
  let component: TabbarListComponent;
  let fixture: ComponentFixture<TabbarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
