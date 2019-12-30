import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GeneralModel } from "./general.model";

/** Select All general state from ActionReducerMap  */
export const selectAllGeneralState = createFeatureSelector<GeneralModel>("general");

/** Select all general state */
export const selectGeneralAll = createSelector(selectAllGeneralState, (general:GeneralModel) => general)
/** Select General Lang */
export const selectGeneralLang = createSelector(selectAllGeneralState, (general:GeneralModel) => general.language)
/** Select GeneralHistoryLimit */
export const selectGeneralHistoryLimit = createSelector(selectAllGeneralState, (general:GeneralModel) => general.historyLimit)