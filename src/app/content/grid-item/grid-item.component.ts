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
import * as path from 'path'

import { isDevMode } from '@angular/core';

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
  isLoading: boolean = true

  subscriptionWebviewData: Subscription = null

  constructor(private store: Store<AppState>, private keyboardService:KeyboardService) { }
  currentPageId:string = null
  ngOnInit() {
    console.log("Init zoom check");
    this.store.pipe(select(selectTabOptionsSelectTab)).subscribe((selectedTabId: string) => {
      if (!this.isLoading) {
        console.log(this.currentTab, selectedTabId, this.item.tab);
        let webviewDom = this.webview.nativeElement
        if (this.currentTab != selectedTabId && selectedTabId == this.item.tab) {
          
          webviewDom.send("tab-show")
        } else if(this.currentTab == this.item.tab && selectedTabId != this.item.tab) {
          webviewDom.send("tab-leave")
        }
      }
      this.currentTab = selectedTabId
    })
    this.store.pipe(select(selectActivePage)).subscribe((currentActivePage: string) => {
      if (!this.isLoading) {
        let webviewDom = this.webview.nativeElement
        if(this.item.tab==this.currentTab) {
          if (this.item.id == currentActivePage) webviewDom.send("page-focus")
          else if(this.currentPageId==this.item.id) webviewDom.send("page-leave")
        }
      }
      this.currentPageId = currentActivePage
    })
    this.subscriptionWebviewData = this.store.pipe(select(selectAllPagesState))
      .pipe(map((pageState: PageState) => pageState.entities[this.item.id].webviewData))
      .subscribe((webviewData: WebviewData) => {
        if (!this.isLoading) {
          let webviewDom = this.webview.nativeElement
          webviewDom.setZoomLevel(webviewData.zoomLevel)
          webviewDom.setZoomFactor(webviewData.zoomFactor)
          if (this.item.webviewData.isDeveloperConsoleVisible) webviewDom.openDevTools()
          else webviewDom.closeDevTools()
        }
      })

    // this.store.pipe(select(selectAllPagesState))
    // .pipe(map((pageState: PageState) => pageState.entities[this.item.id]))
    // .subscribe((page: PageModel) => {
    //   if (!this.isLoading) {
    //     let webviewDom = this.webview.nativeElement
    //     if(this.item.url!=page.url) webviewDom.
    //   }
    // })
    // this.firstUrl = this.item.url
  }

  getPreinjectionFile():string {
    if(isDevMode) {
      switch(window.navigator.platform) {
        case "MacIntel": {
          return path.join( "file://" , __dirname, '../../app.asar/src/assets/webview/webview.preinjection.js')
        }
      }
    } else {
      return path.join( "file://" , __dirname, '../../app.asar/src/assets/webview/webview.preinjection.js')
    }
  }

  ngAfterViewInit(): void {
    let webviewDom = this.webview.nativeElement
    console.log(__dirname);
    console.log(window.navigator.platform);
    
    console.log(path.join(__dirname + '/assets/webview/webview.preinjection.js'));
    
    // webviewDom.setAttribute("preload", path.join( "file://" + __dirname + '/src/assets/webview/webview.preinjection.js'))
    webviewDom.setAttribute("preload", "file://" + __dirname + "/../../../../../../src/assets/webview/webview.preinjection.js")
    // preload="file://"+${__dirname}+"/assets/webview/webview.preinjection.js"
    webviewDom.addEventListener('will-navigate', (event) => {
      this.updatePage({
        url: event.url,
        urlChangeFromWebview: false
      })
    })

    webviewDom.addEventListener('page-title-updated', (event) => {
      console.log("page-title-update", event.title);

      this.updatePage({ name: event.title })
    })
    webviewDom.addEventListener('did-finish-load', () => {
      console.log("did finish loading");

      this.isLoading = false

      webviewDom.setZoomLevel(this.item.webviewData.zoomLevel)
      webviewDom.setZoomFactor(this.item.webviewData.zoomFactor)

      if (this.item.webviewData.isDeveloperConsoleVisible) webviewDom.openDevTools()

    })

    this.container.nativeElement.addEventListener("mouseenter", (event) => this.onMouseOver(event))
    this.container.nativeElement.addEventListener("mouseleave", (event) => this.onMouseOut(event))

    webviewDom.addEventListener('new-window', (event) => {
      console.log('new-window', event);

      this.store.dispatch(new AddPage({
        page: {
          cols: 1,
          rows: 1,
          x: 0,
          y: 0,
          url: event.url,
          tab: this.currentTab,
          addressbarOpen: true,
          isAdditionAddressbarOptionsOpen: false,
          webviewData: {
            zoomFactor: 1,
            zoomLevel: 1,
            isDeveloperConsoleVisible: false,
            isBackAvailable: false,
            isForwardAvailable: false,
            favicon: null,
            scrollX: 0,
            scrollY: 0
          }
        }
      }))
    })

    webviewDom.addEventListener('page-favicon-updated', (event) => {
      console.log("page-favicon-update ", event.favicons);
      this.updatePageWebviewData({ favicon: event.favicons[0] })
    })

    webviewDom.addEventListener('did-stop-loading', (event) => {


      this.checkBackAndForwardAvailable()
    })

    webviewDom.addEventListener("devtools-closed", () => {
      this.updatePageWebviewData({ isDeveloperConsoleVisible: false })
    })

    webviewDom.addEventListener("dom-ready", () => {
      console.log("dom ready");
      this.checkBackAndForwardAvailable()

      if (this.currentTab == this.item.tab) {
        let webviewDom = this.webview.nativeElement
        webviewDom.send("tab-show")
      }

      webviewDom.send("webviewdata", this.item.webviewData)
      webviewDom.addEventListener('ipc-message', (event) => {
        //TODO: only update every secound...
        console.log('ipc-message', event);
        if (event.channel == "change_scroll") {
          this.updatePageWebviewData(event.args[0])
        } else if(event.channel == "keydown-client") {
          this.keyboardService.checkTypeInput(event.args[0])
          console.log(event.args[0]);
          //TODO: Check keydown
        }
      })
    })
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

  checkBackAndForwardAvailable() {
    if (!this.isLoading) {
      let webviewDom = this.webview.nativeElement
      this.updatePageWebviewData({
        isBackAvailable: webviewDom.canGoBack(),
        isForwardAvailable: webviewDom.canGoForward(),
      })
    }
  }

  onMouseOver(event) {
    this.store.dispatch(new SetActivePage({ pageId: this.item.id, active: true }))
  }
  onMouseOut(event) {
    this.store.dispatch(new SetActivePage({ pageId: this.item.id, active: false }))
  }

  reload() {
    this.webview.nativeElement.reload()
    this.updatePage({ reload: false })
  }
  back() {
    this.webview.nativeElement.goBack()
    this.updatePage({ back: false })
  }
  forward() {
    this.webview.nativeElement.goForward()
    this.updatePage({ forward: false })
  }

  ngOnDestroy(): void {
    this.subscriptionWebviewData.unsubscribe()
  }
}
