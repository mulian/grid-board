import { jSInjectionAdapter } from "./jsInjection.adapter";
import { JSInjectionState } from "./jsInjection.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

/** Select Page Entity */
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = jSInjectionAdapter.getSelectors();

export const jSInjectionSelectedIds = selectIds;
export const jSInjectionSelectedEntities = selectEntities;
export const jSInjectionSelectedAll = selectAll;
export const jSInjectionSelectedTotal = selectTotal;

export const selectAllJSInjectionState = createFeatureSelector<JSInjectionState>("jsInjection");

export const selectAllJSInjectionEntities = createSelector(
    selectAllJSInjectionState,
    selectEntities
  )