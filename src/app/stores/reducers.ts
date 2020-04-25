import { ActionReducerMap, createFeatureSelector, MetaReducer, ActionReducer } from "@ngrx/store"

import { createSelector } from "reselect"
import { TabState, tabInitialState, tabReducer, tabSelectedAll, tabSelectedIds, tabSelectedEntities } from "./tab"
import { PageState, pageInitialState, pageReducer, pageSelectedAll, pageSelectedEntities } from "./page"
import { DialogModel, dialogInitialState, dialogReducer } from "./dialog"
import { GeneralModel, generalInitialState, generalReducer } from "./general"
import { KeyboardModel, KeyboardState, keyboardInitialState } from "./keyboard"
import { keyboardReducer } from "./keyboard/keyboard.reducer"
import { JSInjectionState, jSInjectionInitialState, jSInjectionReducer } from "./jsinjections"
import * as _ from "lodash-es"
import { slideReducer, SlideState, slideInitialState } from "./slide/slide.reducer"

export interface AppState {
    slide: SlideState
    tabs: TabState
    pages: PageState
    dialog: DialogModel
    general: GeneralModel
    keyboard: KeyboardState
    jsInjection: JSInjectionState
}

export const initialState: AppState = {
    slide: slideInitialState,
    tabs: tabInitialState,
    pages: pageInitialState,
    dialog: dialogInitialState,
    general: generalInitialState,
    keyboard: keyboardInitialState,
    jsInjection: jSInjectionInitialState,
}

export const reducers: ActionReducerMap<AppState> = {
    slide: slideReducer,
    tabs: tabReducer,
    pages: pageReducer,
    dialog: dialogReducer,
    general: generalReducer,
    keyboard: keyboardReducer,
    jsInjection: jSInjectionReducer,
}

//Page select
export const selectAllPagesState = createFeatureSelector<PageState>("pages")
export const selectPagesOptions = createSelector(selectAllPagesState, pages => pages.options)
export const selectPagesById = pageId => createSelector(selectAllPagesState, pages => pages.entities[pageId])
export const selectAllPages = createSelector(selectAllPagesState, pageSelectedAll)
export const selectAllPagesEntitities = createSelector(selectAllPagesState, pageSelectedEntities)

export const selectAllPagesEntititiesAsArray = createSelector(selectAllPagesState, (pageState: PageState) =>
    _.values(pageState.entities)
)

// export const selectAllPagges = createSelector(
//   pageStore.selectAll, (state) => state
//  )
export const selectUserEntities = createSelector(selectAllPagesState, pageSelectedAll)
// export const selectAllPagesFromTab = (tabId) => createSelector(
//   selectAllPagesState,
//   (state) => {
//     state.entities
//   }
// )

// export const selectAllPagesFromTab = (tabId) => createSelector(
//   selectAllPagesState,
//   pageStore.selectEntities,(state, pages) => {
//     pages
//   }
// )

//Tabs select
export const selectAllTabsState = createFeatureSelector<TabState>("tabs")
export const selectTabOptions = createSelector(selectAllTabsState, tabs => tabs.options)
export const selectTabOptionsSelectTab = createSelector(selectAllTabsState, tabs => tabs.options.selectedTab)
export const selectTabOptionsEditTab = createSelector(selectAllTabsState, tabs => tabs.options.editTab)

export const selectAllTabState = createFeatureSelector<SlideState>("slide")
export const selectTabSlide = createSelector(selectAllTabState, tabs => tabs)
export const selectSlideInactiveTime = createSelector(selectAllTabState, tabs => tabs.startAfterInactiveTimeInSec)
export const selectSlideIsActive = createSelector(selectAllTabState, tabs => tabs.isActive)

export const selectAllTabsEntities = createSelector(selectAllTabsState, tabSelectedEntities)
export const selectAllTabsEntitys = createSelector(selectAllTabsState, tabSelectedAll)
export const selectAllTabs = createSelector(selectAllTabsState, tabSelectedAll)

export const selectAllTabIds = createSelector(selectAllTabsState, tabSelectedIds)

export const selectAllTabsEntitiesAsArray = createSelector(selectAllTabsState, (res: TabState) =>
    _.values(res.entities)
)
