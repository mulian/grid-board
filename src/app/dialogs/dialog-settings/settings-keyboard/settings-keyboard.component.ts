import { Component, OnInit, ViewEncapsulation } from "@angular/core"
import { TranslateService } from "@ngx-translate/core"
import { KeyboardService } from "./keyboard.service"
import { KeyboardModel, selectAllKeyboardEntities } from "../../../stores/keyboard"
import { KeyboardAction, TypeInput } from "../../../stores/keyboard/keyboard.model"
import { UpsertKeyboard, UpsertKeyboards } from "../../../stores/keyboard/keyboard.actions"
import { AppState } from "../../../stores/reducers"
import { Store, select } from "@ngrx/store"
import { Dictionary } from "@ngrx/entity"
import * as _ from "lodash-es"
import { keyboardTranslation, keypressEventToTypeInput } from "./keyboard.translation"
import { elementAt } from "rxjs/operators"
import KeyboardRecognition from "./keyboard.recognition"

@Component({
    selector: "app-settings-keyboard",
    templateUrl: "./settings-keyboard.component.html",
    styleUrls: ["./settings-keyboard.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SettingsKeyboardComponent implements OnInit {
    dataSource: KeyboardModel[] = []
    displayedColumns: string[] = ["key", "action", "active"]

    keyEditOnAction: number = null

    keyboardRec: KeyboardRecognition

    constructor(public translate: TranslateService, public keyboard: KeyboardService, private store: Store<AppState>) {
        this.dataSource = this.initAllPossibleKeyboardActions()
        this.keyboardRec = new KeyboardRecognition(keyboard)
    }
    initAllPossibleKeyboardActions(): KeyboardModel[] {
        console.log(KeyboardAction)

        let keyboardModels: KeyboardModel[] = []
        for (let actionKey in KeyboardAction) {
            if (parseInt(actionKey, 10) >= 0) {
                //check that reference for enum is number (filter to show only the enum strings)
                let actionValue: string = KeyboardAction[actionKey]
                keyboardModels.push({
                    action: KeyboardAction[actionValue],
                    active: false,
                    key: null,
                })
            }
        }
        console.log(keyboardModels)

        return keyboardModels
    }

    activateKeyRec(action: KeyboardAction) {
        this.keyEditOnAction = action

        this.keyboardRec.rec((key: TypeInput) => {
            this.store.dispatch(
                new UpsertKeyboard({
                    keyboard: {
                        action,
                        key,
                        active: true,
                    },
                })
            )
            this.keyEditOnAction = null
        })
    }

    actionToString(actionNumber: number) {
        return KeyboardAction[actionNumber]
    }

    stringify(obj: any) {
        return JSON.stringify(obj)
    }
    keyboardTranslation(typeInput: TypeInput) {
        return keyboardTranslation(typeInput)
    }

    updateKey(keyboardModel: KeyboardModel) {
        this.keyEditOnAction = keyboardModel.action
    }

    ngOnInit() {
        this.store.pipe(select(selectAllKeyboardEntities)).subscribe((keyboardData: Dictionary<KeyboardModel>) => {
            console.log("keyboardData", keyboardData)
            this.updateDataSourcWithStoreData(keyboardData)
        })
    }

    updateDataSourcWithStoreData(keyboardData: Dictionary<KeyboardModel>) {
        for (let keyboardModelKey in keyboardData) {
            let keyboardModel: KeyboardModel = keyboardData[keyboardModelKey]

            for (let dataItem of this.dataSource) {
                if (dataItem.action == keyboardModel.action) {
                    dataItem.active = keyboardModel.active
                    dataItem.key = keyboardModel.key
                }
            }
        }
    }
}
