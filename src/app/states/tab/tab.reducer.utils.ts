import { TabModel } from "./tab.model"
import { Dictionary, Update } from "@ngrx/entity"
import * as _ from "lodash-es"

/**
 * Get the updates for tabs after deleted tab with decremented sort number
 * @param tabId
 * @param entities the current entities in state
 * @return update array of tabs
 */
export function getUpdatesForTabsAfterDeletedTabsWithDecrementedSortNumber(
    tabId: string,
    entities: Dictionary<TabModel>
): Update<TabModel>[] {
    let willDeletedTab: TabModel = entities[tabId]
    return _.map(
        _.filter(entities, (tab: TabModel) => {
            return tab.sortNumber > willDeletedTab.sortNumber
        }),
        (tab: TabModel): Update<TabModel> => {
            return {
                id: tab.id,
                changes: {
                    sortNumber: tab.sortNumber - 1,
                },
            }
        }
    )
}
/**
 * Get next selected tab Id. Cases:
 * 1. if deleted tab is selected tab
 *    * when there are more then one tab use
 *      - ... and tab is first => select secound tab
 *      - ... else => select left from current deleted tab
 *    * else there are only one tab => no tab is selected
 * 2. Else => use current selected tab
 * Note: Tablist is sorted by sortNumber
 * @param tabId
 * @param selectedTab
 * @param tabList
 */
export function getNextSelectedTabId(tabId: string, selectedTab: string, tabList: string[]): string {
    if (tabId == selectedTab) {
        if (tabList.length > 1) {
            let currentTabIndex: number = _.indexOf(tabList, tabId)
            if (currentTabIndex == 0) return tabList[1] as string
            else {
                return tabList[currentTabIndex - 1].toString()
            }
        } else {
            return null
        }
    } else {
        return selectedTab
    }
}

/**
 * Get all updates for all effected tab entities wich will be sorted
 *
 * @param source
 * @param target
 * @param entities
 */
export function getUpdatesForAllAffectedEntitiesWithNewSortNumber(
    source: TabModel,
    target: TabModel,
    entities: Dictionary<TabModel>
): Update<TabModel>[] {
    let affectedEntities: TabModel[]
    let mapFunction: (tab: TabModel) => Partial<TabModel> = null
    //Get all affectedEntitites to update sort
    if (source.sortNumber > target.sortNumber) {
        //Source is now lower then Target => all effected entitities sortNumber+1
        affectedEntities = _.filter(
            entities,
            (filterTab: TabModel) =>
                filterTab.sortNumber < source.sortNumber && filterTab.sortNumber >= target.sortNumber
        )
        mapFunction = tab => ({ sortNumber: tab.sortNumber + 1 })
    } else {
        //Source is now greater then Target => all effected entitities sort-1
        affectedEntities = _.filter(
            entities,
            (filterTab: TabModel) =>
                filterTab.sortNumber > source.sortNumber && filterTab.sortNumber <= target.sortNumber
        )
        mapFunction = tab => ({ sortNumber: tab.sortNumber - 1 })
    }
    return _.map(affectedEntities, (tab: TabModel): Update<TabModel> => ({ id: tab.id, changes: mapFunction(tab) }))
}
