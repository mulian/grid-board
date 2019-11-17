import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
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
  selectId: (tab) => tab.id
});

export const tabInitialState: TabState = adapter.getInitialState({
  options: {
    selectedTab: null,
    editTab: null
  }
});

export function tabReducer(
  state = tabInitialState,
  action: TabActions
): TabState {
  switch (action.type) {
    case TabActionTypes.SelectTab: {
      return {...state, options: { ...state.options, selectedTab: action.payload.tabId}}
    }
    case TabActionTypes.EditTab: {
      return {...state, options: { ...state.options, editTab: action.payload.tabId}}
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
      if (action.payload.tab.changes.isSelected) {
        return adapter.updateOne(action.payload.tab, {
          ...state, entities: mapValues(state.entities, (tab: Tab) => {
            return { ...tab, isSelected: false }
          })
        });
      } else if(action.payload.tab.changes.isEdit) {
        return adapter.updateOne(action.payload.tab, {
          ...state, entities: mapValues(state.entities, (tab: Tab) => {
            return { ...tab, isEdit: false }
          })
        });
      } else {
        return adapter.updateOne(action.payload.tab, state);
      }
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