import { ActionReducerMap, createSelector, createFeatureSelector, MetaReducer, ActionReducer } from '@ngrx/store';
import * as tabStore from './tab';
import * as pageStore from './page';
import {pick} from 'lodash-es'

export interface AppState {
  tabs: tabStore.State;
  pages: pageStore.State;
}

export const initialState: AppState = {
  tabs: tabStore.initialState,
  pages: pageStore.initialState,
}

export const reducers: ActionReducerMap<AppState> = {
  tabs: tabStore.reducer,
  pages: pageStore.reducer,
}

//Page select
export const selectAllPagesState =
  createFeatureSelector<pageStore.State>("pages");
export const selectPagesOptions = createSelector(selectAllPagesState, (pages) => pages.options)
export const selectAllPages = createSelector(
  selectAllPagesState,
  pageStore.selectAll
)

// export const selectAllPagges = createSelector(
//   pageStore.selectAll, (state) => state
//  )
export const selectUserEntities = createSelector(
  selectAllPagesState,
  pageStore.selectAll
);
export const selectAllPagesFromTab = createSelector(
  selectUserEntities,
  (state, props) => {
    
    // console.log("selectAllPagesFromTab", props,state);
    // console.log(state.filter(page => page.tab == props.tabId));
    
    return state.filter(page => page.tab == props.tabId)
    // console.log(state.filter(page => page.tab == tabId));

    // return state.filter(page => page.tab == tabId)
  })

//Tabs select
export const selectAllTabsState =
  createFeatureSelector<tabStore.State>("tabs");
export const selectTabOptions = createSelector(selectAllTabsState, (tabs) => tabs.options)
export const selectTabOptionsSelectTab = createSelector(selectAllTabsState, (tabs) => tabs.options.selectedTab)
export const selectTabOptionsEditTab = createSelector(selectAllTabsState, (tabs) => tabs.options.editTab)

export const selectAllTabs = createSelector(
  selectAllTabsState,
  tabStore.selectAll
)