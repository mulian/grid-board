import { Component, OnInit, Input } from "@angular/core"
import { TabModel, deleteTab, selectTab, editTab } from "../../states/tab"
import { Store } from "@ngrx/store"
import { AppState } from "../../states/reducers"

@Component({
    selector: "app-tabbar-item",
    templateUrl: "./tabbar-item.component.html",
    styleUrls: ["./tabbar-item.component.scss"],
})
export class TabbarItemComponent implements OnInit {
    @Input()
    tabItem: TabModel

    constructor(private store: Store<AppState>) {}

    ngOnInit() {}

    clickRemoveTab() {
        this.store.dispatch(deleteTab({ tabId: this.tabItem.id }))
    }

    editTab() {
        this.store.dispatch(editTab({ tabId: this.tabItem.id }))
    }

    showTab() {
        console.log("show tab", this.tabItem.id)

        this.store.dispatch(selectTab({ tabId: this.tabItem.id }))
    }

    clicked: number = 0
    clickTimeOut = null
    clickTabTitle() {
        //TODO: Make this smarter
        this.clicked++
        if (this.clickTimeOut == null) {
            this.clickTimeOut = setTimeout(() => {
                if (this.clicked > 1) {
                    //doubleclick
                    this.resetClick()
                    this.editTab()
                } else {
                    //click
                    this.resetClick()
                    this.showTab()
                }
            }, 200)
        }
    }
    resetClick() {
        this.clicked = 0
        this.clickTimeOut = null
    }
}
