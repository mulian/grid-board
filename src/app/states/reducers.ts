import { ActionReducerMap, createFeatureSelector, MetaReducer, ActionReducer } from '@ngrx/store';

import { createSelector } from 'reselect'
import { TabState, tabInitialState, tabReducer, tabSelectedAll, tabSelectedIds, tabSelectedEntities } from './tab';
import { PageState, pageInitialState, pageReducer, pageSelectedAll, pageSelectedEntities } from './page';

export interface AppState {
  tabs: TabState;
  pages: PageState;
}

export const initialState: AppState = {
  tabs: tabInitialState,
  pages: pageInitialState
}

export const reducers: ActionReducerMap<AppState> = {
  tabs: tabReducer,
  pages: pageReducer,
}

//Page select
export const selectAllPagesState =
  createFeatureSelector<PageState>("pages");
export const selectPagesOptions = createSelector(selectAllPagesState, (pages) => pages.options)
export const selectPagesById = (pageId) => createSelector(selectAllPagesState, (pages) => pages.entities[pageId])
export const selectAllPages = createSelector(
  selectAllPagesState,
  pageSelectedAll
)
export const selectAllPagesEntitities = createSelector(
  selectAllPagesState,
  pageSelectedEntities
)

// export const selectAllPagges = createSelector(
//   pageStore.selectAll, (state) => state
//  )
export const selectUserEntities = createSelector(
  selectAllPagesState,
  pageSelectedAll
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

export const selectTabSlide = createSelector(selectAllTabsState, (tabs) => tabs.slide)

export const selectAllTabsEntities = createSelector(
  selectAllTabsState,
  tabSelectedEntities
)
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