import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Page, UpdatePage, DeletePage } from '../../states/page';
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

  webvieCallbacks: any = {}
  reload() {
    console.log("reload?");
    
    let update: Update<Page> = {
      id: this.item.id,
      changes: {
        reload:false
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
    this.webview.nativeElement.reload()
  }
  back() {
    console.log("back?");
    
    let update: Update<Page> = {
      id: this.item.id,
      changes: {
        back:false
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
    this.webview.nativeElement.goBack()
  }
  forward() {
    console.log("forward?");
    
    let update: Update<Page> = {
      id: this.item.id,
      changes: {
        forward:false
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
    this.webview.nativeElement.goForward()
  }
  ngAfterViewInit(): void {
    this.webview.nativeElement.addEventListener('will-navigate', (event) => {
      let update: Update<Page> = {
        id: this.item.id,
        changes: {
          url: event.url,
          urlChangeFromWebview: false
        }
      }
      this.store.dispatch(new UpdatePage({page:update}))
    })
    this.webview.nativeElement.addEventListener('did-finish-load', () => {
      console.log("jo");
      
      console.log("title: ", this.webview.nativeElement.getTitle());
      this.item.name = this.webview.nativeElement.getTitle()
      // webview.openDevTools()
    })
    // this.container.nativeElement.addEventListener("mouseover",(event) => {
    //   console.log("hover");
      
    //   this.item.isHover=true
    // })
    // this.container.nativeElement.addEventListener("mouseout",(event) => {
    //   console.log("out");
      
    //   this.item.isHover=false
    // })
  }
  @Input()
  item: PageCheck

  @ViewChild("webview",{read:false,static:false}) webview: ElementRef;
  @ViewChild("container",{read:true,static:true}) container: ElementRef;

  // item: Page

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.item);
    
    this.item.isHover = true
  }
}
