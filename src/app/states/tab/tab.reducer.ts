import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Tab } from './tab.model';
import { TabActions, TabActionTypes } from './tab.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as _ from 'lodash-es'

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

function removeSortNumberOfTabId(state, removedTab) {
  let deleteTab: Tab = state.entities[removedTab]
  for (let tabId in state.entities) {
    let tab: Tab = state.entities[tabId]
    if (tab.sortNumber > deleteTab.sortNumber) {
      tab.sortNumber = tab.sortNumber - 1 //TODO: dont write frome here... use update :(
    }
  }
}

export function tabReducer(
  state = tabInitialState,
  action: TabActions
): TabState {
  switch (action.type) {
    case TabActionTypes.SortTab: {
      let source: Tab = state.entities[state.ids[action.payload.selectedIndex]]
      let target: Tab = state.entities[state.ids[action.payload.targetIndex]]

      let updates: Update<Tab>[] = []
      //Get all affectedEntitites to update sort
      if (action.payload.selectedIndex > action.payload.targetIndex) { //Source is now lower then Target => all effected entitities sortNumber+1
        let affectedEntities: Tab[] = _.filter(
          state.entities,
          (filterTab: Tab) => filterTab.sortNumber < source.sortNumber && filterTab.sortNumber >= target.sortNumber
        )
        _.forEach(affectedEntities, (o) => console.log(o));

        updates = _.map(affectedEntities, (tab: Tab): Update<Tab> => {
          return {
            id: tab.id,
            changes: {
              sortNumber: tab.sortNumber + 1
            }
          }
        }
        )
      } else {  //Source is now greater then Target => all effected entitities sort-1
        let affectedEntities: Tab[] = _.filter(
          state.entities,
          (filterTab: Tab) => filterTab.sortNumber > source.sortNumber && filterTab.sortNumber <= target.sortNumber
        )
        _.forEach(affectedEntities, (o) => console.log(o));
        updates = _.map(affectedEntities, (tab: Tab): Update<Tab> => {
          return {
            id: tab.id,
            changes: {
              sortNumber: tab.sortNumber - 1
            }
          }
        }
        )
      }
      //Update source, source.sort will be everytime target.sort
      updates.push({
        id: source.id,
        changes: {
          sortNumber: target.sortNumber
        }
      })

      return adapter.updateMany(updates, state)

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
      let willDeletedTab:Tab = state.entities[action.payload.id]
      let updates:Update<Tab>[] = _.map(_.filter(state.entities,(tab:Tab) => {
        return tab.sortNumber>willDeletedTab.sortNumber
      }),(tab:Tab):Update<Tab> => {
        return {
          id: tab.id,
          changes: {
            sortNumber: tab.sortNumber-1
          }
        }
      })

      // removeSortNumberOfTabId(state, action.payload.id)
      // let deletedTab: Tab = state.entities[action.payload.id]
      // let newState = state
      if (action.payload.id == state.options.selectedTab) { //is selectedTab the removed tab?
        if (state.ids.length > 1) { //if there is more then one tab (bevore remove)
          let firstTabId: string = state.ids[0].toString();
          return adapter.updateMany(updates,adapter.removeOne(action.payload.id, { ...state, options: { ...state.options, selectedTab: firstTabId } }))
        } else { //There are more then one tabs left, set selectedTab to first entry
          return adapter.updateMany(updates,adapter.removeOne(action.payload.id, { ...state, options: { ...state.options, selectedTab: null } }));
        }
      } else { //selectedTab is not removed tab
        return adapter.updateMany(updates,adapter.removeOne(action.payload.id, state));
      }
      // let updates: Update<Tab>[] = _.map(
      //   _.filter(state.entities, (tab: Tab) => tab.sortNumber > deletedTab.sortNumber),
      //   (tab: Tab): Update<Tab> => {
      //     return {
      //       id: tab.id,
      //       changes: {
      //         sortNumber: tab.sortNumber - 1
      //       }
      //     }
      //   })
      // return adapter.updateMany(updates, newState)
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