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

  constructor(private store: Store<AppState>) { }
  currentPageId:string = null
  ngOnInit() {
    console.log("Init zoom check");
    this.store.pipe(select(selectTabOptionsSelectTab)).subscribe((selectedTabId: string) => {
      if (!this.isLoading) {
        console.log(this.currentTab, selectedTabId, this.item.tab);
        let webviewDom = this.webview.nativeElement
        if (this.currentTab != selectedTabId && selectedTabId == this.item.tab) {
          
          webviewDom.send("show-tab")
        } else if(this.currentTab == this.item.tab && selectedTabId != this.item.tab) {
          webviewDom.send("leave-tab")
        }
      }
      this.currentTab = selectedTabId
    })
    this.store.pipe(select(selectActivePage)).subscribe((currentActivePage: string) => {
      if (!this.isLoading) {
        let webviewDom = this.webview.nativeElement
        if(this.item.tab==this.currentTab) {
          if (this.item.id == currentActivePage) webviewDom.send("is-focus")
          else if(this.currentPageId==this.item.id) webviewDom.send("leave-focus")
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

  ngAfterViewInit(): void {
    let webviewDom = this.webview.nativeElement
    console.log(__dirname);

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
        webviewDom.send("show-tab")
      }

      webviewDom.send("webviewdata", this.item.webviewData)
      webviewDom.addEventListener('ipc-message', (event) => {
        //TODO: only update every secound...
        console.log('ipc-message', event);
        if (event.channel == "change_scroll") {
          this.updatePageWebviewData(event.args[0])
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
    this.updatePage({ reload: false })
    this.webview.nativeElement.reload()
  }
  back() {
    this.updatePage({ back: false })
    this.webview.nativeElement.goBack()
  }
  forward() {
    this.updatePage({ forward: false })
    this.webview.nativeElement.goForward()
  }

  ngOnDestroy(): void {
    this.subscriptionWebviewData.unsubscribe()
  }
}
