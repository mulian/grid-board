import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideProgressComponent } from './slide-progress.component';

describe('SlideProgressComponent', () => {
  let component: SlideProgressComponent;
  let fixture: ComponentFixture<SlideProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
