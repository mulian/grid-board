import { Component, OnInit } from '@angular/core';
import { AppState } from '../states/reducers';
import { Store } from '@ngrx/store';
import { AddPage } from '../states/page';
import { AddTab, DeleteTab } from '../states/tab';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  //Tab Menu
  addPage() {
    let once=false;
    let subscribe = this.store.subscribe(s => {
      if(!once) {
        once=true
        this.store.dispatch(new AddPage({
          page: {
            cols: 1,
            url: "http://google.de",
            tab: s.tabs.options.selectedTab,
            x: 0,
            y: 0,
            rows: 1
          }
        }))
        subscribe.unsubscribe();
      }
    });
    
  }
  addTab() {
    this.store.dispatch(new AddTab({
      tab: {
         name: null,
         sortNumber: null
      }
    }))
  }
  removeTab() {
    this.store.dispatch(new DeleteTab({
      id: null
    }))
  }
}
