import { ActionReducer, MetaReducer } from "@ngrx/store"
import { AppState } from "./reducers"
import * as uuid from "uuid"
import { ReducerStoreActionTypes } from "./reducer.store.actions"
import { SetState } from "./reducer.store.actions"
import { ChangeHistoryLimit, GeneralActionTypes } from "./general"

//TO store the state to local storage

const DEBUG: boolean = false
const STATE_STORE_KEY: string = "_state"

const STATE_MAP_KEY: string = "_state_map"

export interface SaveState {
    action: any
    state: AppState
}

export class ReducerStore {
    currentStoreMap: string[] = []
    maxLength: number = 20

    constructor() {
        this.getStateMapFromStorage()
    }

    public getStateMap(): string[] {
        return this.currentStoreMap
    }
    private getStateMapFromStorage() {
        let map: string[] = JSON.parse(localStorage.getItem(STATE_MAP_KEY))
        if (map != null) {
            this.currentStoreMap = map
        }
    }
    public addStateToStateMap(newStateId: string) {
        this.currentStoreMap.push(newStateId)
        this.updateStateMap(this.currentStoreMap)
        this.checkLimitAndreduceMap()
    }
    private updateStateMap(stateMap: string[]) {
        localStorage.setItem(STATE_MAP_KEY, JSON.stringify(stateMap))
    }

    private checkLimitAndreduceMap() {
        if (this.currentStoreMap.length > this.maxLength) {
            let removeId: string = this.currentStoreMap.shift()
            localStorage.removeItem(removeId)
            this.updateStateMap(this.currentStoreMap)
            this.checkLimitAndreduceMap()
        }
    }

    public saveNewState(saveState: SaveState): string {
        let id: string = uuid.v4()
        localStorage.setItem(id, JSON.stringify(saveState))
        this.addStateToStateMap(id)
        return id
    }

    public getItem(id: string): SaveState {
        let saveStateString: string = localStorage.getItem(id)
        if (saveStateString == null) {
            console.info("The state item with id " + id + " doesnt exists.")
            return { action: null, state: null }
        } else {
            return JSON.parse(saveStateString)
        }
    }

    public getCurrentItem(): SaveState {
        if (this.currentStoreMap.length == 0) {
            console.info("There is no state saved")
            return { action: null, state: null }
        } else {
            return this.getItem(this.currentStoreMap[this.currentStoreMap.length - 1])
        }
    }
    public getCurrentState(): AppState {
        return this.getCurrentItem().state
    }
}

export const reducerStoreInstance: ReducerStore = new ReducerStore()

export function reduceWithStore(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        let nextState = reducer(state, action)
        if (action.type == ReducerStoreActionTypes.SetState) {
            console.log("set state")

            let action_: SetState = action as SetState
            nextState = action_.payload.state
        }
        if (action.type == "@ngrx/store/init") {
            console.log("restore last state")
            let savedState: AppState = reducerStoreInstance.getCurrentState() //getSavedState();
            console.log(savedState)
            if (savedState) {
                nextState = savedState
            }
            reducerStoreInstance.maxLength = nextState.general.historyLimit
            return nextState
        } else {
            console.log("save state", nextState)
            if (action.type == GeneralActionTypes.ChangeHistoryLimit) {
                let action_: ChangeHistoryLimit = action as ChangeHistoryLimit
                reducerStoreInstance.maxLength = action_.payload.historyLimit
            }
            reducerStoreInstance.saveNewState({ action: action, state: nextState })
            return nextState
        }
    }
}

export const metaReducer: MetaReducer<any>[] = [reduceWithStore]
