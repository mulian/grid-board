import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PageModel, UpdatePage, DeletePage, SetActivePage, WebviewData, selectWebviewDataFromPage, UpdatePageWebviewData, selectAllPagesState, PageState, AddPage, selectActivePage } from '../../states/page';
import { WebviewTag } from 'electron';
import { Store, select } from '@ngrx/store';
import { AppState, selectPagesById, selectTabOptionsSelectTab } from '../../states/reducers';
import { Update, Dictionary } from '@ngrx/entity';
import { PageCheck } from '../grids/grids.component';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ipcRenderer } from 'electron'
import { KeyboardService } from '../../dialogs/dialog-settings/settings-keyboard/keyboard.service'


import { isDevMode } from '@angular/core';
import { IpcService } from '../../dialogs/dialog-settings/settings-history/ipc.service';
import { GridWebview } from './grid-webview';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit, AfterViewInit, OnDestroy {
  useragent: string = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"
  webvieCallbacks: any = {}
  @Input()
  item: PageCheck

  currentTab: string

  // firstUrl: string

  @ViewChild("webview", { read: false, static: false }) webview: ElementRef;
  @ViewChild("container", { read: false, static: false }) container: ElementRef;

  webviewDom: any
  gridWebview: GridWebview;

  constructor(private store: Store<AppState>, private keyboardService: KeyboardService, private ipcService: IpcService) { }
  currentPageId: string = null
  ngOnInit() {
    this.gridWebview = new GridWebview(this.store, this.ipcService, this.item, this.keyboardService)

    //Send tab-show and tab-leave to page
    this.store.pipe(select(selectTabOptionsSelectTab)).subscribe((selectedTabId: string) => {
      if (!this.gridWebview.isLoading()) {
        let webviewDom = this.webview.nativeElement
        if (this.currentTab != selectedTabId && selectedTabId == this.item.tab) {

          webviewDom.send("tab-show")
        } else if (this.currentTab == this.item.tab && selectedTabId != this.item.tab) {
          webviewDom.send("tab-leave")
        }
      }
      this.gridWebview.setCurrentTab(selectedTabId)
      this.currentTab = selectedTabId
    })
    //Send page-focus and page-leave to page
    this.store.pipe(select(selectActivePage)).subscribe((currentActivePage: string) => {
      if (!this.gridWebview.isLoading()) {
        let webviewDom = this.webview.nativeElement
        if (this.item.tab == this.currentTab) {
          if (this.item.id == currentActivePage) webviewDom.send("page-focus")
          else if (this.currentPageId == this.item.id) webviewDom.send("page-leave")
        }
      }
      this.currentPageId = currentActivePage
    })
  }

  ngAfterViewInit(): void {
    this.gridWebview.domReady(this.webview)

    this.container.nativeElement.addEventListener("mouseenter", (event) => this.onMouseOver(event))
    this.container.nativeElement.addEventListener("mouseleave", (event) => this.onMouseOut(event))
  }

  updatePage(changes: Partial<PageModel>) {
    this.store.dispatch(new UpdatePage({
      page: { id: this.item.id, changes }
    }))
  }
  updatePageWebviewData(changes: Partial<WebviewData>) {
    this.store.dispatch(new UpdatePageWebviewData({
      pageWebview: { id: this.item.id, changes }
    }))
  }

  onMouseOver(event) {
    this.store.dispatch(new SetActivePage({ pageId: this.item.id, active: true }))
  }
  onMouseOut(event) {
    this.store.dispatch(new SetActivePage({ pageId: this.item.id, active: false }))
  }

  reload() {
    if (!this.gridWebview.isLoading()) {
      this.webview.nativeElement.reload()
      this.updatePage({ reload: false })
    }
  }
  back() {
    if (!this.gridWebview.isLoading()) {
      this.webview.nativeElement.goBack()
      this.updatePage({ back: false })
    }
  }
  forward() {
    if (!this.gridWebview.isLoading()) {
      this.webview.nativeElement.goForward()
      this.updatePage({ forward: false })
    }
  }

  ngOnDestroy(): void {
    this.gridWebview.destroy()
  }
}
