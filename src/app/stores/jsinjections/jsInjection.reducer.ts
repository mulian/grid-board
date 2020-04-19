import { JSInjectionActions, JSInjectionActionTypes } from './jsInjection.actions';
import { JSInjectionState } from './jsInjection.state'
import { jSInjectionAdapter } from './jsInjection.adapter';
import { jSInjectionInitialState } from './jsInjection.initial.state';

/** The Page reducer */
export function jSInjectionReducer(
  state = jSInjectionInitialState,
  action: JSInjectionActions
): JSInjectionState {
  switch (action.type) {
    case JSInjectionActionTypes.AddJSInjection: {
      return jSInjectionAdapter.addOne(action.payload.jSInjection, state);
    }
    case JSInjectionActionTypes.UpsertJSInjection: { 
      return jSInjectionAdapter.upsertOne(action.payload.jSInjection, state);
    }

    case JSInjectionActionTypes.AddJSInjections: {
      return jSInjectionAdapter.addMany(action.payload.jSInjections, state);
    }

    case JSInjectionActionTypes.UpsertJSInjections: {
      return jSInjectionAdapter.upsertMany(action.payload.jSInjections, state);
    }

    case JSInjectionActionTypes.UpdateJSInjection: {
      return jSInjectionAdapter.updateOne(action.payload.jSInjection, state);
    }

    case JSInjectionActionTypes.UpdateJSInjections: {
      return jSInjectionAdapter.updateMany(action.payload.jSInjections, state);
    }

    case JSInjectionActionTypes.DeleteJSInjection: {
      return jSInjectionAdapter.removeOne(action.payload.id, state);
    }

    case JSInjectionActionTypes.DeleteJSInjections: {
      return jSInjectionAdapter.removeMany(action.payload.ids, state);
    }

    case JSInjectionActionTypes.LoadJSInjections: {
      return jSInjectionAdapter.addAll(action.payload.jSInjections, state);
    }

    case JSInjectionActionTypes.ClearJSInjections: {
      return jSInjectionAdapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}