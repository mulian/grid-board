import { Component, OnInit } from '@angular/core';
import { AppState, selectTabSlide } from '../states/reducers';
import { Store, select } from '@ngrx/store';
import { AddPage } from '../states/page';
import { AddTab, DeleteTab } from '../states/tab';
import { TranslateService } from '@ngx-translate/core';
import { SlideService } from '../slide/slide.service';
import { Observable } from 'rxjs';
import { TabSlide } from '../states/tab/tab.slide.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // slideOptions$: Observable<any>
  slideOptions: TabSlide

  constructor(private store: Store<AppState>,public translate: TranslateService,private slideService:SlideService) { }

  ngOnInit() { 
    this.store.pipe(select(selectTabSlide)).subscribe((slideOption:TabSlide) => {
      this.slideOptions = slideOption
    })
  }
  log(value) {
    console.log(value);
    
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
    this.store.dispatch(new AddTab({
      tab: {
         name: null,
         sortNumber: null
      }
    }))
  }
  showHelp() {
    console.log("show help");
    
  }
  setLang(lang:string) {
    this.translate.setDefaultLang(lang)
    // this.translate.langs
  }
  removeTab() {
    this.store.dispatch(new DeleteTab({
      id: null
    }))
  }
}
