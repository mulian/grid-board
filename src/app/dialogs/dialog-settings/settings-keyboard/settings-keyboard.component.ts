import { Component, OnInit, ViewEncapsulation } from "@angular/core"
import { TranslateService } from "@ngx-translate/core"
import { KeyboardModel, selectAllKeyboardEntities } from "../../../stores/keyboard"
import { AppState } from "../../../stores/reducers"
import { Store, select } from "@ngrx/store"
import * as _ from "lodash-es"

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

    constructor(public translate: TranslateService, private store: Store<AppState>) {}
    ngOnInit(): void {}
}
