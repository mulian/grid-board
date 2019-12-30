import { Action } from '@ngrx/store';

/** The ActionTypes for General */
export enum GeneralActionTypes {
  ChangeLanguage = "[General] Change Language",
  ChangeHistoryLimit = "[General] Change History Limit"
}

export class ChangeHistoryLimit implements Action {
  readonly type = GeneralActionTypes.ChangeHistoryLimit;

  /**
   * Change The History Limit for States in LocalStorage
   * @param payload.historyLimit the new historyLimit
   */
  constructor(public payload: { historyLimit: number }) {}
}

export class ChangeLanguage implements Action {
    readonly type = GeneralActionTypes.ChangeLanguage;
  
    /**
     * Set the Language.
     * @param payload.lang set the new Language as string (see assets/i18n/xx.json)
     */
    constructor(public payload: { lang: string }) {}
  }

/** Get GeneralActions for reducer */
export type GeneralActions =
 ChangeLanguage
 | ChangeHistoryLimit
