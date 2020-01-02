import { AppState } from "../../../states/reducers"
import { Store } from "@ngrx/store"
import { AddTab, DeleteTab, NavigateSelectTab, NavigationSelectTabType, EditTab } from "../../../states/tab"
import { TranslateService } from "@ngx-translate/core"
import { IpcService } from "../settings-history/ipc.service"
import { KeyboardAction } from "../../../states/keyboard/keyboard.model"
import { ToggleDialog, DialogType } from "../../../states/dialog"

export class KeyboardActions {
    /**
     * Constructor to Fire the Keyboard action.
     * @param store the store where the action will be dispatched
     * @param translate the translation for e.x. new tab title, could be null if the action dont need to translate
     * @param ipcRender to send ipc to electron main, may not need
     */
    constructor(private store: Store<AppState>, private translate: TranslateService = null, private ipcRenderer: IpcService = null) {
        if (this.store == null) {
            console.error("fireKeyboardAction: there is no keyboardAction or store")
        }
        if (this.translate == null || this.ipcRenderer == null) {
            console.warn("fireKeyboardAction: the translate is not set, this could cause a problem if the action need the translate service.")
        }
    }

    /**
     * Fire the Keyboard action.
     * @param keyboardAction the action type
     * @return if action was succesfull fired
     */
    public fire(keyboardAction: KeyboardAction) {
        switch (keyboardAction) {
            case KeyboardAction.NEW_TAB: {
                this.store.dispatch(new AddTab({ tab: { name: this.translate.instant("TAB.NEW_TAB_PLACE_HOLDER"), sortNumber: null, isSlideConsidered: true } }))
                return true
            }
            case KeyboardAction.CLOSE_TAB: {
                this.store.dispatch(new DeleteTab({ id: null }))
                return true
            }
            case KeyboardAction.RENAME_CURRENT_TAB: {
                this.store.dispatch(new EditTab({ tabId: null}))
                return true
            }
            case KeyboardAction.CLOSE_APP: {
                this.ipcRenderer.send("close-app", null)
                return true
            }
            case KeyboardAction.NEXT_TAB_RIGHT: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.Right, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.NEXT_TAB_RIGHT_ROTATION: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.TabRotationRight, exceptSlideNotConsidered: true }))
                return true
            }
            case KeyboardAction.NEXT_TAB_LEFT: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.Left, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.NEXT_TAB_LEFT_ROTATION: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.TabRotationLeft, exceptSlideNotConsidered: true }))
                return true
            }
            case KeyboardAction.SELECT_TAB_1: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 0, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.SELECT_TAB_2: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 1, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.SELECT_TAB_3: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 2, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.SELECT_TAB_4: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 3, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.SELECT_TAB_5: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 4, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.SELECT_TAB_6: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 5, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.SELECT_TAB_7: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 6, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.SELECT_TAB_8: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 7, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.SELECT_TAB_9: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 8, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.SELECT_TAB_10: {
                this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.BySortNumber, sortOrder: 9, exceptSlideNotConsidered: false }))
                return true
            }
            case KeyboardAction.DIALOG_SETTINGS: {
                this.store.dispatch(new ToggleDialog({ dialog: DialogType.SETTINGS }))
                return true
            }
            case KeyboardAction.DIALOG_HELP: {
                this.store.dispatch(new ToggleDialog({ dialog: DialogType.HELP }))
                return true
            }
            default: return false
        }
    }
}