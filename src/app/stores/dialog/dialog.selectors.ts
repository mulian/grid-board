import { DialogModel } from "./dialog.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";

/** Select All dialog state from ActionReducerMap  */
export const selectAllDialogState = createFeatureSelector<DialogModel>("dialog");

/** Select all Dialog state */
export const selectDialogAll = createSelector(selectAllDialogState, (dialog:DialogModel) => dialog)
/** Select only IsHelp Dialog */
export const selectDialogIsHelp = createSelector(selectAllDialogState, (dialog:DialogModel) => dialog.isHelpShow)
/** Select Dialog Settings */
export const selectDialogSettings = createSelector(selectAllDialogState, (dialog:DialogModel) => dialog.settings)