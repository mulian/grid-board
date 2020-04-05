import { ElementRef } from "@angular/core"
import { Store, select } from "@ngrx/store"
import { AppState } from "../../states/reducers"
import { IpcService } from "../../dialogs/dialog-settings/settings-history/ipc.service"
import {
    updatePage,
    PageModel,
    WebviewData,
    addPage,
    PageState,
    selectAllPagesState,
    selectAllPagesEntities,
} from "../../states/page"
import * as path from "path"
import { PageCheck } from "../grids/grids.component"
import { KeyboardService } from "../../dialogs/dialog-settings/settings-keyboard/keyboard.service"
import { map } from "rxjs/operators"
import { Subscription } from "rxjs"

export class GridWebview {
    _isLoading: boolean = true
    _currentTab: string
    webview: ElementRef<any>
    subscriptionWebviewData: Subscription = null
    currentZoomLevel: number = null

    constructor(
        private store: Store<AppState>,
        private ipcService: IpcService,
        private item: PageCheck,
        private keyboardService: KeyboardService
    ) {
        //Set zoom level
        console.log("check zoomlevel for ", this.item.id)

        this.subscriptionWebviewData = this.store.pipe(select(selectAllPagesEntities)).subscribe((page: PageModel) => {
            if (this.currentZoomLevel == null) this.currentZoomLevel = page.zoomLevel //dont set zoom level on init, therefore did-finish-load

            if (!this._isLoading && page.zoomLevel != this.currentZoomLevel) {
                this.currentZoomLevel = page.zoomLevel
                console.log("set zoomlevel to ", page.zoomLevel)

                let webviewDom = this.webview.nativeElement
                webviewDom.setZoomLevel(page.zoomLevel)
                if (this.item.page.isDeveloperConsoleVisible) webviewDom.openDevTools()
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
        if (isServ) {
            //is dev mode
            switch (window.navigator.platform) {
                case "MacIntel": {
                    let electronAppResourcesPath = __dirname.substr(0, __dirname.length - 22) //cause asar is a file for node file
                    console.log("jo: ", electronAppResourcesPath)
                    return path.join(
                        "file://",
                        electronAppResourcesPath,
                        "../../../../../../src/assets/webview/webview.preinjection.js"
                    )
                }
                case "Win32": {
                    return "file://" + __dirname + "/../../../../../../src/assets/webview/webview.preinjection.js"
                }
                default:
                    return ""
            }
        } else {
            console.log("__dirname", __dirname)
            return path.join("file://", __dirname, "./assets/webview/webview.preinjection.js")
        }
    }

    setCurrentTab(tab: string) {
        this._currentTab = tab
    }
    isLoading(): boolean {
        return this._isLoading
    }

    updatePage(changes: Partial<PageModel>) {
        this.store.dispatch(
            updatePage({
                page: { id: this.item.id, changes },
            })
        )
    }

    initEventListener() {
        let webviewDom = this.webview.nativeElement

        console.log("jsfile:", this.getPreinjectionFile())

        webviewDom.setAttribute("preload", this.getPreinjectionFile())

        webviewDom.addEventListener("did-navigate-in-page", event => {
            //e.g. on click on hash
            console.log("did-navigate-in-page", event)
            if (event.isMainFrame) {
                this.updatePage({
                    url: event.url,
                    urlChangeFromWebview: true,
                })
            }
        })
        webviewDom.addEventListener("will-navigate", event => {
            console.log("will-navigate")

            this.updatePage({
                url: event.url,
                urlChangeFromWebview: true,
            })
        })

        webviewDom.addEventListener("page-title-updated", event => {
            console.log("page-title-update", event.title, event)

            this.updatePage({ name: event.title })
        })
        webviewDom.addEventListener("did-finish-load", () => {
            console.log("did finish loading")

            this._isLoading = false

            webviewDom.setZoomLevel(this.item.zoomLevel)

            if (this.item.isDeveloperConsoleVisible) webviewDom.openDevTools()
        })

        webviewDom.addEventListener("new-window", event => {
            console.log("new-window", event)

            this.store.dispatch(
                addPage({
                    cols: 1,
                    rows: 1,
                    x: 0,
                    y: 0,
                    url: event.url,
                    tab: this._currentTab,
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
        })

        webviewDom.addEventListener("page-favicon-updated", event => {
            console.log("page-favicon-update ", event.favicons)
            this.updatePage({ favicon: event.favicons[0] })
        })

        webviewDom.addEventListener("did-stop-loading", event => {
            console.log("did stop loading")

            this.checkBackAndForwardAvailable()
        })

        webviewDom.addEventListener("devtools-closed", () => {
            this.updatePage({ isDeveloperConsoleVisible: false })
        })

        webviewDom.addEventListener("dom-ready", event => {
            console.log("dom ready", event)
            //additional check for url change / cause i dont find any event for navigate back ....
            if (this.item.url != webviewDom.getURL()) {
                this.updatePage({
                    url: webviewDom.getURL(),
                    urlChangeFromWebview: true,
                })
            }

            this.checkBackAndForwardAvailable()

            if (this._currentTab == this.item.tab) {
                let webviewDom = this.webview.nativeElement
                webviewDom.send("tab-show")
            }

            webviewDom.send("webviewdata", this.item)
            webviewDom.addEventListener("ipc-message", event => {
                //TODO: only update every secound...
                console.log("ipc-message", event)
                if (event.channel == "change_scroll") {
                    this.updatePage(event.args[0])
                } else if (event.channel == "keydown-client") {
                    this.keyboardService.checkTypeInput(event.args[0])
                    console.log(event.args[0])
                    //TODO: Check keydown
                }
            })
        })
    }

    checkBackAndForwardAvailable() {
        if (!this._isLoading) {
            let webviewDom = this.webview.nativeElement
            this.updatePage({
                isBackAvailable: webviewDom.canGoBack(),
                isForwardAvailable: webviewDom.canGoForward(),
            })
        }
    }

    destroy() {
        this.subscriptionWebviewData.unsubscribe()
    }
}
