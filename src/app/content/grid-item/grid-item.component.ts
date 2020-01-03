import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PageModel, UpdatePage, DeletePage, SetActivePage, WebviewData, selectWebviewDataFromPage, UpdatePageWebviewData, selectAllPagesState, PageState } from '../../states/page';
import { WebviewTag } from 'electron';
import { Store, select } from '@ngrx/store';
import { AppState, selectPagesById } from '../../states/reducers';
import { Update, Dictionary } from '@ngrx/entity';
import { PageCheck } from '../grids/grids.component';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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

  // firstUrl: string

  @ViewChild("webview", { read: false, static: false }) webview: ElementRef;
  @ViewChild("container", { read: false, static: false }) container: ElementRef;

  webviewDom: any
  isLoading: boolean = true

  subscriptionWebviewData: Subscription = null

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log("Init zoom check");

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
    webviewDom.addEventListener('will-navigate', (event) => {
      this.updatePage({
        url: event.url,
        urlChangeFromWebview: false
      })
    })

    webviewDom.addEventListener('page-title-updated', (event) => {
      console.log("page-title-update",event.title);
      
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

    webviewDom.addEventListener('did-stop-loading', (event) => {
      

      this.checkBackAndForwardAvailable()
    })

    webviewDom.addEventListener("devtools-closed", () => {
      this.updatePageWebviewData({ isDeveloperConsoleVisible: false })
    })

    webviewDom.addEventListener("dom-ready", () => {
      console.log("dom ready");
      this.checkBackAndForwardAvailable()
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
    if(!this.isLoading) {
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
