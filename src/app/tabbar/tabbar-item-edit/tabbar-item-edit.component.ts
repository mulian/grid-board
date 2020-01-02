import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TabModel, UpdateTab, DeleteTab, EditTab, RenameTab } from '../../states/tab';
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
      this.store.dispatch(new RenameTab({ tabId: null, newName: name}))
  }

  //Booth onEnter and onBlur will be fired with this function
  onBlur(value: string,event:any) {
    this.changeName(value)
  }
}
