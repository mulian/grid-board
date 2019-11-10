import { Component, OnInit, Input } from '@angular/core';
import { Tab,  UpdateTab, DeleteTab } from '../../states/tab';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../states/reducers';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-tabbar-item',
  templateUrl: './tabbar-item.component.html',
  styleUrls: ['./tabbar-item.component.scss']
})
export class TabbarItemComponent implements OnInit {
  @Input()
  tabItem:Tab

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  clickRemoveTab() {
    this.store.dispatch(new DeleteTab({id:this.tabItem.id}))
  }

  editTab() {
    const update: Update<Tab> = {
      id: this.tabItem.id,
      changes: {
        isEdit: true
      }
    }
    this.store.dispatch(new UpdateTab({ tab: update }))
  }

  showTab() {
    const update: Update<Tab> = {
      id: this.tabItem.id,
      changes: {
        isSelected: true
      }
    }
    this.store.dispatch(new UpdateTab({ tab: update }))
  }

  clicked:number=0
  clickTimeOut=null
  clickTabTitle(index:string) { //TODO: Make this smarter
    this.clicked++
    if(this.clickTimeOut==null) {
      this.clickTimeOut = setTimeout(() => {
        if(this.clicked>1) { //doubleclick
          this.resetClick()
          this.editTab();
        } else { //click
          this.resetClick()
          this.showTab();
        }
      },200)
    }
  }
  resetClick() {
    this.clicked=0
    this.clickTimeOut=null
  }
}
