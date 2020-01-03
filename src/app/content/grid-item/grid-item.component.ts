import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PageModel, UpdatePage, DeletePage, SetActivePage, WebviewData, selectWebviewDataFromPage } from '../../states/page';
import { WebviewTag } from 'electron';
import { Store, select } from '@ngrx/store';
import { AppState, selectPagesById } from '../../states/reducers';
import { Update } from '@ngrx/entity';
import { PageCheck } from '../grids/grids.component';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit, AfterViewInit {
  useragent: string = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"
  webvieCallbacks: any = {}
  @Input()
  item: PageCheck

  @ViewChild("webview", { read: false, static: false }) webview: ElementRef;
  @ViewChild("container", { read: false, static: false }) container: ElementRef;

  webviewDom:any
  isLoading:boolean=true

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {    
    this.webview.nativeElement.addEventListener('will-navigate', (event) => {
      
      let update: Update<PageModel> = {
        id: this.item.id,
        changes: {
          url: event.url,
          urlChangeFromWebview: false
        }
      }
      this.store.dispatch(new UpdatePage({ page: update }))
    })
    this.webview.nativeElement.addEventListener('did-finish-load', () => {
      console.log("did finish loading");
      
      this.isLoading=false
      console.log("title: ", this.webview.nativeElement.getTitle());

      this.webview.nativeElement.setZoomLevel(this.item.webviewData.zoomLevel)

      if(this.item.webviewData.isDeveloperConsoleVisible) this.webview.nativeElement.openDevTools()
    })

    this.container.nativeElement.addEventListener("mouseenter", (event) => this.onMouseOver(event))
    this.container.nativeElement.addEventListener("mouseleave", (event) => this.onMouseOut(event))

    this.webview.nativeElement.addEventListener('did-stop-loading', () => {
      console.log("did-stop-loading",this.item.webviewData);
    })

    this.webview.nativeElement.addEventListener("devtools-closed",() => {
      this.store.dispatch(new UpdatePage({
        page: {
          id: this.item.id,
          changes: {
            webviewData: {
              isDeveloperConsoleVisible: false,
              zoomFactor: this.item.webviewData.zoomFactor,
              zoomLevel: this.item.webviewData.zoomLevel,
            }
          }
        }
      })
      )
    })

    this.webview.nativeElement.addEventListener("dom-ready",() => {
      console.log("dom ready");
      
      this.store.dispatch(new UpdatePage({
        page: {
          id: this.item.id,
          changes: {
            name: this.webview.nativeElement.getTitle()
          }
        }
      })
      )
    })
    this.store.pipe(select(selectWebviewDataFromPage(this.item.id))).subscribe((webviewData:WebviewData) => {
      if(!this.isLoading) {
        this.webview.nativeElement.setZoomLevel(webviewData.zoomLevel)

        if(this.item.webviewData.isDeveloperConsoleVisible) this.webview.nativeElement.openDevTools()
        else this.webview.nativeElement.closeDevTools()
      }
    })
  }
  onMouseOver(event) {
    this.store.dispatch(new SetActivePage({ pageId: this.item.id, active: true }))
  }
  onMouseOut(event) {
    this.store.dispatch(new SetActivePage({ pageId: this.item.id, active: false }))
  }

  reload() {
    console.log("reload?");

    let update: Update<PageModel> = {
      id: this.item.id,
      changes: {
        reload: false
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
    this.webview.nativeElement.reload()
  }
  back() {
    console.log("back?");

    let update: Update<PageModel> = {
      id: this.item.id,
      changes: {
        back: false
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
    this.webview.nativeElement.goBack()
  }
  forward() {
    console.log("forward?");

    let update: Update<PageModel> = {
      id: this.item.id,
      changes: {
        forward: false
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
    this.webview.nativeElement.goForward()
  }
}
