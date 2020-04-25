import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TabEffects } from './tab.effects';

describe('TabEffects', () => {
  let actions$: Observable<any>;
  let effects: TabEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TabEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<TabEffects>(TabEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
