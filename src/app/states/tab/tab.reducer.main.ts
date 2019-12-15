/**
 * Tab reducer
 */
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Tab } from './tab.model';
import { TabActions, TabActionTypes, NavigationSelectTabType } from './tab.actions.main';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as _ from 'lodash-es'
import { TabState } from './tab.state';
import { tabInitialState } from './tab.initial.state'
import { adapter } from './tab.adapter';
import { tabSlideReducer } from './tab.reducer.slide'

function getTabWithSortNumber(state:TabState,sortNumber:number) {
  return _.find(state.entities, {sortNumber})
}

export function tabReducer(
  state = tabInitialState,
  action: TabActions
): TabState {
  let currentTab:Tab = state.entities[state.options.selectedTab]
  let nextTab:Tab = null
  switch (action.type) {
    case TabActionTypes.NavigateSelectTab: {
      switch(action.payload.navigationType) {
        case NavigationSelectTabType.TabRotationRight: {
          nextTab = getTabWithSortNumber(state,currentTab.sortNumber+1)
          if(nextTab==null) {
            nextTab = getTabWithSortNumber(state,0)
          }
          console.log("jo",currentTab,getTabWithSortNumber(state,currentTab.sortNumber+1));
          break
        }
        case NavigationSelectTabType.TabRotationLeft: {
          console.error("TabRotationLeft is not yet implemented");
          
          break
        }
        case NavigationSelectTabType.Right: {
          
          
          nextTab = getTabWithSortNumber(state,currentTab.sortNumber+1)
          break
        }
        case NavigationSelectTabType.First: {
          nextTab = getTabWithSortNumber(state,0)
          break
        }
        case NavigationSelectTabType.Last: {
          console.error("Last tab is not jet implemented");
          break
        }
        case NavigationSelectTabType.Left: {
          nextTab = getTabWithSortNumber(state,currentTab.sortNumber-1)
          break
        }
        case NavigationSelectTabType.BySortNumber: {
          nextTab = getTabWithSortNumber(state,action.payload.sortOrder)
          break
        }
      }
      if(nextTab==null) { 
        console.error("There is no next tab, do nothing");
        return state
      }
      else {
        return {...state, options: {
          ...state.options,
          selectedTab: nextTab.id
        }}
      }
    }
    case TabActionTypes.SortTab: {
      let source: Tab = state.entities[state.ids[action.payload.sourceIndex]]
      let target: Tab = state.entities[state.ids[action.payload.targetIndex]]

      let updates: Update<Tab>[] = []
      //Get all affectedEntitites to update sort
      if (action.payload.sourceIndex > action.payload.targetIndex) { //Source is now lower then Target => all effected entitities sortNumber+1
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
      if(action.payload.tab.sortNumber==null) {
        action.payload.tab.sortNumber = _.reduce(state.entities,(sum, entity) => sum+1,0)
      }
      return adapter.addOne(action.payload.tab, { ...state, options: { ...state.options, editTab: action.payload.tab.id, selectedTab: action.payload.tab.id } });
    }
    case TabActionTypes.UpdateTab: {
      return adapter.updateOne(action.payload.tab, state);
    }
    case TabActionTypes.UpdateTabs: {
      return adapter.updateMany(action.payload.tabs, state);
    }
    case TabActionTypes.DeleteTab: {
      if(action.payload.id==null) {
        action.payload.id=state.options.selectedTab
      }

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
    }
    case TabActionTypes.DeleteTabs: {
      return adapter.removeMany(action.payload.ids, state);
    }
    case TabActionTypes.ClearTabs: {
      return adapter.removeAll(state);
    }
    default: {
      return tabSlideReducer(state,action);
    }
  }
}