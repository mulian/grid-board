import { Action } from '@ngrx/store';
import { Tab } from './tab.state'

export enum TabActionTypes {
  AddTabs = '[Tab] Add Tab',
  LoadTabs = '[Tab] Load Tabs',
  LoadTabsFinished = '[Tab] Load Tabs finished',
  RemoveTab = '[Tab] Remove Tab',
  ShowTab = '[Tab] Show Tab',

  AddPage = '[Tab.Page] Add Page',
  LoadPageFinished = '[Tab.Page] Finish Page Load'
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

export enum ShowTabEnum {
  LastTab = "Show Last Tab"
}

export class ShowTab implements Action {
  readonly type:TabActionTypes = TabActionTypes.ShowTab;

  constructor(public payload: { showTabEnum?: ShowTabEnum, showTabId?: number}) { }
}

export class AddPage implements Action {
  readonly type:TabActionTypes = TabActionTypes.AddPage;

  constructor(public payload: { tabIndex: number, url:string, name?:string }) { }
}
export class LoadPageFinished implements Action {
  readonly type:TabActionTypes = TabActionTypes.LoadPageFinished;

  constructor(public payload: { title:string, pageId:number }) { }
}


export type TabActions = LoadTabs | AddTabs | RemoveTab | ShowTab;
