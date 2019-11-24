import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, selectAllPages, selectAllTabs, selectTabOptions, selectPagesOptions, selectTabOptionsSelectTab, selectAllTabsEntitys } from '../states/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  tabData$:Observable<any>
  tabSelected$:Observable<any>
  pageOptions$:Observable<any>

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.tabData$ = this.store.pipe(select(selectAllTabsEntitys)); //TODO: dont care of sort order! use a subscription
    this.tabSelected$ = this.store.pipe(select(selectTabOptionsSelectTab));
    this.pageOptions$ = this.store.pipe(select(selectPagesOptions))
  }

  log(value:any) {
    console.log(value);
  }
}
