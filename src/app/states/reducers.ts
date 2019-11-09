import { ActionReducerMap, createSelector, createFeatureSelector, MetaReducer, ActionReducer } from '@ngrx/store';
import * as tabStore from './tab';
import * as pageStore from './page';

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

export const selectAllTabsState =
  createFeatureSelector<tabStore.State>("tabs");
export const selectTabOptions = createSelector(selectAllTabsState, (tabs) => tabs.options)

export const selectAllTabs = createSelector(
  selectAllTabsState,
  tabStore.selectAll
)

export const selectAllPagesFromTab = createSelector(pageStore.selectAll, (state, { tabId }) => {
  return state.filter(page => page.tab == tabId)
})