import { Component, OnInit, AfterViewInit, Input, Output, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, selectAllPagesFromTab, selectPagesOptions } from '../../states/reducers';
import { Store, select } from '@ngrx/store';
import { Tab } from '../../states/tab';
import { Page } from '../../states/page';

import { GridsterConfig, GridsterItem, DisplayGrid, CompactType, GridType }  from 'angular-gridster2';
import { AppComponent } from '../../app.component';

interface GridsterItemPage extends GridsterItem {
  id: string
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {

  options: GridsterConfig;
  dashboard: Array<GridsterItemPage>;

  web: GridsterItemPage= {
    rows: 2,
    cols: 2,
    x: 0,
    y: 0,
    id: "asd"
  };
  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }
  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }
  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    // this.dashboard.push({});
  }

  @Output() 
  refresh() {
    this.options.api.resize()
  }
  @Input()
  tab:Tab

  @Input()
  pageOptions:any

  Arr = Array;

  pages$: Observable<any>;
  pageOptions$: Observable<any>;

  alreadyOpen:boolean=false;
  
  constructor(private store: Store<AppState>) { }

  log(value:any) {
    console.log(value);
    
  }

  ngAfterViewInit() {
    // document.getElementById("pageTable").style.height = (document.documentElement.offsetHeight-20)+'px'
    
    
  }

  

  getMax(type,pages:Page[]) {
    let max:number=0
    for(let page of pages) {
      if(page[type]>max) {
        max=page[type]
      }
    }
    
    return max
  }

  ngOnInit() {
    console.log("init pages",this.tab);
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 10,
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
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      itemChangeCallback: (item,component) => {
        console.log(item,component);
        
      },
      itemResizeCallback:(item,component) => {
        console.log(item,component);
        
      },
      emptyCellDropCallback: (item,component) => {
        console.log(item,component);
        
      },

    };
    
    this.pages$ = this.store.pipe(select(selectAllPagesFromTab,{tabId: this.tab.id}));
    this.pageOptions$ = this.store.pipe(select(selectPagesOptions))

    // console.log("ngOnInit: alreadyOpen: "+this.alreadyOpen);
    // this.alreadyOpen=true;

    // this.options = {
    //   itemChangeCallback: AppComponent.itemChange,
    //   itemResizeCallback: this.itemResize,
    // };

    this.dashboard = [
      {cols: 2, rows: 1, y: 0, x: 0, id:"bla"},
      {cols: 2, rows: 2, y: 0, x: 2, id:"blubb"}
    ];
  }

}
