import { Action } from '@ngrx/store';
import { ShowTab, TabActions, TabActionTypes, AddTabs } from './tab.actions';
import { TabState, initTab } from './tab.state'


export const tabFeatureKey = 'tab';

export const initialTabState: TabState = {
  show: initTab,
  list: [initTab]
};

export function reducer(state = initialTabState, action: TabActions): TabState {
  switch (action.type) {
    case TabActionTypes.ShowTab: 
      let showTabAction:ShowTab = action as ShowTab;
      return {...state, show: showTabAction.payload.tab};
    case TabActionTypes.AddTabs:
      let addTabAction:AddTabs = action as AddTabs;
      state.list.push(addTabAction.payload.tab)
      return state;
    default:
      return state;
  }
}
