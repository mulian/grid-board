import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Page, LoadPageFinished } from '../states/tab';
import { AppState, getCurrentTabPage } from '../states/reducers';
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

  page$:Observable<any>

  webview:WebView;

  height:number;

  constructor(private store: Store<AppState>) { }

  ngAfterViewInit() {
    // console.log("try to get webview_"+this.pageId);
    
    this.webview = document.getElementById('webview_'+this.pageX+'_'+this.pageY) as WebView

    console.log(this.webview);
    

    this.webview.addEventListener('did-finish-load',() => this.finishLoadWebview())
    this.height = (document.documentElement.offsetHeight * (this.rowCount/(this.pageY+1)))-50;

    console.log(this.rowCount,this.pageY);
    
    
    

    // this.webview.src = this.page.url; 
  }
  ngAfterContentInit() {

  }

  ngOnInit() {
    this.page$ = this.store.pipe(select(getCurrentTabPage,{x:this.pageX,y:this.pageY}));
    // console.log(this.page);
  }

  finishLoadWebview() {
    // console.log("jo",this.pageId);
    
    // this.store.dispatch(new LoadPageFinished({pageId:this.pageId,title:this.webview.getTitle()}));
  }

  getTitle() {
    return this.webview.getTitle()
  }

}
