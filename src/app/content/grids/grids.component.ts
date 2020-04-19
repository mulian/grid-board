import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { Store, select } from "@ngrx/store"
import { filter } from "rxjs/operators"
import {
    AppState,
    selectAllTabIds,
    selectTabOptionsSelectTab,
    selectAllPagesEntitities,
    selectAllPagesState,
    selectAllTabsEntities,
    selectAllPagesEntititiesAsArray,
    selectAllTabsEntitiesAsArray,
} from "../../stores/reducers"
import {
    GridsterConfig,
    GridType,
    CompactType,
    DisplayGrid,
    GridsterItem,
    GridsterItemComponentInterface,
} from "angular-gridster2"
import { addPage, PageModel, updatePage } from "../../stores/page"
import { Update, Dictionary } from "@ngrx/entity"
import NgrxEntitySync from "../../ngrx-entity-sync"
import { TabModel } from "../../stores/tab"
import * as _ from "lodash-es"

export interface PageCheck extends PageModel {
    isDeleted?: boolean
}

@Component({
    selector: "app-grids",
    templateUrl: "./grids.component.html",
    styleUrls: ["./grids.component.scss"],
})
export class GridsComponent implements OnInit {
    pages$: { [key: string]: Observable<any> } = {}
    selectedPages$: Observable<any>
    selectTabs$: Observable<any>
    selectedTabId: string
    syncedTabData: NgrxEntitySync<TabModel>

    pageData: any

    constructor(private store: Store<AppState>) {}

    log(value: any) {
        console.log(value)
    }

    /**
     * Dont render old objects again, only update data.
     * @param index the array index
     * @param item the page item
     */
    trackByFn(index: number, item: any): string {
        return item.id // or item.id
    }

    ngOnInit() {
        this.selectTabs$ = this.store.select(selectAllTabsEntitiesAsArray)
        this.selectedPages$ = this.store.select(selectAllPagesEntititiesAsArray)

        this.store.pipe(select(selectTabOptionsSelectTab)).subscribe((tabId: string) => (this.selectedTabId = tabId))
    }

    emptyCellClickCallback(event, item: GridsterItem) {
        console.log("emptyCellClickCallback")
        this.store.dispatch(
            addPage({
                ...item,
                url: "http://google.de",
                tab: this.selectedTabId,
                addressbarOpen: true,
                isAdditionAddressbarOptionsOpen: false,
                zoomFactor: 1,
                zoomLevel: 0,
                isDeveloperConsoleVisible: false,
                isBackAvailable: false,
                isForwardAvailable: false,
                favicon: null,
                scrollX: 0,
                scrollY: 0,
                isDrag: false,
            })
        )
    }

    itemChangeCallback(item, component) {
        console.log("itemChangeCallback", item, component)

        const updatedPage: Update<PageModel> = {
            id: item.id,
            changes: item,
        }

        this.store.dispatch(updatePage({ page: updatedPage }))
    }
    itemResizeCallback(item, component) {
        console.log("itemResizeCallback", item, component)
    }
    emptyCellDropCallback(item, component) {
        console.log("emptyCellDropCallback", item, component)
    }
    initCallback(gridsterItem) {
        console.log("initCallback", gridsterItem)
    }

    setDrag(itemId: string, isDrag: boolean) {
        console.log("setDrag", itemId, isDrag)

        this.store.dispatch(
            updatePage({
                page: {
                    id: itemId,
                    changes: {
                        isDrag: isDrag,
                    },
                },
            })
        )
    }

    dragStart(item, gridsterItem, event) {
        console.log("start drag", item, gridsterItem, event)
        this.setDrag(item.id, true)
    }
    dragStop(item, gridsterItem, event) {
        console.log("stop drag", item, gridsterItem, event)
        this.setDrag(item.id, false)
    }

    resizeStart(item, gridsterItem, event) {
        console.log("start drag", item, gridsterItem, event)
        this.setDrag(item.id, true)
    }
    resizeStop(item, gridsterItem, event) {
        console.log("stop drag", item, gridsterItem, event)
        this.setDrag(item.id, false)
    }

    options: { [key: string]: GridsterConfig } = {}
    optionsChanged(tabId: string) {
        console.log("options changed for ", tabId)

        this.options[tabId].api.optionsChanged()
    }
    getOption(tabId: string): GridsterConfig {
        // console.log("get options for", tabId);
        if (!(tabId in this.options)) {
            // console.log("create tab", tabId);
            this.options[tabId] = {
                gridType: GridType.Fit,
                compactType: CompactType.None,
                margin: 5,
                outerMargin: true,
                outerMarginTop: null,
                outerMarginRight: null,
                outerMarginBottom: null,
                outerMarginLeft: null,
                innerMargin: true,
                innerMaginTop: 20,
                innerMaginBottom: 20,
                innerMaginRight: 20,
                innerMaginLeft: 20,
                useTransformPositioning: true,
                mobileBreakpoint: 640,
                minCols: 1,
                maxCols: 100,
                minRows: 1,
                maxRows: 100,
                maxItemCols: 100,
                minItemCols: 1,
                maxItemRows: 100,
                minItemRows: 1,
                maxItemArea: 2500,
                minItemArea: 1,
                defaultItemCols: 1,
                defaultItemRows: 1,
                fixedColWidth: 105,
                fixedRowHeight: 105,
                keepFixedHeightInMobile: false,
                keepFixedWidthInMobile: false,
                scrollSensitivity: 10,
                scrollSpeed: 20,
                enableEmptyCellClick: true,
                enableEmptyCellContextMenu: false,
                enableEmptyCellDrop: false,
                enableEmptyCellDrag: false,
                enableOccupiedCellDrop: false,
                emptyCellDragMaxCols: 50,
                emptyCellDragMaxRows: 50,
                ignoreMarginInRow: false,
                draggable: {
                    enabled: true,
                    dragHandleClass: "drag-handle",
                    ignoreContent: true,
                    start: (item, gridsterItem, event) => this.dragStart(item, gridsterItem, event),
                    stop: (item, gridsterItem, event) => this.dragStop(item, gridsterItem, event),
                },
                resizable: {
                    enabled: true,
                    start: (item, gridsterItem, event) => this.resizeStart(item, gridsterItem, event),
                    stop: (item, gridsterItem, event) => this.resizeStop(item, gridsterItem, event),
                },
                swap: false,
                pushItems: true,
                disablePushOnDrag: false,
                disablePushOnResize: false,
                pushDirections: { north: true, east: true, south: true, west: true },
                pushResizeItems: false,
                displayGrid: DisplayGrid.Always,
                disableWindowResize: false,
                disableWarnings: false,
                scrollToNewItems: false,

                itemChangeCallback: (item, itemComponent) => this.itemChangeCallback(item, itemComponent),
                itemResizeCallback: (item, itemComponent) => this.itemResizeCallback(item, itemComponent),
                emptyCellDropCallback: (item, itemComponent) => this.emptyCellDropCallback(item, itemComponent),
                initCallback: itemComponent => this.initCallback(itemComponent),
                emptyCellClickCallback: (item, itemComponent) => this.emptyCellClickCallback(item, itemComponent),
            }
        }
        return this.options[tabId]
    }
}
