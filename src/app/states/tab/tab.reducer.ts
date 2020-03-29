/**
 * Tab reducer
 */
import { Update, Dictionary } from "@ngrx/entity";
import { TabModel } from "./tab.model";
import {
  NavigationSelectTabType,
  navigateSelectTab,
  addTab,
  sortTab,
  selectTab,
  renameTab,
  editTab,
  deleteTab,
  clearTabs,
  updateTab
} from "./tab.actions.main";
import { createReducer, on, Action } from "@ngrx/store";
import * as _ from "lodash-es";
import { tabInitialState } from "./tab.initial.state";
import { adapter, sortBySortNumber } from "./tab.adapter";
import {
  triggerSlides,
  triggerBarSlides,
  setNextSlideTime,
  setStartAfterInactiveTime,
  triggerSlideBreak
} from "./tab.actions.slide";

function getAllTabsWithIsSlideConsidered(
  tabEntitys: Dictionary<TabModel>
): string[] {
  return _.map(
    _.filter(tabEntitys, { isSlideConsidered: true }).sort(sortBySortNumber),
    (tab: TabModel) => tab.id
  );
}

function getTabWithSortNumber(
  tabEntitys: Dictionary<TabModel>,
  sortNumber: number
): TabModel {
  return _.find(tabEntitys, { sortNumber });
}

export function reducer(state = tabInitialState, action: Action) {
  return tabReducer(state, action);
}

