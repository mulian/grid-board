import { generalInitialState } from "./general.initial.state"
import { GeneralActions, GeneralActionTypes } from "./general.actions"
import { GeneralModel } from "./general.model"

/** The General Reducer */
export function generalReducer(
    state = generalInitialState,
    action: GeneralActions
): GeneralModel {
    switch (action.type) {
        case GeneralActionTypes.ChangeLanguage: { //Reduce ChangeLanguage
            return { ...state, language: action.payload.lang }
        }
        case GeneralActionTypes.ChangeHistoryLimit: { //Reduce ChangeHistoryLimit
            return { ...state, historyLimit: action.payload.historyLimit }
        }
        default: return state
    }
}