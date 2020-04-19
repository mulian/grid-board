import * as fromSlide from './slide.actions';

describe('loadSlides', () => {
  it('should return an action', () => {
    expect(fromSlide.loadSlides().type).toBe('[Slide] Load Slides');
  });
});
