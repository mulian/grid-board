import { keyboardAdapter } from "./keyboard.adapter"
import { KeyboardState } from "./keyboard.state"
import { createFeatureSelector, createSelector } from "@ngrx/store"

/** Select Page Entity */
const { selectIds, selectEntities, selectAll, selectTotal } = keyboardAdapter.getSelectors()

export const keyboardSelectedIds = selectIds
export const keyboardSelectedEntities = selectEntities
export const keyboardSelectedAll = selectAll
export const keyboardSelectedTotal = selectTotal

export const selectAllKeyboardState = createFeatureSelector<KeyboardState>("keyboard")

export const selectAllKeyboardEntities = createSelector(selectAllKeyboardState, selectEntities)

export const selectKeyboardState = createSelector(selectAllKeyboardState, keyboardState => ({
    ...keyboardState,
    ids: keyboardState.ids as string[],
}))

export const selectKeyboardIsRecord = createSelector(
    selectAllKeyboardState,
    keyboardState => keyboardState.isRecordActive
)
