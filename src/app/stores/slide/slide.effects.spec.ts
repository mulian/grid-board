import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SlideEffects } from './slide.effects';

describe('SlideEffects', () => {
  let actions$: Observable<any>;
  let effects: SlideEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SlideEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<SlideEffects>(SlideEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
