import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Tab } from './tab.model';
import * as uuid from 'uuid';

export enum TabActionTypes {
  LoadTabs = '[Tab] Load Tabs',
  AddTab = '[Tab] Add Tab',
  UpsertTab = '[Tab] Upsert Tab',
  AddTabs = '[Tab] Add Tabs',
  UpsertTabs = '[Tab] Upsert Tabs',
  UpdateTab = '[Tab] Update Tab',
  UpdateTabs = '[Tab] Update Tabs',
  DeleteTab = '[Tab] Delete Tab',
  DeleteTabs = '[Tab] Delete Tabs',
  ClearTabs = '[Tab] Clear Tabs',

  SelectTab = '[Tab] Select Tab',
  RenameTab = '[Tab] Rename Tab',
  EditTab = "[Tab] Edit Tab",
  NoEditTab = "[Tab] No Edit Tab",
  SortTab = "[Tab] Sort Tab"
}

export class SortTab implements Action {
  readonly type = TabActionTypes.SortTab

  constructor(public payload: {sourceIndex: number, targetIndex:number}) {}
}

export class EditTab implements Action {
  readonly type = TabActionTypes.EditTab

  constructor(public payload: {tabId: string}) {}
}

export class SelectTab implements Action {
  readonly type = TabActionTypes.SelectTab

  constructor(public payload: {tabId: string}) {}
}

export class LoadTabs implements Action {
  readonly type = TabActionTypes.LoadTabs;

  constructor(public payload: { tabs: Tab[] }) {}
}

export class AddTab implements Action {
  readonly type = TabActionTypes.AddTab;

  constructor(public payload: { tab: Tab}) {
    this.payload.tab.id = uuid.v4()
  }
}

export class UpsertTab implements Action {
  readonly type = TabActionTypes.UpsertTab;

  constructor(public payload: { tab: Tab }) {}
}

export class AddTabs implements Action {
  readonly type = TabActionTypes.AddTabs;

  constructor(public payload: { tabs: Tab[] }) {
    for(let tab of this.payload.tabs) {
      tab.id = uuid.v4()
    }
  }
}

export class UpsertTabs implements Action {
  readonly type = TabActionTypes.UpsertTabs;

  constructor(public payload: { tabs: Tab[] }) {}
}

export class UpdateTab implements Action {
  readonly type = TabActionTypes.UpdateTab;

  constructor(public payload: { tab: Update<Tab> }) {}
}

export class UpdateTabs implements Action {
  readonly type = TabActionTypes.UpdateTabs;

  constructor(public payload: { tabs: Update<Tab>[] }) {}
}

export class DeleteTab implements Action {
  readonly type = TabActionTypes.DeleteTab;

  constructor(public payload: { id: string }) {}
}

export class DeleteTabs implements Action {
  readonly type = TabActionTypes.DeleteTabs;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTabs implements Action {
  readonly type = TabActionTypes.ClearTabs;
}

export type TabActions =
 LoadTabs
 | AddTab
 | UpsertTab
 | AddTabs
 | UpsertTabs
 | UpdateTab
 | UpdateTabs
 | DeleteTab
 | DeleteTabs
 | ClearTabs
 | SelectTab
 | EditTab
 | SortTab;