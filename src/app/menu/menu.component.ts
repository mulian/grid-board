import { Component, OnInit } from '@angular/core';
import { AppState, selectTabSlide } from '../states/reducers';
import { Store, select } from '@ngrx/store';
import { AddPage } from '../states/page';
import { AddTab, DeleteTab } from '../states/tab';
import { TranslateService } from '@ngx-translate/core';
import { SlideService } from '../slide/slide.service';
import { Observable } from 'rxjs';
import { TabSlide } from '../states/tab/tab.slide.model';
import { ShowDialog, DialogType } from '../states/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  slideOptions: TabSlide

  constructor(private store: Store<AppState>,public translate: TranslateService) { }

  ngOnInit() { 

  }

  showHelp() {
    this.store.dispatch(new ShowDialog({dialog: DialogType.HELP}))
  }
  showSettings() {
    this.store.dispatch(new ShowDialog({dialog: DialogType.SETTINGS}))
  }

  //Tab Menu
  addPage() {
    let once=false;
    let subscribe = this.store.subscribe(s => {
      if(!once) {
        once=true
        this.store.dispatch(new AddPage({
          page: {
            cols: 1,
            url: "http://google.de",
            tab: s.tabs.options.selectedTab,
            x: 0,
            y: 0,
            rows: 1
          }
        }))
        subscribe.unsubscribe();
      }
    });
    
  }
  addTab() {
    this.store.dispatch(new AddTab({ tab: { name: this.translate.instant("TAB.NEW_TAB_PLACE_HOLDER"), sortNumber: null, isSlideConsidered:true} }))
  }

  removeTab() {
    this.store.dispatch(new DeleteTab({
      id: null
    }))
  }
}
