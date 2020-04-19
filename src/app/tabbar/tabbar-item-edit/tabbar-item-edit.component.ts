import { Component, OnInit, Input, OnChanges } from "@angular/core"
import { TabModel, renameTab } from "../../stores/tab"
import { Store } from "@ngrx/store"
import { AppState } from "../../stores/reducers"
import { Update } from "@ngrx/entity"

@Component({
    selector: "app-tabbar-item-edit",
    templateUrl: "./tabbar-item-edit.component.html",
    styleUrls: ["./tabbar-item-edit.component.scss"],
})
export class TabbarItemEditComponent implements OnInit {
    @Input()
    tabItem: TabModel

    constructor(private store: Store<AppState>) {}

    ngOnInit() {}

    changeName(name: string) {
        this.store.dispatch(renameTab({ tabId: null, newName: name }))
    }

    //Booth onEnter and onBlur will be fired with this function
    onBlur(value: string, event: any) {
        this.changeName(value)
    }
}
