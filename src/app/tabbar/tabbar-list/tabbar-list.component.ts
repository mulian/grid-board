import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAllTabs, selectTabOptions, selectTabOptionsSelectTab, selectTabOptionsEditTab } from '../../states/reducers';
import { AddTab } from '../../states/tab';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import ChromeTabs from 'chrome-tabs'

@Component({
  selector: 'app-tabbar-list',
  templateUrl: './tabbar-list.component.html',
  styleUrls: ['./tabbar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbarListComponent implements OnInit {
  tab$: Observable<any>
  tabId: string

  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }

  constructor(private store: Store<AppState>) { }
  
  ngOnInit() {
    this.tab$ = this.store.pipe(select(selectAllTabs));
    this.store.pipe(select(selectTabOptionsSelectTab)).subscribe((tabId) => {
      this.tabId = tabId
    })
    
  }

  newAction() {
    this.store.dispatch(new AddTab({tab:{name:"neu",isEdit:true,isSelected:true}}))
  }
}
