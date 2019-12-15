import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState, selectAllTabIds, selectTabOptionsSelectTab, selectAllPagesEntitities, selectAllPagesState, selectAllTabsEntities } from '../../states/reducers';
import { GridsterConfig, GridType, CompactType, DisplayGrid, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { AddPage, Page, UpdatePage } from '../../states/page';
import { Update } from '@ngrx/entity';
import NgrxEntitySync from '../../ngrx-entity-sync';
import { Tab } from '../../states/tab';
import * as _ from 'lodash-es'

export interface PageCheck extends Page {
  isDeleted?:boolean
}

@Component({
  selector: 'app-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.scss']
})
export class GridsComponent implements OnInit {
  pages$: { [key:string]: Observable<any>} = {}
  // selectedTab$: Observable<any>
  selectedTabId: string
  syncedTabData: NgrxEntitySync<Tab>;
  syncedPageData: NgrxEntitySync<Page>;

  

  constructor(private store: Store<AppState>) { }

  log(value:any) {
    console.log(value);
    
  }

  ngOnInit() {
    console.log("init");

    this.syncedTabData = new NgrxEntitySync<Tab>(this.store,selectAllTabsEntities,(tab) => tab.id)
    this.syncedPageData = new NgrxEntitySync<Page>(this.store,selectAllPagesEntitities,(page) => page.id)
  
    this.store.pipe(select(selectTabOptionsSelectTab)).subscribe((tabId: string) => this.selectedTabId = tabId)
  }
  getPagesFromTabId(tabId:string) {
    return _.filter(this.syncedPageData.getSyncedData(),{tab:tabId})
  }

  emptyCellClickCallback(event, item: GridsterItem) {
    console.log("emptyCellClickCallback");
    this.store.dispatch(new AddPage({
      page: {
        ...item,
        url: "http://google.de",
        tab: this.selectedTabId
      }
    }))
  }

  itemChangeCallback(item, component) {
    console.log("itemChangeCallback", item, component);

    const updatedPage: Update<Page> = {
      id: item.id,
      changes: item
    }

    this.store.dispatch(new UpdatePage({ page: updatedPage }))
  }
  itemResizeCallback(item, component) {
    console.log("itemResizeCallback", item, component);

  }
  emptyCellDropCallback(item, component) {
    console.log("emptyCellDropCallback", item, component);

  }
  initCallback(gridsterItem) {
    console.log("initCallback", gridsterItem);

  }

  dragStart(item, gridsterItem, event) {
    console.log("start drag", item, gridsterItem, event);
    item.setDrag = true
  }
  dragStop(item, gridsterItem, event) {
    console.log("stop drag", item, gridsterItem, event);
    item.setDrag = false
  }

  resizeStart(item, gridsterItem, event) {
    console.log("start drag", item, gridsterItem, event);
    item.setDrag = true
  }
  resizeStop(item, gridsterItem, event) {
    console.log("stop drag", item, gridsterItem, event);
    item.setDrag = false
  }

  options: { [key: string]: GridsterConfig } = {}
  optionsChanged(tabId: string) {
    console.log("options changed for ",tabId);
    
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
          start: this.dragStart,
          stop: this.dragStop,
        },
        resizable: {
          enabled: true,
          start: this.resizeStart,
          stop: this.resizeStop,
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
        initCallback: (itemComponent) => this.initCallback(itemComponent),
        emptyCellClickCallback: (item, itemComponent) => this.emptyCellClickCallback(item, itemComponent)
      }
    }
    return this.options[tabId]
  }
}
