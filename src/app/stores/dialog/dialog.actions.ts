import { Action } from '@ngrx/store';
import { SettingsTab } from './dialog.model';

/**
 * ActionTypes for Dialog on/off/settings
 */
export enum DialogActionTypes {
  ShowDialog = '[Dialog] Show Dialog',
  CloseDialog = "[Dialog] Close Dialog",
  ToggleDialog = "[Dialog] Toggle Dialog",

  SelectSettingsTab = "[Dialog] Select Settings Tab"
}

/**
 * The current Dialog Types
 */
export enum DialogType {
    SETTINGS, HELP
}

export class ToggleDialog implements Action {
  readonly type = DialogActionTypes.ToggleDialog;

  /**
   * Show Dialog
   * @param payload.dialog the dialog how will be displayed
   */
  constructor(public payload: { dialog: DialogType }) {}
}

export class SelectSettingsTab implements Action {
  readonly type = DialogActionTypes.SelectSettingsTab;
  /**
   * To set current SettingsTab
   * @param payload.tab the settings tab
   */
  constructor(public payload: { tab: SettingsTab }) {}
}

export class ShowDialog implements Action {
  readonly type = DialogActionTypes.ShowDialog;

  /**
   * Show Dialog
   * @param payload.dialog the dialog how will be displayed
   */
  constructor(public payload: { dialog: DialogType }) {}
}
export class CloseDialog implements Action {
    readonly type = DialogActionTypes.CloseDialog;
    
    /**
     * Close Dialog
     * @param payload.dialog the dialog how will be closed
     */
    constructor(public payload: { dialog: DialogType }) {}
  }

/** The Dialog Actions for reducer */
export type DialogActions =
   ShowDialog
 | CloseDialog
 | ToggleDialog
 | SelectSettingsTab;
