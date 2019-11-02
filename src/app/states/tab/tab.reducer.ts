import { Action, State } from '@ngrx/store';
import { ShowTab, TabActions, TabActionTypes, AddTabs, ShowTabEnum, AddPage, LoadPageFinished } from './tab.actions';
import { TabState, initTab } from './tab.state'


export const tabFeatureKey = 'tab';

export const initialTabState: TabState = {
  show: 0,
  list: [initTab]
};

export function reducer(state = initialTabState, action: TabActions): TabState {
  switch (action.type) {
    case TabActionTypes.ShowTab: 
      let showTabAction:ShowTab = action as ShowTab;
      if(showTabAction.payload.showTabEnum) {
        switch(showTabAction.payload.showTabEnum) {
          case ShowTabEnum.LastTab: showTabAction.payload.showTabId=state.list.length-1
            break;
        }
      }
      return {...state, show: showTabAction.payload.showTabId};
    case TabActionTypes.AddTabs:
      let addTabAction:AddTabs = action as AddTabs;
      state.list.push(addTabAction.payload.tab)
      return state;
    case TabActionTypes.AddPage:
      let addPageAction:AddPage = action as AddPage;
      // state.list[addPageAction.payload.tabIndex].pages.push({url: addPageAction.payload.url, name: addPageAction.payload.name})
      return state
    case TabActionTypes.LoadPageFinished:
        let loadPageFinishedAction:LoadPageFinished = action as LoadPageFinished;
        // state.list[state.show].pages[loadPageFinishedAction.payload.pageId].name = loadPageFinishedAction.payload.title
    default:
      return state;
  }
}
