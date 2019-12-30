import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TabModel, UpdateTab, DeleteTab, EditTab } from '../../states/tab';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/reducers';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-tabbar-item-edit',
  templateUrl: './tabbar-item-edit.component.html',
  styleUrls: ['./tabbar-item-edit.component.scss']
})
export class TabbarItemEditComponent implements OnInit {
  @Input()
  tabItem: TabModel

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

  }

  changeName(name: string) {
      const update: Update<TabModel> = {
        id: this.tabItem.id,
        changes: {
          name: name,
        }
      }
      this.store.dispatch(new UpdateTab({ tab: update }))
      this.store.dispatch(new EditTab({tabId:null}))
  }

  //Booth onEnter and onBlur will be fired with this function
  onBlur(value: string,event:any) {
    this.changeName(value)
  }
}
