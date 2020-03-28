/**
 * Tab reducer
 */
import { EntityState, EntityAdapter, createEntityAdapter, Update, Dictionary } from '@ngrx/entity';
import { TabModel } from './tab.model';
import { TabActions, TabActionTypes, NavigationSelectTabType } from './tab.actions.main';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as _ from 'lodash-es'
import { TabState } from './tab.state';
import { tabInitialState } from './tab.initial.state'
import { adapter, sortBySortNumber } from './tab.adapter';
import { tabSlideReducer } from './tab.reducer.slide'



function getAllTabsWithIsSlideConsidered(tabEntitys:Dictionary<TabModel>):string[] {
  return _.map(_.filter(tabEntitys,{'isSlideConsidered':true}).sort(sortBySortNumber),(tab:TabModel) => tab.id)
}

function getTabWithSortNumber(tabEntitys:Dictionary<TabModel>,sortNumber:number):TabModel {
  return _.find(tabEntitys, {sortNumber})
}
// function getNextTab(tabEntitys:Dictionary<TabModel>,currentSortNumber:number,withRotation:boolean, isSlodeConsidered:boolean) {
//   let tab: TabModel = getTabWithSortNumber(tabEntitys,currentSortNumber+1)
//   if(tab==undefined) {
//     let tabs:Dictionary<TabModel>
//     if(isSlodeConsidered) {
//       tabs = getAllTabsWithIsSlideConsidered(tabEntitys)
//     } else {
//       tabs = tabEntitys
//     }
    
//   }
// }

export function tabReducer(
  state = tabInitialState,
  action: TabActions
): TabState {
  let currentTab:TabModel = state.entities[state.options.selectedTab]
  let nextTab:string = null
  switch (action.type) {
    /** Case: NavigateSelectTab */
    case TabActionTypes.NavigateSelectTab: {
      let possibleTabs: string[] = null //The possible tabs
      if(action.payload.exceptSlideNotConsidered) {
        possibleTabs = getAllTabsWithIsSlideConsidered(state.entities)
      } else {
        possibleTabs = state.ids as string[]
      }
      let currentIndex:number = _.findIndex(possibleTabs,(id:string) => currentTab.id==id)
      switch(action.payload.navigationType) {
        case NavigationSelectTabType.TabRotationRight: {
          if(currentIndex==(possibleTabs.length - 1)) { //when current tab is last tab
            nextTab = possibleTabs[0]
          } else { //wehn curren tab is not last tab
            nextTab = possibleTabs[currentIndex+1]
          }
          break
        }
        case NavigationSelectTabType.TabRotationLeft: {
          if(currentIndex==0) { //when current tab is first tab
            nextTab = possibleTabs[possibleTabs.length - 1]
          } else { //wehn curren tab is not first tab
            nextTab = possibleTabs[currentIndex-1]
          }
          break
        }
        case NavigationSelectTabType.Right: {
          if(currentIndex==(possibleTabs.length - 1)) { //when current tab is last tab
            nextTab = currentTab.id
          } else { //wehn curren tab is not last tab
            nextTab = possibleTabs[currentIndex+1]
          }
          break
        }
        case NavigationSelectTabType.First: {
          nextTab = possibleTabs[0]
          break
        }
        case NavigationSelectTabType.Last: {
          nextTab = possibleTabs[possibleTabs.length - 1]
          break
        }
        case NavigationSelectTabType.Left: {
          if(currentIndex==0) { //when current tab is first tab
            nextTab = currentTab.id //select first tab
          } else { //wehn curren tab is not first tab
            nextTab = possibleTabs[currentIndex-1]
          }
          break
        }
        case NavigationSelectTabType.BySortNumber: {
          nextTab = getTabWithSortNumber(state.entities,action.payload.sortOrder).id
          break
        }
      }
      if(nextTab==null) { 
        console.error("NavigationSelectTab: There is no next tab, do nothing");
        return state
      }
      else {
        return {...state, options: {
          ...state.options,
          selectedTab: nextTab
        }}
      }
    }
    /** Case: SortTab */
    case TabActionTypes.SortTab: {
      let source: TabModel = state.entities[state.ids[action.payload.sourceIndex]]
      let target: TabModel = state.entities[state.ids[action.payload.targetIndex]]

      let updates: Update<TabModel>[] = []
      //Get all affectedEntitites to update sort
      if (action.payload.sourceIndex > action.payload.targetIndex) { //Source is now lower then Target => all effected entitities sortNumber+1
        let affectedEntities: TabModel[] = _.filter(
          state.entities,
          (filterTab: TabModel) => filterTab.sortNumber < source.sortNumber && filterTab.sortNumber >= target.sortNumber
        )
        _.forEach(affectedEntities, (o) => console.log(o));

        updates = _.map(affectedEntities, (tab: TabModel): Update<TabModel> => {
          return {
            id: tab.id,
            changes: {
              sortNumber: tab.sortNumber + 1
            }
          }
        }
        )
      } else {  //Source is now greater then Target => all effected entitities sort-1
        let affectedEntities: TabModel[] = _.filter(
          state.entities,
          (filterTab: TabModel) => filterTab.sortNumber > source.sortNumber && filterTab.sortNumber <= target.sortNumber
        )
        _.forEach(affectedEntities, (o) => console.log(o));
        updates = _.map(affectedEntities, (tab: TabModel): Update<TabModel> => {
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
      let tabId:string = action.payload.tabId
      if(tabId==null) {
        tabId = state.options.selectedTab
      }
      return { ...state, options: { ...state.options, editTab: tabId } }
    }

    case TabActionTypes.AddTab: {
      let tab:TabModel = action.payload.tab
      if(tab.sortNumber==null) { //When  sortNumber is null add to last right tab sortNumber
        //tab.sortNumber = state.ids.length //_.reduce(state.entities,(sum, entity) => sum+1,0)
        return adapter.addOne({...tab, sortNumber: state.ids.length}, { ...state, options: { ...state.options, editTab: tab.id, selectedTab: tab.id } });  
      } else {
        return adapter.addOne(tab, { ...state, options: { ...state.options, editTab: tab.id, selectedTab: tab.id } });
      }
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

      let willDeletedTab:TabModel = state.entities[action.payload.id]
      let updates:Update<TabModel>[] = _.map(_.filter(state.entities,(tab:TabModel) => {
        return tab.sortNumber>willDeletedTab.sortNumber
      }),(tab:TabModel):Update<TabModel> => {
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
    case TabActionTypes.RenameTab: {
      let tabId:string = action.payload.tabId
      if(tabId==null) tabId = state.options.selectedTab
      return adapter.updateOne({id: tabId,changes: {
        name: action.payload.newName
      }},{...state, options: { ...state.options, editTab: null }})
    }
    default: {
      return tabSlideReducer(state,action);
    }
  }
}