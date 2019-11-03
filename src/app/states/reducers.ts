import { ActionReducerMap } from '@ngrx/store';
// Import everything from the banana state directory
import * as tabStore from './tab';

// We are bringing everything we know about the banana up to the 
// application level. If we were creating the "fruit salad" application, 
// we would also bring the state information for other fruits into 
// this app level state. Each fruit would be considered a "slice" of 
// the application level state.

export interface AppState {
  tab: tabStore.TabState;
}

export const initialState: AppState = {
  tab: tabStore.initialTabState
}

export const reducers: ActionReducerMap<AppState> = {
  tab: tabStore.reducer
}

// export const effects: Array<any> = [
//   bananaStore.BananaEffects
// ];

// Selector to get banana slice of state
export const getTab = (s: AppState) => {
  
  return s.tab;
}

export const getPagesFromCurrentTab = (s: AppState) => {
  console.log("Reload: getPagesFromCurrentTab");
  
  return s.tab.list[s.tab.show].pages;
}

export const getPagesByTabId = (s:AppState,{tabId}) => {
  console.log("Get Pages by Tab Id: "+tabId)
  
  return s.tab.list[tabId].pages
}

export const getCurrentTabPage = (s: AppState,params) => {
  console.log("params:", params);
  
  return s.tab.list[s.tab.show].pages[params.y][params.x];
}

export const getPagesByTabIdAndArrayIndexes = (s: AppState,{tabId,x,y}) => {
  
  return s.tab.list[tabId].pages[y][x];
}