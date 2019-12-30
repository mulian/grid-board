/**
 * Tab Action Types
 */
import { Action } from '@ngrx/store';
import { AppState } from './reducers';

export enum ReducerStoreActionTypes {
  SetState = '[Reducer.Store] Set state',
}
export class SetState implements Action {
  readonly type = ReducerStoreActionTypes.SetState;

  constructor(public payload:{state:AppState}) {}
}

export type ReducerStoreActions = SetState