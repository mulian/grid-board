import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, getTab } from '../states/reducers';
import { AddTabs, Tab, ShowTab, ShowTabEnum } from '../states/tab';
import { Observable } from 'rxjs';

let newTab:Tab= {
  name: "New",
  pages: []
}

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss']
})
export class TabbarComponent implements OnInit {
  tab$: Observable<any>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.tab$ = this.store.pipe(select(getTab));
  }

  newAction() {
    this.store.dispatch(new AddTabs({tab:newTab}));
    this.store.dispatch(new ShowTab({showTabEnum:ShowTabEnum.LastTab}));
  }

  showTab(index:number) {
    this.store.dispatch(new ShowTab({showTabId:index}));
  }

  // isActiveTab(id:number) {
  //   if()
  // }
}
