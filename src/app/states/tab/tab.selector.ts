/**
 * Tab Selectors
 */
import { adapter } from "./tab.adapter";

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const tabSelectedIds = selectIds;
export const tabSelectedEntities = selectEntities;
export const tabSelectedAll = selectAll;
export const tabSelectedTotal = selectTotal;
