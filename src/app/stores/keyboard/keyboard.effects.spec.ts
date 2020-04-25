import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { KeyboardEffects } from './keyboard.effects';

describe('KeyboardEffects', () => {
  let actions$: Observable<any>;
  let effects: KeyboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KeyboardEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<KeyboardEffects>(KeyboardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
