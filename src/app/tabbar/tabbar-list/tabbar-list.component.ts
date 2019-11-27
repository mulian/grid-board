import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAllTabs, selectTabOptions, selectTabOptionsSelectTab, selectTabOptionsEditTab, selectAllTabsEntitys, selectAllTabsEntities } from '../../states/reducers';
import { AddTab, SelectTab, Tab, EditTab, SortTab, DeleteTab } from '../../states/tab';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import ChromeTabs from 'chrome-tabs'
import ClickHandler from './click-handler';
import NgrxEntitySync from '../../ngrx-entity-sync';

@Component({
  selector: 'app-tabbar-list',
  templateUrl: './tabbar-list.component.html',
  styleUrls: ['./tabbar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbarListComponent implements OnInit {
  tab$: Observable<any>
  tabOptions$: Observable<any>
  syncedTabData: NgrxEntitySync<Tab>
  
  clickHandler: ClickHandler<Tab> = new ClickHandler<Tab>()
    .onClick((item: Tab) => {
      console.log("Click: ", item);
      this.store.dispatch(new SelectTab({ tabId: item.id }))
    }).onDoubleClick((item: Tab) => {
      console.log("double click", item);
      this.store.dispatch(new EditTab({tabId:item.id}))
    })

  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century'
  ];

  click(item,event) {
    event.stopPropagation();
    event.preventDefault();
    this.clickHandler.click(item);
  }
  closeTab(item,event) {
    event.stopPropagation();
    event.preventDefault();
    this.store.dispatch(new DeleteTab({id: item.id}))
  }
  drop(event: CdkDragDrop<string[]>) {
    this.store.dispatch( new SortTab({sourceIndex: event.previousIndex, targetIndex:event.currentIndex}))
  }

  constructor(private store: Store<AppState>) {
  }

  maxSortNumber:number=0
  setMaxSortNumber(newSortNumber) {
    if(this.maxSortNumber<newSortNumber) {
      this.maxSortNumber=newSortNumber
    }
  }

  ngOnInit() {
    this.tab$ = this.store.pipe(select(selectAllTabsEntitys));
    this.tabOptions$ = this.store.pipe(select(selectTabOptions));
    
  }

  newAction(tabLength) {
    this.store.dispatch(new AddTab({ tab: { name: "neu", sortNumber:tabLength } }))
  }
}
