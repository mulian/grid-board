/**
 * Tab Action Types
 */
import { Action, createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { TabModel } from "./tab.model";
import * as uuid from "uuid";
import {
  TriggerSlides,
  TriggerBarSlides,
  SetNextSlideTime,
  SetStartAfterInactiveTime,
  TriggerSlideBreak
} from "./tab.actions.slide";

/** The ActionTypes for Tab */
export enum TabActionTypes {
  LoadTabs = "[Tab] Load Tabs",
  AddTab = "[Tab] Add Tab", //
  UpsertTab = "[Tab] Upsert Tab",
  AddTabs = "[Tab] Add Tabs",
  UpsertTabs = "[Tab] Upsert Tabs",
  UpdateTab = "[Tab] Update Tab",
  UpdateTabs = "[Tab] Update Tabs",
  DeleteTab = "[Tab] Delete Tab",
  DeleteTabs = "[Tab] Delete Tabs",
  ClearTabs = "[Tab] Clear Tabs",

  SelectTab = "[Tab] Select Tab", //done
  RenameTab = "[Tab] Rename Tab", //
  EditTab = "[Tab] Edit Tab", //
  SortTab = "[Tab] Sort Tab", //

  NavigateSelectTab = "[Tab] Navigate select Tab" //
}

export const clearTabs = createAction("[Tab] Clear all Tabs");

export const updateTab = createAction(
  "[Tab] Update Tab",
  props<{ updateTab: Update<TabModel> }>()
);

export const deleteTab = createAction(
  "[Tab] Delete Tab",
  props<{ tabId: string }>()
);

export enum NavigationSelectTabType {
  Left = "Select Tab left from current selected Tab",
  Right = "Select Tab right from current selected Tab",
  First = "Select first Tab from all Tabs",
  Last = "Select last Tab from all Tabs",
  BySortNumber = "Select tab with sort Number",

  TabRotationRight = "Select Tab right from current, if there is no next select first tab",
  TabRotationLeft = "Select Tab left from current, if there is no next select last tab"
}

/**
 * Navigate between tabs.
 * @param payload.navigationType - Set the Navigation type
 * @param payload.sortOrder - Have to set if navigationType is BySortNumber, the given sortOrder number will be selected
 */
export const navigateSelectTab = createAction(
  "[Tab] Navigate select Tab",
  props<{
    navigationType: NavigationSelectTabType;
    sortOrder?: number;
    exceptSlideNotConsidered: boolean;
  }>()
);

/**
 * Add Tab and also set Edit same tab
 * @param payload.tab - The tab how will be added
 * @param payload.tab.id - Will be override with new uuid.v4
 * @param payload.tab.name - If null use default name, else use given name
 * @param payload.tab.sortNumber if null it will be automaticly set
 */
export const addTab = createAction("[Tab] Add Tab", (tab: TabModel): {
  tab: TabModel;
} => {
  if (tab.id == null) return { tab: { ...tab, id: uuid.v4() } };
  else return { tab };
});

/**
 * Replacement strategie like normal Browser.
 * Move Tab to another target tab will replace the sort order from moved tab to target tab.
 * And the Target Tab till moved (source) Tab will be moved right if source is left from target or left if source is right from target.
 * @param payload.sourceIndex - the source tab / the tab how is moved
 * @param payload.targetIndex - the target tab / the moved tab will replace the source tab
 */
export const sortTab = createAction(
  "[Tab] Sort Tab",
  props<{ sourceIndex: number; targetIndex: number }>()
);

/**
 * Select a Tab directly
 * @param payload.tabId - The Selected tabId
 */
export const selectTab = createAction(
  "[Tab] Select Tab",
  props<{ tabId: string }>()
);

/**
 * Rename the Tab with new Name
 * There could be only one tab in edit mode.
 * @param payload.tabId - if null use current selected Tab, else edit tabId
 * @param payload.newName - new name string
 */
export const renameTab = createAction(
  "[Tab] Rename Tab",
  props<{ tabId: string; newName: string }>()
);

export const editTab = createAction(
  "[Tab] Edit Tab",
  props<{ tabId: string }>()
);
