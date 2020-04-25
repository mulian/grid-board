import { Action, props, createAction } from "@ngrx/store"
import { RelevantKeyboardEvent } from "./keyboard.model"
import { actionStringCreator } from "../state.utils"

const actionStr = actionStringCreator("Keyboard")

export const recordKey = createAction(actionStr("Record Key "), props<{ withActions: Action[] }>())

export const _upsertKey = createAction(
    actionStr("Add Key"),
    props<{ withActions: Action[]; key: RelevantKeyboardEvent }>()
)

//TODO: Catch in effects
export const triggerKey = createAction(actionStr("Trigger press key"), props<{ key: RelevantKeyboardEvent }>())

/**
 * isActive: default true
 */
export const setKeyIsActive = createAction(
    actionStr("Set Key isActive attribute"),
    props<{ key: RelevantKeyboardEvent; isActive?: boolean }>()
)

export const removeKeyByKey = createAction(actionStr("Remove Key by key"), props<{ key: RelevantKeyboardEvent }>())

export const removeKeyByActions = createAction(actionStr("Remove Key by key"), props<{ actions: Action[] }>())

export const clearKeys = createAction(actionStr("Clear all Keys"))
