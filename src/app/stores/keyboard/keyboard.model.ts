import { ActionCreator, Action } from "@ngrx/store"

export interface RelevantKeyboardEvent {
    readonly altKey: boolean
    readonly metaKey: boolean
    readonly shiftKey: boolean
    readonly ctrlKey: boolean
    readonly key: string
    /** @deprecated */
    readonly keyCode: number
}

export interface KeyboardModel {
    key: RelevantKeyboardEvent
    actions: Action[]
    isActive: boolean
}
