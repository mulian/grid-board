import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, getTabs, getSelectedTab } from '../states/reducers';
import { AddTabs, Tab, ShowTab } from '../states/tab';
import { Observable } from 'rxjs';

let newTab:Tab= {
  id:"2",
  name: "Blubb",
  url: "bla"
}

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss']
})
export class TabbarComponent implements OnInit {
  tabs$: Observable<any>;
  selectedTab$: Observable<any>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.tabs$ = this.store.pipe(select(getTabs));
    this.selectedTab$ = this.store.pipe(select(getSelectedTab));
  }

  newAction() {
    this.store.dispatch(new AddTabs({tab:newTab}));
    this.store.dispatch(new ShowTab({tab:newTab}));
  }
}
