import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  AppState,
  selectAllTabs,
  selectTabOptions,
  selectTabOptionsSelectTab,
  selectTabOptionsEditTab,
  selectAllTabsEntitys,
  selectAllTabsEntities
} from "../../states/reducers";
import {
  addTab,
  updateTab,
  deleteTab,
  sortTab,
  editTab,
  selectTab
} from "../../states/tab";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

import ClickHandler from "./click-handler";
import NgrxEntitySync from "../../ngrx-entity-sync";
import { TranslateService } from "@ngx-translate/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { Update } from "@ngrx/entity";

@Component({
  selector: "app-tabbar-list",
  templateUrl: "./tabbar-list.component.html",
  styleUrls: ["./tabbar-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbarListComponent implements OnInit {
  tab$: Observable<any>;
  tabOptions$: Observable<any>;
  syncedTabData: NgrxEntitySync<TabModel>;

  clickHandler: ClickHandler<TabModel> = new ClickHandler<TabModel>()
    .onClick((item: TabModel) => {
      console.log("Click: ", item);
      this.store.dispatch(selectTab({ tabId: item.id }));
    })
    .onDoubleClick((item: TabModel) => {
      console.log("double click", item);
      this.store.dispatch(editTab({ tabId: item.id }));
    });

  click(item, event) {
    event.stopPropagation();
    event.preventDefault();
    this.clickHandler.click(item);
  }
  closeTab(item, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.store.dispatch(deleteTab({ tabId: item.id }));
  }
  drop(event: CdkDragDrop<string[]>) {
    this.store.dispatch(
      sortTab({
        sourceIndex: event.previousIndex,
        targetIndex: event.currentIndex
      })
    );
  }

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService
  ) {}

  contextMenuPosition = { x: "0px", y: "0px" };

  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  maxSortNumber: number = 0;
  setMaxSortNumber(newSortNumber) {
    if (this.maxSortNumber < newSortNumber) {
      this.maxSortNumber = newSortNumber;
    }
  }

  ngOnInit() {
    this.tab$ = this.store.pipe(select(selectAllTabsEntitys));
    this.tabOptions$ = this.store.pipe(select(selectTabOptions));
  }

  onRightClick(tabItem: TabModel, event) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: tabItem };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  private updateSlide(tab: TabModel, isSlideConsidered: boolean) {
    let update: Update<TabModel> = {
      id: tab.id,
      changes: {
        isSlideConsidered
      }
    };
    this.store.dispatch(updateTab({ tab: update }));
  }

  addToSlide(tab: TabModel) {
    this.updateSlide(tab, false);
  }
  removeFromSlide(tab: TabModel) {
    this.updateSlide(tab, true);
  }

  addNewTab() {
    this.store.dispatch(
      addTab({
        name: this.translate.instant("TAB.NEW_TAB_PLACE_HOLDER"),
        sortNumber: null,
        isSlideConsidered: true
      })
    );
  }
}
