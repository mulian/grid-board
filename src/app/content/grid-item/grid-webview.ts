import { ElementRef } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../states/reducers";
import { IpcService } from "../../dialogs/dialog-settings/settings-history/ipc.service";
import { UpdatePage, PageModel, WebviewData, UpdatePageWebviewData, AddPage, PageState, selectAllPagesState } from "../../states/page";
import * as path from 'path'
import { PageCheck } from "../grids/grids.component";
import { KeyboardService } from "../../dialogs/dialog-settings/settings-keyboard/keyboard.service";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

export class GridWebview {
  _isLoading: boolean = true;
  _currentTab: string;
  webview: ElementRef<any>;
  subscriptionWebviewData: Subscription = null
  currentZoomLevel: number = null

  constructor(private store: Store<AppState>, private ipcService: IpcService, private item: PageCheck, private keyboardService: KeyboardService) {
    //Set zoom level
    console.log("check zoomlevel for ",this.item.id);
    
    this.subscriptionWebviewData = this.store.pipe(select(selectAllPagesState))
      .pipe(map((pageState: PageState) => pageState.entities[this.item.id].webviewData))
      .subscribe((webviewData: WebviewData) => {
        if(this.currentZoomLevel==null) this.currentZoomLevel = webviewData.zoomLevel //dont set zoom level on init, therefore did-finish-load

        if (!this._isLoading && webviewData.zoomLevel!=this.currentZoomLevel) {
          this.currentZoomLevel = webviewData.zoomLevel
          console.log("set zoomlevel to ",webviewData.zoomLevel);
          
          let webviewDom = this.webview.nativeElement
          webviewDom.setZoomLevel(webviewData.zoomLevel)
          if (this.item.webviewData.isDeveloperConsoleVisible) webviewDom.openDevTools()
          else webviewDom.closeDevTools()
        }
      })
  }

  domReady(webview: ElementRef<any>) {
    this.webview = webview
    this.initEventListener()
  }

  getPreinjectionFile() {
    let isServ: boolean = this.ipcService.sendSync("isServ", null)
    if (isServ) { //is dev mode
      switch (window.navigator.platform) {
        case "MacIntel": {
          let electronAppResourcesPath = __dirname.substr(0, __dirname.length - 22) //cause asar is a file for node file
          console.log("jo: ", electronAppResourcesPath);
          return path.join("file://", electronAppResourcesPath, '../../../../../../src/assets/webview/webview.preinjection.js')
        }
        case "Win32": {
          return "file://" + __dirname + "/../../../../../../src/assets/webview/webview.preinjection.js"
        }
        default: return ""
      }
    } else {
      console.log("__dirname", __dirname);
      return path.join("file://", __dirname, './assets/webview/webview.preinjection.js')
    }
  }

  setCurrentTab(tab: string) {
    this._currentTab = tab
  }
  isLoading(): boolean {
    return this._isLoading
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


  initEventListener() {
    let webviewDom = this.webview.nativeElement

    // webviewDom.setAttribute("preload", path.join( "file://" + __dirname + '/src/assets/webview/webview.preinjection.js'))
    console.log("jsfile:", this.getPreinjectionFile());

    webviewDom.setAttribute("preload", this.getPreinjectionFile())
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

      this._isLoading = false

      webviewDom.setZoomLevel(this.item.webviewData.zoomLevel)

      if (this.item.webviewData.isDeveloperConsoleVisible) webviewDom.openDevTools()

    })

    webviewDom.addEventListener('new-window', (event) => {
      console.log('new-window', event);

      this.store.dispatch(new AddPage({
        page: {
          cols: 1,
          rows: 1,
          x: 0,
          y: 0,
          url: event.url,
          tab: this._currentTab,
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
          },
          isDrag: false
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

      if (this._currentTab == this.item.tab) {
        let webviewDom = this.webview.nativeElement
        webviewDom.send("tab-show")
      }

      webviewDom.send("webviewdata", this.item.webviewData)
      webviewDom.addEventListener('ipc-message', (event) => {
        //TODO: only update every secound...
        console.log('ipc-message', event);
        if (event.channel == "change_scroll") {
          this.updatePageWebviewData(event.args[0])
        } else if (event.channel == "keydown-client") {
          this.keyboardService.checkTypeInput(event.args[0])
          console.log(event.args[0]);
          //TODO: Check keydown
        }
      })
    })
  }

  checkBackAndForwardAvailable() {
    if (!this._isLoading) {
      let webviewDom = this.webview.nativeElement
      this.updatePageWebviewData({
        isBackAvailable: webviewDom.canGoBack(),
        isForwardAvailable: webviewDom.canGoForward(),
      })
    }
  }

  destroy() {
    this.subscriptionWebviewData.unsubscribe()
  }
}