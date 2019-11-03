import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Page, LoadPageFinished } from '../states/tab';
import { AppState, getCurrentTabPage, getPagesByTabIdAndArrayIndexes } from '../states/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

interface WebView extends HTMLElement {
  src: string
  getTitle():string
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit {
  @Input()
  pageX:number;

  @Input()
  pageY:number;

  @Input()
  rowCount:number;

  @Input()
  tabId:number;

  page$:Observable<any>

  webview:WebView;

  height:number;


  alreadyOpen:boolean=false;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.page$ = this.store.pipe(select(getPagesByTabIdAndArrayIndexes,{x:this.pageX,y:this.pageY,tabId:this.tabId}));
    // console.log(this.page);
    
  }

  ngAfterViewInit() {
    // console.log("try to get webview_"+this.pageId);
    
    this.webview = document.getElementById('webview_'+this.pageX+'_'+this.pageY) as WebView

    console.log(this.webview);
    

    this.webview.addEventListener('did-finish-load',() => this.finishLoadWebview())
    this.height = (document.documentElement.offsetHeight / this.rowCount)-50;

    console.log(this.rowCount,this.pageY);
    
    
    

    // this.webview.src = this.page.url; 
  }

  finishLoadWebview() {
    // console.log("jo",this.pageId);
    
    // this.store.dispatch(new LoadPageFinished({pageId:this.pageId,title:this.webview.getTitle()}));
  }

  getTitle() {
    return this.webview.getTitle()
  }

}
