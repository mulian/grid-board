/**
 * Tab slide Action
 * Slide is a seperation of tab, cause it manipulates the Tab.
 */
import { Action } from '@ngrx/store';

/** The ActionTypes for TabSlide */
export enum TabSlideActionTypes {
  TriggerSlides = '[Tab.Slide] Trigger slide enable/disable',
  TriggerBarSlides = '[Tab.Slide] Trigger slide bar enable/disable',
  SetNextSlideTime = '[Tab.Slide] Set next slide time',
  SetStartAfterInactiveTime = '[Tab.Slide] Set start after inactive time',
  TriggerSlideBreak = '[Tab.Slide] Trigger slide break enable/disable',
}
export class TriggerSlideBreak implements Action {
  readonly type = TabSlideActionTypes.TriggerSlideBreak;
  /**
   * Set Slide mode aktive/deaktiv
   * @param payload.isBreak if true, break is set, if false slide mode is active
   */
  constructor(public payload:{isBreak:boolean}) {}
}

export class SetStartAfterInactiveTime implements Action {
  readonly type = TabSlideActionTypes.SetStartAfterInactiveTime;

  /**
   * Set the start after inactivity time in sec.
   * @param payload.timeInSec the start after inactivity time in sec.
   */
  constructor(public payload:{timeInSec:number}) {}
}

export class SetNextSlideTime implements Action {
  readonly type = TabSlideActionTypes.SetNextSlideTime;

    /**
   * Set the select next tab time in sec.
   * @param payload.timeInSec the next tab time in sec.
   */
  constructor(public payload:{timeInSec:number}) {}
}

export class TriggerBarSlides implements Action {
  readonly type = TabSlideActionTypes.TriggerBarSlides;

  /**
   * Show Slide bar
   * @param payload.activate if true, activate slide bar, if false deaktivate slide bar
   */
  constructor(public payload:{activate:boolean}) {}
}

export class TriggerSlides implements Action {
  readonly type = TabSlideActionTypes.TriggerSlides;

  /**
   * En-/disalbe slide mode
   * @param payload.activate if flase disable slide mode, if true enable slide mode
   */
  constructor(public payload:{activate:boolean}) {}
}