import { keyboardAdapter } from "./keyboard.adapter";

/** Select Page Entity */
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = keyboardAdapter.getSelectors();

export const keyboardSelectedIds = selectIds;
export const keyboardSelectedEntities = selectEntities;
export const keyboardSelectedAll = selectAll;
export const keyboardSelectedTotal = selectTotal;