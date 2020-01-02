import { pageAdapter } from "./page.adapter";
import { PageState } from "./page.state";
import { PageModel } from "./page.model"
import { createFeatureSelector, createSelector } from "@ngrx/store";

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

export const selectWebviewDataFromPage = function(pageId:string) {
    return createSelector(selectAllPagesState, (pageState:PageState) => pageState.entities[pageId].webviewData)
}

export const selectAllPagesEntities = createSelector(
    selectAllPagesState,
    selectEntities
  )

