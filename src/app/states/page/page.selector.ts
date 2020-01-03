import { pageAdapter } from "./page.adapter";
import { PageState } from "./page.state";
import { PageModel, WebviewData } from "./page.model"
import { createFeatureSelector } from "@ngrx/store";
import { createSelector } from 'reselect'

/** Select Page Entity */
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = pageAdapter.getSelectors();

export const pageSelectedIds = selectIds;
export const pageSelectedEntities = selectEntities;
export const pageSelectedAll = selectAll;
export const pageSelectedTotal = selectTotal;

export const selectAllPagesState = createFeatureSelector<PageState>("pages");

export const selectActivePage = createSelector(selectAllPagesState, (pageState:PageState) => pageState.options.activePage)

// export const selectWebviewDataFromPage = createSelector(selectAllPagesState, (pageState:PageState):WebviewData => pageState.entities[prop.pageId].webviewData )

export const selectWebviewDataFromPage = (pageId:string) => {
    return createSelector(selectAllPagesState, (pageState:PageState):WebviewData => {
        console.log("check page ",pageId,pageState.entities[pageId].webviewData);
        return pageState.entities[pageId].webviewData
    })
}

export const selectAllPagesEntities = createSelector(
    selectAllPagesState,
    selectEntities
  )

