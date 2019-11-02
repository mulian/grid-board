import { Action } from '@ngrx/store';
import { Tab } from './tab.state'

export enum TabActionTypes {
  AddTabs = '[Tab] Add Tab',
  LoadTabs = '[Tab] Load Tabs',
  LoadTabsFinished = '[Tab] Load Tabs finished',
  RemoveTab = '[Tab] Remove Tab',
  ShowTab = '[Tab] Show Tab'
}

export class LoadTabs implements Action {
  readonly type:TabActionTypes = TabActionTypes.LoadTabs;
}

export class AddTabs implements Action {
  readonly type = TabActionTypes.AddTabs;

  constructor(public payload: {tab:Tab}) { }
}

export class RemoveTab implements Action {
  readonly type = TabActionTypes.RemoveTab;

  constructor(public payload: {tab:Tab}) { }
}

export class ShowTab implements Action {
  readonly type:TabActionTypes = TabActionTypes.ShowTab;

  constructor(public payload: {tab:Tab}) { }
}


export type TabActions = LoadTabs | AddTabs | RemoveTab | ShowTab;
