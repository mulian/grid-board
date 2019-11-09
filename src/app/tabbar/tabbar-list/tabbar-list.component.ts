import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAllTabs, selectTabOptions } from '../../states/reducers';
import { AddTab } from '../../states/tab';

@Component({
  selector: 'app-tabbar-list',
  templateUrl: './tabbar-list.component.html',
  styleUrls: ['./tabbar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbarListComponent implements OnInit {
  tab$: Observable<any>
  options$: Observable<any>

  constructor(private store: Store<AppState>) { }
  
  ngOnInit() {
    this.options$ = this.store.pipe(select(selectTabOptions));
    this.tab$ = this.store.pipe(select(selectAllTabs));
  }

  newAction() {
    this.store.dispatch(new AddTab({tab:{name:"neu"}}))
  }
}
