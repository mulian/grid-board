import { EntityAdapter, createEntityAdapter } from "@ngrx/entity"
import { KeyboardModel, RelevantKeyboardEvent } from "./keyboard.model"
import { KeyboardState } from "./keyboard.state"
import { navigateSelectTab, NavigationSelectTabType } from "../tab"
import { recordKey } from "./keyboard.actions"

export function getKeyId(key: RelevantKeyboardEvent): string {
    let str: string = ""

    if (key.altKey) str += "[ALT]"
    if (key.ctrlKey) str += "[CTRL]"
    if (key.metaKey) str += "[META]"
    if (key.shiftKey) str += "[SHIFT]"

    str += key.key

    return str
}

/** The EntityAdapter for Page with select id */
export const keyboardAdapter: EntityAdapter<KeyboardModel> = createEntityAdapter<KeyboardModel>({
    selectId: keyboard => getKeyId(keyboard.key),
})

let keyPressAexample: RelevantKeyboardEvent = {
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    key: "a",
    keyCode: 65,
}

const initEntries: KeyboardModel[] = [
    {
        key: { ...keyPressAexample },
        actions: [
            navigateSelectTab({
                navigationType: NavigationSelectTabType.TabRotationRight,
                exceptSlideNotConsidered: false,
            }),
        ],
        isActive: true,
    },
    {
        key: { ...keyPressAexample, key: "r" },
        actions: [
            recordKey({
                withActions: [
                    navigateSelectTab({
                        navigationType: NavigationSelectTabType.TabRotationLeft,
                        exceptSlideNotConsidered: false,
                    }),
                ],
            }),
        ],
        isActive: true,
    },
]

export const keyboardInitialState: KeyboardState = keyboardAdapter.addMany(
    initEntries,
    keyboardAdapter.getInitialState({
        isRecordActive: false,
    })
)