export const tabReducer = createReducer(
  tabInitialState,

  //For Slides
  on(triggerSlideBreak, (state, { isBreak }) => {
    return {
      ...state,
      slide: {
        ...state.slide,
        isSlideBreak: isBreak
      }
    };
  }),
  on(setStartAfterInactiveTime, (state, { timeInSec }) => {
    return {
      ...state,
      slide: {
        ...state.slide,
        startAfterInactiveTimeInSec: timeInSec
      }
    };
  }),
  on(setNextSlideTime, (state, { timeInSec }) => {
    return {
      ...state,
      slide: {
        ...state.slide,
        nextSlideInSec: timeInSec
      }
    };
  }),
  on(triggerSlides, (state, { activate }) => {
    return {
      ...state,
      slide: {
        ...state.slide,
        isShowProgress: activate
      }
    };
  }),
  on(triggerBarSlides, (state, { activate }) => {
    return {
      ...state,
      slide: {
        ...state.slide,
        isActive: activate
      }
    };
  }),

  //For Main Tab
  on(updateTab, (state, { updateTab }) => {
    if (updateTab.changes.sortNumber != null) {
      console.error(
        "could not change sort number by action updateTab, use sortTab instead"
      );
      return state;
    } else {
      return adapter.updateOne(updateTab, {
        ...state,
        options: { ...state.options, editTab: null }
      });
    }
  }),
  on(clearTabs, state => {
    return adapter.removeAll(state);
  }),
  on(deleteTab, (state, { tabId }) => {
    if (tabId == null) tabId = state.options.selectedTab;

    let willDeletedTab: TabModel = state.entities[tabId];
    let updates: Update<TabModel>[] = _.map(
      _.filter(state.entities, (tab: TabModel) => {
        return tab.sortNumber > willDeletedTab.sortNumber;
      }),
      (tab: TabModel): Update<TabModel> => {
        return {
          id: tab.id,
          changes: {
            sortNumber: tab.sortNumber - 1
          }
        };
      }
    );
    if (tabId == state.options.selectedTab) {
      //is selectedTab the removed tab?
      if (state.ids.length > 1) {
        //if there is more then one tab (bevore remove)
        let firstTabId: string = state.ids[0].toString();
        return adapter.updateMany(
          updates,
          adapter.removeOne(tabId, {
            ...state,
            options: { ...state.options, selectedTab: firstTabId }
          })
        );
      } else {
        //There are more then one tabs left, set selectedTab to first entry
        return adapter.updateMany(
          updates,
          adapter.removeOne(tabId, {
            ...state,
            options: { ...state.options, selectedTab: null }
          })
        );
      }
    } else {
      //selectedTab is not removed tab
      return adapter.updateMany(updates, adapter.removeOne(tabId, state));
    }
  }),
  on(editTab, (state, { tabId }) => {
    if (tabId == null) tabId = state.options.selectedTab;
    return { ...state, options: { ...state.options, editTab: tabId } };
  }),
  on(renameTab, (state, { tabId, newName }) => {
    if (tabId == null) tabId = state.options.selectedTab;
    return adapter.updateOne(
      {
        id: tabId,
        changes: {
          name: newName
        }
      },
      { ...state, options: { ...state.options, editTab: null } }
    );
  }),
  on(selectTab, (state, { tabId }) => {
    return {
      ...state,
      options: { ...state.options, selectedTab: tabId }
    };
  }),
  on(sortTab, (state, { sourceIndex, targetIndex }) => {
    let source: TabModel = state.entities[state.ids[sourceIndex]];
    let target: TabModel = state.entities[state.ids[targetIndex]];

    let updates: Update<TabModel>[] = [];
    //Get all affectedEntitites to update sort
    if (sourceIndex > targetIndex) {
      //Source is now lower then Target => all effected entitities sortNumber+1
      let affectedEntities: TabModel[] = _.filter(
        state.entities,
        (filterTab: TabModel) =>
          filterTab.sortNumber < source.sortNumber &&
          filterTab.sortNumber >= target.sortNumber
      );
      _.forEach(affectedEntities, o => console.log(o));

      updates = _.map(
        affectedEntities,
        (tab: TabModel): Update<TabModel> => {
          return {
            id: tab.id,
            changes: {
              sortNumber: tab.sortNumber + 1
            }
          };
        }
      );
    } else {
      //Source is now greater then Target => all effected entitities sort-1
      let affectedEntities: TabModel[] = _.filter(
        state.entities,
        (filterTab: TabModel) =>
          filterTab.sortNumber > source.sortNumber &&
          filterTab.sortNumber <= target.sortNumber
      );
      _.forEach(affectedEntities, o => console.log(o));
      updates = _.map(
        affectedEntities,
        (tab: TabModel): Update<TabModel> => {
          return {
            id: tab.id,
            changes: {
              sortNumber: tab.sortNumber - 1
            }
          };
        }
      );
    }
    //Update source, source.sort will be everytime target.sort
    updates.push({
      id: source.id,
      changes: {
        sortNumber: target.sortNumber
      }
    });

    return adapter.updateMany(updates, state);
  }),
  on(addTab, (state, { tab }) => {
    if (tab.sortNumber == null) {
      //When  sortNumber is null add to last right tab sortNumber
      return adapter.addOne(
        { ...tab, sortNumber: state.ids.length },
        {
          ...state,
          options: { ...state.options, editTab: tab.id, selectedTab: tab.id }
        }
      );
    } else {
      return adapter.addOne(tab, {
        ...state,
        options: { ...state.options, editTab: tab.id, selectedTab: tab.id }
      });
    }
  }),
  on(
    navigateSelectTab,
    (state, { navigationType, sortOrder, exceptSlideNotConsidered }) => {
      let currentTab: TabModel = state.entities[state.options.selectedTab];
      let nextTab: string = null;

      let possibleTabs: string[] = null; //The possible tabs
      if (exceptSlideNotConsidered) {
        possibleTabs = getAllTabsWithIsSlideConsidered(state.entities);
      } else {
        possibleTabs = state.ids as string[];
      }
      let currentIndex: number = _.findIndex(
        possibleTabs,
        (id: string) => currentTab.id == id
      );
      switch (navigationType) {
        case NavigationSelectTabType.TabRotationRight: {
          if (currentIndex == possibleTabs.length - 1) {
            //when current tab is last tab
            nextTab = possibleTabs[0];
          } else {
            //wehn curren tab is not last tab
            nextTab = possibleTabs[currentIndex + 1];
          }
          break;
        }
        case NavigationSelectTabType.TabRotationLeft: {
          if (currentIndex == 0) {
            //when current tab is first tab
            nextTab = possibleTabs[possibleTabs.length - 1];
          } else {
            //wehn curren tab is not first tab
            nextTab = possibleTabs[currentIndex - 1];
          }
          break;
        }
        case NavigationSelectTabType.Right: {
          if (currentIndex == possibleTabs.length - 1) {
            //when current tab is last tab
            nextTab = currentTab.id;
          } else {
            //wehn curren tab is not last tab
            nextTab = possibleTabs[currentIndex + 1];
          }
          break;
        }
        case NavigationSelectTabType.First: {
          nextTab = possibleTabs[0];
          break;
        }
        case NavigationSelectTabType.Last: {
          nextTab = possibleTabs[possibleTabs.length - 1];
          break;
        }
        case NavigationSelectTabType.Left: {
          if (currentIndex == 0) {
            //when current tab is first tab
            nextTab = currentTab.id; //select first tab
          } else {
            //wehn curren tab is not first tab
            nextTab = possibleTabs[currentIndex - 1];
          }
          break;
        }
        case NavigationSelectTabType.BySortNumber: {
          nextTab = getTabWithSortNumber(state.entities, sortOrder).id;
          break;
        }
      }
      if (nextTab == null) {
        console.error("NavigationSelectTab: There is no next tab, do nothing");
        return state;
      } else {
        return {
          ...state,
          options: {
            ...state.options,
            selectedTab: nextTab
          }
        };
      }
    }
  )
);
