import { reducer, initialTabState } from './tab.reducer';

describe('Tab Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialTabState, action);

      expect(result).toBe(initialTabState);
    });
  });
});
