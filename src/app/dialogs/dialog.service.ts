import { Injectable, Component } from "@angular/core"
import { Store, select } from "@ngrx/store"
import { AppState } from "../stores/reducers"
import { DialogModel, DialogType, CloseDialog } from "../stores/dialog"
import { selectDialogAll } from "../stores/dialog"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { HelpComponent } from "./help/help.component"
import { ComponentType } from "@angular/cdk/portal"
import { GridItemComponent } from "../content/grid-item/grid-item.component"
import { DialogSettingsComponent } from "./dialog-settings/dialog-settings.component"
import { dialogInitialState } from "../stores/dialog/dialog.initial.state"

@Injectable({
    providedIn: "root",
})
export class DialogService {
    private prevState: DialogModel = dialogInitialState
    private dialogRef: { [key: number]: MatDialogRef<unknown> } = {}

    getComponent(dialogType: DialogType): ComponentType<unknown> {
        switch (dialogType) {
            case DialogType.HELP:
                return HelpComponent
            case DialogType.SETTINGS:
                return DialogSettingsComponent
            default:
                return null
        }
    }

    constructor(private store: Store<AppState>, public dialog: MatDialog) {
        this.store.pipe(select(selectDialogAll)).subscribe((dialogs: DialogModel) => {
            this.changeVisibility(dialogs)
        })
    }

    changeVisibility(dialogs: DialogModel) {
        console.log("Change Visibility: ", dialogs)

        this.checkVisibility(DialogType.HELP, dialogs.isHelpShow, this.prevState.isHelpShow)
        this.checkVisibility(DialogType.SETTINGS, dialogs.settings.isShow, this.prevState.settings.isShow)

        this.prevState = dialogs
    }

    checkVisibility(dialogType: DialogType, isShow: boolean, isShowPrev: boolean) {
        console.log("check visi: ", dialogType, isShow, isShowPrev)

        if (isShow && !isShowPrev) this.openDialog(dialogType)
        else if (!isShow && isShowPrev) this.closeDialog(dialogType)
    }

    getDialog(dialogType: DialogType): MatDialogRef<unknown> {
        if (!(dialogType in this.dialogRef)) {
        } else {
            return this.dialogRef[dialogType]
        }
    }

    openDialog(dialogType: DialogType): void {
        let component: ComponentType<unknown> = this.getComponent(dialogType)
        console.log("Open Dialog ", dialogType)
        // let dialog:MatDialogRef<unknown> = this.getDialog(dialogType)
        this.dialogRef[dialogType] = this.dialog.open(component, {
            // width: '99%',
            // height: '95%'
        })
        console.log(this.dialogRef[dialogType])

        this.dialogRef[dialogType].afterClosed().subscribe(result => {
            this.store.dispatch(new CloseDialog({ dialog: dialogType }))
        })
    }

    closeDialog(dialogType: DialogType): void {
        let dialogReference: MatDialogRef<unknown> = this.dialogRef[dialogType]
        console.log("Close Dialog: ", dialogReference)

        if (dialogReference != null) {
            dialogReference.close()
            // this.dialogRef[dialogType] = null
        }
    }
}
