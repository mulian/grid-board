import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { KeyboardModel } from './keyboard.model';

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

export class AddKeyboard implements Action {
  readonly type = KeyboardActionTypes.AddKeyboard;

  /**
   * Add one Keyboard
   * @param payload.keyboard the Keyboard for add
   */
  constructor(public payload: { keyboard: KeyboardModel }) {
    // this.payload.keyboard.id = uuid.v4()
  }
}

export class UpsertKeyboard implements Action {
  readonly type = KeyboardActionTypes.UpsertKeyboard;

  /**
   * Add or update a Keyboard
   * @param payload.keyboard the added or updated Keyboard
   */
  constructor(public payload: { keyboard: KeyboardModel }) {}
}

export class AddKeyboards implements Action {
  readonly type = KeyboardActionTypes.AddKeyboards;

  /**
   * Add Keyboards and set uuid
   * @param payload.keyboards the added Keyboards
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
   * Add or update Keyboards
   * @param payload.keyboards the add or update Keyboards
   */
  constructor(public payload: { keyboards: KeyboardModel[] }) {}
}

export class UpdateKeyboard implements Action {
  readonly type = KeyboardActionTypes.UpdateKeyboard;

  /**
   * Update one Keyboard
   * @param payload.keyboard the update Keyboard
   */
  constructor(public payload: { keyboard: Update<KeyboardModel> }) {}
}

export class UpdateKeyboards implements Action {
  readonly type = KeyboardActionTypes.UpdateKeyboards;

  /**
   * Update Keyboards
   * @param payload.keyboards the updated Keyboards
   */
  constructor(public payload: { keyboards: Update<KeyboardModel>[] }) {}
}

export class DeleteKeyboard implements Action {
  readonly type = KeyboardActionTypes.DeleteKeyboard;

  /**
   * Delete Keyboard
   * @param payload.id delete the Keyboard with id
   */
  constructor(public payload: { id: string }) {}
}

export class DeleteKeyboards implements Action {
  readonly type = KeyboardActionTypes.DeleteKeyboards;

  /**
   * Delete Keyboards
   * @param payload.ids delete the Keyboards with ids
   */
  constructor(public payload: { ids: string[] }) {}
}

/**
 * Clear all Keyboards
 */
export class ClearKeyboards implements Action {
  readonly type = KeyboardActionTypes.ClearKeyboards;
}

/** The KeyboardActions for reducer */
export type KeyboardActions =
 LoadKeyboards
 | AddKeyboard
 | UpsertKeyboard
 | AddKeyboards
 | UpsertKeyboards
 | UpdateKeyboard
 | UpdateKeyboards
 | DeleteKeyboard
 | DeleteKeyboards
 | ClearKeyboards;
