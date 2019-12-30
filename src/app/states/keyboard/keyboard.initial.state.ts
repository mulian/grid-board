import { KeyboardState } from "./keyboard.state";
import { keyboardAdapter } from "./keyboard.adapter";

/** The initial state for Pages model */
export const keyboardInitialState: KeyboardState = keyboardAdapter.getInitialState();