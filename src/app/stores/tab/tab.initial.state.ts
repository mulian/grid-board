/**
 * Tab initial state.
 */
import { TabState } from "./tab.state"
import { adapter } from "./tab.adapter"

/** The Initial State of Tab Model */
export const tabInitialState: TabState = adapter.getInitialState({
    options: {
        selectedTab: "no_selection",
        editTab: null,
    },
})
