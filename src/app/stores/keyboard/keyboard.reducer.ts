import { KeyboardActions, KeyboardActionTypes } from './keyboard.actions';
import { KeyboardState } from './keyboard.state'
import { keyboardAdapter } from './keyboard.adapter';
import { keyboardInitialState } from './keyboard.initial.state';

/** The Page reducer */
export function keyboardReducer(
  state = keyboardInitialState,
  action: KeyboardActions
): KeyboardState {
  switch (action.type) {
    case KeyboardActionTypes.AddKeyboard: { //Add Page
      return keyboardAdapter.addOne(action.payload.keyboard, state);
    }
    case KeyboardActionTypes.UpsertKeyboard: { 
      return keyboardAdapter.upsertOne(action.payload.keyboard, state);
    }

    case KeyboardActionTypes.AddKeyboards: {
      return keyboardAdapter.addMany(action.payload.keyboards, state);
    }

    case KeyboardActionTypes.UpsertKeyboards: {
      return keyboardAdapter.upsertMany(action.payload.keyboards, state);
    }

    case KeyboardActionTypes.UpdateKeyboard: {
      //TODO: Check, get current page check if x,y or tab ref. was changed and check
      return keyboardAdapter.updateOne(action.payload.keyboard, state);
    }

    case KeyboardActionTypes.UpdateKeyboards: {
      //TODO: Check, get current page check if x,y or tab ref. was changed and check multiple
      return keyboardAdapter.updateMany(action.payload.keyboards, state);
    }

    case KeyboardActionTypes.DeleteKeyboard: {
      return keyboardAdapter.removeOne(action.payload.id, state);
    }

    case KeyboardActionTypes.DeleteKeyboards: {
      return keyboardAdapter.removeMany(action.payload.ids, state);
    }

    case KeyboardActionTypes.LoadKeyboards: {
      return keyboardAdapter.addAll(action.payload.keyboards, state);
    }

    case KeyboardActionTypes.ClearKeyboards: {
      return keyboardAdapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}