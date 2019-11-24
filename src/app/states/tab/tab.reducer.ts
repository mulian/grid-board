import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Tab } from './tab.model';
import { TabActions, TabActionTypes } from './tab.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { mapValues } from 'lodash-es'

export const tabsFeatureKey = 'tabs';

export interface TabState extends EntityState<Tab> {
  options: {
    selectedTab: string
    editTab: string
  }
}

export const adapter: EntityAdapter<Tab> = createEntityAdapter<Tab>({
  selectId: (tab) => tab.id,
  sortComparer: (a: Tab, b: Tab) => {
    return a.sortNumber - b.sortNumber;
  }
});

export const tabInitialState: TabState = adapter.getInitialState({
  options: {
    selectedTab: "no_selection",
    editTab: null
  }
});

function findSortNumber(state, sortNumber: number) {
  for (let tabId in state.entities) {
    let tab = state.entities[tabId]
    if (tab.sortNumber == sortNumber) {
      return tab;
    }
  }
}
export function tabReducer(
  state = tabInitialState,
  action: TabActions
): TabState {
  switch (action.type) {
    case TabActionTypes.SortTab: {
      let updateTabs: Update<Tab>[] = []
      let tab: Tab = findSortNumber(state, action.payload.prevSortIndex)
      let replaceTab: Tab = findSortNumber(state, action.payload.toNewSortIndex)
      
      updateTabs.push({
        id: tab.id,
        changes: {
          sortNumber: replaceTab.sortNumber
        }
      })
      updateTabs.push({
        id: replaceTab.id,
        changes: {
          sortNumber: tab.sortNumber
        }
      })

      return adapter.updateMany(updateTabs, state);
    }
    case TabActionTypes.SelectTab: {
      return { ...state, options: { ...state.options, selectedTab: action.payload.tabId } }
    }
    case TabActionTypes.EditTab: {
      return { ...state, options: { ...state.options, editTab: action.payload.tabId } }
    }

    case TabActionTypes.AddTab: {
      return adapter.addOne(action.payload.tab, { ...state, options: { ...state.options, editTab: action.payload.tab.id, selectedTab: action.payload.tab.id } });
    }
    case TabActionTypes.UpsertTab: {
      return adapter.upsertOne(action.payload.tab, state);
    }
    case TabActionTypes.AddTabs: {
      return adapter.addMany(action.payload.tabs, state);
    }
    case TabActionTypes.UpsertTabs: {
      return adapter.upsertMany(action.payload.tabs, state);
    }
    case TabActionTypes.UpdateTab: {
      return adapter.updateOne(action.payload.tab, state);
    }
    case TabActionTypes.UpdateTabs: {
      return adapter.updateMany(action.payload.tabs, state);
    }
    case TabActionTypes.DeleteTab: {
      if (action.payload.id == state.options.selectedTab) { //is selectedTab the removed tab?
        if (state.ids.length > 1) { //if there is more then one tab (bevore remove)
          let firstTabId: string = state.ids[0].toString();
          return adapter.removeOne(action.payload.id, { ...state, options: { ...state.options, selectedTab: firstTabId } });
        } else { //There are more then one tabs left, set selectedTab to first entry
          return adapter.removeOne(action.payload.id, { ...state, options: { ...state.options, selectedTab: null } });
        }
      } else { //selectedTab is not removed tab
        return adapter.removeOne(action.payload.id, state);
      }
    }
    case TabActionTypes.DeleteTabs: {
      return adapter.removeMany(action.payload.ids, state);
    }
    case TabActionTypes.LoadTabs: {
      return adapter.addAll(action.payload.tabs, state);
    }
    case TabActionTypes.ClearTabs: {
      return adapter.removeAll(state);
    }
    default: {
      return state;
    }
  }
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const tabSelectedIds = selectIds;
export const tabSelectedEntities = selectEntities;
export const tabSelectedAll = selectAll;
export const tabSelectedTotal = selectTotal;