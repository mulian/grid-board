import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAllTabs, selectTabOptions, selectTabOptionsSelectTab, selectTabOptionsEditTab } from '../../states/reducers';
import { AddTab } from '../../states/tab';

@Component({
  selector: 'app-tabbar-list',
  templateUrl: './tabbar-list.component.html',
  styleUrls: ['./tabbar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbarListComponent implements OnInit {
  tab$: Observable<any>
  // selectedTab$: Observable<any>
  // editTab$: Observable<any>

  constructor(private store: Store<AppState>) { }

  log(value:any) {
    // console.log(value);
    
  }
  
  ngOnInit() {
    // this.editTab$ = this.store.pipe(select(selectTabOptionsEditTab))
    // this.selectedTab$ = this.store.pipe(select(selectTabOptionsSelectTab));
    this.tab$ = this.store.pipe(select(selectAllTabs));
  }

  newAction() {
    this.store.dispatch(new AddTab({tab:{name:"neu",isEdit:true,isSelected:true}}))
  }
}
