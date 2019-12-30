import { dialogInitialState } from "./dialog.initial.state";
import { DialogActions, DialogActionTypes, DialogType } from "./dialog.actions"
import { DialogModel } from "./dialog.model";

/** Dialog reducer */
export function dialogReducer(
    state = dialogInitialState,
    action: DialogActions
): DialogModel {
    switch (action.type) {
        case DialogActionTypes.SelectSettingsTab: { //Reduce SelectSettingsTab
            return { ...state, settings: { ...state.settings, currentTab: action.payload.tab } }
        }
        case DialogActionTypes.ShowDialog: { //Reduce ShowDialog
            switch (action.payload.dialog) {
                case DialogType.SETTINGS: { //Show Settings dialog
                    return { ...state, settings: { ...state.settings, isShow: true } }
                }
                case DialogType.HELP: { //Show Help Dialog
                    return { ...state, isHelpShow: true }
                }
                default: return state
            }
        }
        case DialogActionTypes.CloseDialog: { //Reduce Close Dialog
            switch (action.payload.dialog) {
                case DialogType.SETTINGS: { //Close Settings dialog
                    return { ...state, settings: { ...state.settings, isShow: false } }
                }
                case DialogType.HELP: { //Close Help Dialog
                    return { ...state, isHelpShow: false }
                }
                default: return state
            }
        }
        default: return state
    }
}