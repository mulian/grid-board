import * as fromSlide from './slide.reducer';
import { selectSlideState } from './slide.selectors';

describe('Slide Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSlideState({
      [fromSlide.slideFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
