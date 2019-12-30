import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { KeyboardModel } from './keyboard.model';
import * as uuid from 'uuid';

/** The KeyboardActionTypes */
export enum KeyboardActionTypes {
  LoadKeyboards = '[Keyboard] Load Keyboards',
  AddKeyboard = '[Keyboard] Add Keyboard',
  UpsertKeyboard = '[Keyboard] Upsert Keyboard',
  AddKeyboards = '[Keyboard] Add Keyboards',
  UpsertKeyboards = '[Keyboard] Upsert Keyboards',
  UpdateKeyboard = '[Keyboard] Update Keyboard',
  UpdateKeyboards = '[Keyboard] Update Keyboards',
  DeleteKeyboard = '[Keyboard] Delete Keyboard',
  DeleteKeyboards = '[Keyboard] Delete Keyboards',
  ClearKeyboards = '[Keyboard] Clear Keyboards',
}

export class LoadKeyboards implements Action {
  readonly type = KeyboardActionTypes.LoadKeyboards;

  /**
   * Add more then one Keyboard
   * @param payload.keyboards the keyboards for add
   */
  constructor(public payload: { keyboards: KeyboardModel[] }) {}
}

export class AddPage implements Action {
  readonly type = KeyboardActionTypes.AddKeyboard;

  /**
   * Add one Page
   * @param payload.keyboard the page for add
   */
  constructor(public payload: { keyboard: KeyboardModel }) {
    // this.payload.keyboard.id = uuid.v4()
  }
}

export class UpsertPage implements Action {
  readonly type = KeyboardActionTypes.UpsertKeyboard;

  /**
   * Add or update a page
   * @param payload.keyboard the added or updated page
   */
  constructor(public payload: { keyboard: KeyboardModel }) {}
}

export class AddKeyboards implements Action {
  readonly type = KeyboardActionTypes.AddKeyboards;

  /**
   * Add Pages and set uuid
   * @param payload.keyboards the added pages
   */
  constructor(public payload: { keyboards: KeyboardModel[] }) {
    // for(let tab of this.payload.keyboards) {
    //   tab.id = uuid.v4()
    // }
  }
}

export class UpsertKeyboards implements Action {
  readonly type = KeyboardActionTypes.UpsertKeyboards;

  /**
   * Add or update Pages
   * @param payload.keyboards the add or update pages
   */
  constructor(public payload: { keyboards: KeyboardModel[] }) {}
}

export class UpdateKeyboard implements Action {
  readonly type = KeyboardActionTypes.UpdateKeyboard;

  /**
   * Update one Page
   * @param payload.keyboard the update page
   */
  constructor(public payload: { keyboard: Update<KeyboardModel> }) {}
}

export class UpdateKeyboards implements Action {
  readonly type = KeyboardActionTypes.UpdateKeyboards;

  /**
   * Update pages
   * @param payload.keyboards the updated pages
   */
  constructor(public payload: { keyboards: Update<KeyboardModel>[] }) {}
}

export class DeleteKeyboard implements Action {
  readonly type = KeyboardActionTypes.DeleteKeyboard;

  /**
   * Delete page
   * @param payload.id delete the page with id
   */
  constructor(public payload: { id: string }) {}
}

export class DeleteKeyboards implements Action {
  readonly type = KeyboardActionTypes.DeleteKeyboards;

  /**
   * Delete pages
   * @param payload.ids delete the pages with ids
   */
  constructor(public payload: { ids: string[] }) {}
}

/**
 * Clear all Pages
 */
export class ClearKeyboards implements Action {
  readonly type = KeyboardActionTypes.ClearKeyboards;
}

/** The PageActions for reducer */
export type PageActions =
 LoadKeyboards
 | AddPage
 | UpsertPage
 | AddKeyboards
 | UpsertKeyboards
 | UpdateKeyboard
 | UpdateKeyboards
 | DeleteKeyboard
 | DeleteKeyboards
 | ClearKeyboards;
