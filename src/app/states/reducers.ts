import { ActionReducerMap, createFeatureSelector, MetaReducer, ActionReducer } from '@ngrx/store';
import * as pageStore from './page';

import { createSelector } from 'reselect'
import { TabState, tabInitialState, tabReducer, tabSelectedAll, tabSelectedIds, tabSelectedEntities } from './tab';

export interface AppState {
  tabs: TabState;
  pages: pageStore.State;
}

export const initialState: AppState = {
  tabs: tabInitialState,
  pages: pageStore.initialState,
}

export const reducers: ActionReducerMap<AppState> = {
  tabs: tabReducer,
  pages: pageStore.reducer,
}

//Page select
export const selectAllPagesState =
  createFeatureSelector<pageStore.State>("pages");
export const selectPagesOptions = createSelector(selectAllPagesState, (pages) => pages.options)
export const selectPagesById = (pageId) => createSelector(selectAllPagesState, (pages) => pages.entities[pageId])
export const selectAllPages = createSelector(
  selectAllPagesState,
  pageStore.selectAll
)
export const selectAllPagesEntitities = createSelector(
  selectAllPagesState,
  pageStore.selectEntities
)

// export const selectAllPagges = createSelector(
//   pageStore.selectAll, (state) => state
//  )
export const selectUserEntities = createSelector(
  selectAllPagesState,
  pageStore.selectAll
);
// export const selectAllPagesFromTab = (tabId) => createSelector(
//   selectAllPagesState,
//   (state) => {
//     state.entities
//   }
// )

// export const selectAllPagesFromTab = (tabId) => createSelector(
//   selectAllPagesState,
//   pageStore.selectEntities,(state, pages) => {
//     pages
//   }
// )

//Tabs select
export const selectAllTabsState =
  createFeatureSelector<TabState>("tabs");
export const selectTabOptions = createSelector(selectAllTabsState, (tabs) => tabs.options)
export const selectTabOptionsSelectTab = createSelector(selectAllTabsState, (tabs) => tabs.options.selectedTab)
export const selectTabOptionsEditTab = createSelector(selectAllTabsState, (tabs) => tabs.options.editTab)

export const selectAllTabsEntitys = createSelector(
  selectAllTabsState,
  tabSelectedAll
)
export const selectAllTabs = createSelector(
  selectAllTabsState,
  tabSelectedAll
)

export const selectAllTabIds = createSelector(
  selectAllTabsState,
  tabSelectedIds
)