import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../states/reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {
  @Input()
  tabId:number

  pages$: Observable<any>;

  alreadyOpen:boolean=false;
  
  constructor(private store: Store<AppState>) { }

  ngAfterViewInit() {
    document.getElementById("pageTable").style.height = (document.documentElement.offsetHeight-20)+'px'
  }

  ngOnInit() {
    // this.pages$ = this.store.pipe(select(getPagesByTabId,{tabId:this.tabId}));

    console.log("ngOnInit: alreadyOpen: "+this.alreadyOpen);
    this.alreadyOpen=true;
  }

}
