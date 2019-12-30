import { pageAdapter } from "./page.adapter";

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