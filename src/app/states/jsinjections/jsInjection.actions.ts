import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { JSInjectionModel } from './jsInjection.model';
import * as uuid from 'uuid';

/** The JSInjectionActionTypes */
export enum JSInjectionActionTypes {
  LoadJSInjections = '[JSInjection] Load JSInjections',
  AddJSInjection = '[JSInjection] Add JSInjection',
  UpsertJSInjection = '[JSInjection] Upsert JSInjection',
  AddJSInjections = '[JSInjection] Add JSInjections',
  UpsertJSInjections = '[JSInjection] Upsert JSInjections',
  UpdateJSInjection = '[JSInjection] Update JSInjection',
  UpdateJSInjections = '[JSInjection] Update JSInjections',
  DeleteJSInjection = '[JSInjection] Delete JSInjection',
  DeleteJSInjections = '[JSInjection] Delete JSInjections',
  ClearJSInjections = '[JSInjection] Clear JSInjections',
}

export class LoadJSInjections implements Action {
  readonly type = JSInjectionActionTypes.LoadJSInjections;

  /**
   * Add more then one JSInjection
   * @param payload.jSInjections the jSInjections for add
   */
  constructor(public payload: { jSInjections: JSInjectionModel[] }) {}
}

export class AddJSInjection implements Action {
  readonly type = JSInjectionActionTypes.AddJSInjection;

  /**
   * Add one JSInjection
   * @param payload.jSInjection the JSInjection for add
   */
  constructor(public payload: { jSInjection: JSInjectionModel }) {
    this.payload.jSInjection.id = uuid.v4()
  }
}

export class UpsertJSInjection implements Action {
  readonly type = JSInjectionActionTypes.UpsertJSInjection;

  /**
   * Add or update a JSInjection
   * @param payload.jSInjection the added or updated JSInjection
   */
  constructor(public payload: { jSInjection: JSInjectionModel }) {}
}

export class AddJSInjections implements Action {
  readonly type = JSInjectionActionTypes.AddJSInjections;

  /**
   * Add JSInjections and set uuid
   * @param payload.jSInjections the added JSInjections
   */
  constructor(public payload: { jSInjections: JSInjectionModel[] }) {
    for(let tab of this.payload.jSInjections) {
      tab.id = uuid.v4()
    }
  }
}

export class UpsertJSInjections implements Action {
  readonly type = JSInjectionActionTypes.UpsertJSInjections;

  /**
   * Add or update JSInjections
   * @param payload.jSInjections the add or update JSInjections
   */
  constructor(public payload: { jSInjections: JSInjectionModel[] }) {}
}

export class UpdateJSInjection implements Action {
  readonly type = JSInjectionActionTypes.UpdateJSInjection;

  /**
   * Update one JSInjection
   * @param payload.jSInjection the update JSInjection
   */
  constructor(public payload: { jSInjection: Update<JSInjectionModel> }) {}
}

export class UpdateJSInjections implements Action {
  readonly type = JSInjectionActionTypes.UpdateJSInjections;

  /**
   * Update JSInjections
   * @param payload.jSInjections the updated JSInjections
   */
  constructor(public payload: { jSInjections: Update<JSInjectionModel>[] }) {}
}

export class DeleteJSInjection implements Action {
  readonly type = JSInjectionActionTypes.DeleteJSInjection;

  /**
   * Delete JSInjection
   * @param payload.id delete the JSInjection with id
   */
  constructor(public payload: { id: string }) {}
}

export class DeleteJSInjections implements Action {
  readonly type = JSInjectionActionTypes.DeleteJSInjections;

  /**
   * Delete JSInjections
   * @param payload.ids delete the JSInjections with ids
   */
  constructor(public payload: { ids: string[] }) {}
}

/**
 * Clear all JSInjections
 */
export class ClearJSInjections implements Action {
  readonly type = JSInjectionActionTypes.ClearJSInjections;
}

/** The JSInjectionActions for reducer */
export type JSInjectionActions =
 LoadJSInjections
 | AddJSInjection
 | UpsertJSInjection
 | AddJSInjections
 | UpsertJSInjections
 | UpdateJSInjection
 | UpdateJSInjections
 | DeleteJSInjection
 | DeleteJSInjections
 | ClearJSInjections;
