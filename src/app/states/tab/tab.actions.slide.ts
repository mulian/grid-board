/**
 * Tab Action Types
 */
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Tab } from './tab.model';

export enum TabSlideActionTypes {
  TriggerSlides = '[Tab.Slide] Trigger slide enable/disable',
  TriggerBarSlides = '[Tab.Slide] Trigger slide bar enable/disable',
  SetNextSlideTime = '[Tab.Slide] Set next slide time',
  SetStartAfterInactiveTime = '[Tab.Slide] Set start after inactive time',
  TriggerSlideBreak = '[Tab.Slide] Trigger slide break enable/disable',
}
export class TriggerSlideBreak implements Action {
  readonly type = TabSlideActionTypes.TriggerSlideBreak;

  constructor(public payload:{isBreak:boolean}) {}
}

export class SetStartAfterInactiveTime implements Action {
  readonly type = TabSlideActionTypes.SetStartAfterInactiveTime;

  constructor(public payload:{timeInSec:number}) {}
}

export class SetNextSlideTime implements Action {
  readonly type = TabSlideActionTypes.SetNextSlideTime;

  constructor(public payload:{timeInSec:number}) {}
}

export class TriggerBarSlides implements Action {
  readonly type = TabSlideActionTypes.TriggerBarSlides;

  constructor(public payload:{activate:boolean}) {}
}

export class TriggerSlides implements Action {
  readonly type = TabSlideActionTypes.TriggerSlides;

  constructor(public payload:{activate:boolean}) {}
}

export type TabSlideActions = 
TriggerSlides
| TriggerBarSlides
| SetNextSlideTime
| SetStartAfterInactiveTime
| TriggerSlideBreak