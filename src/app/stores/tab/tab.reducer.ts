/**
 * Tab reducer
 */
import { Update, Dictionary } from "@ngrx/entity"
import { TabModel } from "./tab.model"
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
    updateTab,
} from "./tab.actions.main"
import { createReducer, on, Action } from "@ngrx/store"
import * as _ from "lodash-es"
import { tabInitialState } from "./tab.initial.state"
import { adapter, sortBySortNumber } from "./tab.adapter"
import {
    triggerSlides,
    triggerBarSlides,
    setNextSlideTime,
    setStartAfterInactiveTime,
    triggerSlideBreak,
} from "./tab.actions.slide"
import {
    getUpdatesForAllAffectedEntitiesWithNewSortNumber,
    getUpdatesForTabsAfterDeletedTabsWithDecrementedSortNumber,
    getNextSelectedTabId,
} from "./tab.reducer.utils"

function getAllTabsWithIsSlideConsidered(tabEntitys: Dictionary<TabModel>): string[] {
    return _.map(_.filter(tabEntitys, { isSlideConsidered: true }).sort(sortBySortNumber), (tab: TabModel) => tab.id)
}

function getTabWithSortNumber(tabEntitys: Dictionary<TabModel>, sortNumber: number): TabModel {
    return _.find(tabEntitys, { sortNumber })
}

export function reducer(state = tabInitialState, action: Action) {
    return tabReducer(state, action)
}

export const tabReducer = createReducer(
    tabInitialState,

    //For Slides
    on(triggerSlideBreak, (state, { isBreak }) => ({
        ...state,
        slide: {
            ...state.slide,
            isSlideBreak: isBreak,
        },
    })),
    on(setStartAfterInactiveTime, (state, { timeInSec }) => ({
        ...state,
        slide: {
            ...state.slide,
            startAfterInactiveTimeInSec: timeInSec,
        },
    })),
    on(setNextSlideTime, (state, { timeInSec }) => ({
        ...state,
        slide: {
            ...state.slide,
            nextSlideInSec: timeInSec,
        },
    })),
    on(triggerSlides, (state, { activate }) => ({
        ...state,
        slide: {
            ...state.slide,
            isShowProgress: activate,
        },
    })),
    on(triggerBarSlides, (state, { activate }) => ({
        ...state,
        slide: {
            ...state.slide,
            isActive: activate,
        },
    })),

    //For Main Tab
    on(updateTab, (state, { updateTab }) => {
        if (updateTab.changes.sortNumber != null) {
            console.error("could not change sort number by action updateTab, use sortTab instead")
            return state
        } else {
            let optionsChange = state.options
            if (state.options.editTab == updateTab.id) {
                //when updated tab is current edit tab, set edit tab to null
                optionsChange.editTab = null
            }
            return adapter.updateOne(updateTab, {
                ...state,
                options: optionsChange,
            })
        }
    }),
    on(clearTabs, state => adapter.removeAll({ ...state, options: { selectedTab: null, editTab: null } })),
    on(deleteTab, (state, { tabId }) => {
        if (tabId == null) tabId = state.options.selectedTab //When delete without tab id, delete current selected tab
        return adapter.updateMany(
            getUpdatesForTabsAfterDeletedTabsWithDecrementedSortNumber(tabId, state.entities),
            adapter.removeOne(tabId, {
                ...state,
                options: {
                    ...state.options,
                    selectedTab: getNextSelectedTabId(tabId, state.options.selectedTab, state.ids as string[]),
                },
            })
        )
    }),
    on(editTab, (state, { tabId }) => {
        if (tabId == null) tabId = state.options.selectedTab //When no tabId was given use current selected tab
        return { ...state, options: { ...state.options, editTab: tabId } }
    }),
    on(renameTab, (state, { tabId, newName }) => {
        if (tabId == null) tabId = state.options.selectedTab //When there is no tabId given, rename current selected tab

        return adapter.updateOne(
            {
                id: tabId,
                changes: {
                    name: newName,
                },
            },
            { ...state, options: { ...state.options, editTab: null } }
        )
    }),
    on(selectTab, (state, { tabId }) => {
        if (tabId == null) {
            console.info("could not select a tab without tab id")
            return state
        } else {
            return {
                ...state,
                options: { ...state.options, selectedTab: tabId },
            }
        }
    }),
    on(sortTab, (state, { sourceIndex, targetIndex }) => {
        let updates: Update<TabModel>[] = getUpdatesForAllAffectedEntitiesWithNewSortNumber(
            state.entities[state.ids[sourceIndex]],
            state.entities[state.ids[targetIndex]],
            state.entities
        )
        updates.push({
            id: state.entities[state.ids[sourceIndex]].id,
            changes: {
                sortNumber: state.entities[state.ids[targetIndex]].sortNumber,
            },
        })

        return adapter.updateMany(updates, state)
    }),
    on(addTab, (state, { tab }) => {
        if (tab.sortNumber == null) {
            //When  sortNumber is null add to last right tab sortNumber
            return adapter.addOne(
                { ...tab, sortNumber: state.ids.length },
                {
                    ...state,
                    options: {
                        ...state.options,
                        editTab: tab.id,
                        selectedTab: tab.id,
                    },
                }
            )
        } else {
            return adapter.addOne(tab, {
                ...state,
                options: {
                    ...state.options,
                    editTab: tab.id,
                    selectedTab: tab.id,
                },
            })
        }
    }),
    on(navigateSelectTab, (state, { navigationType, sortOrder, exceptSlideNotConsidered }) => {
        let currentTab: TabModel = state.entities[state.options.selectedTab]
        let nextTab: string = null

        let possibleTabs: string[] = null //The possible tabs
        if (exceptSlideNotConsidered) {
            possibleTabs = getAllTabsWithIsSlideConsidered(state.entities)
        } else {
            possibleTabs = state.ids as string[]
        }
        let currentIndex: number = _.findIndex(possibleTabs, (id: string) => currentTab.id == id)
        switch (navigationType) {
            case NavigationSelectTabType.TabRotationRight: {
                if (currentIndex == possibleTabs.length - 1) {
                    //when current tab is last tab
                    nextTab = possibleTabs[0]
                } else {
                    //wehn curren tab is not last tab
                    nextTab = possibleTabs[currentIndex + 1]
                }
                break
            }
            case NavigationSelectTabType.TabRotationLeft: {
                if (currentIndex == 0) {
                    //when current tab is first tab
                    nextTab = possibleTabs[possibleTabs.length - 1]
                } else {
                    //wehn curren tab is not first tab
                    nextTab = possibleTabs[currentIndex - 1]
                }
                break
            }
            case NavigationSelectTabType.Right: {
                if (currentIndex == possibleTabs.length - 1) {
                    //when current tab is last tab
                    nextTab = currentTab.id
                } else {
                    //wehn curren tab is not last tab
                    nextTab = possibleTabs[currentIndex + 1]
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
                if (currentIndex == 0) {
                    //when current tab is first tab
                    nextTab = currentTab.id //select first tab
                } else {
                    //wehn curren tab is not first tab
                    nextTab = possibleTabs[currentIndex - 1]
                }
                break
            }
            case NavigationSelectTabType.BySortNumber: {
                nextTab = getTabWithSortNumber(state.entities, sortOrder).id
                break
            }
        }
        if (nextTab == null) {
            console.error("NavigationSelectTab: There is no next tab, do nothing")
            return state
        } else {
            return {
                ...state,
                options: {
                    ...state.options,
                    selectedTab: nextTab,
                },
            }
        }
    })
)
