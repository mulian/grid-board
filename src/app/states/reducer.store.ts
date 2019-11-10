import { ActionReducer, MetaReducer } from "@ngrx/store";

//TO store the state to local storage

const DEBUG: boolean = false
const STATE_STORE_KEY: string = "_state"

function setSavedState(state: any) {
  localStorage.setItem(STATE_STORE_KEY, JSON.stringify(state));
}
function getSavedState(): any {
  return JSON.parse(localStorage.getItem(STATE_STORE_KEY));
}

export function reduceWithStore(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    let nextState = reducer(state, action);
    // if (action.type == "@ngrx/store/init") {
    //   console.log("restore last state");
    //   let savedState: any = getSavedState();
    //   if (savedState) {
    //     nextState = savedState
    //   }
    // } else {
    //   setSavedState(nextState)
    // }
    // if (DEBUG) {
    //   console.log('state', state);
    //   console.log('action', action);
    // }

    return nextState
  };
}

export const metaReducer: MetaReducer<any>[] = [
  reduceWithStore
]