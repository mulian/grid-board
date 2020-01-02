/**
 * Tab Action Types
 */
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TabModel } from './tab.model';
import * as uuid from 'uuid';
import { TriggerSlides, TriggerBarSlides, SetNextSlideTime, SetStartAfterInactiveTime, TriggerSlideBreak } from './tab.actions.slide'

/** The ActionTypes for Tab */
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
  SortTab = "[Tab] Sort Tab",

  NavigateSelectTab = "[Tab] Navigate select Tab"
}

export class SortTab implements Action {
  readonly type = TabActionTypes.SortTab

  /**
   * Replacement strategie like normal Browser.
   * Move Tab to another target tab will replace the sort order from moved tab to target tab.
   * And the Target Tab till moved (source) Tab will be moved right if source is left from target or left if source is right from target.
   * @param payload.sourceIndex - the source tab / the tab how is moved
   * @param payload.targetIndex - the target tab / the moved tab will replace the source tab
   */
  constructor(public payload: { sourceIndex: number, targetIndex: number }) {
    if (payload.sourceIndex == null || payload.targetIndex == null) {
      console.error("The source-/target-index have to be not null");
    }
  }
}

export class RenameTab implements Action {
  readonly type = TabActionTypes.RenameTab

  /**
   * Rename the Tab with new Name
   * There could be only one tab in edit mode.
   * @param payload.tabId - if null use current selected Tab, else edit tabId
   * @param payload.newName - new name string
   */
  constructor(public payload: { tabId: string, newName: string }) { }
}

export class EditTab implements Action {
  readonly type = TabActionTypes.EditTab

  /**
   * Set the given tabId to edit tab.
   * There could be only one tab in edit mode.
   * @param payload.tabId - if null use current selected Tab, else edit tabId
   */
  constructor(public payload: { tabId: string }) { }
}

export enum NavigationSelectTabType {
  Left = "Select Tab left from current selected Tab",
  Right = "Select Tab right from current selected Tab",
  First = "Select first Tab from all Tabs",
  Last = "Select last Tab from all Tabs",
  BySortNumber = "Select tab with sort Number",

  TabRotationRight = "Select Tab right from current, if there is no next select first tab",
  TabRotationLeft = "Select Tab left from current, if there is no next select last tab"
}
export class NavigateSelectTab implements Action {
  readonly type = TabActionTypes.NavigateSelectTab

  /**
   * Navigate between tabs.
   * @param payload.navigationType - Set the Navigation type
   * @param payload.sortOrder - Have to set if navigationType is BySortNumber, the given sortOrder number will be selected
   */
  constructor(public payload: { navigationType: NavigationSelectTabType, sortOrder?: number, exceptSlideNotConsidered: boolean }) { }
}

export class SelectTab implements Action {
  readonly type = TabActionTypes.SelectTab

  /**
   * Select a Tab directly
   * @param payload.tabId - The Selected tabId
   */
  constructor(public payload: { tabId?: string }) { }
}

export class AddTab implements Action {
  readonly type = TabActionTypes.AddTab;

  /**
   * Add Tab and also set Edit same tab
   * @param payload.tab - The tab how will be added
   * @param payload.tab.id - Will be override with new uuid.v4
   * @param payload.tab.name - If null use default name, else use given name 
   * @param payload.tab.sortNumber if null it will be automaticly set
   */
  constructor(public payload: { tab: TabModel }) {
    this.payload.tab.id = uuid.v4()
  }
}

export class UpdateTab implements Action {
  readonly type = TabActionTypes.UpdateTab;

  constructor(public payload: { tab: Update<TabModel> }) { }
}

export class UpdateTabs implements Action {
  readonly type = TabActionTypes.UpdateTabs;

  constructor(public payload: { tabs: Update<TabModel>[] }) { }
}

export class DeleteTab implements Action {
  readonly type = TabActionTypes.DeleteTab;

  /**
   * Delte a tab
   * @param payload if null use current selected tab id
   */
  constructor(public payload: { id: string }) { }
}

export class DeleteTabs implements Action {
  readonly type = TabActionTypes.DeleteTabs;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearTabs implements Action {
  readonly type = TabActionTypes.ClearTabs;
}

export type TabActions =
  AddTab
  | UpdateTab
  | UpdateTabs
  | DeleteTab
  | DeleteTabs
  | ClearTabs
  | SelectTab
  | EditTab
  | SortTab
  | NavigateSelectTab
  | RenameTab
  | TriggerSlides
  | TriggerBarSlides
  | SetNextSlideTime
  | SetStartAfterInactiveTime
  | TriggerSlideBreak;