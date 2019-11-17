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
  ngAfterViewInit(): void {
    console.log(this.webview);
    
    // this.container.nativeElement.addEventListern("mouseover",(event) => {
    //   console.log("hover");
      
    //   this.item.isHover = true
    // })
    // this.container.nativeElement.addEventListern("mouseout",(event) => {
    //   this.item.isHover = false
    // })

    this.webview.nativeElement.addEventListener('will-navigate', (event) => {
      let update: Update<Page> = {
        id: this.item.id,
        changes: {
          url: event.url
        }
      }
      this.store.dispatch(new UpdatePage({page:update}))
    })
  }
  @Input()
  item: PageCheck

  @ViewChild("webview",{read:false,static:false}) webview: ElementRef;
  @ViewChild("container",{read:false,static:false}) container: ElementRef;

  // item: Page

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.item.isHover = false
    // console.log(this.webView);
    // this.store.pipe(select(selectPagesById(this.itemId))).subscribe((page: Page) => {
    //   console.log("change item");

    //   this.item = page
    // })
  }
  log(value: any) {
    console.log(value);

  }

  removePage(event:Event) {
    event.preventDefault()
    event.stopPropagation()
    this.store.dispatch(new DeletePage({ id: this.item.id }))
    this.item.isDeleted = true
  }

  onBlur(value: string, $event) {
    if (value != this.item.url) {
      let update: Update<Page> = {
        id: this.item.id,
        changes: {
          url: value
        }
      }
      this.store.dispatch(new UpdatePage({ page: update }))
    }
  }
}
