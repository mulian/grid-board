import { tabReducer } from "./tab.reducer.main";
import { tabInitialState } from "./tab.initial.state";

describe('Tab Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = tabReducer(tabInitialState, action);

      expect(result).toBe(tabInitialState);
    });
  });
});
